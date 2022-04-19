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
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        id="search"
        name="search"
        className="block w-full pl-10 pr-3 py-2 border border-white rounded-md leading-5 bg-black text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-black focus:border-rose-500 focus:ring-rose-500 focus:text-white sm:text-sm"
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
