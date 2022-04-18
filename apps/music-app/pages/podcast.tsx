import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  MailIcon,
  MusicNoteIcon,
  UsersIcon,
} from "@heroicons/react/solid";
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
  console.log(context.query);
  // console.log("getServerSideProps");
  if (!context.query.search) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }
  let test = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/podcastSearch?search=${context.query.search}`
  );
  let data = await test.json();
  return { props: { data } };
}

export default function Podcast({ data }: any) {
  const options: NavOption[] = [
    { name: "History", href: "history", current: false },
    { name: "Podcasts", href: "podcast", current: true },
  ];
  const router = useRouter();
  const [search, setSearch] = useState("");
  // if (isLoggedIn()) {
  //   options.unshift({ name: "History", href: "history", current: false });
  // }

  return (
    <div className="bg-black h-screen">
      <Nav options={options} loggedIn={isLoggedIn()} loginUrl={loginUrl} />
      {!data && (
        <>
          <div className="mt-10 flex justify-center">
            <div className="max-w-5xl">
              <label htmlFor="email" className="sr-only text-white">
                Search Here
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-rose-500 bg-black text-white focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
                onChange={(e) => setSearch(e.target.value)}
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
        <>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">
                Podcast Results for{" "}
              </h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {data.map((podcast: any) => (
                  <li key={podcast.uri}>
                    <a
                      href={podcast.external_urls.spotify}
                      className="block hover:bg-gray-50"
                    >
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-full"
                              src={podcast.images[0].url}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="text-sm font-medium text-indigo-600 truncate">
                                {podcast.name}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                {/* <MusicNoteIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              /> */}
                                <span className="truncate">
                                  {podcast.description}
                                </span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">
                                  Released:
                                  <time dateTime={podcast.release_date}>
                                    {podcast.release_date}
                                  </time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <MusicNoteIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-rose-400"
                                    aria-hidden="true"
                                  />
                                  {`${podcast.artist} - ${podcast.role}`}
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
            </div>
          </main>
        </>
      )}
    </div>
  );
}
