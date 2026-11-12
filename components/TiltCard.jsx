"use client";

import { useEffect, useRef } from "react";

/**
 * 3D tilt card: sways on its own (idle) and follows the mouse while hovered.
 * Each frame eases toward the target rotation. A glare highlight tracks the pointer.
 * Children can use `[transform:translateZ(..px)]` for parallax depth.
 */
export default function TiltCard({
    children,
    className = "",
    max = 18,          // max degrees while hovered
    idleX = 7.2,       // idle sway amplitude (deg)
    idleY = 12,
    speed = 1,         // idle speed multiplier
    phase = 0,         // idle phase offset so several cards don't move in sync
    scale = 1.03,
    glare = true,
    style,
}) {
    const ref = useRef(null);
    const glareRef = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        let raf = 0;
        let hover = false;
        let mx = 0, my = 0;           // pointer in -1..1
        const cur = { rx: 0, ry: 0, s: 1, gx: 50, gy: 30, go: 0.25 };
        const t0 = performance.now();

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            mx = ((e.clientX - r.left) / r.width) * 2 - 1;
            my = ((e.clientY - r.top) / r.height) * 2 - 1;
            hover = true;
        };
        const onLeave = () => { hover = false; };

        const loop = (now) => {
            const t = ((now - t0) / 1000) * speed + phase;
            let tx, ty, ts, tgx, tgy, tgo;
            if (hover) {
                tx = -my * max;
                ty = mx * max;
                ts = scale;
                tgx = (mx + 1) * 50;
                tgy = (my + 1) * 50;
                tgo = 0.55;
            } else {
                tx = Math.sin(t * 1.6) * idleX;
                ty = Math.cos(t * 1.2) * idleY;
                ts = 1;
                tgx = 50 + (ty / idleY) * 35;
                tgy = 50 - (tx / idleX) * 35;
                tgo = 0.28;
            }
            const k = hover ? 0.12 : 0.06;
            cur.rx += (tx - cur.rx) * k;
            cur.ry += (ty - cur.ry) * k;
            cur.s += (ts - cur.s) * k;
            cur.gx += (tgx - cur.gx) * k;
            cur.gy += (tgy - cur.gy) * k;
            cur.go += (tgo - cur.go) * k;

            el.style.transform = `perspective(1000px) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg) scale(${cur.s.toFixed(3)})`;
            if (glareRef.current) {
                glareRef.current.style.background = `radial-gradient(circle at ${cur.gx}% ${cur.gy}%, rgb(255 255 255 / ${cur.go.toFixed(2)}), transparent 55%)`;
            }
            raf = requestAnimationFrame(loop);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
        };
    }, [max, idleX, idleY, speed, phase, scale]);

    return (
        <div ref={ref} className={`relative will-change-transform [transform-style:preserve-3d] ${className}`} style={style}>
            {children}
            {glare && (
                <div
                    ref={glareRef}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
                />
            )}
        </div>
    );
}
