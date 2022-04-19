import { MusicNoteIcon, StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import { formatAlbum, formatArtist } from "../../utils/helpers/rymHelper";
interface HistoryCardProps {
  track: any;
  index: number;
}
export const HistoryCard = ({ track, index }: HistoryCardProps) => {
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
        <h3 className="mt-6 text-gray-200 text-sm font-medium">{track.name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-200 text-sm">{track.artists[0].name}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <Link href={`podcast?search=${track.artists[0].name}`}>
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
              <StarIcon className="w-5 h-5 text-gray-200" aria-hidden="true" />
              <span className="ml-3">RYM Score</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
