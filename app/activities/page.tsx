import Navbar from "@/components/Navbar";
import UpcomingActivities from "@/components/UpcomingActivities";
import Footer from "@/components/footer";

export default function ActivitiesPage() {
    return (
        <main className="min-h-screen bg-transparent text-[var(--label)]">
            <Navbar />
            <UpcomingActivities />
            <Footer />
        </main>
    );
}
