import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Nav, NavOption } from "ui";
import { Header } from "../components/Core/Header";
import PodcastRow from "../components/Podcasts/PodcastRow";
import { PodcastSearch } from "../components/Podcasts/PodcastSearch";
import { UseProfile } from "../hooks/UseProfile";
import { getPodcastsFromArtist } from "../utils/helpers/api/controllers/PodcastController";
import { isLoggedIn, loginUrl } from "../utils/helpers/authHelpers";

export async function getServerSideProps(context: any) {
  if (!context.query.search) {
    return {
      props: {},
    };
  }

  try {
    let data = await getPodcastsFromArtist(context.query.search);
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
      <Head>
        <title>Podcasts</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="podcast history" />
        <meta name="keywords" content="music, meta, nextjs, podcasts" />
        <meta name="author" content="Jason Wiker" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
