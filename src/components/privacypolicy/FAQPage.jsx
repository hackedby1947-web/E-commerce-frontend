import { useState } from "react";

const categories = [
  { id: "all", label: "সব প্রশ্ন" },
  { id: "order", label: "অর্ডার" },
  { id: "delivery", label: "ডেলিভারি" },
  { id: "payment", label: "পেমেন্ট" },
  { id: "refund", label: "রিফান্ড" },
  { id: "product", label: "পণ্য" },
];

const faqs = [
  // Order
  {
    id: 1,
    cat: "order",
    q: "কীভাবে অর্ডার করব?",
    a: "আমাদের ওয়েবসাইট থেকে পছন্দের শাড়ি বেছে 'Cart'-এ যোগ করুন, তারপর Checkout করুন। অথবা সরাসরি WhatsApp বা Facebook Page-এ মেসেজ করেও অর্ডার দিতে পারেন।",
  },
  {
    id: 2,
    cat: "order",
    q: "অর্ডার করার পর কি বাতিল করা যাবে?",
    a: "অর্ডার করার ২ ঘণ্টার মধ্যে বাতিল করতে পারবেন। তারপর পণ্য প্রস্তুত ও প্যাক করা শুরু হয়ে যায়, তাই বাতিল সম্ভব নাও হতে পারে।",
  },
  {
    id: 3,
    cat: "order",
    q: "অর্ডার ট্র্যাক করব কীভাবে?",
    a: "অর্ডার confirm হলে আপনাকে একটি Tracking ID দেওয়া হবে। সেই ID দিয়ে আমাদের ওয়েবসাইটে বা courier-এর সাইটে ট্র্যাক করতে পারবেন।",
  },
  {
    id: 4,
    cat: "order",
    q: "একসাথে কতটি শাড়ি অর্ডার করা যাবে?",
    a: "যেকোনো পরিমাণ অর্ডার করতে পারবেন। তবে বাল্ক অর্ডারের জন্য আলাদা ছাড় পাওয়া যায় — আমাদের সাথে যোগাযোগ করুন।",
  },
  // Delivery
  {
    id: 5,
    cat: "delivery",
    q: "ডেলিভারি কতদিনে পাব?",
    a: "ঢাকার ভেতরে ১–২ কার্যদিবস এবং ঢাকার বাইরে ৩–৫ কার্যদিবসের মধ্যে ডেলিভারি দেওয়া হয়।",
  },
  {
    id: 6,
    cat: "delivery",
    q: "ডেলিভারি চার্জ কত?",
    a: "ঢাকার ভেতরে ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা ডেলিভারি চার্জ। ১,৫০০ টাকার উপরে অর্ডারে ডেলিভারি সম্পূর্ণ ফ্রি।",
  },
  {
    id: 7,
    cat: "delivery",
    q: "দেশের বাইরে ডেলিভারি দেওয়া হয়?",
    a: "হ্যাঁ, আমরা আন্তর্জাতিক শিপিং করি। চার্জ ও সময় দেশভেদে আলাদা হয়। বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।",
  },
  {
    id: 8,
    cat: "delivery",
    q: "ডেলিভারি মিস হলে কী করব?",
    a: "ডেলিভারি মিস হলে courier আপনাকে কল করবে। না পেলে আমাদের WhatsApp-এ জানান — আমরা পুনরায় ব্যবস্থা করব।",
  },
  // Payment
  {
    id: 9,
    cat: "payment",
    q: "কোন কোন পেমেন্ট পদ্ধতি আছে?",
    a: "bKash, Nagad, Rocket, ক্রেডিট/ডেবিট কার্ড এবং ক্যাশ অন ডেলিভারি — সবই গ্রহণযোগ্য।",
  },
  {
    id: 10,
    cat: "payment",
    q: "ক্যাশ অন ডেলিভারি কি আছে?",
    a: "হ্যাঁ! ঢাকার ভেতরে এবং বাইরে উভয় ক্ষেত্রেই ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যায়।",
  },
  {
    id: 11,
    cat: "payment",
    q: "পেমেন্ট কি নিরাপদ?",
    a: "হ্যাঁ, সম্পূর্ণ নিরাপদ। আমরা SSL-এনক্রিপ্টেড পেমেন্ট গেটওয়ে ব্যবহার করি এবং কোনো কার্ড তথ্য সংরক্ষণ করি না।",
  },
  // Refund
  {
    id: 12,
    cat: "refund",
    q: "শাড়িতে সমস্যা হলে কী করব?",
    a: "পণ্য পাওয়ার ৭২ ঘণ্টার মধ্যে সমস্যার ছবি বা ভিডিও সহ আমাদের WhatsApp-এ পাঠান। আমরা বিনামূল্যে Replacement দেব।",
  },
  {
    id: 13,
    cat: "refund",
    q: "রিফান্ড কি টাকায় পাওয়া যাবে?",
    a: "আমরা সাধারণত Replacement বা Store Credit দিই। বিশেষ ক্ষেত্রে টাকা ফেরত দেওয়া হয় — সেটি ৫–৭ কার্যদিবসের মধ্যে প্রক্রিয়া করা হয়।",
  },
  {
    id: 14,
    cat: "refund",
    q: "Replacement-এর জন্য শাড়ি কীভাবে ফেরত দেব?",
    a: "আমরাই Pickup ব্যবস্থা করব — আপনাকে কোথাও যেতে হবে না। Courier আপনার বাসায় এসে নিয়ে যাবে।",
  },
  // Product
  {
    id: 15,
    cat: "product",
    q: "শাড়ির মাপ কীভাবে বুঝব?",
    a: "প্রতিটি পণ্যের পেজে বিস্তারিত মাপ দেওয়া আছে। সাধারণত শাড়ি ৬ গজ লম্বা এবং ৪৫ ইঞ্চি চওড়া হয়। সন্দেহ হলে আমাদের জিজ্ঞেস করুন।",
  },
  {
    id: 16,
    cat: "product",
    q: "ছবির সাথে আসল রং কি মিলবে?",
    a: "আমরা সর্বোচ্চ চেষ্টা করি সঠিক রং দেখাতে। তবে স্ক্রিনের brightness ও settings-এর কারণে সামান্য পার্থক্য হতে পারে।",
  },
  {
    id: 17,
    cat: "product",
    q: "শাড়ি কি wash করা যাবে?",
    a: "হ্যাঁ, তবে প্রথমবার ঠান্ডা পানিতে হাতে আলতো করে ধুয়ে নিন। প্রতিটি পণ্যের কেয়ার ইনস্ট্রাকশন প্যাকেজের সাথে দেওয়া থাকবে।",
  },
  {
    id: 18,
    cat: "product",
    q: "কাস্টম বা বিশেষ ডিজাইনের অর্ডার কি হয়?",
    a: "হ্যাঁ! বিশেষ অনুষ্ঠান বা কাস্টম ডিজাইনের জন্য আমাদের সাথে যোগাযোগ করুন। ৭–১৪ কার্যদিবসে তৈরি করে দেওয়া হবে।",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.cat === activeCategory;
    const matchSearch =
      search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 px-6 py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#d97706 0,#d97706 1px,transparent 1px,transparent 14px)",
          }}
        />
        <p className="relative mb-4 text-xs tracking-[0.4em] text-amber-500 uppercase">
          ✦ সাধারণ জিজ্ঞাসা ✦
        </p>
        <h1 className="relative mb-4 text-5xl md:text-6xl font-bold leading-tight text-stone-100">
          আপনার প্রশ্নের
          <br />
          <span className="text-amber-400 italic">উত্তর এখানে</span>
        </h1>
        <p className="relative mx-auto mb-10 max-w-md text-base leading-relaxed text-stone-400">
          যেকোনো প্রশ্ন খুঁজে নিন অথবা সরাসরি আমাদের সাথে যোগাযোগ করুন।
        </p>

        {/* Search */}
        <div className="relative mx-auto max-w-lg">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-lg">🔍</span>
          <input
            type="text"
            placeholder="প্রশ্ন খুঁজুন..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenFaq(null);
            }}
            className="w-full rounded-2xl border border-stone-700 bg-stone-900/80 py-4 pl-12 pr-5 text-base text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 transition-colors duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
            >
              ✕
            </button>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">

        {/* ── Category Tabs ── */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id);
                setOpenFaq(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === c.id
                  ? "bg-amber-500 text-stone-950"
                  : "border border-stone-700 text-stone-400 hover:border-amber-500/50 hover:text-stone-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ── FAQ List ── */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4">🤷</p>
            <p className="text-stone-400 text-base">কোনো প্রশ্ন পাওয়া যায়নি।</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 text-sm text-amber-500 underline underline-offset-2"
            >
              সব প্রশ্ন দেখুন
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((f) => (
              <div
                key={f.id}
                className={`overflow-hidden rounded-2xl border bg-stone-900 transition-colors duration-200 ${
                  openFaq === f.id ? "border-amber-600/60" : "border-stone-800"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-stone-800"
                >
                  <span className="text-base font-medium text-stone-100 leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-700 text-xl font-light text-amber-500 transition-transform duration-300 ${
                      openFaq === f.id ? "rotate-45 border-amber-500" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {openFaq === f.id && (
                  <div className="border-t border-stone-800 bg-stone-900/50 px-6 py-5">
                    <p className="text-sm leading-relaxed text-stone-400">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Still have questions ── */}
        <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 px-8 py-12 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#d97706 0,#d97706 1px,transparent 1px,transparent 14px)",
            }}
          />
          <p className="relative text-3xl mb-3">💬</p>
          <h2 className="relative mb-3 text-2xl font-bold text-stone-100">
            আরো প্রশ্ন আছে?
          </h2>
          <p className="relative mb-8 text-stone-400 text-sm leading-relaxed">
            উত্তর না পেলে সরাসরি আমাদের সাথে যোগাযোগ করুন।
            <br />
            আমরা সাধারণত ১ ঘণ্টার মধ্যে উত্তর দিই।
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/880XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
            >
              📱 WhatsApp করুন
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-600 px-6 py-3 text-sm font-medium text-stone-200 transition-colors hover:border-amber-500 hover:text-amber-400"
            >
              💬 Facebook Inbox
            </a>
            <a
              href="mailto:support@yourstore.com"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-600 px-6 py-3 text-sm font-medium text-stone-200 transition-colors hover:border-amber-500 hover:text-amber-400"
            >
              ✉️ ইমেইল করুন
            </a>
          </div>
          <p className="relative mt-8 text-xs tracking-widest text-amber-700">
            ✦ আমাদের প্রতিশ্রুতি — আপনার হাসি ✦
          </p>
        </div>

      </div>
    </div>
  );
}
