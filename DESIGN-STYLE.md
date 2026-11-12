# Design Style Guide — "Frosted Glass" (Arabic / RTL)

Give this file to the AI at the start of a redesign. It describes the look of the clinic booking site so another website can be rebuilt in the same style.

**Instruction to the AI:** Redesign the website to match this style exactly: same colors, glass surfaces, shapes, spacing, motion and components. Keep the website's own content, pages and features; change only how it looks and feels (unless I ask otherwise). Implement the tokens and component classes below as written.

---

## 1. The feel in one paragraph

Calm, premium, Apple-like. Translucent "frosted glass" cards float over a soft colored background glow. Everything is rounded (pill buttons, 20–30px card corners). Few borders, soft deep shadows, a thin white highlight on the top edge of every glass surface. One strong blue accent for actions; everything else is quiet grey text. Generous white space, big bold headings, short helpful sub-text. Smooth spring motion. Arabic first (RTL), works perfectly on phones.

- **Light mode:** grey-lavender background with periwinkle, violet and aqua glows, milky white glass, deep-blue gradient pill buttons, near-black headings.
- **Dark mode (default):** almost-black navy background with deep blue, violet and teal glows, dark smoky glass, bright blue accent.
- Dark is the default. A sun/moon button switches themes and the choice is remembered.

## 2. Tech stack (adapt if the site differs)

- Next.js (App Router) + React + TypeScript + Tailwind CSS v4 (`@import "tailwindcss"`, `@theme`).
- Icons: `lucide-react` (thin stroke, 16–20px).
- Fonts (via `next/font/google`): **Inter** for Latin letters and digits, **IBM Plex Sans Arabic** (400/500/600/700) for Arabic. Never add letter-spacing to Arabic.
- `<html lang="ar" dir="rtl">`. Use logical classes (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`) rather than left/right.

## 3. Color tokens (copy exactly)

Colors are CSS variables, redefined on `html.dark`. Tailwind maps them so you can write `bg-accent`, `text-secondary`, `border-hairline`, `bg-fill`, etc.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: var(--font-inter), var(--font-arabic), -apple-system, "Segoe UI", Tahoma, sans-serif;
  --color-bg: var(--bg);
  --color-label: var(--label);
  --color-secondary: var(--secondary);
  --color-tertiary: var(--tertiary);
  --color-hairline: var(--hairline);
  --color-fill: var(--fill);
  --color-fill-strong: var(--fill-strong);
  --color-surface: var(--surface);
  --color-accent: var(--accent);
  --color-accent-ink: var(--accent-ink);
  --color-success: var(--success);
  --color-success-ink: var(--success-ink);
  --color-warning: var(--warning);
  --color-warning-ink: var(--warning-ink);
  --color-danger: var(--danger);
  --color-danger-ink: var(--danger-ink);
  --color-violet: var(--violet);
  --color-violet-ink: var(--violet-ink);
  --color-teal: var(--teal);
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
}

:root {
  color-scheme: light;
  --bg: #dfe1ea;
  --label: #14161f;
  --secondary: #5a6075;
  --tertiary: #8b90a3;
  --hairline: rgb(40 44 70 / 0.09);
  --fill: rgb(60 66 110 / 0.06);
  --fill-strong: rgb(60 66 110 / 0.11);
  --surface: #f1f2f7;
  --input: rgb(255 255 255 / 0.5);
  --thumb: rgb(255 255 255 / 0.92);
  --glass: rgb(236 238 246 / 0.55);
  --glass-strong: rgb(240 241 248 / 0.8);
  --glass-border: rgb(255 255 255 / 0.7);
  --glass-ring: rgb(70 76 120 / 0.08);
  --glass-shadow: 0 1px 2px rgb(40 44 80 / 0.05), 0 18px 40px -18px rgb(60 60 120 / 0.28);
  --float-shadow: 0 2px 6px rgb(40 44 80 / 0.06), 0 30px 70px -22px rgb(60 60 120 / 0.38);
  --highlight: inset 0 1px 0 rgb(255 255 255 / 0.9), inset 0 -1px 0 rgb(255 255 255 / 0.25);
  --accent: #2563c9;
  --accent-ink: #1d4fa8;
  --success: #2fb457;  --success-ink: #177a36;
  --warning: #f59a0b;  --warning-ink: #a85600;
  --danger: #ef3b33;   --danger-ink: #c4231b;
  --violet: #8466e0;   --violet-ink: #6345c7;
  --teal: #19a8b5;
  --ambient-1: rgb(132 108 230 / 0.42);
  --ambient-2: rgb(110 150 230 / 0.34);
  --ambient-3: rgb(90 205 215 / 0.38);
  --ambient-4: rgb(165 120 235 / 0.3);
}

html.dark {
  color-scheme: dark;
  --bg: #06080f;
  --label: #f2f4f9;
  --secondary: #a3abbc;
  --tertiary: #6f7789;
  --hairline: rgb(255 255 255 / 0.08);
  --fill: rgb(255 255 255 / 0.055);
  --fill-strong: rgb(255 255 255 / 0.1);
  --surface: #131722;
  --input: rgb(255 255 255 / 0.05);
  --thumb: rgb(255 255 255 / 0.16);
  --glass: rgb(26 30 44 / 0.5);
  --glass-strong: rgb(30 34 48 / 0.74);
  --glass-border: rgb(255 255 255 / 0.08);
  --glass-ring: rgb(0 0 0 / 0.35);
  --glass-shadow: 0 1px 2px rgb(0 0 0 / 0.3), 0 18px 44px -16px rgb(0 0 0 / 0.7);
  --float-shadow: 0 2px 8px rgb(0 0 0 / 0.4), 0 32px 80px -20px rgb(0 0 0 / 0.85);
  --highlight: inset 0 1px 0 rgb(255 255 255 / 0.07);
  --accent: #0a84ff;
  --accent-ink: #5aa9ff;
  --success: #30d158;  --success-ink: #4cd773;
  --warning: #ff9f0a;  --warning-ink: #ffb340;
  --danger: #ff453a;   --danger-ink: #ff6a61;
  --violet: #a78bfa;   --violet-ink: #c4b5fd;
  --teal: #2dd4bf;
  --ambient-1: rgb(10 132 255 / 0.26);
  --ambient-2: rgb(139 92 246 / 0.2);
  --ambient-3: rgb(20 184 166 / 0.13);
  --ambient-4: rgb(255 159 10 / 0.06);
}
```

**Color rules**
- `label` for main text, `secondary` for sub-text, `tertiary` for hints and placeholders.
- `accent` only for the main action, the selected state and links. One primary button per area.
- Tinted icon squares: `bg-accent/12 text-accent-ink` (or violet/teal/success versions) in a 32–44px rounded square.
- Status colors: green = confirmed/open, orange = pending/warning, red = cancelled/danger.

## 4. Base layer

```css
html { background-color: var(--bg); scroll-behavior: smooth; }
body {
  color: var(--label); font-family: var(--font-sans); font-size: 15px; line-height: 1.65;
  letter-spacing: 0; -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent;
}
/* Colored glow behind everything: <div class="ambient" aria-hidden /> as the first child of <body> */
.ambient {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(60vmax 48vmax at 100% -6%, var(--ambient-1), transparent 62%),
    radial-gradient(46vmax 40vmax at -6% 28%, var(--ambient-2), transparent 62%),
    radial-gradient(52vmax 42vmax at 42% 106%, var(--ambient-3), transparent 62%),
    radial-gradient(36vmax 30vmax at 104% 78%, var(--ambient-4), transparent 62%),
    var(--bg);
}
/* Wrap the app content in .app-root so it sits above the glow */
.app-root { position: relative; z-index: 1; min-height: 100dvh; display: flex; flex-direction: column; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
button:not(:disabled):active, a:active { transform: scale(0.97); }
/* Numbers, times, codes and phone numbers inside Arabic text */
.num { font-variant-numeric: tabular-nums; direction: ltr; unicode-bidi: isolate; display: inline-block; }
.tnum { font-variant-numeric: tabular-nums; }
```

Add transitions on `button, a, input, select, textarea` (background, color, border, shadow 0.2s; transform 0.18s spring).

**Theme without a flash:** put this inline script in `<head>`:

```js
try{var t=localStorage.getItem('app_theme');if(t!=='dark'&&t!=='light')t='dark';document.documentElement.classList.add(t)}catch(e){}
```

## 5. Component classes (put in `@layer components`)

```css
.glass        { background: var(--glass); border: 1px solid var(--glass-border);
                box-shadow: var(--highlight), 0 0 0 .5px var(--glass-ring), var(--glass-shadow);
                backdrop-filter: blur(22px) saturate(170%); -webkit-backdrop-filter: blur(22px) saturate(170%); }
.glass-strong { background: var(--glass-strong); border: 1px solid var(--glass-border);
                box-shadow: var(--highlight), 0 0 0 .5px var(--glass-ring), var(--float-shadow);
                backdrop-filter: blur(32px) saturate(180%); -webkit-backdrop-filter: blur(32px) saturate(180%); }
.card         { /* same as .glass */ border-radius: 22px; }
.card-hover:hover { transform: translateY(-1px); background: var(--glass-strong); }
.inset        { background: var(--input); border: 1px solid var(--hairline); border-radius: 18px; } /* grouped box inside a card */

.btn { display:inline-flex; align-items:center; justify-content:center; gap:.45rem; height:40px; padding:0 1.1rem;
       border-radius:999px; font-size:14.5px; font-weight:600; line-height:1; white-space:nowrap; color:var(--label); }
.btn-sm { height:34px; padding:0 .85rem; font-size:13.5px; }
.btn-lg { height:50px; padding:0 1.6rem; font-size:16px; }
.btn-primary { color:#fff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 82%, #fff), color-mix(in srgb, var(--accent) 88%, #000));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / .28), 0 1px 2px rgb(0 0 0 / .08), 0 8px 20px -8px color-mix(in srgb, var(--accent) 70%, transparent); }
.btn-primary:hover { filter: brightness(1.07); }
.btn-glass   { /* glass-strong background + border + highlight */ }
.btn-tinted  { color: var(--accent-ink); background: color-mix(in srgb, var(--accent) 12%, transparent); }
.btn-plain   { background: var(--fill); }      .btn-plain:hover { background: var(--fill-strong); }
.btn-ghost   { background: transparent; }     .btn-ghost:hover { background: var(--fill); }
.btn-success { color: var(--success-ink); background: color-mix(in srgb, var(--success) 15%, transparent); }
.btn-danger  { color: var(--danger-ink);  background: color-mix(in srgb, var(--danger) 11%, transparent); }
.btn-destructive { color:#fff; background: linear-gradient(180deg, color-mix(in srgb, var(--danger) 86%, #fff), var(--danger)); }
.icon-btn { width:38px; height:38px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; }
.icon-btn:hover { background: var(--fill); }

.input { width:100%; height:44px; padding:0 .95rem; border-radius:14px; background:var(--input);
         border:1px solid var(--hairline); color:var(--label); font-size:15px; }
.input::placeholder { color: var(--tertiary); }
.input:focus { outline:none; border-color: color-mix(in srgb, var(--accent) 60%, transparent);
               box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 16%, transparent); }

/* Segmented control (used instead of on/off switches and tabs) */
.segmented { display:inline-flex; gap:2px; padding:3px; border-radius:999px; background:var(--fill); border:1px solid var(--hairline); }
.segmented > button { height:32px; padding:0 .95rem; border-radius:999px; font-size:13.5px; font-weight:500; color:var(--secondary); }
.segmented > [data-active="true"] { background:var(--thumb); color:var(--label); font-weight:600;
                                    box-shadow: 0 1px 2px rgb(13 21 38 / .1), 0 3px 10px -3px rgb(13 21 38 / .14); }

/* Selectable pills */
.chip { height:36px; padding:0 .95rem; border-radius:999px; font-size:14px; background:var(--input); border:1px solid var(--hairline); }
.chip[data-active="true"] { background: var(--accent); color:#fff; border-color: transparent; }

/* Status pills: .badge + bg-success/15 text-success-ink etc.; .badge-dot adds a small dot */
.badge { display:inline-flex; align-items:center; gap:.35rem; height:24px; padding:0 .6rem; border-radius:999px; font-size:12px; font-weight:600; }

.eyebrow { font-size:13px; font-weight:500; color:var(--secondary); }
.page-title { font-size: clamp(1.6rem, 2.4vw, 2rem); font-weight:700; line-height:1.35; }
.section-title { font-size:17px; font-weight:600; }
.skeleton { border-radius:12px; background: linear-gradient(90deg, var(--fill), var(--fill-strong), var(--fill)); background-size:200% 100%; animation: shimmer 1.4s linear infinite; }

/* Sticky top bar with a progressive blur (like iOS) */
.top-blur { position: sticky; top: 0; z-index: 30; }
.top-blur::before { content:""; position:absolute; inset:0 0 -18px 0; z-index:-1;
  background: linear-gradient(to bottom, color-mix(in srgb, var(--bg) 62%, transparent), transparent);
  backdrop-filter: blur(18px) saturate(160%);
  mask-image: linear-gradient(to bottom, #000 55%, transparent); }
```

Respect accessibility: under `prefers-reduced-motion` cut animations to ~0, and under `prefers-reduced-transparency` give glass surfaces a solid `var(--surface)` background with no blur.

## 6. Motion

All motion uses the spring curve `cubic-bezier(0.32, 0.72, 0, 1)`.

| Class | Use | Animation |
|---|---|---|
| `.enter` | page sections on load (stagger with `[animation-delay:120ms]`) | fade + rise 10px, 0.45s |
| `.pop` | dropdowns, menus | fade + scale .96, 0.22s |
| `.dialog-in` | dialogs | scale .96 + rise 8px, 0.32s |
| `.sheet-up` | bottom sheets on phones | slide up from 100%, 0.42s |
| `.toast-in` | toasts | rise 16px + scale, 0.38s |
| `.live-dot` | "open now" dot | pulsing green ring, 1.8s loop |

**3D tilt card** (hero highlight card): sways on its own and follows the mouse while hovered. Each frame, ease toward the target. Idle target: `rotateX = sin(t·1.6)·7.2°` and `rotateY = cos(t·1.2)·12°`. Hover target: up to ±18° based on the mouse position, `scale 1.03`. Use `perspective(1000px)` and switch it off under reduced motion.

## 7. Layout patterns

- **Content width:** `max-w-6xl mx-auto px-4 sm:px-6`. Sections are separated by `pb-14`–`pb-20`.
- **Hero:** two columns on large screens (`lg:grid-cols-[1.15fr_1fr]`).
  - Text side: a small glass pill tag with an icon, a huge bold title (`text-[38px] sm:text-[56px]`), a secondary lead paragraph (17–19px), and a live status line with a pulsing dot.
  - Buttons: one primary `btn-lg` with an arrow icon, plus one `btn-glass btn-lg`.
  - Under the buttons: a row of small green-check benefits.
  - Other side: a glass card holding the key live info (e.g. "next available" with a big 44px number), with a blurred accent blob in one corner.
- **Info cards grid:** `grid gap-4 md:grid-cols-2 lg:grid-cols-3`, each a `.card p-6` with a tinted icon square + `section-title`, and rows split by `divide-y divide-hairline`.
- **How it works:** three cards, each with an icon square, a large faint step number (`text-fill-strong`), a title and a short text.
- **Public header:** a sticky `top-blur` bar with the logo (a gradient app-icon square + name) on one side, and on the other a ghost link, a primary small button and a theme toggle `icon-btn`.
- **Admin / app shell:**
  - Desktop: a floating glass side rail with an icon and a tiny label for each item, the active item in a filled accent circle, and number badges.
  - Phones: a floating glass bottom tab bar.
  - Top bar: a pill-shaped search field with a `Ctrl K` hint, plus a primary "new" button.
- **Page header:** `eyebrow` above `page-title`, with actions aligned to the other side.
- **Settings:** a big `segmented` tab bar for sections. Each section is a card with a title and a description. Rows sit inside an `.inset` box: label and hint on one side, the control (w-56) on the other. A sticky save bar appears only when there are unsaved changes.
- **Empty states:** a centered big tertiary icon, a short sentence and an optional tinted button.
- **Lists:** `.row` hover = `bg-fill`, avatar circles with initials and gradient backgrounds.
- **Footer:** a hairline top border, small secondary text, centered.

## 8. Interactive components (custom, never browser defaults)

- **Dropdown (Select):** never use the native `<select>` list.
  - Trigger: looks like `.input`, with a chevron that rotates 180° when open and an accent focus ring while open.
  - Panel: `glass-strong rounded-[20px] p-1.5 pop`. Render it in a portal to `<body>` with `position: fixed`, so cards and sheets can't clip it. Flip it upward when there is no room below. Close on outside click and on Escape (Escape closes only the dropdown, not the dialog under it).
  - Options: `rounded-[14px] h-10 hover:bg-fill`. The selected option is `text-accent-ink font-semibold` with a check icon.
  - Keyboard: arrow keys move between options.
- **Date picker:** never use the native date popup.
  - Trigger: an input-style button showing the full Arabic date and a calendar icon.
  - Panel: the same glass panel, with a month header and prev/next `icon-btn`s, and a 7-column grid with the week starting **Saturday**.
  - Day states: today is shown as `bg-accent/10 text-accent-ink`, the selected day as solid `bg-accent text-white` with a glow, and disabled days as faded.
  - Footer: "اليوم" and "إغلاق" ghost buttons.
- **Month availability calendar (read-only):** day cells are `h-12 rounded-2xl`.
  - Open days: glass input style with a small green dot. Closed or full days: `bg-fill text-tertiary`. Selected day: accent.
  - Next to the grid (on large screens), the chosen day's times appear as tiles, grouped into morning and evening with sun and moon icons.
  - Booked times: `bg-fill text-tertiary`, crossed out, with a tiny red "محجوز" label underneath.
- **Day strip picker:** horizontally scrolling 66px day tiles (weekday, big number, "N متاح") with snap scrolling, plus a grid of time tiles (`h-12 rounded-2xl`, the selected one solid accent).
- **Sheets/dialogs:** a dim overlay with a 2px blur and a `glass-strong` panel.
  - Phones: slides up from the bottom with a grab handle and a 30px top radius.
  - Desktop: a centered dialog, or a drawer from the side.
  - Header: title + subtitle, with a round close button on a `bg-fill` circle. Buttons sit in a sticky footer above a hairline. Focus stays trapped inside, and Escape closes it.
- **Confirm dialog:** a small centered glass card (rounded-28, max-w 360) with the title, a message, and two equal buttons (plain + primary or destructive). Use it instead of `window.confirm`.
- **Toasts:** a glass-strong pill at the bottom center, with a colored icon and an optional small tinted action button. It disappears after about 3.5s.
- **Menus:** a glass-strong popover (rounded-20) with rows of icon + label (h-10, rounded-14).
- **Skeletons:** shimmer blocks with the same shapes as the content they replace.

## 9. Writing and RTL rules

- Arabic UI text: short, warm and clear. Buttons are verbs ("احجز موعداً", "حفظ", "رجوع").
- Show times as 24h `HH:mm`. Wrap numbers, codes and phone numbers in `.num` so they read left-to-right.
- Write dates in Arabic (`Intl.DateTimeFormat('ar-DZ', …)`) with Latin digits.
- Use proper Arabic plural forms for counts (موعد واحد / موعدان / 3 مواعيد / 11 موعداً).
- In RTL the "next" chevron points left and the "previous" chevron points right.
- Mobile first: 16px side padding, buttons stack on phones (`flex-col sm:flex-row`), no horizontal page scroll, and room left for the bottom tab bar and safe areas.

## 10. Checklist for the redesign

1. Add fonts, `dir="rtl"`, the theme script, `.ambient` and `.app-root`.
2. Paste the tokens (section 3) and the base and component classes (sections 4–5).
3. Rebuild the header, hero, cards, forms and footer using the patterns in section 7.
4. Replace every native `<select>` and date input with the custom ones (section 8).
5. Add motion (section 6). Check both themes, phone width, reduced motion and keyboard focus.
