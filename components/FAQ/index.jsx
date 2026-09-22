"use client";

import { useState } from "react";
import { Amiri, Tajawal } from "next/font/google";
import { sendTelegramNotification } from "@/lib/telegram";

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

const ACTIVITIES_ARCHIVE = [
    { title: "ندوة حول الوعي القانوني الجامعي", date: "أكتوبر 2024", location: "مدرج كلية الحقوق", type: "ندوة علمية", desc: "مناقشة أبعاد الوعي الحقوقي والقانوني في تنشيط محيط الطالب الجامعي." },
    { title: "معرض الكتاب والمؤلفات القانونية", date: "نوفمبر 2024", location: "المكتبة المركزية", type: "نشاط ثقافي", desc: "عرض أمهات الكتب ومؤلفات المفكر مالك بن نبي لتعزيز المطالعة والقراءة." },
    { title: "ورشة التكوين في التحرير والأكاديميا", date: "ديسمبر 2024", location: "قاعة المحاضرات باتنة 1", type: "ورشة عمل", desc: "تدريب الطلبة المنخرطين على المنهجية القانونية وصياغة المقالات العلمية." },
];

export default function FAQ() {
    const [articleTitle, setArticleTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [articleStep, setArticleStep] = useState(1);
    const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);

    const [feedbackName, setFeedbackName] = useState("");
    const [feedbackText, setFeedbackText] = useState("");
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

    const handleArticleSubmit = async () => {
        if (articleTitle && authorName) {
            setIsSubmittingArticle(true);
            setArticleStep(2);
            await sendTelegramNotification("article", { articleTitle, authorName, articleContent });
            setIsSubmittingArticle(false);
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (feedbackText) {
            setIsSubmittingFeedback(true);
            await sendTelegramNotification("feedback", { name: feedbackName, feedback: feedbackText });
            setIsSubmittingFeedback(false);
            setFeedbackSent(true);
        }
    };

    return (
        <div dir="rtl" className={`${amiri.variable} ${tajawal.variable} font-[family-name:var(--font-tajawal)] text-[#F4F6FC]`}>

            {/* ── 1. قسم المجلة الإلكترونية ── */}
            <section id="magazine" className="relative overflow-hidden bg-[#0A1128] py-20 border-b border-[#D4AF37]/20">
                <KnowledgePattern id="pat-mag-1" className="absolute inset-0 h-full w-full animate-pattern-drift text-[#D4AF37]/10 pointer-events-none" />

                <div className="relative px-[6%] max-w-6xl mx-auto space-y-10">
                    <div className="text-center">
                        <span className="mb-4 inline-block rounded-full bg-[#001F3F] border border-[#D4AF37]/30 px-5 py-1.5 text-xs font-bold tracking-widest text-[#D4AF37]">
                            ✦ قسم المجلة الإلكترونية 📰
                        </span>
                        <h2 className="font-[family-name:var(--font-amiri)] text-4xl md:text-5xl font-extrabold text-[#F4F6FC]">
                            المجلة الرقمية ونموذج إرسال المقالات
                        </h2>
                        <p className="mt-3 text-sm md:text-base font-normal text-[#F4F6FC]/70 max-w-2xl mx-auto">
                            مساحة نوعية لتوثيق فكر ونشاطات النادي واستقبال مقالات وآراء الطلبة لتطوير البحث العلمي
                        </p>
                    </div>

                    <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-lg">
                        <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-4">
                            آلية العمل المشترك لإنتاج المجلة
                        </h3>
                        <p className="text-sm leading-relaxed text-[#F4F6FC]/85 mb-6 font-medium">
                            تعتمد المجلة الإلكترونية على التنسيق والعمل المشترك بين ثلاث لجان أساسية: <strong className="text-[#D4AF37]">لجنة التحرير</strong>، <strong className="text-[#D4AF37]">لجنة التحكيم والتدقيق</strong>، و<strong className="text-[#D4AF37]">لجنة الإعلام والاتصال</strong>.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0A1128] p-6 shadow-sm">
                                <div className="flex items-center gap-2 font-bold text-[#D4AF37] text-base mb-2">
                                    <span>Phase 1</span>
                                    <span>المرحلة الأولى: لجنة التحرير</span>
                                </div>
                                <p className="text-xs text-[#F4F6FC]/80 leading-relaxed font-medium">
                                    يقوم المؤلف بإرسال مقاله عبر الموقع، ليظهر لدى لجنة التحرير في خانة «قيد المراجعة». يُتخذ قرار بالقبول أو الرفض، وفي حالة القبول تظهر للمؤلف خاصية «ابدأ التحرير» مع التوقيع على تعهد حقوق التأليف والنشر.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0A1128] p-6 shadow-sm">
                                <div className="flex items-center gap-2 font-bold text-[#D4AF37] text-base mb-2">
                                    <span>Phase 2</span>
                                    <span>المرحلة الثانية: لجنة التحكيم والتدقيق</span>
                                </div>
                                <p className="text-xs text-[#F4F6FC]/80 leading-relaxed font-medium">
                                    يُحال المقال إلكترونيًا لمراجعته من الناحية العلمية واللغوية والمنهجية. وتكون النتيجة إما «مقبول وخالٍ من الأخطاء» أو «إعادته للتصحيح مع تقديم الملاحظات»، قبل إحالته للنشر النهائي.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-[#D4AF37]/40 bg-[#001F3F] p-8 shadow-xl">
                        <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-2">
                            ✍️ نموذج إرسال مقال علمي للمجلة
                        </h3>
                        <p className="text-xs text-[#F4F6FC]/70 mb-6 font-medium">إرسال مقالك لتمريره عبر لجنة التحرير وإشعار التليجرام فوراً</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#D4AF37] mb-1">عنوان المقال القانوني/الفكري *</label>
                                <input
                                    type="text"
                                    value={articleTitle}
                                    onChange={(e) => setArticleTitle(e.target.value)}
                                    placeholder="مثال: أثر الوعي القانوني في بناء الدولة والمجتمع عند مالك بن نبي"
                                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#D4AF37] mb-1">اسم الباحث / المؤلف *</label>
                                <input
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    placeholder="الاسم واللقب والتخصص"
                                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#D4AF37] mb-1">ملخص المقال والنص *</label>
                                <textarea
                                    rows={4}
                                    value={articleContent}
                                    onChange={(e) => setArticleContent(e.target.value)}
                                    placeholder="اكتب خلاصة المقال أو النص الكامل هنا..."
                                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <button
                                onClick={handleArticleSubmit}
                                disabled={isSubmittingArticle}
                                className="rounded-full bg-[#D4AF37] px-8 py-3 font-bold text-[#0A1128] shadow-lg transition-all hover:bg-[#F4C430] disabled:opacity-50"
                            >
                                {isSubmittingArticle ? "جاري الإرسال..." : "إرسال إلى لجنة التحرير 📩"}
                            </button>
                        </div>

                        {articleStep >= 2 && (
                            <div className="mt-6 rounded-2xl border border-[#D4AF37] bg-[#0A1128] p-5 space-y-3 animate-pulse">
                                <span className="inline-block rounded-full bg-[#001F3F] border border-[#D4AF37]/40 px-3 py-1 text-xs font-bold text-[#D4AF37]">
                                    حالة المقال: {articleStep === 2 ? "تم الإرسال للتليجرام وقيد المراجعة لدى لجنة التحرير ⚖️" : "مقبول وجاهز للنشر 🚀"}
                                </span>
                                <h4 className="font-bold text-base text-[#F4F6FC]">{articleTitle}</h4>
                                <p className="text-xs text-[#F4F6FC]/70 font-medium">بقلم: {authorName}</p>
                                {articleStep === 2 && (
                                    <button
                                        onClick={() => setArticleStep(3)}
                                        className="rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0A1128] shadow"
                                    >
                                        توقيع التعهد وإحالة للتدقيق النهائي
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── 2. قسم الخريطة التفاعلية والأرشيف ── */}
            <section id="interactive-map" className="relative overflow-hidden bg-[#001738] py-20 border-b border-[#D4AF37]/20">
                <KnowledgePattern id="pat-mag-2" className="absolute inset-0 h-full w-full animate-pattern-drift text-[#D4AF37]/10 pointer-events-none" />

                <div className="relative px-[6%] max-w-6xl mx-auto space-y-8">
                    <div className="text-center">
                        <span className="mb-4 inline-block rounded-full bg-[#001F3F] border border-[#D4AF37]/30 px-5 py-1.5 text-xs font-bold tracking-widest text-[#D4AF37]">
                            ✦ الخريطة التفاعلية 🗺️
                        </span>
                        <h2 className="font-[family-name:var(--font-amiri)] text-4xl md:text-5xl font-extrabold text-[#F4F6FC]">
                            الخريطة التفاعلية وأرشيف نشاطات النادي
                        </h2>
                        <p className="mt-3 text-sm md:text-base font-normal text-[#F4F6FC]/70 max-w-2xl mx-auto">
                            خريطة زمنية وتفاعلية تتضمن بطاقات تعريفية لكافة النشاطات والفعاليات المنظمة منذ التأسيس
                        </p>
                    </div>

                    <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-lg">
                        <div className="grid gap-6 md:grid-cols-3">
                            {ACTIVITIES_ARCHIVE.map((act, i) => (
                                <div key={i} className="rounded-2xl border border-[#D4AF37]/30 bg-[#0A1128] p-6 shadow-md hover:border-[#D4AF37]">
                                    <span className="inline-block rounded-full bg-[#001F3F] border border-[#D4AF37]/30 px-3 py-1 text-xs font-bold text-[#D4AF37] mb-3">
                                        {act.type} · {act.date}
                                    </span>
                                    <h4 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-[#F4F6FC] mb-2">{act.title}</h4>
                                    <p className="text-xs text-[#D4AF37] font-bold mb-2">📍 {act.location}</p>
                                    <p className="text-xs text-[#F4F6FC]/80 leading-relaxed font-medium">{act.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. قسم مساحة الآراء والمقترحات ── */}
            <section id="feedback" className="relative overflow-hidden bg-[#0A1128] py-20">
                <KnowledgePattern id="pat-mag-3" className="absolute inset-0 h-full w-full animate-pattern-drift text-[#D4AF37]/10 pointer-events-none" />

                <div className="relative px-[6%] max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="mb-4 inline-block rounded-full bg-[#001F3F] border border-[#D4AF37]/30 px-5 py-1.5 text-xs font-bold tracking-widest text-[#D4AF37]">
                            ✦ شاركنا أفكارك 💡
                        </span>
                        <h2 className="font-[family-name:var(--font-amiri)] text-4xl md:text-5xl font-extrabold text-[#F4F6FC]">
                            مساحة الآراء والمقترحات
                        </h2>
                        <p className="mt-3 text-sm md:text-base font-normal text-[#F4F6FC]/70 max-w-xl mx-auto">
                            نرحب بأفكار واقتراحات طلبة كلية الحقوق والعلوم السياسية لتطوير أنشطة ومبادرات النادي
                        </p>
                    </div>

                    <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-xl">
                        {feedbackSent ? (
                            <div className="rounded-2xl border border-[#D4AF37] bg-[#0A1128] p-6 text-center space-y-3">
                                <div className="text-3xl">🎉</div>
                                <h4 className="font-bold text-[#D4AF37] text-lg">تم إرسال اقتراحك للتليجرام بنجاح!</h4>
                                <p className="text-xs text-[#F4F6FC]/80">شكراً على مساهمتك القيمة في بناء الوعي القانوني.</p>
                                <button onClick={() => setFeedbackSent(false)} className="rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0A1128]">
                                    تقديم فكرة أخرى
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#D4AF37] mb-1">الاسم (اختياري)</label>
                                    <input
                                        type="text"
                                        value={feedbackName}
                                        onChange={(e) => setFeedbackName(e.target.value)}
                                        placeholder="اسمك الكريم"
                                        className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#D4AF37] mb-1">الفكرة أو المقترح *</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        placeholder="شاركنا فكرتك..."
                                        className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmittingFeedback}
                                    className="w-full rounded-full bg-[#D4AF37] py-3.5 font-bold text-[#0A1128] shadow-lg hover:bg-[#F4C430] disabled:opacity-50"
                                >
                                    {isSubmittingFeedback ? "جاري الإرسال..." : "إرسال المقترح للتليجرام 🚀"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}
