import { useState } from "react";

const policies = [
  {
    icon: "🔄",
    label: "Replacement",
    title: "যেকোনো সমস্যায় Replace",
    desc: "রং না মিললে, কাপড়ে দোষ বা ছেঁড়া থাকলে — কোনো প্রশ্ন ছাড়াই নতুন শাড়ি পাঠিয়ে দেওয়া হবে।",
  },
  {
    icon: "⏱️",
    label: "দ্রুত সেবা",
    title: "৭২ ঘণ্টার মধ্যে",
    desc: "পণ্য পাওয়ার ৭২ ঘণ্টার মধ্যে জানালেই Replacement প্রক্রিয়া শুরু হয়ে যাবে।",
  },
  {
    icon: "🚚",
    label: "বিনামূল্যে",
    title: "Shipping ফ্রি",
    desc: "পুরনো শাড়ি ফেরত পাঠানোর খরচ আমরাই বহন করব — আপনার কোনো খরচ নেই।",
  },
  {
    icon: "❤️",
    label: "সবার জন্য",
    title: "সকল পণ্যে প্রযোজ্য",
    desc: "Sale বা discount পণ্যেও একই নীতি। কোনো ব্যতিক্রম নেই।",
  },
];

const steps = [
  {
    num: "১",
    step: "প্রথম ধাপ",
    text: "WhatsApp বা Facebook Inbox-এ শাড়ির সমস্যার ছবি বা ভিডিও পাঠান।",
  },
  {
    num: "২",
    step: "দ্বিতীয় ধাপ",
    text: "আমাদের টিম ২৪ ঘণ্টার মধ্যে যাচাই করে Replacement confirm করবে।",
  },
  {
    num: "৩",
    step: "তৃতীয় ধাপ",
    text: "পুরনো শাড়ি Pickup করে নতুন শাড়ি ডেলিভারি দেওয়া হবে।",
  },
];

const conditions = [
  { icon: "📸", text: "সমস্যার ছবি বা ভিডিও পাঠাতে হবে" },
  { icon: "⏰", text: "৭২ ঘণ্টার মধ্যে জানাতে হবে" },
  { icon: "🏷️", text: "ট্যাগ ও মোড়ক অক্ষত রাখতে হবে" },
  { icon: "🚫", text: "ব্যবহার করা শাড়ি প্রযোজ্য নয়" },
  { icon: "📦", text: "অরিজিনাল প্যাকেজিংয়ে ফেরত দিন" },
  { icon: "✅", text: "সকল পণ্যে একই নীতি" },
];

const faqs = [
  {
    q: "কতদিনের মধ্যে জানাতে হবে?",
    a: "পণ্য পাওয়ার ৭২ ঘণ্টার মধ্যে সমস্যা জানান। এরপর রিপোর্ট করলে replacement সম্ভব নাও হতে পারে।",
  },
  {
    q: "ব্যবহার করা শাড়ি কি replace হবে?",
    a: "না। শাড়ি অবশ্যই unwashed ও অব্যবহৃত অবস্থায় ফেরত দিতে হবে।",
  },
  {
    q: "রিফান্ড কি পাওয়া যাবে?",
    a: "আমরা replacement দিই। বিশেষ পরিস্থিতিতে store credit দেওয়া হয়। সরাসরি টাকা ফেরত সাধারণত প্রযোজ্য নয়।",
  },
  {
    q: "Sale বা discount পণ্যে কি প্রযোজ্য?",
    a: "হ্যাঁ! সকল পণ্যে একই নীতি প্রযোজ্য — sale, discount বা full-price যাই হোক।",
  },
];

export default function RefundPolicy() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-stone-950 via-amber-950 to-stone-950 px-6 py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#d97706 0,#d97706 1px,transparent 1px,transparent 14px)",
          }}
        />
        <p className="relative mb-4 text-xs tracking-[0.4em] text-amber-500 uppercase">
          ✦ Refund &amp; Replacement Policy ✦
        </p>
        <h1 className="relative mb-4 text-5xl md:text-6xl font-bold leading-tight text-stone-100">
          ডিমাগ কাটা?
          <br />
          <span className="text-amber-400 italic">সমস্যা হলেই</span>
          <br />
          Replace!
        </h1>
        <p className="relative mx-auto mb-8 max-w-md text-base leading-relaxed text-stone-400">
          আমাদের প্রতিটি শাড়িতে আমরা গর্বিত।
          <br />
          তবু কোনো সমস্যা হলে — আমরা দায়িত্ব নিই।
        </p>
        <span className="relative inline-flex items-center gap-2 rounded-full border border-amber-600/50 px-6 py-2 text-sm text-amber-500">
          🏅 ১০০% প্রতিশ্রুতি গ্যারান্টি
        </span>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-16">

        {/* ── Policy Cards ── */}
        <section>
          <p className="mb-1 text-[11px] tracking-[0.35em] text-stone-500 uppercase">
            আমাদের প্রতিশ্রুতি
          </p>
          <h2 className="mb-8 text-2xl font-semibold text-stone-100">
            কী কী সুবিধা পাবেন?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {policies.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6 transition-all duration-200 hover:border-amber-600/60 hover:bg-stone-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-900/40 text-2xl">
                  {p.icon}
                </div>
                <p className="mb-1 text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                  {p.label}
                </p>
                <h3 className="mb-3 text-base font-semibold leading-snug text-stone-100">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Steps ── */}
        <section>
          <p className="mb-1 text-[11px] tracking-[0.35em] text-stone-500 uppercase">
            প্রক্রিয়া
          </p>
          <h2 className="mb-8 text-2xl font-semibold text-stone-100">
            কীভাবে করবেন?
          </h2>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-stone-950">
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="my-1 w-0.5 flex-1 bg-amber-600/25 min-h-[40px]" />
                  )}
                </div>
                <div className={`${i < steps.length - 1 ? "pb-8" : ""}`}>
                  <p className="mb-1 text-xs text-stone-500">{s.step}</p>
                  <p className="text-base leading-relaxed text-stone-200">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Conditions ── */}
        <section>
          <p className="mb-1 text-[11px] tracking-[0.35em] text-stone-500 uppercase">
            শর্তাবলী
          </p>
          <h2 className="mb-8 text-2xl font-semibold text-stone-100">
            মনে রাখবেন
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-stone-800 bg-stone-900 px-5 py-4"
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-sm leading-snug text-stone-300">{c.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <p className="mb-1 text-[11px] tracking-[0.35em] text-stone-500 uppercase">
            সাধারণ প্রশ্ন
          </p>
          <h2 className="mb-8 text-2xl font-semibold text-stone-100">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl border bg-stone-900 transition-colors duration-200 ${
                  openFaq === i ? "border-amber-600/60" : "border-stone-800"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-stone-800"
                >
                  <span className="text-base font-medium text-stone-100">{f.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-700 text-lg font-light text-amber-500 transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-stone-800 px-6 py-4">
                    <p className="text-sm leading-relaxed text-stone-400">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 px-8 py-14 text-center mb-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#d97706 0,#d97706 1px,transparent 1px,transparent 14px)",
            }}
          />
          <h2 className="relative mb-3 text-3xl font-bold text-stone-100">
            সমস্যা হয়েছে?
          </h2>
          <p className="relative mb-8 text-stone-400">
            এখনই আমাদের সাথে যোগাযোগ করুন — আমরা সাথে আছি।
          </p>
          <div className="relative flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="https://wa.me/880XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors duration-150 hover:bg-amber-400"
            >
              📱 WhatsApp করুন
            </a>
            <a
              href="mailto:support@yourstore.com"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-600 px-6 py-3 text-sm font-medium text-stone-200 transition-colors duration-150 hover:border-amber-500 hover:text-amber-400"
            >
              ✉️ ইমেইল করুন
            </a>
          </div>
          <p className="relative text-xs tracking-widest text-amber-700">
            ✦ আমাদের প্রতিশ্রুতি — আপনার হাসি ✦
          </p>
        </section>

      </div>
    </div>
  );
}
