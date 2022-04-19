import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { classNames } from "../utils/classNames";
import Link from "next/link";
export interface ProfileMenuProps {
  profileUrl: string;
}
export const ProfileMenu = ({ profileUrl }: ProfileMenuProps) => {
  return (
    <div className="hidden lg:block lg:ml-4">
      <div className="flex items-center">
        {/* Profile dropdown */}
        <Menu as="div" className="ml-4 relative flex-shrink-0">
          <div>
            <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={profileUrl} alt="" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  // <Link href={"/auth"}>
                  <a
                    href="/podcast"
                    onClick={() => localStorage?.clear()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Sign out
                  </a>
                  // </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
