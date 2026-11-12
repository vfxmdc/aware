"use client";

import { useState } from "react";
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

const UPCOMING_ACTIVITIES = [
    { id: 1, title: "افتتاح للدخول الجامعي", category: "افتتاحية وحفلات", icon: "🎓", desc: "استقبال الطلبة الجدد وتدشين برنامج النادي للسنة الجامعية." },
    { id: 2, title: "مسابقة للشطرنج", category: "رياضة وفكر", icon: "♟️", desc: "بطولة فكرية تنافسية لتعزيز الذكاء والتركيز بين الطلبة." },
    { id: 3, title: "رحلة لمعرض الكتاب", category: "ثقافة وقراءة", icon: "📚", desc: "زيارة ميدانية لمعرض الكتاب الدولي واقتناء أمهات المصادر." },
    { id: 4, title: "مسابقة ثقافية بين الجامعات", category: "تنافس جامعي", icon: "🏆", desc: "منافسات فكرية وثقافية تجمع بين فرق كليات الحقوق." },
    { id: 5, title: "محاكمة افتراضية", category: "تدريب قانوني", icon: "⚖️", desc: "تطبيق عملي لإجراءات الجلسات والمرافعات القضائية." },
    { id: 6, title: "قراءة كتاب كل أسبوع", category: "مطالعة ونقد", icon: "📖", desc: "جلسة أسبوعية لمناقشة أهم كتب الفكر والقانون والتنمية." },
    { id: 7, title: "نشاط مع دار العجزة", category: "عمل إنساني", icon: "🤝", desc: "مبادرة تضامنية وإنسانية لزيارة كبار السن وتقديم الدعم." },
    { id: 8, title: "نشاط مع الطفولة المسعفة", category: "عمل إنساني", icon: "👶", desc: "ورشات ورعاية للأطفال في المراكز والجمعيات الخيرية." },
    { id: 9, title: "نشاط مع الجزائر خضراء", category: "بيئة ومجتمع", icon: "🌿", desc: "حملة تشجير وتوعية بيئية في الحرم الجامعي والمحيط." },
    { id: 10, title: "منهجية الإجابة في مسابقة المحاماة", category: "تأهيل مهني", icon: "📝", desc: "دورة تدريبية مخصصة للتحضير العلمي لاختبارات CAPA." },
    { id: 11, title: "منهجية إعداد مذكرة ماستر", category: "تأهيل أكاديمي", icon: "🎓", desc: "ورشة منهجية لشرح آليات البحث وصياغة المذكرات." },
    { id: 12, title: "استضافة مرافق مختلفة (ابتدائيات، متوسطات، ثانويات)", category: "تواصل مجتمعي", icon: "🏫", desc: "استقبال التلاميذ لتوعيتهم بالحقوق وتأطيرهم فكرياً." },
    { id: 13, title: "معرض ابتكار الأندية", category: "ابتكار وإبداع", icon: "💡", desc: "عرض مشاريع المبادرات الطلابية والأفكار المبتكرة." },
    { id: 14, title: "استضافة جامعات", category: "تبادل علمي", icon: "🏛️", desc: "لقاءات تشاركية ونشاطات مشتركة مع نوادي الجامعات الأخرى." },
    { id: 15, title: "يوم دراسي حول الدراسة في القانون وحول القانون", category: "أيام دراسية", icon: "📜", desc: "ندوات علمية تخصصية لمناقشة أبعاد العلوم القانونية." },
    { id: 16, title: "زيارة المتاحف (الأيام الوطنية)", category: "تاريخ ووطنية", icon: "🏛️", desc: "جولات استكشافية وتوثيقية في المناسبات الوطنية التاريخية." },
    { id: 17, title: "دورات في الإعلام + الإسعافات الأولية", category: "تكوين ومهارات", icon: "🩺", desc: "ورش عمل تطبيقية لتعلم مهارات الإعلام والتكفل الصحي." },
    { id: 18, title: "دورة حول الذكاء الاصطناعي", category: "تكنولوجيا وقانون", icon: "🤖", desc: "محاضرة حول تطبيقات الذكاء الاصطناعي والتشريعات المنظمة." },
    { id: 19, title: "إحياء مناسبات دينية ووطنية", category: "مناسبات", icon: "🕌", desc: "احتفاليات ثريّة تخلد المواعيد التاريخية والدينية." },
    { id: 20, title: "بودكاست مع الأساتذة", category: "إعلام وحوار", icon: "🎙️", desc: "حوارات مسجلة ومفتوحة مع أساتذة ومفكري الكلية." },
    { id: 22, title: "ملتقيات حول المناسبات", category: "ملتقيات علمية", icon: "📅", desc: "مؤتمرات ونقاشات علمية متخصصة حول أهم القضايا." },
    { id: 23, title: "إعداد مجلات", category: "إعلام ونشر", icon: "📰", desc: "تحرير ونشر الأعداد الدورية لمجلة نادي الوعي الرقمية." },
    { id: 24, title: "أيام علمية مع تخصصات أخرى", category: "انفتاح علمي", icon: "🔬", desc: "ندوات تداخل التخصصات كالقانون مع الطب والاقتصاد." },
    { id: 25, title: "يوم علمي مشترك مع الجامعات", category: "تعاون جامعي", icon: "🌐", desc: "ملتقى وطني يجمع باحثين وطلبة من مختلف المؤسسات." },
    { id: 26, title: "نشاط مع محكمة ومجلس قضائي", category: "ميداني قانوني", icon: "⚖️", desc: "زيارات ميدانية للمؤسسات القضائية والتعرف على الهيئات." },
    { id: 27, title: "أيام وملتقيات مع (محامين - قضاة - موثقين...)", category: "تواصل مهني", icon: "👨‍⚖️", desc: "لقاءات حوارية مع الفاعلين في سلك القضاء والمهن القانونية." },
];

export default function UpcomingActivities() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("الكل");

    const categories = ["الكل", ...new Set(UPCOMING_ACTIVITIES.map((a) => a.category))];

    const filteredActivities = UPCOMING_ACTIVITIES.filter((act) => {
        const matchesSearch = act.title.includes(searchTerm) || act.desc.includes(searchTerm);
        const matchesCategory = selectedCategory === "الكل" || act.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section
            id="activities-list"
            dir="rtl"
            className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden bg-transparent py-20 font-[family-name:var(--font-arabic)] text-[var(--label)] min-h-screen`}
        >
            <KnowledgePattern id="pat-act" className="absolute inset-0 h-full w-full animate-pattern-drift text-[var(--accent)]/10 pointer-events-none" />

            <div className="relative px-[6%] max-w-7xl mx-auto space-y-12">
                {/* ── عنوان الصفحة الرئيسي ── */}
                <div className="text-center max-w-3xl mx-auto">
                    <span className="mb-4 inline-block rounded-full glass border border-[var(--accent)]/30 px-5 py-1.5 text-xs font-bold tracking-widest text-[var(--accent)]">
                        ✦ برنامج السنة الجامعية
                    </span>
                    <h1 className="font-[family-name:var(--font-arabic)] text-4xl md:text-6xl font-extrabold text-[var(--label)]">
                        النشاطات والفعاليات القادمة 🚀
                    </h1>
                    <p className="mt-4 text-base md:text-lg font-light text-[var(--label)]/80 leading-relaxed">
                        خطة عمل شاملة تتضمن 27 نشاطاً وتظاهرة علمية وثقافية وإنسانية تنظمها لجان نادي الوعي القانوني
                    </p>
                </div>

                {/* ── شريط البحث والتصفية ── */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-[22px] border border-[var(--accent)]/30 glass p-6 ">
                    {/* البحث */}
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="ابحث عن نشاط أو مهارة..."
                            className="w-full rounded-2xl border border-[var(--accent)]/30 bg-[var(--input)] px-5 py-3 text-sm text-[var(--label)] placeholder-[var(--label)]/40 outline-none focus:border-[var(--accent)]"
                        />
                    </div>

                    {/* التصنيفات */}
                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto max-w-full py-1">
                        {categories.slice(0, 6).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-150 ${selectedCategory === cat ? "bg-[var(--accent)] text-[var(--on-accent)] shadow" : "bg-[var(--input)] text-[var(--label)] border border-[var(--accent)]/20 hover:border-[var(--accent)]"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── شبكة الفعاليات (27 نشاطاً) ── */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredActivities.map((act) => (
                        <div
                            key={act.id}
                            className="group flex flex-col justify-between rounded-[22px] border border-[var(--accent)]/30 glass p-6  transition-all duration-200 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:bg-[var(--surface)] hover:shadow-2xl"
                        >
                            <div>
                                {/* أعلى البطاقة: الرقم والأيقونة */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm shadow">
                                        {act.id}
                                    </span>
                                    <span className="text-3xl transition-transform duration-200 group-hover:scale-110">{act.icon}</span>
                                </div>

                                <span className="inline-block rounded-full bg-[var(--input)] border border-[var(--accent)]/20 px-3 py-1 text-[11px] font-semibold text-[var(--accent)] mb-3">
                                    {act.category}
                                </span>

                                <h3 className="font-[family-name:var(--font-arabic)] text-xl font-bold text-[var(--label)] mb-2 leading-snug group-hover:text-[var(--accent)] transition-colors">
                                    {act.title}
                                </h3>

                                <p className="text-xs text-[var(--label)]/80 leading-relaxed font-normal mb-4">
                                    {act.desc}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-[var(--accent)]/15 flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
                                <span>جامعة باتنة 1</span>
                                <span className="group-hover:translate-x-[-4px] transition-transform">قريباً ⏳</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* حالة عدم وجود نتائج */}
                {filteredActivities.length === 0 && (
                    <div className="text-center py-12 rounded-[22px] border border-[var(--accent)]/30 glass p-8">
                        <p className="text-lg text-[var(--accent)] font-bold">لم يتم العثور على أي نشاط يطابق البحث</p>
                        <button onClick={() => { setSearchTerm(""); setSelectedCategory("الكل"); }} className="mt-4 rounded-full bg-[var(--accent)] px-6 py-2 text-xs font-bold text-[var(--on-accent)]">
                            عرض كل النشاطات
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
