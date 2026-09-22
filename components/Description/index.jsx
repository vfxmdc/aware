"use client";

import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

function KnowledgePattern({ id, className }) {
    return (
        <svg className={className} aria-hidden="true">
            <defs>
                <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
                    <g transform="translate(40 40) opacity-25">
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

export default function Description() {
    return (
        <section
            id="about"
            dir="rtl"
            className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden bg-[#0A1128] py-20 font-[family-name:var(--font-tajawal)] text-[#F4F6FC] border-t border-[#D4AF37]/15`}
        >
            <KnowledgePattern id="pat-desc" className="absolute inset-0 h-full w-full animate-pattern-drift text-[#D4AF37]/10 pointer-events-none" />

            <div className="relative px-[6%] max-w-6xl mx-auto">
                {/* ── أولًا: نشأة فكرة النادي وسبب التسمية ── */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A1128] font-bold text-lg shadow-md">
                            1
                        </span>
                        <h2 className="font-[family-name:var(--font-amiri)] text-3xl md:text-5xl font-bold text-[#D4AF37]">
                            نشأة فكرة النادي وسبب التسمية
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 items-center">
                        <div className="space-y-4 leading-relaxed text-[#F4F6FC]/90 font-normal text-base md:text-lg">
                            <p>
                                تعود فكرة تأسيس نادي الوعي القانوني إلى مجموعة من الأفكار الإصلاحية والتوعوية التي ترسخت لدى الطالبين <strong className="text-[#D4AF37] font-bold">محمد شادة</strong> و<strong className="text-[#D4AF37] font-bold">منصف بوقجة</strong> عقب مطالعتهما لعدد من مؤلفات المفكر الجزائري <strong className="text-[#D4AF37] font-bold">مالك بن نبي</strong>، ولا سيما كتاب <em>مذكرات شاهد للقرن</em>.
                            </p>
                            <p>
                                فقد أسهمت أفكار هذا المفكر في تشكيل أرضية فكرية خصبة لدى الطالبين، ورسخت لديهما الرغبة في المساهمة في نشر الوعي والمعرفة داخل الوسط الجامعي.
                            </p>
                            <p>
                                وشاءت الظروف أن تجمعهما بالأستاذ <strong className="text-[#D4AF37] font-bold">محمد سمصار</strong>، الذي يتقاطع معهما في النزعة التوعوية والإصلاحية، فتلاقت الأفكار وتكاملت الرؤى، ليُقترح تأسيس نادٍ علمي وثقافي يحمل اسم <strong className="text-[#D4AF37] font-bold">«نادي الوعي القانوني»</strong>؛ وهي تسمية تجمع بين مجال تخصص النادي، المتمثل في القانون، وبين رسالته الأساسية القائمة على التوعية ونشر المعرفة وبناء الوعي لدى الطلبة.
                            </p>
                        </div>

                        {/* بطاقة توضيحية لرمزية التسمية */}
                        <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-xl backdrop-blur-sm">
                            <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-4 text-center">
                                ركائز الفكرة والتأسيس
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 rounded-2xl bg-[#0A1128] p-4 border border-[#D4AF37]/20">
                                    <span className="text-2xl">📚</span>
                                    <div>
                                        <h4 className="font-bold text-[#D4AF37] text-sm">المرجعية الفكرية</h4>
                                        <p className="text-xs text-[#F4F6FC]/80 mt-1">مؤلفات المفكر مالك بن نبي (مذكرات شاهد للقرن)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-2xl bg-[#0A1128] p-4 border border-[#D4AF37]/20">
                                    <span className="text-2xl">👥</span>
                                    <div>
                                        <h4 className="font-bold text-[#D4AF37] text-sm">المؤسسون والمؤطرون</h4>
                                        <p className="text-xs text-[#F4F6FC]/80 mt-1">الطالبان محمد شادة ومنصف بوقجة بالتأطير والإشراف مع الأستاذ محمد سمصار</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-2xl bg-[#0A1128] p-4 border border-[#D4AF37]/20">
                                    <span className="text-2xl">💡</span>
                                    <div>
                                        <h4 className="font-bold text-[#D4AF37] text-sm">معنى التسمية</h4>
                                        <p className="text-xs text-[#F4F6FC]/80 mt-1">الجمع بين تخصص القانون والرسالة الإصلاحية لبناء الوعي</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── ثانياً: التعريف بالنادي ── */}
                <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 md:p-12 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A1128] font-bold text-lg shadow-md">
                            2
                        </span>
                        <h2 className="font-[family-name:var(--font-amiri)] text-3xl md:text-4xl font-bold text-[#D4AF37]">
                            التعريف بالنادي
                        </h2>
                    </div>

                    <p className="text-base md:text-xl leading-relaxed text-[#F4F6FC]/90 font-normal mb-6">
                        نادي الوعي القانوني هو نادٍ جامعي يمزج بين الطابع العلمي والثقافي والقانوني، وينشط على مستوى كلية الحقوق والعلوم السياسية بجامعة باتنة 1.
                    </p>

                    <p className="text-sm md:text-base leading-relaxed text-[#F4F6FC]/80 font-normal mb-6">
                        ويهدف النادي إلى خلق فضاء جامعي يتيح للطلبة تطوير معارفهم ومهاراتهم، والتفاعل مع مختلف الفعاليات العلمية والثقافية، إلى جانب المساهمة في تنشيط الحياة الجامعية.
                    </p>

                    <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#0A1128] p-4 text-xs md:text-sm text-[#D4AF37] font-semibold">
                        📢 تحظى مختلف نشاطات النادي بالتغطية والنشر والتوثيق عبر صفحاته على مواقع التواصل الاجتماعي، بما يسمح بالتعريف بالنادي ونشاطاته وإبراز مختلف المبادرات التي يعمل أعضاؤه على تجسيدها.
                    </div>
                </div>
            </div>
        </section>
    );
}
