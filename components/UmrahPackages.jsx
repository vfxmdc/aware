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

const MEMBERS_LIST = [
    "محمد شادة (رئيس النادي)",
    "منصف بوقجة (مكتب تنفيذي)",
    "عبد الرؤوف قالة (نائب الرئيس)",
    "منصف الأمين زرافة (اللجنة القانونية)",
    "عبد الكريم خطاف (لجنة الإعلام والاتصال)",
    "إسلام بن معنصري (اللجنة التنظيمية)",
    "آدم براش (لجنة الإعلام والاتصال)",
    "نورهان بريك (اللجنة القانونية)",
    "فاطمة بن سعيد (اللجنة القانونية)",
    "غضبان إلياس",
    "دحماني ضرار",
    "جاب الله مهذب يوسف",
    "عبد الرحمان فوضيل",
    "جمال الدين دباش",
    "محمد مرزوق",
    "محمد حدوشي",
    "هراد خولة",
    "آية رجايمية",
    "فريال بيطام (لجنة الإعلام والاتصال)",
    "سندس عوته",
    "زياد تسنيم غنوجة",
    "فروجي رزيقة",
];

const EXECUTIVE_BOARD = [
    { role: "رئيس النادي", name: "محمد شادة", title: "قيادة النادي وتمثيله وإدارة الرؤية التوعوية" },
    { role: "نائب الرئيس", name: "عبد الرؤوف قالة", title: "المساعدة في القيادة والتنسيق التنفيذي" },
    { role: "عضو المكتب التنفيذي", name: "منصف بوقجة", title: "عضو مؤسس ومكلف بمتابعة المبادرات" },
    { role: "عضو المكتب التنفيذي", name: "آدم براش", title: "تطوير وإدارة النشاطات الإعلامية" },
    { role: "عضو المكتب التنفيذي", name: "إسلام بن معنصري", title: "متابعة الشؤون التنظيمية والعمل الداخلي" },
    { role: "عضوة المكتب التنفيذي", name: "نورهان بريك", title: "متابعة النشاط القانوني والأكاديمي" },
    { role: "عضوة المكتب التنفيذي", name: "فاطمة بن سعيد", title: "متابعة المبادرات القانونية والثقافية" },
];

const PERMANENT_COMMITTEES = [
    {
        name: "1. لجنة الإعلام والاتصال",
        icon: "📢",
        members: ["عبد الكريم خطاف", "آدم براش", "فريال بيطام"],
        tasks: "تتولى اللجنة التعريف بفكرة النادي ونشاطاته بين الطلبة، إلى جانب إدارة المحتوى الإعلامي ونشر أخبار وفعاليات النادي عبر مختلف منصات التواصل الاجتماعي، والعمل على إبراز صورته وهويته لدى الطلبة.",
    },
    {
        name: "2. اللجنة التنظيمية",
        icon: "⚙️",
        members: ["عبد الرؤوف قالة", "محمد شادة", "إسلام بن معنصري"],
        tasks: "تتولى اللجنة تنظيم العمل الداخلي للنادي، وتحديد مهام الأعضاء وتوزيعها، إضافة إلى توجيه النشاطات والمساهمة في ضمان حسن سير مختلف الفعاليات.",
    },
    {
        name: "3. اللجنة القانونية",
        icon: "⚖️",
        members: ["فاطمة بن سعيد", "نورهان بريك", "منصف الأمين زرافة"],
        tasks: "تتولى اللجنة متابعة أعمال النادي ومراقبتها وتوجيهها بما يتوافق مع القانون الداخلي للنادي والمبادئ المتفق عليها، مع المساهمة في معالجة المسائل ذات الطابع القانوني.",
    },
];

export default function UmrahPackages() {
    const [selectedTab, setSelectedTab] = useState("join");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [faculty, setFaculty] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSubmitJoin = async (e) => {
        e.preventDefault();
        if (fullName && phone) {
            setIsSending(true);
            setSubmitted(true);
            await sendTelegramNotification("join", { fullName, email, phone, faculty });
            setIsSending(false);
        }
    };

    return (
        <section id="join" dir="rtl" className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden bg-[#0A1128] py-20 font-[family-name:var(--font-tajawal)] text-[#F4F6FC] border-t border-[#D4AF37]/15`}>
            <KnowledgePattern id="pat-join" className="absolute inset-0 h-full w-full animate-pattern-drift text-[#D4AF37]/10 pointer-events-none" />

            <div className="relative px-[6%] max-w-6xl mx-auto">

                {/* ── التنقل بين الأقسام الفرعية ── */}
                <div className="flex flex-wrap justify-center gap-3 mb-12" id="structure">
                    {[
                        { id: "join", label: "الانضمام للنادي والقانون الداخلي 📝" },
                        { id: "board", label: "المكتب التنفيذي والأعضاء 👥" },
                        { id: "committees", label: "الهيكل التنظيمي للجان الدائمة 🏛️" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 ${selectedTab === tab.id ? "bg-[#D4AF37] text-[#0A1128] shadow-lg scale-105" : "bg-[#001F3F] text-[#F4F6FC] border border-[#D4AF37]/30 hover:border-[#D4AF37]"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── تبويب 1: الانضمام والقانون الداخلي ── */}
                {selectedTab === "join" && (
                    <div className="grid gap-10 md:grid-cols-2 items-start">
                        {/* الشروط والآلية */}
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-lg">
                                <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                                    <span>📜</span>
                                    <span>شروط الانضمام إلى النادي</span>
                                </h3>
                                <ul className="space-y-2.5 text-sm leading-relaxed text-[#F4F6FC]/90 font-medium">
                                    <li className="flex items-start gap-2">🔹 <span>أن يكون من طلبة الكلية أو الجامعة.</span></li>
                                    <li className="flex items-start gap-2">🔹 <span>أن يكون متميزًا أو جادًا في مساره الدراسي.</span></li>
                                    <li className="flex items-start gap-2">🔹 <span>أن تكون له علاقة أو اهتمام بمجال النشاط العلمي والثقافي للنادي.</span></li>
                                    <li className="flex items-start gap-2">🔹 <span>أن يتمتع بحسن السيرة والسلوك.</span></li>
                                    <li className="flex items-start gap-2">🔹 <span>الحصول على موافقة أعضاء النادي وفق الآليات المعتمدة.</span></li>
                                    <li className="flex items-start gap-2">🔹 <span>احترام فكرة النادي وأهدافه ومبادئه.</span></li>
                                    <li className="flex items-start gap-2">🔹 <span>احترام جميع أعضاء النادي والعمل بروح الفريق.</span></li>
                                </ul>

                                <div className="mt-6 rounded-2xl bg-[#0A1128] p-4 border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-semibold">
                                    👑 <strong>شرط رئيس النادي:</strong> يُشترط أن يكون طالبًا متميزًا ومنضبطًا، وأن يتمتع بالقدرة على القيادة وتحمل المسؤولية، وأن يكون مصدر إلهام وقدوة لبقية الطلبة.
                                </div>
                            </div>

                            <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-lg">
                                <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-3 flex items-center gap-2">
                                    <span>✍️</span>
                                    <span>كيفية الانضمام وتثبيت العضوية</span>
                                </h3>
                                <p className="text-sm leading-relaxed text-[#F4F6FC]/85 font-medium">
                                    يتم الانضمام إلى النادي عن طريق طلب كتابي يقدمه الطالب الراغب في الانخراط، ويوقعه صاحب الطلب، ثم يُعرض على مكتب النادي الجامعي للنظر فيه وقبوله.
                                </p>
                                <p className="text-xs text-[#D4AF37] mt-3 font-bold">
                                    💳 تُثبت صفة العضوية رسميًا من خلال منح بطاقة الانخراط للطالب المقبول.
                                </p>
                            </div>
                        </div>

                        {/* نموذج تقديم الطلب الإلكتروني */}
                        <div className="rounded-3xl border-2 border-[#D4AF37]/40 bg-[#001F3F] p-8 shadow-xl">
                            <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-2 text-center">
                                استمارة طلب الانضمام إلى نادي الوعي القانوني
                            </h3>
                            <p className="text-xs text-[#F4F6FC]/70 mb-6 text-center font-medium">قدم طلبك إلكترونياً ليتم دراسته وإرساله فوراً للتليجرام</p>

                            {submitted ? (
                                <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#0A1128] p-6 text-center space-y-3">
                                    <div className="text-4xl">🎉</div>
                                    <h4 className="font-bold text-[#D4AF37] text-lg">تم استلام طلبك بنجاح!</h4>
                                    <p className="text-xs text-[#F4F6FC]/80">
                                        مرحباً بك يا <strong>{fullName}</strong>. تم إرسال بياناتك للمكتب التنفيذي وسيتم التواصل معك لمنحك بطاقة الانخراط الرسمية.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-4 rounded-full bg-[#D4AF37] px-6 py-2 text-xs font-bold text-[#0A1128] shadow"
                                    >
                                        تقديم طلب آخر
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitJoin} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">الاسم الكامل *</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="أدخل اسمك الكامل"
                                            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">البريد الإلكتروني</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@univ-batna.dz"
                                            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">رقم الهاتف *</label>
                                        <input
                                            type="tel"
                                            required
                                            dir="ltr"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="06XXXXXXXX"
                                            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 text-right outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">التخصص / الكلية</label>
                                        <input
                                            type="text"
                                            value={faculty}
                                            onChange={(e) => setFaculty(e.target.value)}
                                            placeholder="كلية الحقوق والعلوم السياسية"
                                            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A1128] px-4 py-3 text-sm text-[#F4F6FC] placeholder-[#F4F6FC]/40 outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full rounded-full bg-[#D4AF37] py-3.5 font-bold text-[#0A1128] shadow-lg transition-all duration-200 hover:bg-[#F4C430] disabled:opacity-50"
                                    >
                                        {isSending ? "جاري الإرسال..." : "تقديم طلب الانخراط ⚖️"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {/* ── تبويب 2: المكتب التنفيذي والأعضاء ── */}
                {selectedTab === "board" && (
                    <div className="space-y-12">
                        <div>
                            <h3 className="font-[family-name:var(--font-amiri)] text-3xl font-bold text-[#D4AF37] mb-6 text-center">
                                أعضاء المكتب التنفيذي
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {EXECUTIVE_BOARD.map((b, idx) => (
                                    <div key={idx} className="rounded-2xl border border-[#D4AF37]/30 bg-[#001F3F] p-6 shadow-md hover:border-[#D4AF37]">
                                        <span className="inline-block rounded-full bg-[#0A1128] border border-[#D4AF37]/40 px-3 py-1 text-xs font-bold text-[#D4AF37] mb-2">
                                            {b.role}
                                        </span>
                                        <h4 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-[#F4F6FC]">{b.name}</h4>
                                        <p className="text-xs text-[#F4F6FC]/70 mt-2 font-medium">{b.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-8 shadow-md">
                            <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-6 text-center">
                                قائمة أعضاء النادي المنخرطين
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm text-[#F4F6FC]/90">
                                {MEMBERS_LIST.map((m, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-xl bg-[#0A1128] p-3 border border-[#D4AF37]/20 font-medium">
                                        <span className="text-[#D4AF37]">✦</span>
                                        <span className="text-xs md:text-sm">{m}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── تبويب 3: اللجان الدائمة ── */}
                {selectedTab === "committees" && (
                    <div className="grid gap-8 md:grid-cols-3">
                        {PERMANENT_COMMITTEES.map((c, i) => (
                            <div key={i} className="flex flex-col justify-between rounded-3xl border border-[#D4AF37]/30 bg-[#001F3F] p-7 shadow-lg hover:border-[#D4AF37]">
                                <div>
                                    <div className="text-3xl mb-3">{c.icon}</div>
                                    <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#D4AF37] mb-3">{c.name}</h3>

                                    <div className="mb-4 rounded-2xl bg-[#0A1128] p-3 border border-[#D4AF37]/20">
                                        <span className="block text-xs font-bold text-[#D4AF37] mb-1">أعضاء اللجنة:</span>
                                        <ul className="text-xs text-[#F4F6FC]/90 space-y-1 font-medium">
                                            {c.members.map((mem, idx) => (
                                                <li key={idx}>• {mem}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="text-xs leading-relaxed text-[#F4F6FC]/80 font-medium">{c.tasks}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
