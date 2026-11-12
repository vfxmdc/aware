import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/footer";

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-transparent text-[var(--label)]">
            <Navbar />
            <FAQ />
            <Footer />
        </main>
    );
}
