import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  MailIcon,
  MusicNoteIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, CommandPallate, Nav, NavOption } from "ui";
import { loginUrl } from "./history";

export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("refreshToken") !== null;
  }
  return false;
};
export async function getServerSideProps(context: any) {
  if (!context.query.search) {
    return {
      props: {},
    };
  }
  let podcasts = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/podcastSearch?search=${context.query.search}`
  );
  let data;
  try {
    data = await podcasts.json();
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
  }
}

export default function Podcast({ data }: any) {
  const options: NavOption[] = [
    { name: "History", href: "history", current: false },
    { name: "Podcasts", href: "podcast", current: true },
  ];
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="bg-black h-screen">
      <Nav
        onSearch={(search) => router.push(`/podcast?search=${search}`)}
        options={options}
        loggedIn={isLoggedIn()}
        loginUrl={loginUrl}
        showSearch={false}
      />
      {!data && (
        <>
          <div className="mt-24 flex justify-center">
            <div className=" w-96 ">
              <label htmlFor="email" className="sr-only text-white">
                Search Here
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-rose-500 bg-black text-white focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Radiohead, The Strokes, ..."
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    router.push(`/podcast?search=${search}`);
                  }
                }}
              />
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="max-w-sm">
              <Button
                text="Search"
                onClick={() => router.push(`/podcast?search=${search}`)}
              />
            </div>
          </div>
        </>
      )}
      {data && (
        <div>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">
                Podcast Results for {data.artistName}
              </h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-zinc-900 rounded-lg shadow px-5 py-6 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 shadow overflow-hidden rounded-md"
            >
              <ul role="list" className="divide-y divide-gray-700">
                {data.eps.map((podcast: any) => (
                  <li key={podcast.uri}>
                    <a
                      href={podcast.external_urls.spotify}
                      className="block hover:bg-zinc-600"
                    >
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-sm"
                              src={podcast.images[0].url}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="text-sm font-medium text-white truncate">
                                {podcast.name}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-400">
                                <span className="truncate">
                                  {podcast.description}
                                </span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-200">
                                  Released:
                                  <time dateTime={podcast.release_date}>
                                    {podcast.release_date}
                                  </time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-400">
                                  <MusicNoteIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-rose-400"
                                    aria-hidden="true"
                                  />
                                  {`${podcast.artist} ${podcast.role}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <ChevronRightIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </main>
        </div>
      )}
    </div>
  );
}
