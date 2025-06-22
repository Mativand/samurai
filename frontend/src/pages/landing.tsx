import Header from "@/components/header";
import Hero from "@/components/hero";
import NewsSection from "@/components/news-section";
import DonationSection from "@/components/donation-section";
import RegistrationSection from "@/components/registration-section";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-samurai-deep text-white">
      <Header />
      <Hero />
      <NewsSection />
      <DonationSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
}
