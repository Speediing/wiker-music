import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";
import MobileNav from "./MobileNav";

export type NavOption = {
  name: string;
  href: string;
  current: boolean;
};
export interface NavProps {
  options: NavOption[];
  loggedIn: boolean;
  loginUrl: string;
  showSearch: boolean;
  profileUrl: string;
  onSearch: (search: string) => void;
}
export const Nav = ({
  options,
  loggedIn,
  loginUrl,
  showSearch,
  profileUrl,
  onSearch,
}: NavProps) => {
  const [search, setSearch] = useState("");
  return (
    <Disclosure as="nav" className="bg-grey-900">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <>
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden lg:block lg:ml-6">
                    {options.map((option) => {
                      return option.current ? (
                        <Link href={option.href} key={option?.href}>
                          <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                            {option.name}
                          </a>
                        </Link>
                      ) : (
                        <Link href={option.href} key={option?.href}>
                          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            {option.name}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {!loggedIn && (
                  <a
                    href={loginUrl}
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log In
                  </a>
                )}
                {showSearch && (
                  <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          onKeyPress={(ev) => {
                            if (ev.key === "Enter") {
                              ev.preventDefault();
                              onSearch(search);
                            }
                          }}
                          onChange={(e: any) => {
                            e.preventDefault();
                            setSearch(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
              {loggedIn && (
                <>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>

                  <ProfileMenu profileUrl={profileUrl} />
                </>
              )}
            </div>
          </div>

          <MobileNav options={options} loggedIn={loggedIn} />
        </>
      )}
    </Disclosure>
  );
};
