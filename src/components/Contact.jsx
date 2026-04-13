import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("বার্তা পাঠানো হচ্ছে...");
    
    // এখানে আপনার API কল হবে
    setTimeout(() => {
      toast.success("আপনার বার্তা সফলভাবে আমাদের কাছে পৌঁছেছে!", { id: loadingToast });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">আমাদের সাথে যোগাযোগ করুন</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            আপনার কোনো প্রশ্ন বা মতামত থাকলে আমাদের জানান। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Contact Information */}
          <div className="bg-indigo-600 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8">যোগাযোগের তথ্য</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-500 p-3 rounded-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">কল করুন</p>
                    <p className="font-semibold">+880 1XXX-XXXXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-indigo-500 p-3 rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">ইমেইল করুন</p>
                    <p className="font-semibold">support@royalcarti.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-indigo-500 p-3 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">অফিস ঠিকানা</p>
                    <p className="font-semibold">ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-12">
              <p className="text-indigo-100 mb-4 uppercase tracking-widest text-xs font-bold">Follow Us</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-indigo-200 transition-colors"><Facebook size={24} /></a>
                <a href="#" className="hover:text-indigo-200 transition-colors"><Instagram size={24} /></a>
                <a href="#" className="hover:text-indigo-200 transition-colors"><Twitter size={24} /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">আপনার নাম</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="নাম লিখুন"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="Email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">বিষয় (Subject)</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="কী বিষয়ে জানতে চান?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">বার্তা</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="আপনার বার্তাটি এখানে লিখুন..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
              >
                মেসেজ পাঠান <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;