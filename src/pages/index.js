import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyMalawi from "@/components/WhyMalawi";
import ToursSection from "@/components/ToursSection";
import gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero variant="transparent"/>
      <ToursSection variant="light"/>
      <gallery variant="light"/>
    </>
  );
}
