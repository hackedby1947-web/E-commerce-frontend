import React from 'react';

const PrivacyPolicy = () => {
  const lastUpdated = "May 2, 2026"; // আপনার প্রয়োজন অনুযায়ী পরিবর্তন করুন

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 py-10 px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-indigo-100 italic">Last Updated: {lastUpdated}</p>
        </div>

        <div className="p-8 sm:p-12 text-gray-700 leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 pb-2 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>RoyalCart</strong>. We value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you visit our website <strong>royalcartx.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 pb-2 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-3">We collect several types of information to provide and improve our service to you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and shipping address when you place an order.</li>
              <li><strong>Usage Data:</strong> Information on how you access and use the website.</li>
              <li><strong>Cookies:</strong> We use cookies to track activity and hold certain information to enhance your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 pb-2 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">RoyalCart uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver your orders (Sarees, food items, etc.).</li>
              <li>To provide customer support via our AI Chatbot.</li>
              <li>To notify you about changes to our services or special offers.</li>
              <li>To monitor the usage of our website and prevent technical issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 pb-2 mb-4">
              4. Data Protection & Security
            </h2>
            <p>
              The security of your data is important to us. While no method of transmission over the Internet is 100% secure, we strive to use commercially acceptable means to protect your Personal Data, including secure hosting and encrypted API integrations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 pb-2 mb-4">
              5. Third-Party Services
            </h2>
            <p>
              We may employ third-party companies (like <strong>Steadfast Courier</strong> for delivery) to facilitate our service. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose it for any other purpose.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-indigo-600">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <p className="mt-2 font-medium">Email: support@royalcartx.com</p>
            <p>Website: <a href="https://royalcartx.com" className="text-indigo-600 hover:underline">royalcartx.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;