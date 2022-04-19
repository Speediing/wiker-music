import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { classNames } from "../utils/classNames";
import Link from "next/link";
import { NavOption } from ".";
export interface MobileNavProps {
  options: NavOption[];
  loggedIn: boolean;
  profileUrl: string;
}
function MobileNav({ options, loggedIn, profileUrl }: MobileNavProps) {
  return (
    <Disclosure.Panel className="lg:hidden bg-zinc-900 rounded-md">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
        {options.map((option) =>
          option.current ? (
            <Link href={option.href} key={option?.name}>
              <Disclosure.Button
                as="a"
                href={option.href}
                className="bg-black text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {option.name}
              </Disclosure.Button>
            </Link>
          ) : (
            <Link href={option.href} key={option?.name}>
              <Disclosure.Button
                as="a"
                href={option.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {option.name}
              </Disclosure.Button>
            </Link>
          )
        )}
      </div>
      {loggedIn && (
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={profileUrl} alt="" />
            </div>
            <div className="ml-3">
              <a
                href="/podcast"
                onClick={() => localStorage?.clear()}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </Disclosure.Panel>
  );
}

export default MobileNav;
