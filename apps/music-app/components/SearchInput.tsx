import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
export interface SearchInputProps {
  text?: string;
  onSearch: () => void;
  setSearch: (e: any) => void;
}
export const SearchInput = ({ onSearch, setSearch }: SearchInputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        id="search"
        name="search"
        className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 bg-black border border-white rounded-md focus:outline-none focus:bg-black focus:border-rose-500 focus:ring-rose-500 focus:text-white sm:text-sm"
        placeholder="Search"
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            onSearch();
          }
        }}
        onChange={(e: any) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};
