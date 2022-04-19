import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";
import MobileNav from "./MobileNav";
import Image from "next/image";
import logo from "./Logo.jpeg";
import { SearchInput } from "../SearchInput";

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
                    <div className="block lg:hidden mb-2 h-8 w-auto">
                      <Image src={logo} width={40} height={40} alt="Workflow" />
                    </div>
                    <div className="hidden lg:block w-auto flex-row ">
                      <div className="flex flex-row">
                        <Image
                          src={logo}
                          width={40}
                          height={40}
                          alt="Workflow"
                        />{" "}
                        <h2 className="text-rose-400 font-bold text-2xl ml-4 mt-1  inline-block text-center align-middle">
                          Wiker
                        </h2>
                        <h2 className="text-white font-bold text-2xl mt-1  inline-block text-center align-middle">
                          Music
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:ml-6">
                    {options.map((option) => {
                      return option.current ? (
                        <Link href={option.href} key={option?.href}>
                          <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium mr-3">
                            {option.name}
                          </a>
                        </Link>
                      ) : (
                        <Link href={option.href} key={option?.href}>
                          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm mr-3 font-medium">
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
                      <SearchInput
                        setSearch={(search) => setSearch(search)}
                        onSearch={() => onSearch(search)}
                      />
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

          <MobileNav
            profileUrl={profileUrl}
            options={options}
            loggedIn={loggedIn}
          />
        </>
      )}
    </Disclosure>
  );
};
