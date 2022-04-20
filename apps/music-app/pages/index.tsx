import CTA from "../components/Marketing/CTA";
import Hero from "../components/Marketing/Hero";
import Stats from "../components/Marketing/Stats";
import { createRedisClient } from "../utils/helpers/redisHelpers";

export async function getStaticProps() {
  const redis = createRedisClient();
  let searchCount: any = await redis.get("searchCount");
  const stats = [
    { label: "Founded", value: "2022" },
    { label: "Employees", value: "1" },
    { label: "Podcast Searches", value: searchCount },
    { label: "Value", value: "Infinite" },
  ];
  return {
    props: {
      stats,
    },
    revalidate: 10, // In seconds
  };
}
export default function Index({ stats }: any) {
  return (
    <div className="bg-black">
      <main>
        {/* Hero section */}
        <Hero />
        {/* Testimonial/stats section */}
        <Stats stats={stats} />
        {/* CTA section */}
        <CTA />
      </main>
    </div>
  );
}
