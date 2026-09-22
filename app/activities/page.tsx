import Navbar from "@/components/Navbar";
import UpcomingActivities from "@/components/UpcomingActivities";
import Footer from "@/components/footer";

export default function ActivitiesPage() {
    return (
        <main className="min-h-screen bg-[#0A1128] text-[#F4F6FC]">
            <Navbar />
            <UpcomingActivities />
            <Footer />
        </main>
    );
}
