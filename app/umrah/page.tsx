import Navbar from "@/components/Navbar";
import UmrahPackages from "@/components/UmrahPackages";
import Footer from "@/components/footer";

export default function UmrahPage() {
  return (
    <main className="min-h-screen bg-transparent text-[var(--label)]">
      <Navbar />
      <UmrahPackages />
      <Footer />
    </main>
  );
}
