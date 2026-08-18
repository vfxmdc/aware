"use client";

import { useEffect, useState } from "react";
import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

const TIME_OFFSET_MS = 60 * 60 * 1000;
const getNow = () => new Date(Date.now() + TIME_OFFSET_MS);

const fmtOpts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
const fmtDZ = new Intl.DateTimeFormat("ar-DZ-u-nu-latn", { ...fmtOpts, timeZone: "Africa/Algiers" });
const fmtSA = new Intl.DateTimeFormat("ar-SA-u-nu-latn", { ...fmtOpts, timeZone: "Asia/Riyadh" });
const fmtHijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Riyadh",
});
const fmtGreg = new Intl.DateTimeFormat("ar-DZ-u-nu-latn", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Algiers",
});

function useClocks() {
    const [t, setT] = useState({ dz: "--:--:--", sa: "--:--:--", hijri: "...", greg: "..." });
    useEffect(() => {
        const tick = () => {
            const now = getNow();
            setT({
                dz: fmtDZ.format(now),
                sa: fmtSA.format(now),
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

const PRAYERS = [
    ["Fajr", "الفجر"],
    ["Dhuhr", "الظهر"],
    ["Asr", "العصر"],
    ["Maghrib", "المغرب"],
    ["Isha", "العشاء"],
];
const PRAYING_WINDOW = 25;

function usePrayerTimes() {
    const [times, setTimes] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=Saudi%20Arabia&method=4");
                const json = await res.json();
                setTimes(json?.data?.timings ?? null);
            } catch {}
        })();
    }, []);
    return times;
}

function prayerStatus(timings, timeZone) {
    if (!timings) return null;
    const [h, m] = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", hour12: false, timeZone,
    }).format(getNow()).split(":").map(Number);
    const nowMin = h * 60 + m;

    const list = PRAYERS.map(([key, ar]) => {
        const [ph, pm] = timings[key].split(":").map(Number);
        return { ar, min: ph * 60 + pm };
    });

    for (const p of list) {
        if (nowMin >= p.min && nowMin < p.min + PRAYING_WINDOW) return { praying: true, name: p.ar };
    }
    const next = list.find((p) => p.min > nowMin) ?? { ...list[0], min: list[0].min + 1440 };
    const diff = next.min - nowMin;
    const hh = Math.floor(diff / 60), mm = diff % 60;
    return { praying: false, name: next.ar, remaining: hh > 0 ? `${hh} س ${mm} د` : `${mm} د` };
}

const STAR =
    "M25 0 L9.7 4.02 L17.68 17.68 L4.02 9.7 L0 25 L-4.02 9.7 L-17.68 17.68 " +
    "L-9.7 4.02 L-25 0 L-9.7 -4.02 L-17.68 -17.68 L-4.02 -9.7 L0 -25 " +
    "L4.02 -9.7 L17.68 -17.68 L9.7 -4.02 Z";

function IslamicPattern({ id, className, animate = false }) {
    return (
        <svg className={`${className} ${animate ? "animate-pattern-drift" : ""}`} aria-hidden="true">
            <defs>
                <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
                    {[[0, 0], [80, 0], [0, 80], [80, 80], [40, 40]].map(([x, y], i) => (
                        <g key={i} transform={`translate(${x} ${y})`}>
                            <path d={STAR} fill="currentColor" fillOpacity=".22" stroke="currentColor" strokeWidth="1.2" />
                            <path d={STAR} transform="scale(.55)" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle r="3" fill="currentColor" />
                        </g>
                    ))}
                    {[[40, 0], [0, 40], [80, 40], [40, 80]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" fillOpacity=".8" />
                    ))}
                </pattern>
            </defs>
            <rect width="200%" height="200%" fill={`url(#${id})`} />
        </svg>
    );
}

export default function Navbar() {
    const { dz, sa, hijri, greg } = useClocks();
    const prayerTimes = usePrayerTimes();
    const [menuOpen, setMenuOpen] = useState(false);
    const saPrayer = prayerStatus(prayerTimes, "Asia/Riyadh");

    const navLinks = [
        { label: "الرئيسية", href: "/" },
        { label: "باقات الحج", href: "/#hajj" },
        { label: "باقات العمرة", href: "/umrah" },
        { label: "التأشيرات", href: "/#visas" },
        { label: "اتصل بنا", href: "/#contact" },
    ];

    return (
        <header dir="rtl" className={`${amiri.variable} ${tajawal.variable} font-[family-name:var(--font-tajawal)] text-[#5C4732]`}>
            {/* ── الشريط العلوي ── */}
            <div className="relative overflow-hidden bg-[#5C4732] text-[#FAF6F0]">
                <IslamicPattern id="pat-nav-top" className="absolute inset-0 h-full w-full text-[#C9A876]/30" animate />
                <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-1 px-4 py-2 text-sm tracking-wide">
                    <div className="flex items-center gap-2">
                        <span>🇩🇿</span>
                        <span className="font-medium text-[#C9A876]">الجزائر</span>
                        <span className="font-bold tabular-nums" dir="ltr">{dz}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-[#C9A876]">
                        <span className="animate-pulse">☪</span>
                        <span suppressHydrationWarning>{hijri}</span>
                        <span className="text-[#FAF6F0]/40">|</span>
                        <span suppressHydrationWarning className="text-[#FAF6F0]/90">{greg}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>🇸🇦</span>
                        <span className="font-medium text-[#C9A876]">السعودية</span>
                        <span className="font-bold tabular-nums" dir="ltr">{sa}</span>
                    </div>
                    {saPrayer && (
                        saPrayer.praying ? (
                            <div className="flex items-center gap-1.5 rounded-full bg-[#C9A876] px-3 py-0.5 text-xs font-bold text-[#5C4732] animate-pulse">
                                🕌 يُصلّى الآن في مكة: صلاة {saPrayer.name}
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-xs">
                                <span className="text-[#C9A876]">🕌 الصلاة القادمة في مكة:</span>
                                <span className="font-bold">{saPrayer.name}</span>
                                <span className="text-[#FAF6F0]/70">بعد {saPrayer.remaining}</span>
                            </div>
                        )
                    )}
                </div>
                <div className="relative h-1 bg-gradient-to-l from-transparent via-[#C9A876] to-transparent" />
            </div>

            {/* ── شريط التنقل ── */}
            <nav className="sticky top-0 z-50 border-b border-[#F1E8DC] bg-[#FAF6F0]/95 backdrop-blur">
                <div className="flex items-center justify-between px-[6%] py-4">
                    <div className="hidden items-center gap-3 lg:flex">
                        <a href="/umrah" className="rounded-full bg-[#8B6F52] px-6 py-2.5 text-sm font-bold text-[#FAF6F0] transition-all duration-150 hover:scale-105 hover:bg-[#5C4732]">
                            احجز الآن
                        </a>
                        <a href="/#contact" className="rounded-full border-[1.5px] border-[#A98B6F] px-6 py-2.5 text-sm font-bold transition-all duration-150 hover:scale-105 hover:bg-[#A98B6F] hover:text-[#FAF6F0]">
                            اتصل بنا
                        </a>
                    </div>

                    <ul className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="group relative pb-1 text-sm font-medium text-[#8B6F52] transition-colors duration-150 hover:text-[#5C4732]">
                                    {link.label}
                                    <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-[#C9A876] transition-all duration-150 group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="/"
                        dir="ltr"
                        className="group relative overflow-hidden rounded-2xl bg-black px-5 py-2 font-[family-name:var(--font-amiri)] text-4xl font-bold transition-all duration-150 hover:scale-105 hover:shadow-lg hover:shadow-black/30"
                    >
                        <span className="inline-block text-white transition-colors duration-150 group-hover:text-[#A98B6F]">Mel</span>
                        <span className="inline-block text-[#A98B6F] transition-all duration-150 group-hover:-translate-y-1 group-hover:text-white">Go</span>
                    </a>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 lg:hidden" aria-label="القائمة">
                        <span className={`h-0.5 w-6 bg-[#5C4732] transition-all duration-150 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                        <span className={`h-0.5 w-6 bg-[#5C4732] transition-all duration-150 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`h-0.5 w-6 bg-[#5C4732] transition-all duration-150 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>
                </div>

                <div className={`grid overflow-hidden transition-all duration-200 lg:hidden ${menuOpen ? "grid-rows-[1fr] border-t border-[#F1E8DC]" : "grid-rows-[0fr]"}`}>
                    <ul className="min-h-0 space-y-1 overflow-hidden px-[6%]">
                        {navLinks.map((link, i) => (
                            <li key={link.label} className={`transition-all duration-150 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`} style={{ transitionDelay: `${i * 40}ms` }}>
                                <a href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 font-medium text-[#8B6F52] hover:text-[#5C4732]">{link.label}</a>
                            </li>
                        ))}
                        <li className="flex gap-3 py-4">
                            <a href="/umrah" onClick={() => setMenuOpen(false)} className="flex-1 rounded-full bg-[#8B6F52] px-5 py-2.5 text-center text-sm font-bold text-[#FAF6F0]">احجز الآن</a>
                            <a href="/#contact" onClick={() => setMenuOpen(false)} className="flex-1 rounded-full border border-[#A98B6F] px-5 py-2.5 text-center text-sm font-bold">اتصل بنا</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
