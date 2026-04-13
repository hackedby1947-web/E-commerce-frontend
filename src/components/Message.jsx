// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Send, ArrowLeft, User, Headset } from "lucide-react";
// import api from "../api";
// import { AuthContext } from "../context/AuthContext";

// const Messages = ({ userType = "customer" }) => {
//   const { user } = useContext(AuthContext);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messageText, setMessageText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const chatEndRef = useRef(null);



//   const fetchConversations = async () => {
//     try {
//       if (userType === "admin") {
//         const res = await api.get("/api/messages/conversations");
//         setContacts(res.data);
//       } else {
//         setContacts([{ id: user._id, name: user.name }]);
//         setSelectedChat({ id: user._id, name: user.name });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//     useEffect(() => {
//     fetchConversations();
//   }, []);

 

//   const fetchMessages = async (contactId) => {
//     try {
//       const res = await api.get(`/api/messages/${contactId}`);
//       setMessages(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//    useEffect(() => {
//     if (selectedChat) fetchMessages(selectedChat.id);
//   }, [selectedChat]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!messageText.trim() || !selectedChat) return;

//     const payload = {
//       userId: selectedChat.id,
//       name: selectedChat.name,
//       text: messageText,
//       sender: userType === "admin" ? "admin" : user.name, // ✅ এখানে name যাবে

//     };

//     try {
//       const res = await api.post("/api/messages/send", payload);
//       setMessages([...messages, res.data]);
//       setMessageText("");
//     } catch (err) {
//       console.error("Send message error:", err);
//     }
//   };


//   // frontend Messages.jsx


//   return (
//     <div className="flex h-[85vh] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden m-2 md:m-5">
//       {/* Sidebar - Only visible for admin or desktop */}
//       {userType === "admin" && (
//         <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
//           <div className="p-6 border-b bg-white">
//             <h2 className="font-bold text-xl text-gray-800 tracking-tight">Conversations</h2>
//           </div>
//           <div className="flex-1 overflow-y-auto p-3 space-y-2">
//             {contacts.map((c) => (
//               <div
//                 key={c.id}
//                 onClick={() => setSelectedChat(c)}
//                 className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl transition-all duration-200 ${
//                   selectedChat?.id === c.id 
//                   ? "bg-indigo-600 text-white shadow-md" 
//                   : "hover:bg-indigo-50 text-gray-700"
//                 }`}
//               >
//                 <div className={`p-2 rounded-full ${selectedChat?.id === c.id ? "bg-indigo-500" : "bg-gray-200"}`}>
//                   <User size={20} />
//                 </div>
//                 <span className="font-medium">{c.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Chat Window */}
//       <div className="flex-1 flex flex-col bg-[#F8F9FD]">
//         {selectedChat ? (
//           <>
//             {/* Professional Header */}
//             <div className="px-6 py-4 bg-white border-b flex items-center justify-between shadow-sm">
//               <div className="flex items-center gap-4">
//                 {userType === "admin" && (
//                   <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={20} className="text-gray-600" />
//                   </button>
//                 )}
//                 <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
//                   <Headset size={24} />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-800 leading-tight">
//                     {userType === "admin" ? selectedChat.name : "Customer Support"}
//                   </h3>
//                   <p className="text-xs text-green-500 font-medium flex items-center gap-1">
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                     Online Support Team
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Message Area */}
//             <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
//               {messages.map((msg) => {
//                 const isAdmin = msg.sender === "admin";
//                 return (
//                   <div key={msg._id || Math.random()} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
//                     <div className={`max-w-[75%] md:max-w-[60%] p-4 shadow-sm ${
//                       isAdmin 
//                         ? "bg-indigo-600 text-white rounded-2xl rounded-tr-none" 
//                         : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none"
//                     }`}>
//                       <p className="text-[15px] leading-relaxed">{msg.text}</p>
//                       <span className={`text-[10px] mt-2 block opacity-70 ${isAdmin ? "text-right" : "text-left"}`}>
//                         {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={chatEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="p-4 bg-white border-t border-gray-100">
//               <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-indigo-400 transition-all">
//                 <input
//                   type="text"
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   placeholder="Write your message..."
//                   className="flex-1 bg-transparent p-2 px-4 focus:outline-none text-gray-700"
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors shadow-lg active:scale-95"
//                 >
//                   <Send size={18} />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-400 animate-fade-in">
//             <div className="bg-gray-100 p-6 rounded-full mb-4">
//                <Headset size={48} className="text-gray-300" />
//             </div>
//             <p className="text-lg font-medium">Select a conversation to start</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messages;

import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Send, ArrowLeft, User, Headset } from "lucide-react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";

// সকেট কানেকশন (আপনার ব্যাকএন্ড ইউআরএল অনুযায়ী পরিবর্তন করুন)
// const socket = io("http://localhost:5000");
const socket = io("https://api-royalcart-8iay.onrender.com");


const Messages = ({ userType = "customer" }) => {
  const { user } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const chatEndRef = useRef(null);
  
  // রিয়েল-টাইম চেকিংয়ের জন্য Ref
  const selectedChatRef = useRef(null);


  

  // ১. সেশন আইডি রিফ-এ সেভ করা
  useEffect(() => {
    if (selectedChat) {
      selectedChatRef.current = selectedChat.id;
      // সকেট রুমে জয়েন করা
      socket.emit("joinChat", selectedChat.id);
    }
  }, [selectedChat]);

  // ২. কনভারসেশন ফেচ করা (useCallback ব্যবহার করে যাতে লুপ না হয়)
  const fetchConversations = useCallback(async () => {
    try {
      if (userType === "admin") {
        const res = await api.get("/api/messages/conversations");
        setContacts(res.data);
      } else if (user) {
        // কাস্টমারের জন্য নিজের আইডি ই কন্টাক্ট
        const customerChat = { id: user._id, name: user.name };
        setContacts([customerChat]);
        setSelectedChat(customerChat);
      }
    } catch (err) {
      console.error("Fetch Conversations Error:", err);
    }
  }, [user, userType]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // ৩. মেসেজ ফেচ করা
  const fetchMessages = async (contactId) => {
    try {
      const res = await api.get(`/api/messages/${contactId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedChat) fetchMessages(selectedChat.id);
  }, [selectedChat]);

  // ৪. রিয়েল-টাইম সকেট লিসেনার (নতুন মেসেজ রিসিভ করা)
  useEffect(() => {
    const handleNewMessage = (msg) => {
      const msgUserId = msg.user?._id || msg.user;
      
      // যদি বর্তমান ওপেন থাকা চ্যাটের মেসেজ হয়, তবেই অ্যাড হবে
      if (selectedChatRef.current === msgUserId) {
        setMessages((prev) => {
          // ডুপ্লিকেট মেসেজ চেক
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
      
      // এডমিনের জন্য কন্টাক্ট লিস্ট আপডেট করা (লাস্ট মেসেজ)
      if (userType === "admin") {
        fetchConversations();
      }
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("newMessageAdmin", handleNewMessage);

    return () => {
      socket.off("newMessage");
      socket.off("newMessageAdmin");
    };
  }, [userType, fetchConversations]);

  // ৫. মেসেজ সেন্ড করা
  const sendMessage = async () => {
    if (!messageText.trim() || !selectedChat) return;

    const payload = {
      userId: selectedChat.id,
      name: selectedChat.name,
      text: messageText,
      sender: userType === "admin" ? "admin" : "customer", 
    };

    try {
      // শুধু সার্ভারে পাঠান, সকেট লিসেনার মেসেজটি স্ক্রিনে দেখাবে (ডাবল মেসেজ এড়াতে)
      await api.post("/api/messages/send", payload);
      setMessageText("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[85vh] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden m-2 md:m-5">
      {/* Sidebar - কাস্টমারের জন্য হাইড করা যেতে পারে */}
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
                    {c.unread > 0 && <span className="text-[10px] bg-red-500 text-white w-fit px-2 rounded-full">New</span>}
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
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                {userType === "admin" && (
                  <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
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

            {/* Message Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => {
                // কাস্টমারের জন্য সে নিজে সেন্ডার হলে ডান দিকে দেখাবে
                const isMe = userType === "admin" ? msg.sender === "admin" : msg.sender !== "admin";
                
                return (
                  // eslint-disable-next-line react-hooks/purity
                  <div key={msg._id || Math.random()} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
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

            {/* Input Area */}
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