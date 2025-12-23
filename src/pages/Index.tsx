import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SportsCategories from "@/components/SportsCategories";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <SportsCategories />
        <HowItWorks />
        <Pricing />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
