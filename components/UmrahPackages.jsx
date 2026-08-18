"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700"], variable: "--font-tajawal" });

/* ── زخرفة إسلامية ─────────────────────────────── */
const STAR =
    "M25 0 L9.7 4.02 L17.68 17.68 L4.02 9.7 L0 25 L-4.02 9.7 L-17.68 17.68 " +
    "-9.7 4.02 L-25 0 L-9.7 -4.02 L-17.68 -17.68 L-4.02 -9.7 L0 -25 " +
    "L4.02 -9.7 L17.68 -17.68 L9.7 -4.02 Z";

function IslamicPattern({ id, className }) {
    return (
        <svg className={className} aria-hidden="true">
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

/* ── الصور الخاصة بالفنادق ── */
const PACKAGE_IMAGES = [
    { src: "/roaa.jpg", fallback: "/roaa.jfif", alt: "فندق روعة الشموخ - مكة المكرمة", caption: "مكة المكرمة: فندق روعة الشموخ (11 ليلة)" },
    { src: "/central.jpg", fallback: "/central.jfif", alt: "فندق مركزي - المدينة المنورة", caption: "المدينة المنورة: فندق مركزي (3 ليالي — 200م عن المسجد النبوي)" }
];

/* ── بيانات الرحلات الباقات الثلاث ── */
const PACKAGES = [
    {
        id: "pack-1",
        title: "رحلة 18 أوت — 01 سبتمبر",
        departure: {
            date: "18 أوت",
            takeoff: "12:15",
            landing: "18:15 (المدينة المنورة)",
            flightNum: "F3 9543",
        },
        returnFlight: {
            date: "01 سبتمبر",
            takeoff: "07:00",
            landing: "09:30",
            flightNum: "F3 9542",
        },
    },
    {
        id: "pack-2",
        title: "رحلة 01 سبتمبر — 15 سبتمبر",
        departure: {
            date: "01 سبتمبر",
            takeoff: "12:15",
            landing: "18:15 (المدينة المنورة)",
            flightNum: "F3 9543",
        },
        returnFlight: {
            date: "15 سبتمبر",
            takeoff: "07:00",
            landing: "09:30",
            flightNum: "F3 9542",
        },
    },
    {
        id: "pack-3",
        title: "رحلة 15 سبتمبر — 29 سبتمبر",
        departure: {
            date: "15 سبتمبر",
            takeoff: "12:15",
            landing: "18:15 (المدينة المنورة)",
            flightNum: "F3 9543",
        },
        returnFlight: {
            date: "29 سبتمبر",
            takeoff: "07:00",
            landing: "09:30",
            flightNum: "F3 9542",
        },
    },
];

/* ── خيارات الغرف وأسعارها ── */
const ROOM_OPTIONS = [
    { id: "quintuple", label: "غرفة خماسية", price: 209000 },
    { id: "quad", label: "غرفة رباعية", price: 219000 },
    { id: "triple", label: "غرفة ثلاثية", price: 230000 },
    { id: "double", label: "غرفة ثنائية", price: 260000 },
];

/* ── خيارات الإعاشة ── */
const MEALS_OPTIONS = [
    { id: "none", label: "بدون إعاشة", price: 0 },
    { id: "half_fb", label: "فطور + عشاء", price: 25000 },
    { id: "half_lu", label: "غداء + عشاء", price: 25000 },
];

/* ── أرقام الاتصال ── */
const PHONE_NUMBERS = [
    { display: "+213 699 35 22 50", raw: "+213699352250" },
    { display: "+213 770 39 33 49", raw: "+213770393349" },
    { display: "+213 771 78 01 06", raw: "+213771780106" },
    { display: "+213 562 61 94 93", raw: "+213562619493" },
    { display: "039 72 87 41", raw: "039728741" },
];

const fmtPrice = new Intl.NumberFormat("ar-DZ-u-nu-latn");

export default function UmrahPackages() {
    /* ── سلايدر الصور التلقائي واليدوي ── */
    const [imgIndex, setImgIndex] = useState(0);

    // تغيير الصورة كل 5 ثوانٍ بسلاسة
    useEffect(() => {
        const timer = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % PACKAGE_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // تبديل الصورة يدوياً
    const toggleNextImage = useCallback(() => {
        setImgIndex((prev) => (prev + 1) % PACKAGE_IMAGES.length);
    }, []);

    /* ── حالة نافذة الحجز ── */
    const [selectedPkg, setSelectedPkg] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState("quintuple");
    const [selectedMeal, setSelectedMeal] = useState("none");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState(1); // 1: اختيار الغرفة والإعاشة | 2: الفاتورة وإدخال البيانات | 3: نجاح الإرسال
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const openBooking = (pkg) => {
        toggleNextImage(); // تبديل الصورة يدوياً
        setSelectedPkg(pkg);
        setStep(1);
        setSelectedRoom("quintuple");
        setSelectedMeal("none");
        setFullName("");
        setPhone("");
        setSubmitError("");
    };

    const closeModal = () => setSelectedPkg(null);

    const roomObj = useMemo(() => {
        return ROOM_OPTIONS.find((r) => r.id === selectedRoom) || ROOM_OPTIONS[0];
    }, [selectedRoom]);

    const mealObj = useMemo(() => {
        return MEALS_OPTIONS.find((m) => m.id === selectedMeal) || MEALS_OPTIONS[0];
    }, [selectedMeal]);

    const totalPrice = useMemo(() => {
        return roomObj.price + mealObj.price;
    }, [roomObj, mealObj]);

    const canSubmit = fullName.trim().length >= 3 && phone.trim().length >= 8;

    const submitBooking = useCallback(async () => {
        if (!selectedPkg) return;
        setSubmitting(true);
        setSubmitError("");
        try {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    packageName: `عمرة ${selectedPkg.title}`,
                    departureDate: selectedPkg.departure.date,
                    returnDate: selectedPkg.returnFlight.date,
                    airline: "Flyadeal",
                    roomType: roomObj.label,
                    roomPrice: roomObj.price,
                    mealOption: mealObj.label,
                    mealPrice: mealObj.price,
                    total: totalPrice,
                    fullName,
                    phone,
                    hotel: "مكة المكرمة: فندق روعة الشموخ (11 ليلة) | المدينة المنورة: فندق مركزي (3 ليالي)",
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error ?? "فشل إرسال الطلب");
            setStep(3);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مجدداً.");
        } finally {
            setSubmitting(false);
        }
    }, [selectedPkg, roomObj, mealObj, totalPrice, fullName, phone]);

    return (
        <section id="umrah" dir="rtl" className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden bg-[#F1E8DC]/60 py-16 md:py-24 font-[family-name:var(--font-tajawal)] text-[#5C4732]`}>
            <IslamicPattern id="pat-pkg" className="absolute inset-0 h-full w-full animate-pattern-drift text-[#8B6F52]/30 pointer-events-none" />

            {/* ── عنوان القسم ── */}
            <div className="relative mb-12 px-4 text-center">
                <span className="mb-3 inline-block rounded-full bg-[#FAF6F0] px-4 py-1.5 text-xs md:text-sm font-bold tracking-widest text-[#8B6F52] shadow-sm">
                    ✨ برامج العمرة المباشرة
                </span>
                <h2 className="font-[family-name:var(--font-amiri)] text-3xl md:text-5xl font-bold text-[#5C4732]">
                    باقات العمرة المميزة
                </h2>
                <p className="mt-3 text-sm md:text-base font-light text-[#8B6F52] max-w-xl mx-auto">
                    رحلات مباشرة من مطار باتنة بفنادق مكة والمدينة مع خدمات شاملة
                </p>
            </div>

            {/* ── عرض الصور المتحركة للفنادق ── */}
            <div className="relative mx-auto max-w-5xl px-4 mb-12">
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl shadow-xl border-2 border-[#C9A876]/40 group cursor-pointer" onClick={toggleNextImage}>
                    {PACKAGE_IMAGES.map((img, idx) => (
                        <div
                            key={img.src}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === imgIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        >
                            <img
                                src={img.src}
                                onError={(e) => { e.currentTarget.src = img.fallback; }}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#5C4732]/85 via-[#5C4732]/30 to-transparent" />
                        </div>
                    ))}
                    
                    <div className="absolute bottom-4 right-5 z-20 text-[#FAF6F0]">
                        <span className="inline-block rounded-md bg-[#C9A876] px-2.5 py-0.5 text-xs font-bold text-white mb-1 shadow">
                            🏨 الفنادق المقترحة
                        </span>
                        <h3 className="font-[family-name:var(--font-amiri)] text-xl md:text-2xl font-bold">
                            {PACKAGE_IMAGES[imgIndex].caption}
                        </h3>
                    </div>

                    {/* المؤشرات السفلية */}
                    <div className="absolute bottom-4 left-5 z-20 flex gap-2" dir="ltr">
                        {PACKAGE_IMAGES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setImgIndex(idx); }}
                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === imgIndex ? "w-8 bg-[#C9A876]" : "w-2.5 bg-white/60 hover:bg-white"}`}
                                aria-label={`صورة ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── كروت الباقات الثلاث ── */}
            <div className="relative mx-auto max-w-6xl grid gap-8 px-4 sm:px-6 md:grid-cols-3">
                {PACKAGES.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#FAF6F0] p-6 shadow-xl border border-[#F1E8DC] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#C9A876]"
                    >
                        {/* الشارة العلوية: مطار باتنة */}
                        <div className="flex items-center justify-between border-b border-[#F1E8DC] pb-4 mb-4">
                            <span className="rounded-full bg-[#8B6F52] px-4 py-1.5 text-sm font-extrabold text-white shadow-md flex items-center gap-1.5">
                                <span>🛫</span>
                                <span>مطار باتنة</span>
                            </span>
                            <span className="text-xs font-bold bg-[#C9A876]/20 text-[#5C4732] px-3 py-1 rounded-full border border-[#C9A876]/40">
                                ✈️ Flyadeal
                            </span>
                        </div>

                        <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#5C4732] mb-4 text-center">
                            {pkg.title}
                        </h3>

                        {/* تفاصيل الإقامة بالفنادق */}
                        <div className="rounded-2xl bg-[#C9A876]/15 p-3.5 mb-4 border border-[#C9A876]/30 space-y-1 text-xs md:text-sm">
                            <div className="flex items-center gap-2 font-bold text-[#5C4732]">
                                <span>🕋</span>
                                <span>11 ليلة في مكة فندق روعة الشموخ</span>
                            </div>
                            <div className="flex items-center gap-2 font-bold text-[#5C4732]">
                                <span>🕌</span>
                                <span>3 ليالي في المدينة فندق مركزي</span>
                            </div>
                        </div>

                        {/* رحلة الذهاب */}
                        <div className="rounded-2xl bg-white p-4 shadow-sm mb-3 border border-[#F1E8DC]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm text-[#8B6F52]">🛫 الذهاب</span>
                                <span className="text-xs font-bold bg-[#F1E8DC] px-2 py-0.5 rounded text-[#5C4732]">📅 {pkg.departure.date}</span>
                            </div>
                            <ul className="space-y-1 text-xs md:text-sm text-[#5C4732]">
                                <li>🕛 الإقلاع: <strong className="font-bold">{pkg.departure.takeoff}</strong></li>
                                <li>🛬 الوصول: <strong className="font-bold">{pkg.departure.landing}</strong></li>
                                <li>✈️ رقم الرحلة: <span className="font-mono font-bold text-[#8B6F52]">{pkg.departure.flightNum}</span></li>
                            </ul>
                        </div>

                        {/* رحلة العودة */}
                        <div className="rounded-2xl bg-white p-4 shadow-sm mb-4 border border-[#F1E8DC]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm text-[#8B6F52]">🛫 العودة</span>
                                <span className="text-xs font-bold bg-[#F1E8DC] px-2 py-0.5 rounded text-[#5C4732]">📅 {pkg.returnFlight.date}</span>
                            </div>
                            <ul className="space-y-1 text-xs md:text-sm text-[#5C4732]">
                                <li>🕖 الإقلاع: <strong className="font-bold">{pkg.returnFlight.takeoff}</strong></li>
                                <li>🛬 الوصول: <strong className="font-bold">{pkg.returnFlight.landing}</strong></li>
                                <li>✈️ رقم الرحلة: <span className="font-mono font-bold text-[#8B6F52]">{pkg.returnFlight.flightNum}</span></li>
                            </ul>
                        </div>

                        {/* السعر والزر */}
                        <div className="mt-auto pt-2">
                            <div className="text-center mb-3">
                                <span className="text-xs text-[#8B6F52] font-medium block mb-0.5">ابتداءً من</span>
                                <div className="font-[family-name:var(--font-amiri)] text-2xl md:text-3xl font-bold text-[#5C4732] tabular-nums">
                                    209,000 دج
                                </div>
                            </div>

                            <button
                                onClick={() => openBooking(pkg)}
                                className="group/btn relative w-full overflow-hidden rounded-full bg-[#8B6F52] py-3.5 font-bold text-[#FAF6F0] shadow-md transition-all duration-200 hover:bg-[#5C4732] hover:shadow-lg active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span>احجز الآن</span>
                                    <span className="text-lg">←</span>
                                </span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── معلومات الفنادق والإعاشة والاتصال ── */}
            <div className="relative mx-auto max-w-5xl mt-14 px-4">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* الفنادق والإعاشة */}
                    <div className="rounded-3xl bg-[#FAF6F0] p-6 shadow-md border border-[#F1E8DC]">
                        <h4 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-[#5C4732] mb-4 flex items-center gap-2">
                            <span>🏨</span>
                            <span>الفنادق والإعاشة</span>
                        </h4>
                        
                        <div className="space-y-4 text-sm">
                            <div className="rounded-2xl bg-white p-3.5 border border-[#F1E8DC]">
                                <p className="font-bold text-[#8B6F52] mb-1">مكة المكرمة (11 ليلة)</p>
                                <p className="text-[#5C4732] font-medium">فندق روعة الشموخ</p>
                            </div>

                            <div className="rounded-2xl bg-white p-3.5 border border-[#F1E8DC]">
                                <p className="font-bold text-[#8B6F52] mb-1">المدينة المنورة (3 ليالي)</p>
                                <p className="text-[#5C4732] font-medium">فندق مركزي (يبعد 200 متر عن المسجد النبوي)</p>
                            </div>

                            <div className="rounded-2xl bg-[#C9A876]/15 p-3.5 border border-[#C9A876]/30">
                                <p className="font-bold text-[#5C4732] mb-1 flex items-center gap-1">
                                    <span>🍽</span>
                                    <span>الإعاشة (اختيارية)</span>
                                </p>
                                <p className="text-[#8B6F52] text-xs mb-2">فطور + عشاء أو غداء + عشاء</p>
                                <p className="font-bold text-[#5C4732] text-sm">➕ إضافة الإعاشة: 25,000 دج</p>
                            </div>
                        </div>
                    </div>

                    {/* للحجز والاستفسار */}
                    <div className="rounded-3xl bg-[#FAF6F0] p-6 shadow-md border border-[#F1E8DC] flex flex-col justify-between">
                        <div>
                            <h4 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-[#5C4732] mb-4 flex items-center gap-2">
                                <span>📞</span>
                                <span>للحجز والاستفسار</span>
                            </h4>
                            <p className="text-xs text-[#8B6F52] mb-4">يسعدنا تواصلكم معنا مباشرة للإجابة عن جميع استفساراتكم:</p>
                            
                            <div className="space-y-2.5">
                                {PHONE_NUMBERS.map((p, i) => (
                                    <a
                                        key={i}
                                        href={`tel:${p.raw}`}
                                        dir="ltr"
                                        className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#5C4732] border border-[#F1E8DC] transition-all duration-150 hover:border-[#8B6F52] hover:bg-[#8B6F52] hover:text-[#FAF6F0]"
                                    >
                                        <span>{p.display}</span>
                                        <span className="text-xs opacity-75">📞 اتصل الآن</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── الفيديو المتحرك للطائرة ── */}
            <div className="relative mx-auto max-w-4xl mt-14 px-4">
                <div className="relative overflow-hidden rounded-3xl border border-[#C9A876]/40 shadow-lg bg-black/40">
                    <video
                        src="/Airplane_flying_through_clouds_202606162032.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-36 sm:h-48 md:h-56 object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5C4732]/70 via-transparent to-[#5C4732]/70 flex items-center justify-center p-4">
                        <div className="text-center text-white backdrop-blur-xs bg-black/20 p-4 rounded-2xl border border-white/10">
                            <p className="font-[family-name:var(--font-amiri)] text-xl sm:text-2xl font-bold drop-shadow">
                                ✈️ رحلة مباركة من مطار باتنة مع Flyadeal
                            </p>
                            <p className="text-xs sm:text-sm text-[#FAF6F0]/90 mt-1 drop-shadow">
                                MelGo Travel تتمنى لكم عمرة مقبولة وذنباً مغفوراً
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── نافذة تفاصيل الحجز (Modal) ── */}
            {selectedPkg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={closeModal}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-[#FAF6F0] shadow-2xl"
                    >
                        {/* الهيدر */}
                        <div className="relative shrink-0 bg-[#8B6F52] px-6 py-4 text-[#FAF6F0]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-[family-name:var(--font-amiri)] text-xl font-bold">
                                        تأكيد حجز عمرة — مطار باتنة
                                    </h3>
                                    <p className="text-xs text-[#C9A876] mt-0.5">{selectedPkg.title} · Flyadeal</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="rounded-full bg-white/10 p-2 text-lg hover:bg-white/20 transition-transform duration-150 active:scale-95"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            {/* شريط الخطوات */}
                            <div className="flex items-center justify-center gap-2 mt-3" dir="ltr">
                                {[1, 2].map((s) => (
                                    <span
                                        key={s}
                                        className={`h-2 rounded-full transition-all duration-300 ${step === s ? "w-10 bg-[#C9A876]" : step > s ? "w-3 bg-white" : "w-3 bg-white/30"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* المحتوى القابل للتمرير */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            
                            {/* ── الخطوة 1: اختيار نوع الغرفة والإعاشة ── */}
                            {step === 1 && (
                                <>
                                    {/* اختيار الغرفة */}
                                    <div>
                                        <label className="block text-xs font-bold text-[#8B6F52] mb-2">1. اختر نوع الغرفة:</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {ROOM_OPTIONS.map((r) => (
                                                <button
                                                    key={r.id}
                                                    onClick={() => setSelectedRoom(r.id)}
                                                    className={`rounded-xl border p-3 text-right text-xs md:text-sm transition-all duration-150 ${selectedRoom === r.id ? "border-[#8B6F52] bg-[#8B6F52] text-white shadow-md" : "border-[#F1E8DC] bg-white text-[#5C4732] hover:border-[#C9A876]"}`}
                                                >
                                                    <div className="font-bold">{r.label}</div>
                                                    <div className="text-xs opacity-90 tabular-nums">{fmtPrice.format(r.price)} دج</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* اختيار الإعاشة */}
                                    <div>
                                        <label className="block text-xs font-bold text-[#8B6F52] mb-2">2. خيار الإعاشة (اختياري):</label>
                                        <div className="space-y-2">
                                            {MEALS_OPTIONS.map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => setSelectedMeal(m.id)}
                                                    className={`w-full flex justify-between items-center rounded-xl border px-4 py-3 text-xs md:text-sm transition-all duration-150 ${selectedMeal === m.id ? "border-[#8B6F52] bg-[#8B6F52] text-white shadow-md" : "border-[#F1E8DC] bg-white text-[#5C4732] hover:border-[#C9A876]"}`}
                                                >
                                                    <span className="font-bold">{m.label}</span>
                                                    <span className="text-xs tabular-nums">{m.price > 0 ? `+${fmtPrice.format(m.price)} دج` : "مجاناً"}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* معاينة السعر والزر لمتابعة الخطوة الثانية */}
                                    <div className="rounded-2xl bg-[#F1E8DC]/60 p-4 border border-[#F1E8DC]">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm text-[#5C4732]">المبلغ الإجمالي المتوقع:</span>
                                            <span className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#8B6F52] tabular-nums">
                                                {fmtPrice.format(totalPrice)} دج
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full rounded-full bg-[#8B6F52] py-4 font-bold text-white shadow-lg transition-all duration-150 hover:bg-[#5C4732] active:scale-[0.98]"
                                    >
                                        تأكيد الحجز ←
                                    </button>
                                </>
                            )}

                            {/* ── الخطوة 2: رؤية الفاتورة + إدخال الاسم ورقم الهاتف + زر الإرسال النهائي ── */}
                            {step === 2 && (
                                <>
                                    {/* 🧾 الفاتورة / كشف الحجز النهائي */}
                                    <div className="rounded-2xl border border-[#C9A876]/50 bg-white p-5 shadow-sm space-y-3 text-xs md:text-sm">
                                        <div className="flex items-center justify-between border-b border-[#F1E8DC] pb-2 font-bold text-[#8B6F52]">
                                            <span className="text-sm">🧾 فاتورة كشف الحجز:</span>
                                            <span className="bg-[#C9A876]/20 text-[#5C4732] px-2.5 py-0.5 rounded-full border border-[#C9A876]/40">
                                                مطار باتنة — Flyadeal
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center text-[#5C4732]">
                                            <span>الباقة المختارة:</span>
                                            <strong className="font-bold">{selectedPkg.title}</strong>
                                        </div>

                                        <div className="flex justify-between items-center text-[#5C4732]">
                                            <span>تفاصيل الإقامة:</span>
                                            <span className="font-semibold text-xs">11 ليلة مكة + 3 ليالي المدينة</span>
                                        </div>

                                        <div className="flex justify-between items-center text-[#5C4732]">
                                            <span>نوع الغرفة:</span>
                                            <span className="font-bold">{roomObj.label} <span className="text-xs text-[#8B6F52]">({fmtPrice.format(roomObj.price)} دج)</span></span>
                                        </div>

                                        <div className="flex justify-between items-center text-[#5C4732]">
                                            <span>الإعاشة:</span>
                                            <span className="font-bold">{mealObj.label} <span className="text-xs text-[#8B6F52]">{mealObj.price > 0 ? `(+${fmtPrice.format(mealObj.price)} دج)` : ""}</span></span>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#C9A876] font-bold">
                                            <span className="text-[#8B6F52] text-sm">المبلغ الإجمالي النهائي:</span>
                                            <span className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#5C4732] tabular-nums">
                                                {fmtPrice.format(totalPrice)} دج
                                            </span>
                                        </div>
                                    </div>

                                    {/* 📝 إدخال بيانات الاسم الكامل ورقم الهاتف في الأسفل */}
                                    <div className="space-y-3 pt-2">
                                        <label className="block text-xs font-bold text-[#8B6F52]">يرجى ملء الاسم ورقم الهاتف لإكمال الإرسال:</label>
                                        <div>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="الاسم الكامل"
                                                className="w-full rounded-xl border border-[#F1E8DC] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#8B6F52] focus:ring-2 focus:ring-[#C9A876]/40"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                dir="ltr"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="رقم الهاتف (مثال: 06XXXXXXXX)"
                                                className="w-full rounded-xl border border-[#F1E8DC] bg-white px-4 py-3.5 text-sm text-right outline-none focus:border-[#8B6F52] focus:ring-2 focus:ring-[#C9A876]/40"
                                            />
                                        </div>
                                    </div>

                                    {/* الأزرار: تعديل + إرسال */}
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="flex-1 rounded-full border border-[#8B6F52] py-4 font-bold text-[#8B6F52] transition-all hover:bg-[#8B6F52] hover:text-white active:scale-95"
                                        >
                                            → تعديل
                                        </button>
                                        
                                        <button
                                            onClick={submitBooking}
                                            disabled={!canSubmit || submitting}
                                            className="flex-[2] rounded-full bg-[#8B6F52] py-4 font-bold text-white shadow-lg transition-all duration-150 hover:bg-[#5C4732] active:scale-[0.98] disabled:opacity-40"
                                        >
                                            {submitting ? "جاري الإرسال..." : "إرسال ←"}
                                        </button>
                                    </div>

                                    {submitError && (
                                        <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl text-center">
                                            ⚠️ {submitError}
                                        </p>
                                    )}
                                </>
                            )}

                            {/* ── الخطوة 3: تم الإرسال ── */}
                            {step === 3 && (
                                <div className="text-center py-6">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A876]/20 text-3xl">
                                        🕋
                                    </div>
                                    <h4 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-[#5C4732] mb-2">
                                        تم استقبال طلبك بنجاح!
                                    </h4>
                                    <p className="text-sm text-[#8B6F52] mb-4">
                                        شكراً <strong className="text-[#5C4732]">{fullName}</strong>، يتواصل معك مستشارنا لاستكمال إجراءات العمرة من مطار باتنة.
                                    </p>
                                    <button
                                        onClick={closeModal}
                                        className="rounded-full bg-[#8B6F52] px-8 py-3 font-bold text-white transition-all hover:bg-[#5C4732]"
                                    >
                                        إغلاق
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
