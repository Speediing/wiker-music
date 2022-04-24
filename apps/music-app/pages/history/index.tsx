import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Nav } from "ui";
import { Header } from "../../components/Core/Header";
import { HistoryCard } from "../../components/History/HistoryCard";
import { UseProfile } from "../../hooks/UseProfile";
import { isLoggedIn, loginUrl } from "../../utils/helpers/authHelpers";
import cookie from "react-cookie";
import Head from "next/head";

function History() {
  const router = useRouter();
  const { profileUrl } = UseProfile();
  const { data } = useSWR("me/player/recently-played?limit=50");
  const buttonType = cookie.load("podcastButtonType");
  const options = [
    { name: "History", href: "/history", current: true },
    { name: "Podcasts", href: "/podcast", current: false },
  ];

  React.useEffect(() => {
    let { userToken, refreshToken } = router?.query;
    if (userToken && refreshToken) {
      localStorage?.setItem("userToken", userToken.toString());
      localStorage?.setItem("refreshToken", refreshToken.toString());
      localStorage?.setItem("lastRefresh", new Date().toISOString());
    }
  }, [router]);

  React.useEffect(() => {
    router.replace("/history");
  }, [data]);

  return (
    <div className="bg-black min-h-screen h-full">
      <Head>
        <title>History</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="music history" />
        <meta name="keywords" content="music, meta, nextjs, history" />
        <meta name="author" content="Jason Wiker" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav
        onSearch={(search) => router.push(`/podcast?search=${search}`)}
        options={options}
        loggedIn={isLoggedIn()}
        loginUrl={loginUrl}
        showSearch={true}
        profileUrl={profileUrl}
      />
      <Header header={`Listening History`} />
      <main className="">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {data && (
            <motion.div
              className="bg-zinc-900 rounded-lg shadow px-5 py-6 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-zinc-900"
              >
                {data?.items?.map((item: any, index: number) => {
                  let { track } = item;
                  return (
                    <HistoryCard
                      track={track}
                      index={index}
                      buttonType={buttonType}
                    />
                  );
                })}
              </ul>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default History;
