
// // src/components/Message.jsx
import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Send, ArrowLeft, User, Headset } from "lucide-react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import socket from "../socket/socket.js"; // ✅ shared instance — আলাদা io() নয়

const Messages = ({ userType = "customer" }) => {
  const { user } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [chatHeight, setChatHeight] = useState("calc(100dvh - 160px)"); // ✅ dynamic height
  const chatEndRef = useRef(null);
  const selectedChatRef = useRef(null);
  const isFirstLoad = useRef(true); // ✅ প্রথম load track করার জন্য

  // ✅ FIX 1: Dynamic height — navbar actual height measure করো
  useEffect(() => {
    const updateHeight = () => {
      const navbar = document.getElementById("main-navbar");
      const navbarH = navbar ? navbar.offsetHeight : 88;
      const bottomNavH = window.innerWidth < 768 ? 56 : 0;
      const margin = 16;
      setChatHeight(`calc(100dvh - ${navbarH + bottomNavH + margin}px)`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // ১. selectedChat বদলালে room join করো
  useEffect(() => {
    if (selectedChat) {
      selectedChatRef.current = selectedChat.id;
      socket.emit("joinChat", selectedChat.id);
    }
  }, [selectedChat]);

  // ২. conversations fetch (socket refetch এর জন্য callback হিসেবেও রাখা হয়েছে)
  const fetchConversations = useCallback(async () => {
    try {
      if (userType === "admin") {
        const res = await api.get("/api/messages/conversations");
        setContacts(res.data);
      } else if (user) {
        const customerChat = { id: user._id, name: user.name };
        setContacts([customerChat]);
        setSelectedChat((prev) => prev ?? customerChat);
      }
    } catch (err) {
      console.error("Fetch Conversations Error:", err);
    }
  }, [user, userType]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        if (userType === "admin") {
          const res = await api.get("/api/messages/conversations");
          if (!cancelled) setContacts(res.data);
        } else if (user) {
          const customerChat = { id: user._id, name: user.name };
          if (!cancelled) {
            setContacts([customerChat]);
            setSelectedChat((prev) => prev ?? customerChat);
          }
        }
      } catch (err) {
        console.error("Fetch Conversations Error:", err);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [user, userType]);

  // ৩. messages fetch
  useEffect(() => {
    if (!selectedChat) return;
    let cancelled = false;
    isFirstLoad.current = true;
    const run = async () => {
      try {
        const res = await api.get(`/api/messages/${selectedChat.id}`);
        if (!cancelled) setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [selectedChat]);

  // ৪. ✅ Socket connect + realtime listener
  useEffect(() => {
    if (!socket.connected) socket.connect();

    const handleNewMessage = (msg) => {
      const msgUserId = msg.user?._id || msg.user;

      if (selectedChatRef.current === msgUserId) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }

      if (userType === "admin") {
        fetchConversations();
      }
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("newMessageAdmin", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("newMessageAdmin", handleNewMessage);
    };
  }, [userType, fetchConversations]);

  // ৫. message send
  const sendMessage = async () => {
    if (!messageText.trim() || !selectedChat) return;

    const payload = {
      userId: selectedChat.id,
      name: selectedChat.name,
      text: messageText,
      sender: userType === "admin" ? "admin" : "customer",
    };

    try {
      await api.post("/api/messages/send", payload);
      setMessageText("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  // ✅ FIX 2: Auto scroll — প্রথম load এ page scroll হবে না
  useEffect(() => {
    if (!chatEndRef.current) return;

    if (isFirstLoad.current) {
      // প্রথম load: chat box এর ভেতরে instant scroll, window scroll না
      chatEndRef.current.scrollIntoView({ block: "end" });
      isFirstLoad.current = false;
    } else {
      // নতুন message: smooth scroll
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div
      className="flex bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden m-2 md:m-5"
      style={{ height: chatHeight }} // ✅ dynamic height
    >
      {/* Sidebar — admin only */}
      {userType === "admin" && (
        <div className={`w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b bg-white">
            <h2 className="font-bold text-xl text-gray-800 tracking-tight">Conversations</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {contacts.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedChat(c)}
                className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl transition-all duration-200 ${
                  selectedChat?.id === c.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-indigo-50 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-full ${selectedChat?.id === c.id ? "bg-indigo-500" : "bg-gray-200"}`}>
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{c.name}</span>
                  {c.unread > 0 && (
                    <span className="text-[10px] bg-red-500 text-white w-fit px-2 rounded-full">New</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col bg-[#F8F9FD] ${!selectedChat && userType === 'admin' ? 'hidden md:flex' : 'flex'}`}>
        {selectedChat ? (
          <>
            <div className="px-6 py-4 bg-white border-b flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                {userType === "admin" && (
                  <button onClick={() => setSelectedChat(null)} aria-label="চ্যাট বন্ধ করুন" className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={20} className="text-gray-600" />
                  </button>
                )}
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {selectedChat.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 leading-tight">
                    {userType === "admin" ? selectedChat.name : "Customer Support"}
                  </h3>
                  <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => {
                const isMe = userType === "admin" ? msg.sender === "admin" : msg.sender !== "admin";
                return (
                  <div key={msg._id || index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] md:max-w-[60%] p-4 shadow-sm ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-2xl rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none"
                    }`}>
                      <p className="text-[15px] leading-relaxed">{msg.text}</p>
                      <span className={`text-[9px] mt-1 block opacity-60 ${isMe ? "text-right" : "text-left"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent p-2 px-4 focus:outline-none text-gray-700"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Headset size={64} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Select a conversation to start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
