import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, SearchInput } from "ui";
import { Header } from "../Core/Header";

export const PodcastSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <>
      <Header header={"Search For Your Favourite Artist"} />

      <div className="mt-24 flex justify-center">
        <div className=" w-96 ">
          <label htmlFor="email" className="sr-only text-white">
            Search Here
          </label>
          <SearchInput
            setSearch={(search) => setSearch(search)}
            onSearch={() => router.push(`/podcast?search=${search}`)}
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
  );
};
