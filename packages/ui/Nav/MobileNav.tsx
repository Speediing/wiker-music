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
}
function MobileNav({ options, loggedIn }: MobileNavProps) {
  return (
    <Disclosure.Panel className="lg:hidden bg-slate-600">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
        {options.map((option, index) =>
          index === 0 ? (
            <Link href={option.href} key={option?.name}>
              <Disclosure.Button
                as="a"
                href={option.href}
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
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
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">Tom Cook</div>
              <div className="text-sm font-medium text-gray-400">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="/podcast"
              onClick={() => localStorage?.clear()}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </Disclosure.Panel>
  );
}

export default MobileNav;
