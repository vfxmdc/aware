"use client";

import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

function KnowledgePattern({ id, className }) {
    return (
        <svg className={className} aria-hidden="true">
            <defs>
                <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
                    <g transform="translate(40 40) opacity-20">
                        <circle r="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        <path d="M-30 0 L30 0 M0 -30 L0 30" stroke="currentColor" strokeWidth="0.5" />
                        <circle r="2" fill="currentColor" />
                    </g>
                </pattern>
            </defs>
            <rect width="200%" height="200%" fill={`url(#${id})`} />
        </svg>
    );
}

const goals = [
    {
        title: "الهدف العلمي",
        description: "المساهمة في توعية الطالب الجامعي وتكوينه في تخصصه الأساسي، مع تشجيعه على الاطلاع على مختلف التخصصات والمجالات العلمية.",
        icon: "🔬",
    },
    {
        title: "الهدف الثقافي",
        description: "إثراء الرصيد المعرفي للطلبة، وتشجيعهم على القراءة واكتساب المعارف، إلى جانب اكتشاف المواهب والطاقات الطلابية وتنميتها.",
        icon: "📚",
    },
    {
        title: "الهدف الأكاديمي",
        description: "توفير فرص للتواصل والاحتكاك بالأساتذة والطلبة من مختلف التخصصات، بما يسهم في تبادل الخبرات والأفكار.",
        icon: "🎓",
    },
    {
        title: "تنشيط الوسط الجامعي",
        description: "المساهمة في إحياء الحياة الجامعية من خلال تنظيم مختلف النشاطات العلمية والثقافية والقانونية.",
        icon: "🏛️",
    },
    {
        title: "نشر الوعي المستديم",
        description: "ترسيخ ثقافة الوعي القانوني والمعرفي لدى الطلبة، وتشجيعهم على المشاركة الإيجابية في محيطهم الجامعي والمجتمعي.",
        icon: "⚖️",
    },
];

export default function WhyChooseUs() {
    return (
        <section
            id="goals"
            dir="rtl"
            className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden bg-[var(--surface)] py-24 font-[family-name:var(--font-arabic)] text-[var(--label)] border-t border-[var(--accent)]/15`}
        >
            <KnowledgePattern id="pat-goals" className="absolute inset-0 h-full w-full animate-pattern-drift text-[var(--accent)]/10 pointer-events-none" />

            <div className="relative mb-16 px-[6%] text-center max-w-3xl mx-auto">
                <span className="mb-4 inline-block rounded-full glass border border-[var(--accent)]/30 px-5 py-1.5 text-xs font-bold tracking-widest text-[var(--accent)]">
                    ✦ ثالثًا: أهداف نادي الوعي القانوني
                </span>
                <h2 className="font-[family-name:var(--font-arabic)] text-4xl md:text-5xl font-extrabold text-[var(--label)]">
                    رؤيتنا ورسالتنا السامية
                </h2>
                <p className="mt-4 font-normal text-[var(--label)]/70 text-base leading-relaxed">
                    يسعى النادي إلى تحقيق مجموعة متكاملة من الأهداف نحو فضاء جامعي واعٍ ومبدع
                </p>
            </div>

            <div className="relative grid gap-6 px-[6%] sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {goals.map((g, i) => (
                    <div
                        key={i}
                        className="group flex flex-col gap-4 rounded-[22px] border border-[var(--accent)]/30 glass p-8  backdrop-blur-sm transition-all duration-200 hover:-translate-y-2 hover:border-[var(--accent)] hover:bg-[var(--surface)] hover:"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--input)] text-2xl border border-[var(--accent)]/30 transition-transform duration-200 group-hover:scale-110 group-hover:border-[var(--accent)]">
                            {g.icon}
                        </div>
                        <h3 className="font-[family-name:var(--font-arabic)] text-2xl font-bold text-[var(--accent)]">{g.title}</h3>
                        <p className="text-sm font-normal leading-relaxed text-[var(--label)]/85">{g.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
