import { useState } from "react";

const sections = [
  {
    id: 1,
    icon: "📋",
    title: "সাধারণ শর্তাবলী",
    content: [
      "আমাদের ওয়েবসাইট ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন বলে ধরে নেওয়া হবে।",
      "আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার রাখি। পরিবর্তনের পর ওয়েবসাইট ব্যবহার অব্যাহত রাখলে নতুন শর্ত মেনে নেওয়া হয়েছে বলে গণ্য হবে।",
      "১৮ বছরের কম বয়সী ব্যক্তিদের অভিভাবকের অনুমতি ছাড়া এই সাইট ব্যবহার নিষেধ।",
      "আমাদের সেবা শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করা যাবে।",
    ],
  },
  {
    id: 2,
    icon: "🛍️",
    title: "পণ্য ও মূল্য",
    content: [
      "আমাদের সকল পণ্যের মূল্য বাংলাদেশি টাকায় (BDT) প্রদর্শিত হয়।",
      "পণ্যের ছবি ও বিবরণ সর্বোচ্চ নির্ভুলতার সাথে দেওয়া হয়। তবে স্ক্রিনের কারণে রঙে সামান্য পার্থক্য হতে পারে।",
      "আমরা যেকোনো সময় পণ্যের মূল্য পরিবর্তন করার অধিকার রাখি। অর্ডার confirm হওয়ার পর মূল্য পরিবর্তন হবে না।",
      "Stock শেষ হলে অর্ডার বাতিল করার অধিকার আমাদের আছে এবং সম্পূর্ণ অর্থ ফেরত দেওয়া হবে।",
      "প্রচারমূলক মূল্য নির্দিষ্ট সময়ের জন্য প্রযোজ্য।",
    ],
  },
  {
    id: 3,
    icon: "📦",
    title: "অর্ডার ও ডেলিভারি",
    content: [
      "অর্ডার confirm হওয়ার পর ২ ঘণ্টার মধ্যে বাতিল করা যাবে।",
      "ঢাকার ভেতরে ১–২ কার্যদিবস এবং ঢাকার বাইরে ৩–৫ কার্যদিবসের মধ্যে ডেলিভারি দেওয়া হয়।",
      "ডেলিভারির সময় প্রাকৃতিক দুর্যোগ, হরতাল বা অন্যান্য অনিবার্য কারণে বিলম্ব হতে পারে।",
      "ডেলিভারির সময় পণ্য গ্রহণ করার আগে ভালোভাবে যাচাই করে নেওয়ার অনুরোধ করা হচ্ছে।",
      "ঠিকানা ভুল দেওয়ার কারণে ডেলিভারি ব্যর্থ হলে পুনরায় ডেলিভারি চার্জ প্রযোজ্য হবে।",
    ],
  },
  {
    id: 4,
    icon: "💳",
    title: "পেমেন্ট শর্তাবলী",
    content: [
      "আমরা bKash, Nagad, Rocket, ক্রেডিট/ডেবিট কার্ড এবং ক্যাশ অন ডেলিভারি গ্রহণ করি।",
      "অনলাইন পেমেন্ট SSL-এনক্রিপ্টেড গেটওয়ের মাধ্যমে সম্পন্ন হয় — সম্পূর্ণ নিরাপদ।",
      "পেমেন্ট সম্পন্ন হওয়ার পর একটি কনফার্মেশন SMS/ইমেইল পাঠানো হবে।",
      "পেমেন্টে কোনো সমস্যা হলে আমাদের সাথে যোগাযোগ করুন — আমরা সমাধান করব।",
      "Fraudulent পেমেন্ট বা চার্জব্যাক হলে আইনগত ব্যবস্থা নেওয়ার অধিকার আমাদের আছে।",
    ],
  },
  {
    id: 5,
    icon: "🔄",
    title: "রিটার্ন ও রিফান্ড",
    content: [
      "পণ্য পাওয়ার ৭২ ঘণ্টার মধ্যে সমস্যা জানালে বিনামূল্যে Replacement দেওয়া হবে।",
      "ব্যবহার করা বা ধোয়া পণ্য রিটার্ন গ্রহণযোগ্য নয়।",
      "পণ্যের ট্যাগ ও অরিজিনাল প্যাকেজিং অক্ষত থাকতে হবে।",
      "Replacement-এর ক্ষেত্রে Return Shipping চার্জ আমরাই বহন করব।",
      "বিশেষ ক্ষেত্রে Store Credit বা টাকা ফেরত দেওয়া হয় — প্রক্রিয়া ৫–৭ কার্যদিবসের মধ্যে সম্পন্ন হবে।",
    ],
  },
  {
    id: 6,
    icon: "🔒",
    title: "গোপনীয়তা ও তথ্য সুরক্ষা",
    content: [
      "আপনার ব্যক্তিগত তথ্য আমরা তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না।",
      "অর্ডার প্রসেস ও ডেলিভারির জন্য প্রয়োজনীয় তথ্য শুধুমাত্র সংশ্লিষ্ট পক্ষের সাথে শেয়ার করা হয়।",
      "আমাদের ওয়েবসাইট Cookies ব্যবহার করে — ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে।",
      "আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।",
    ],
  },
  {
    id: 7,
    icon: "⚖️",
    title: "বিরোধ নিষ্পত্তি",
    content: [
      "যেকোনো বিরোধ প্রথমে আলোচনার মাধ্যমে সমাধান করার চেষ্টা করা হবে।",
      "আলোচনায় সমাধান না হলে বাংলাদেশের প্রচলিত আইন অনুযায়ী ব্যবস্থা নেওয়া হবে।",
      "এই শর্তাবলী বাংলাদেশের আইন দ্বারা পরিচালিত।",
      "যেকোনো আইনি বিরোধের ক্ষেত্রে ঢাকার আদালত এখতিয়ারভুক্ত থাকবে।",
    ],
  },
  {
    id: 8,
    icon: "📵",
    title: "নিষিদ্ধ কার্যক্রম",
    content: [
      "আমাদের ওয়েবসাইট হ্যাক, স্প্যাম বা ক্ষতিকর কার্যক্রম সম্পূর্ণ নিষিদ্ধ।",
      "ভুয়া অ্যাকাউন্ট বা মিথ্যা তথ্য দিয়ে অর্ডার করা নিষেধ।",
      "আমাদের পণ্যের ছবি বা বিবরণ অনুমতি ছাড়া অন্য কোথাও ব্যবহার করা যাবে না।",
      "নিষিদ্ধ কার্যক্রমের ক্ষেত্রে অ্যাকাউন্ট বন্ধ ও আইনগত ব্যবস্থা নেওয়া হবে।",
    ],
  },
];

export default function TermsAndConditions() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="bg-stone-950 text-stone-100">

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
          ✦ RoyalcartX ✦
        </p>
        <h1 className="relative mb-4 text-5xl md:text-6xl font-bold leading-tight text-stone-100">
          শর্তাবলী
          <br />
          <span className="text-amber-400 italic">ও নিয়মনীতি</span>
        </h1>
        <p className="relative mx-auto mb-8 max-w-md text-base leading-relaxed text-stone-400">
          আমাদের সেবা ব্যবহারের আগে অনুগ্রহ করে এই শর্তাবলী মনোযোগ দিয়ে পড়ুন।
        </p>
        <div className="relative flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-600/50 px-5 py-2 text-sm text-amber-500">
            📅 সর্বশেষ আপডেট: মে ২০২৬
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-5 py-2 text-sm text-stone-400">
            ⏱️ পড়তে সময় লাগবে: ~৩ মিনিট
          </span>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">

        {/* Intro notice */}
        <div className="mb-10 rounded-2xl border border-amber-600/30 bg-amber-900/10 px-6 py-5">
          <p className="text-sm leading-relaxed text-amber-200/80">
            <span className="font-semibold text-amber-400">⚠️ গুরুত্বপূর্ণ:</span>{" "}
            আমাদের ওয়েবসাইট ব্যবহার করে কেনাকাটা করার মাধ্যমে আপনি স্বয়ংক্রিয়ভাবে
            নিচের সকল শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে।
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {sections.map((s) => (
            <div
              key={s.id}
              className={`overflow-hidden rounded-2xl border bg-stone-900 transition-colors duration-200 ${
                openSection === s.id
                  ? "border-amber-600/60"
                  : "border-stone-800"
              }`}
            >
              <button
                onClick={() =>
                  setOpenSection(openSection === s.id ? null : s.id)
                }
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-stone-800"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="flex-1 text-base font-semibold text-stone-100">
                  {s.title}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-700 text-xl font-light text-amber-500 transition-transform duration-300 ${
                    openSection === s.id ? "rotate-45 border-amber-500" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {openSection === s.id && (
                <div className="border-t border-stone-800 px-6 py-5">
                  <ul className="space-y-3">
                    {s.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <p className="text-sm leading-relaxed text-stone-400">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expand All hint */}
        <p className="mt-6 text-center text-xs text-stone-600">
          প্রতিটি বিভাগে ক্লিক করলে বিস্তারিত দেখতে পাবেন
        </p>

        {/* Agreement box */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900 px-8 py-8 text-center">
          <p className="text-2xl mb-3">🤝</p>
          <h2 className="mb-3 text-xl font-bold text-stone-100">
            আমাদের সাথে কেনাকাটা করুন নিশ্চিন্তে
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-stone-400">
            কোনো প্রশ্ন বা অসুবিধা হলে আমাদের সাথে যোগাযোগ করুন।
            <br />
            আমরা সবসময় আপনার পাশে আছি।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/880XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
            >
              📱 WhatsApp করুন
            </a>
            <a
              href="mailto:support@royalcartx.com"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors hover:border-amber-500 hover:text-amber-400"
            >
              ✉️ ইমেইল করুন
            </a>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-xs leading-relaxed text-stone-600">
          এই শর্তাবলী পরিবর্তনের অধিকার RoyalcartX কর্তৃপক্ষ সংরক্ষণ করে।
          <br />
          পরিবর্তন হলে ওয়েবসাইটে জানানো হবে।
        </p>

      </div>
    </div>
  );
}
