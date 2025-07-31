import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyMalawi from "@/components/WhyMalawi";
import FeaturedTours from "@/components/FeaturedTours";
import FeaturedHolidays from "@/components/FeaturedHolidays";
import gallery from "@/components/Gallery";
import HighlightsGrid from "@/components/HighlightsGrid";
import TravelNewsBlog from "@/components/TravelNewsBlog";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero variant="transparent"/>
       <FeaturedTours variant="light"/>
      <FeaturedHolidays variant="light"/>
      <HighlightsGrid variant="light"/>
      <TravelNewsBlog variant="light"/>
      <gallery variant="light"/>
    </>
  );
}
