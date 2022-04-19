import { ChevronRightIcon, MusicNoteIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export interface PodcastRowProps {
  podcast: any;
}
function PodcastRow({ podcast }: PodcastRowProps) {
  return (
    <li key={podcast.uri}>
      <Link href={podcast.external_urls.spotify}>
        <a className="block hover:bg-zinc-600">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <div className="flex-shrink-0">
                <Image
                  className="h-12 w-12 rounded-sm"
                  width={48}
                  height={48}
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
                    <span className="truncate">{podcast.description}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-200">
                      Released:{" "}
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
                className="h-5 w-5 mt-7 sm:mt-0 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="md:hidden xs:block  px-4 pb-4 sm:px-6">
            <div className="mt-2  flex flex-row justify-between">
              <p className="flex items-center text-sm text-gray-400">
                <MusicNoteIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-rose-400"
                  aria-hidden="true"
                />
                {`${podcast.artist} ${podcast.role}`}
              </p>
              <p className="text-sm text-gray-200 ">
                Released:{" "}
                <time dateTime={podcast.release_date}>
                  {podcast.release_date}
                </time>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PodcastRow;
