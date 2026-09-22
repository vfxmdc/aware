"use client";

import { useEffect, useRef, useState } from "react";
import { Amiri, Tajawal } from "next/font/google";
import Navbar from "@/components/Navbar";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

/* ── أيقونة مصباح المعرفة (Lamp of Knowledge) ── */
function LampIcon({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 8C33.1 8 34 8.9 34 10V14C34 15.1 33.1 16 32 16C30.9 16 30 15.1 30 14V10C30 8.9 30.9 8 32 8Z" fill="currentColor" opacity="0.9" />
            <path d="M48 18C47.2 18 46.5 18.5 46.2 19.2C44.1 24.3 38.6 28 32 28C25.4 28 19.9 24.3 17.8 19.2C17.5 18.5 16.8 18 16 18C15 18 14.2 18.8 14.4 19.8C16.9 26.5 23.8 31.5 32 31.5C40.2 31.5 47.1 26.5 49.6 19.8C49.8 18.8 49 18 48 18Z" fill="currentColor" />
            <path d="M12 42C12 36.5 21 34 32 34C43 34 52 36.5 52 42C52 45 44 47 32 47C20 47 12 45 12 42Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 45.5L23 54C23.5 55.5 25 56.5 26.5 56.5H37.5C39 56.5 40.5 55.5 41 54L44 45.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 56.5H42V59.5C42 61 40.5 62 39 62H25C23.5 62 22 61 22 59.5V56.5Z" fill="currentColor" />
            <circle cx="32" cy="20" r="4" fill="#D4AF37" className="animate-pulse" />
        </svg>
    );
}

/* ── أيقونة ميزان العدالة (Justice Scales) ── */
function ScalesIcon({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 10V54" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M16 18H48" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M32 10L32 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="6" r="3" fill="currentColor" />
            <path d="M16 18L9 34H23L16 18Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M8 34C8 38.4 11.6 42 16 42C20.4 42 24 38.4 24 34H8Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" />
            <path d="M48 18L41 34H55L48 18Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M40 34C40 38.4 43.6 42 48 42C52.4 42 56 38.4 56 34H40Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" />
            <path d="M20 54H44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
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

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const reveal = (delay) =>
        `transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`
        + ` [transition-delay:${delay}ms]`;

    const SOCIAL = [
        { href: "https://www.instagram.com/awareness___club?igsh=MWMxcDVzeHp1dDhkdg==", label: "Instagram", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>) },
        { href: "https://www.tiktok.com/@awarenessclub25?_r=1&_t=ZS-98xXpRAXhGH", label: "TikTok", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>) },
        { href: "https://www.facebook.com/share/1BSjrhNXYN/", label: "Facebook", icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>) },
    ];

    return (
        <div id="hero" dir="rtl" className={`${amiri.variable} ${tajawal.variable} bg-[#0A1128] font-[family-name:var(--font-tajawal)] text-[#F4F6FC]`}>
            <Navbar />

            {/* ── قسم واجهة البطل الرئيسية (Hero Section) ── */}
            <section className="relative overflow-hidden py-16 lg:py-24">
                <KnowledgePattern
                    id="pat-hero"
                    className="absolute inset-0 h-full w-full text-[#D4AF37]/10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,transparent_10%,black_80%)]"
                />

                <div className="relative grid items-center gap-12 px-[6%] lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <div className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#001F3F] px-4 py-2 text-xs font-bold text-[#D4AF37] shadow-sm ${reveal(0)}`}>
                            <LampIcon className="w-5 h-5 text-[#D4AF37]" />
                            <span>فكرةٌ، أهدافٌ، وهيكلٌ تنظيمي نحو فضاء جامعي واعٍ</span>
                        </div>

                        <h1 className={`mb-6 font-[family-name:var(--font-amiri)] text-4xl font-extrabold leading-snug text-[#F4F6FC] md:text-6xl md:leading-tight ${reveal(150)}`}>
                            نادي الوعي القانوني{" "}
                            <span className="relative block text-[#D4AF37] mt-2">
                                «من أجل وعيٍ مستديم»
                                <svg className="absolute -bottom-3 right-0 w-full text-[#D4AF37]" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                                    <path d="M0 8 Q50 0 100 7 T200 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className={`mb-8 max-w-xl font-light leading-relaxed text-[#F4F6FC]/80 text-base md:text-lg ${reveal(300)}`}>
                            نادٍ جامعي يمزج بين الطابع العلمي والثقافي والقانوني بكلية الحقوق والعلوم السياسية بجامعة باتنة 1. يسعى لبناء طالب واعٍ ومؤثر يرافق وعيه مجتمعه أينما حل.
                        </p>

                        {/* اقتباس الملهم */}
                        <div className={`mb-9 rounded-2xl border border-[#D4AF37]/30 bg-[#001F3F] p-5 shadow-sm ${reveal(400)}`}>
                            <p className="font-[family-name:var(--font-amiri)] text-lg text-[#D4AF37] font-semibold">
                                "المؤمن كالغيث أينما حلّ نفع..."
                            </p>
                            <span className="text-xs text-[#F4F6FC]/70 mt-1 block">رؤيتنا الأساسية: الوعي المتحصل عليه يرافق الطالب خارج أسوار الجامعة</span>
                        </div>

                        <div className={`flex flex-wrap gap-4 ${reveal(500)}`}>
                            <a href="/join" className="group relative overflow-hidden rounded-full bg-[#D4AF37] px-8 py-4 font-bold text-[#0A1128] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-[#F4C430]">
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>انضم إلى النادي</span>
                                    <span>←</span>
                                </span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                            </a>
                            <a href="#about" className="rounded-full border-2 border-[#D4AF37]/40 px-8 py-4 font-bold text-[#F4F6FC] transition-all duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#001F3F]">
                                تعرّف على نشأة النادي
                            </a>
                        </div>
                    </div>

                    {/* البطاقة التفاعلية البارزة */}
                    <div
                        ref={cardRef}
                        className={`relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#001F3F] via-[#0A1128] to-[#001530] p-8 text-center shadow-2xl transition-transform duration-200 ease-out will-change-transform lg:min-h-[460px] ${reveal(300)}`}
                    >
                        <KnowledgePattern id="pat-card" className="absolute inset-0 h-full w-full text-[#D4AF37]/20" animate />

                        {/* أيقونات شرفية في الأعلي */}
                        <div className="relative mb-6 flex items-center justify-center gap-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#001F3F] text-[#D4AF37] shadow-md">
                                <LampIcon className="w-10 h-10" />
                            </div>
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#001F3F] text-[#D4AF37] shadow-md">
                                <ScalesIcon className="w-10 h-10" />
                            </div>
                        </div>

                        <h3 className="relative mb-2 font-[family-name:var(--font-amiri)] text-3xl font-extrabold text-[#D4AF37]">
                            نادي الوعي القانوني
                        </h3>
                        <p className="relative max-w-xs text-xs text-[#F4F6FC]/70 leading-relaxed font-medium">
                            جامعة باتنة 1 · كلية الحقوق والعلوم السياسية
                        </p>

                        <div className="relative mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
                            <div className="rounded-xl border border-[#D4AF37]/20 bg-[#001F3F] p-3 text-center shadow-sm">
                                <span className="block text-xl font-bold text-[#D4AF37]">20+</span>
                                <span className="text-[11px] text-[#F4F6FC]/70 font-medium">عضو مؤسس ومنخرط</span>
                            </div>
                            <div className="rounded-xl border border-[#D4AF37]/20 bg-[#001F3F] p-3 text-center shadow-sm">
                                <span className="block text-xl font-bold text-[#D4AF37]">3</span>
                                <span className="text-[11px] text-[#F4F6FC]/70 font-medium">لجان دائمة مخصصة</span>
                            </div>
                        </div>

                        {/* Social links in card */}
                        <div className="relative mt-5 flex items-center gap-3">
                            {SOCIAL.map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0A1128]" aria-label={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
