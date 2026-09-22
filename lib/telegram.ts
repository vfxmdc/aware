export async function sendTelegramNotification(type: "join" | "article" | "feedback", data: Record<string, any>) {
    try {
        const response = await fetch("/api/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, data }),
        });
        return await response.json();
    } catch (err) {
        console.error("Error sending Telegram notification:", err);
        return { success: false, error: err };
    }
}
