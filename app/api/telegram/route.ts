import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.warn("Telegram bot token or chat ID is missing in env.");
            return NextResponse.json({
                success: true,
                warning: "Telegram environment variables missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local",
            });
        }

        let message = "";

        if (type === "join") {
            message = `⚖️ <b>طلب انضمام جديد - نادي الوعي القانوني</b>\n\n` +
                `👤 <b>الاسم الكامل:</b> ${data.fullName || "غير محدد"}\n` +
                `📧 <b>البريد الإلكتروني:</b> ${data.email || "غير محدد"}\n` +
                `📞 <b>رقم الهاتف:</b> ${data.phone || "غير محدد"}\n` +
                `🎓 <b>التخصص/الكلية:</b> ${data.faculty || "غير محدد"}\n` +
                `⏰ <b>التاريخ:</b> ${new Date().toLocaleString("ar-DZ", { timeZone: "Africa/Algiers", hour12: false })}`;
        } else if (type === "article") {
            message = `📰 <b>مقال جديد مقدم للمجلة الإلكترونية</b>\n\n` +
                `✍️ <b>اسم المؤلف:</b> ${data.authorName || "غير محدد"}\n` +
                `📖 <b>عنوان المقال:</b> ${data.articleTitle || "غير محدد"}\n` +
                `📝 <b>الملخص والنص:</b>\n${data.articleContent || "بدون نص"}\n\n` +
                `⏰ <b>التاريخ:</b> ${new Date().toLocaleString("ar-DZ", { timeZone: "Africa/Algiers", hour12: false })}`;
        } else if (type === "feedback") {
            message = `💡 <b>مقترح/رأي جديد</b>\n\n` +
                `👤 <b>الاسم:</b> ${data.name || "مجهول"}\n` +
                `💭 <b>المقترح/الفكرة:</b>\n${data.feedback || "بدون نص"}\n\n` +
                `⏰ <b>التاريخ:</b> ${new Date().toLocaleString("ar-DZ", { timeZone: "Africa/Algiers", hour12: false })}`;
        } else {
            message = `📩 <b>رسالة جديدة من الموقع</b>\n\n${JSON.stringify(data, null, 2)}`;
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const res = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const resData = await res.json();

        if (!res.ok || !resData.ok) {
            console.error("Telegram API Error:", resData);
            return NextResponse.json({ success: false, error: resData.description }, { status: 500 });
        }

        return NextResponse.json({ success: true, result: resData });
    } catch (error: any) {
        console.error("Failed to send Telegram message:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
