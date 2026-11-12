"use client";

import { useEffect, useRef } from "react";
import { Amiri, Tajawal } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-tajawal" });

const IMAGES = [
    "/slidingimages/Capture d’écran 2026-08-19 102106.png",
    "/slidingimages/Capture d’écran 2026-08-19 102156.png",
    "/slidingimages/Capture d’écran 2026-08-19 102307.png",
    "/slidingimages/Capture d’écran 2026-08-19 102336.png",
    "/slidingimages/Capture d’écran 2026-08-19 102359.png",
    "/slidingimages/Capture d’écran 2026-08-19 102420.png",
    "/slidingimages/Capture d’écran 2026-08-19 102442.png",
    "/slidingimages/Capture d’écran 2026-08-19 102511.png",
    "/slidingimages/Capture d’écran 2026-08-19 102535.png",
    "/slidingimages/Capture d’écran 2026-08-19 102603.png",
];

export default function ImageSlider() {
    const trackRef = useRef(null);

    // Duplicate images for seamless infinite scroll
    const doubled = [...IMAGES, ...IMAGES];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let animId;
        let pos = 0;
        const speed = 0.5; // px per frame

        const step = () => {
            pos += speed;
            const halfWidth = track.scrollWidth / 2;
            if (pos >= halfWidth) pos = 0;
            track.style.transform = `translateX(${pos}px)`;
            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);

        const pause = () => cancelAnimationFrame(animId);
        const resume = () => { animId = requestAnimationFrame(step); };
        track.addEventListener("mouseenter", pause);
        track.addEventListener("mouseleave", resume);

        return () => {
            cancelAnimationFrame(animId);
            track.removeEventListener("mouseenter", pause);
            track.removeEventListener("mouseleave", resume);
        };
    }, []);

    return (
        <section
            dir="rtl"
            className={`${amiri.variable} ${tajawal.variable} relative overflow-hidden bg-transparent py-16 font-[family-name:var(--font-arabic)]`}
        >
            {/* Header */}
            <div className="text-center mb-10 px-6">
                <span className="mb-3 inline-block rounded-full border border-[var(--accent)]/40 glass px-5 py-1.5 text-xs font-bold tracking-widest text-[var(--accent)]">
                    ✦ لحظاتنا الجامعية
                </span>
                <h2 className="font-[family-name:var(--font-arabic)] text-3xl md:text-4xl font-extrabold text-[var(--label)]">
                    من أنشطة وفعاليات النادي
                </h2>
                <p className="mt-2 text-sm text-[var(--label)]/70">
                    لقطات من مسيرة نادي الوعي القانوني — جامعة باتنة 1
                </p>
            </div>

            {/* Slider Track */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />

                <div
                    ref={trackRef}
                    className="flex gap-4 will-change-transform"
                    style={{ width: "max-content" }}
                >
                    {doubled.map((src, i) => (
                        <div
                            key={i}
                            className="relative h-52 w-80 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--accent)]/20  transition-transform duration-300 hover:scale-105 hover:border-[var(--accent)]/60"
                        >
                            <img
                                src={encodeURI(src)}
                                alt={`نشاط النادي ${(i % IMAGES.length) + 1}`}
                                className="h-full w-full object-cover"
                                draggable={false}
                            />
                            {/* Golden overlay shimmer on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                <span className="text-xs text-[var(--accent)] font-bold">نادي الوعي القانوني ⚖️</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
