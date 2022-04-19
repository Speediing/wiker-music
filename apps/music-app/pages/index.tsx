import CTA from "../components/Marketing/CTA";
import Hero from "../components/Marketing/Hero";
import Stats from "../components/Marketing/Stats";

export default function Index() {
  return (
    <div className="bg-black">
      <main>
        {/* Hero section */}
        <Hero />
        {/* Testimonial/stats section */}
        <Stats />
        {/* CTA section */}
        <CTA />
      </main>
    </div>
  );
}
