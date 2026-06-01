import Features from "@/components/landing/Features/page";
import Footer from "@/components/landing/Footer/page";
import Hero from "@/components/landing/Hero/page";
import Integration from "@/components/landing/Integration/page";
import Navbar from "@/components/landing/nav";
import Pricing from "@/components/landing/Pricing/page";
import SocialProof from "@/components/landing/social/page";

const Page = () => {
  return (
    <main className="w-full flex flex-col relative z-10">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <Integration/>
      <Pricing/>
      <Footer/>
    </main>
  );
};

export default Page;
