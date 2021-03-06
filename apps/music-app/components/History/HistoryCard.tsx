import { MusicNoteIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "ui";
import { formatAlbum, formatArtist } from "../../utils/helpers/rymHelper";
interface HistoryCardProps {
  track: any;
  index: number;
  buttonType: "badge" | "button";
}
export const HistoryCard = ({ track, index, buttonType }: HistoryCardProps) => {
  return (
    <li
      key={track.name + index.toString()}
      className="col-span-1 flex flex-col text-center bg-black rounded-lg shadow divide-y divide-zinc-800"
    >
      <div className="flex-1 flex flex-col p-8">
        <div className="w-32 h-32 flex-shrink-0 mx-auto rounded-md">
          <Image
            width={128}
            height={128}
            src={track.album.images[0].url}
            alt=""
          />
        </div>
        <h3 className="mt-6 text-gray-200 text-sm font-medium">{track.name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-200 text-sm">{track.artists[0].name}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3 flex justify-center">
            {buttonType === "badge" ? (
              <Link href={`podcast?search=${track.artists[0].name}`}>
                <a className="px-2 py-1 text-rose-900 text-xs font-medium bg-rose-100 rounded-full hover:bg-rose-300">
                  Podcasts
                </a>
              </Link>
            ) : (
              <Link
                href={`podcast?search=${track.artists[0].name}`}
                passHref={true}
              >
                <button className="mt-2 block rounded-md border px-9 py-3 border-rose-500 bg-black text-base font-small text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10">
                  Podcasts
                </button>
              </Link>
            )}
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-zinc-800">
          <div className="w-0 flex-1 flex">
            <Link
              href={`https://www.ultimate-guitar.com/search.php?title=${track?.artists[0].name
                .split(" ")
                .join("+")}+${track.name.split(" ").join("+")}`}
              passHref={true}
            >
              <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-zinc-300 font-medium border border-transparent rounded-bl-lg hover:bg-zinc-800">
                <MusicNoteIcon
                  className="w-5 h-5 text-gray-200"
                  aria-hidden="true"
                />
                <span className="ml-3">Guitar Tab</span>
              </a>
            </Link>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <Link
              href={`https://rateyourmusic.com/release/album/${formatArtist(
                track?.artists[0].name
              )}/${formatAlbum(track.album.name)}/`}
              passHref={true}
            >
              <a className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-zinc-300 font-medium border border-transparent rounded-br-lg hover:bg-zinc-800">
                <StarIcon
                  className="w-5 h-5 text-gray-200"
                  aria-hidden="true"
                />
                <span className="ml-3">RYM Score</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
