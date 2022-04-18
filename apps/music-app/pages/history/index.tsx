import {
  MailIcon,
  MusicNoteIcon,
  PhoneIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Nav } from "ui";
import { formatAlbum, formatArtist } from "../../utils/helpers/rymHelper";
import { isLoggedIn } from "../podcast";
const queryString = require("query-string");
export const loginUrl =
  "https://accounts.spotify.com/authorize?" +
  queryString.stringify({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope:
      "user-read-private user-read-email user-read-recently-played user-read-playback-position user-top-read",
    redirect_uri: `${process.env.NEXT_PUBLIC_HOSTNAME}/history`,
  });
function History() {
  const router = useRouter();
  const { data, error } = useSWR("me/player/recently-played?limit=50");

  const options = [
    { name: "History", href: "history", current: true },
    { name: "Podcasts", href: "podcast", current: false },
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
      <Nav
        options={options}
        loggedIn={isLoggedIn()}
        loginUrl={loginUrl}
        showSearch={true}
      />
      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Listening History</h1>
        </div>
      </header>
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
                    <li
                      key={track.name + index.toString()}
                      className="col-span-1 flex flex-col text-center bg-black rounded-lg shadow divide-y divide-zinc-800"
                    >
                      <div className="flex-1 flex flex-col p-8">
                        <img
                          className="w-32 h-32 flex-shrink-0 mx-auto rounded-md"
                          src={track.album.images[0].url}
                          alt=""
                        />
                        <h3 className="mt-6 text-gray-200 text-sm font-medium">
                          {track.name}
                        </h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                          <dt className="sr-only">Title</dt>
                          <dd className="text-gray-200 text-sm">
                            {track.artists[0].name}
                          </dd>
                          <dt className="sr-only">Role</dt>
                          <dd className="mt-3">
                            <Link
                              href={`podcast?search=${track.artists[0].name}`}
                            >
                              <a
                                href={`podcast?search=${track.artists[0].name}`}
                                className="px-2 py-1 text-rose-800 text-xs font-medium bg-rose-100 rounded-full"
                              >
                                Podcasts
                              </a>
                            </Link>
                          </dd>
                        </dl>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-zinc-800">
                          <div className="w-0 flex-1 flex">
                            <a
                              href={`https://www.ultimate-guitar.com/search.php?title=${track?.artists[0].name
                                .split(" ")
                                .join("+")}+${track.name.split(" ").join("+")}`}
                              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-zinc-300 font-medium border border-transparent rounded-bl-lg hover:text-zinc-100"
                            >
                              <MusicNoteIcon
                                className="w-5 h-5 text-gray-200"
                                aria-hidden="true"
                              />
                              <span className="ml-3">Guitar Tab</span>
                            </a>
                          </div>
                          <div className="-ml-px w-0 flex-1 flex">
                            <a
                              href={`https://rateyourmusic.com/release/album/${formatArtist(
                                track?.artists[0].name
                              )}/${formatAlbum(track.album.name)}/`}
                              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-zinc-300 font-medium border border-transparent rounded-br-lg hover:text-zinc-100"
                            >
                              <StarIcon
                                className="w-5 h-5 text-gray-200"
                                aria-hidden="true"
                              />
                              <span className="ml-3">RYM Score</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
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
