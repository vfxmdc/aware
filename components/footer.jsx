"use client";

import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

const SOCIAL = [
    {
        href: "https://www.instagram.com/awareness___club?igsh=MWMxcDVzeHp1dDhkdg==",
        label: "Instagram",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    {
        href: "https://www.tiktok.com/@awarenessclub25?_r=1&_t=ZS-98xXpRAXhGH",
        label: "TikTok",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
            </svg>
        ),
    },
    {
        href: "https://www.facebook.com/share/1BSjrhNXYN/",
        label: "Facebook",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer
            dir="rtl"
            className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden glass border-t border-[var(--accent)]/20 py-12 font-[family-name:var(--font-arabic)] text-[var(--label)]`}
        >
            {/* Top gold divider line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-[var(--accent)] to-transparent" />

            <div className="relative px-[6%] max-w-6xl mx-auto grid gap-10 md:grid-cols-3 items-start">
                {/* الشعار والنص */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent)] text-[var(--on-accent)] font-bold text-xl ">
                            ⚖️
                        </div>
                        <span className="font-[family-name:var(--font-arabic)] text-2xl font-bold text-[var(--label)]">
                            نادي الوعي القانوني
                        </span>
                    </div>
                    <p className="text-xs text-[var(--label)]/60 leading-relaxed max-w-sm">
                        فكرةٌ، أهدافٌ، وهيكلٌ تنظيمي نحو فضاء جامعي واعٍ. كلية الحقوق والعلوم السياسية - جامعة باتنة 1.
                    </p>
                    {/* Social Icons */}
                    <div className="flex items-center gap-3 pt-1">
                        {SOCIAL.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-[var(--on-accent)] hover:scale-110"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* روابط سريعة */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold text-[var(--accent)]/80">
                    <a href="/" className="hover:text-[var(--accent)] transition-colors">الرئيسية</a>
                    <a href="#about" className="hover:text-[var(--accent)] transition-colors">عن النادي</a>
                    <a href="#goals" className="hover:text-[var(--accent)] transition-colors">الأهداف</a>
                    <a href="/join" className="hover:text-[var(--accent)] transition-colors">الانضمام والنظام الداخلي</a>
                    <a href="/blogs" className="hover:text-[var(--accent)] transition-colors">المجلة الرقمية</a>
                    <a href="/activities" className="hover:text-[var(--accent)] transition-colors">النشاطات القادمة</a>
                </div>

                {/* حقوق النشر والآية */}
                <div className="text-center md:text-left space-y-2">
                    <p className="font-[family-name:var(--font-arabic)] text-base text-[var(--accent)] font-extrabold">
                        ﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴾
                    </p>
                    <p className="text-[11px] text-[var(--label)]/40 font-medium">
                        جميع الحقوق محفوظة © {new Date().getFullYear()} نادي الوعي القانوني - باتنة 1
                    </p>
                    <div className="flex justify-center md:justify-start gap-2 pt-1">
                        {SOCIAL.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="text-[10px] text-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors font-semibold"
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
        </footer>
    );
}
