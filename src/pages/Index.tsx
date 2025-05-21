
import Layout from "@/components/Layout/Layout";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import SpecialtiesSection from "@/components/Home/SpecialtiesSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CTASection from "@/components/Home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <SpecialtiesSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
