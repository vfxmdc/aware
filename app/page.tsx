import HeroSection from "@/components/jj";
import Description from "@/components/Description";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import ImageSlider from "@/components/ImageSlider";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-transparent text-[var(--label)]">
      <HeroSection />
      <Description />
      <WhyChooseUs />
      <FAQ />
      <ImageSlider />
      <Footer />
    </main>
  );
}
