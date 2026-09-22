"use client";

import { useEffect, useState } from "react";
import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

/* ── تصحيح الوقت ──── */
const TIME_OFFSET_MS = 60 * 60 * 1000;
const getNow = () => new Date(Date.now() + TIME_OFFSET_MS);

/* ── الساعات الحية ─────────────────────────────────────── */
const fmtOpts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
const fmtDZ = new Intl.DateTimeFormat("ar-DZ-u-nu-latn", { ...fmtOpts, timeZone: "Africa/Algiers" });
const fmtHijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Algiers",
});
const fmtGreg = new Intl.DateTimeFormat("ar-DZ-u-nu-latn", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Algiers",
});

function useClocks() {
    const [t, setT] = useState({ dz: "--:--:--", hijri: "...", greg: "..." });
    useEffect(() => {
        const tick = () => {
            const now = getNow();
            setT({
                dz: fmtDZ.format(now),
                hijri: fmtHijri.format(now),
                greg: fmtGreg.format(now),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return t;
}

function KnowledgePattern({ id, className, animate = false }) {
    return (
        <svg className={`${className} ${animate ? "animate-pattern-drift" : ""}`} aria-hidden="true">
            <defs>
                <pattern id={id} width="100" height="100" patternUnits="userSpaceOnUse">
                    <g transform="translate(50 50) opacity-30">
                        <circle r="40" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        <circle r="25" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                        <path d="M-40 0 L40 0 M0 -40 L0 40" stroke="currentColor" strokeWidth="0.5" />
                        <circle r="3" fill="currentColor" />
                    </g>
                </pattern>
            </defs>
            <rect width="200%" height="200%" fill={`url(#${id})`} />
        </svg>
    );
}

export default function Navbar() {
    const { dz, hijri, greg } = useClocks();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: "الرئيسية", href: "/" },
        { label: "الانضمام للنادي", href: "/join" },
        { label: "المجلة والرأي", href: "/blogs" },
        { label: "النشاطات القادمة", href: "/activities" },
    ];

    const SOCIAL = [
        { href: "https://www.instagram.com/awareness___club?igsh=MWMxcDVzeHp1dDhkdg==", label: "Instagram", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>) },
        { href: "https://www.tiktok.com/@awarenessclub25?_r=1&_t=ZS-98xXpRAXhGH", label: "TikTok", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" /></svg>) },
        { href: "https://www.facebook.com/share/1BSjrhNXYN/", label: "Facebook", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>) },
    ];

    return (
        <header dir="rtl" className={`${amiri.variable} ${tajawal.variable} font-[family-name:var(--font-tajawal)] text-[#F4F6FC]`}>
            <style>{`
        @keyframes pattern-drift { from { transform: translate(0,0); } to { transform: translate(-100px,-100px); } }
        .animate-pattern-drift { animation: pattern-drift 70s linear infinite; will-change: transform; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,.3); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
      `}</style>

            {/* ── الشريط العلوي ── */}
            <div className="relative overflow-hidden bg-[#001F3F] text-[#F4F6FC] border-b border-[#D4AF37]/20">
                <KnowledgePattern id="pat-top-nav" className="absolute inset-0 h-full w-full text-[#D4AF37]/15" animate />
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-y-2 px-4 md:px-6 py-2.5 text-xs md:text-sm tracking-wide">
                    {/* التوقيت والتاريخ - اليمين */}
                    <div className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-center">
                        <div className="flex items-center gap-1.5">
                            <span>🇩🇿</span>
                            <span className="font-medium text-[#D4AF37]">الجزائر</span>
                            <span className="font-bold tabular-nums text-[#F4F6FC]" dir="ltr">{dz}</span>
                        </div>
                        <span className="text-[#D4AF37]/40">|</span>
                        <div className="flex items-center gap-1.5 font-medium text-[#D4AF37]">
                            <span className="animate-pulse">📜</span>
                            <span suppressHydrationWarning>{hijri}</span>
                            <span className="hidden sm:inline text-[#F4F6FC]/40">|</span>
                            <span suppressHydrationWarning className="hidden sm:inline text-[#F4F6FC]/70">{greg}</span>
                        </div>
                    </div>

                    {/* الآية القرآنية في المنتصف */}
                    <div className="w-full md:w-auto text-center font-[family-name:var(--font-amiri)] text-base md:text-xl font-extrabold text-[#D4AF37] drop-shadow-sm">
                        ﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴾
                    </div>

                    {/* الكلية + شبكات التواصل - اليسار */}
                    <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-3 text-xs font-semibold text-[#D4AF37]">
                        <span className="hidden md:inline">⚖️ كلية الحقوق - باتنة 1</span>
                        {SOCIAL.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center w-7 h-7 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0A1128]" aria-label={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="relative h-0.5 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
            </div>

            {/* ── شريط التنقل الرئيسي ── */}
            <nav className="sticky top-0 z-50 border-b border-[#D4AF37]/30 bg-[#0A1128]/95 backdrop-blur-md shadow-lg shadow-black/40">
                <div className="flex items-center justify-between px-[6%] py-4">
                    {/* زر الانضمام السريع (يمين) */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <a href="/join" className="rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-bold text-[#0A1128] transition-all duration-200 hover:scale-105 hover:bg-[#F4C430] [animation:glow_3s_ease-in-out_infinite]">
                            انضم للنادي الآن ⚖️
                        </a>
                    </div>

                    {/* الروابط في الوسط */}
                    <ul className="hidden items-center gap-6 lg:flex">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="group relative pb-1 text-sm font-semibold text-[#F4F6FC] transition-colors duration-150 hover:text-[#D4AF37]">
                                    {link.label}
                                    <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* الشعار (يسار) */}
                    <a
                        href="/"
                        className="group flex items-center gap-3 rounded-2xl bg-[#001F3F] px-4 py-2 border border-[#D4AF37]/30 transition-all duration-200 hover:border-[#D4AF37]"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#D4AF37] text-[#0A1128] font-extrabold text-xl shadow-md">
                            ⚖️
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="font-[family-name:var(--font-amiri)] text-xl font-bold text-[#F4F6FC] leading-none">نادي الوعي القانوني</span>
                            <span className="text-[10px] text-[#D4AF37] font-semibold mt-1">جامعة باتنة 1</span>
                        </div>
                    </a>

                    {/* زر القائمة للجوال */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 lg:hidden" aria-label="القائمة">
                        <span className={`h-0.5 w-6 bg-[#D4AF37] transition-all duration-150 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                        <span className={`h-0.5 w-6 bg-[#D4AF37] transition-all duration-150 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`h-0.5 w-6 bg-[#D4AF37] transition-all duration-150 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>
                </div>

                {/* قائمة الجوال المنسدلة */}
                <div className={`grid overflow-hidden transition-all duration-200 lg:hidden ${menuOpen ? "grid-rows-[1fr] border-t border-[#D4AF37]/20" : "grid-rows-[0fr]"}`}>
                    <ul className="min-h-0 space-y-1 overflow-hidden px-[6%] py-2 bg-[#001F3F]">
                        {navLinks.map((link, i) => (
                            <li key={link.label} className={`transition-all duration-150 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`} style={{ transitionDelay: `${i * 40}ms` }}>
                                <a href={link.href} onClick={() => setMenuOpen(false)} className="block py-2.5 font-semibold text-[#F4F6FC] hover:text-[#D4AF37]">{link.label}</a>
                            </li>
                        ))}
                        <li className="py-2 flex gap-3">
                            {SOCIAL.map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0A1128]" aria-label={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </li>
                        <li className="py-3">
                            <a href="/join" onClick={() => setMenuOpen(false)} className="block rounded-full bg-[#D4AF37] px-5 py-2.5 text-center text-sm font-bold text-[#0A1128]">انضم للنادي الآن ⚖️</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
