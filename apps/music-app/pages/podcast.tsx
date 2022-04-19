import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Nav, NavOption } from "ui";
import { Header } from "../components/Core/Header";
import PodcastRow from "../components/Podcasts/PodcastRow";
import { PodcastSearch } from "../components/Podcasts/PodcastSearch";
import { UseProfile } from "../hooks/UseProfile";
import { isLoggedIn, loginUrl } from "../utils/helpers/authHelpers";

export async function getServerSideProps(context: any) {
  if (!context.query.search) {
    return {
      props: {},
    };
  }
  let podcasts = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/podcastSearch?search=${context.query.search}`
  );
  try {
    let data = await podcasts.json();
    return { props: { data } };
  } catch (error) {
    return { props: { data: {} } };
  }
}

export default function Podcast({ data }: any) {
  const [options, setOptions] = useState<NavOption[]>([
    { name: "History", href: "/history", current: false },
    { name: "Podcasts", href: "/podcast", current: true },
  ]);
  const { profileUrl } = UseProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      setOptions([{ name: "Podcasts", href: "/podcast", current: true }]);
    }
  }, []);

  return (
    <div className="bg-black h-screen">
      <Nav
        onSearch={(search) => router.push(`/podcast?search=${search}`)}
        options={options}
        loggedIn={isLoggedIn()}
        loginUrl={loginUrl}
        showSearch={router.query.search !== undefined}
        profileUrl={profileUrl}
      />
      {!data && <PodcastSearch />}
      {!data?.eps ||
        (data?.eps?.length === 0 && (
          <Header header={` No Podcast Results for ${router.query.search}`} />
        ))}
      {data?.eps?.length > 0 && (
        <div>
          <Header header={`  Podcast Results for ${data.artistName}`} />
          <main className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 shadow overflow-hidden rounded-md"
            >
              <ul role="list" className="divide-y divide-gray-700">
                {data.eps.map((podcast: any) => (
                  <PodcastRow podcast={podcast} />
                ))}
              </ul>
            </motion.div>
          </main>
        </div>
      )}
    </div>
  );
}
