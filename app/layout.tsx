import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "نادي الوعي القانوني - جامعة باتنة 1",
  description: "من أجل وعيٍ مستديم - كلية الحقوق والعلوم السياسية بجامعة باتنة 1",
};

const themeScript = `try{var t=localStorage.getItem('app_theme');if(t!=='dark'&&t!=='light')t='dark';document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${inter.variable} ${plexArabic.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <div className="ambient" aria-hidden />
        <div className="app-root">{children}</div>
      </body>
    </html>
  );
}
