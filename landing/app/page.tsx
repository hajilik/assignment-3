import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import DeveloperTeaser from "@/components/DeveloperTeaser";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <HowItWorks />
        <UseCases />
        <DeveloperTeaser />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
