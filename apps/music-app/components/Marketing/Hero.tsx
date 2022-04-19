import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "ui";
import history from "../../resources/history.png";
import logo from "../../resources/logo.jpeg";
function Hero() {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/podcast");
  };
  return (
    <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
        <div>
          <div>
            <Image
              className="h-11 w-auto"
              src={logo}
              alt="Workflow"
              width={150}
              height={150}
            />
          </div>
          <div className="mt-16">
            <div className="mt-6 sm:max-w-xl">
              <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                Welcome to
                <span className="text-4xl font-extrabold text-rose-500 tracking-tight sm:text-5xl">
                  {"   "}Wiker {"   "}
                </span>
                Music
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Augmenting your music experience.
              </p>
            </div>
            <div className="mt-12 sm:max-w-lg sm:w-full sm:flex">
              <Button onClick={handleClick} text="Start Now" />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
        <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="hidden sm:block">
            <div className="absolute inset-y-0 left-1/2 w-screen bg-zinc-900 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
            <svg
              className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              />
            </svg>
          </div>
          <div className="relative pl-4  -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12 ">
            <div className="w-full drop-shadow-2xl shadow-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5  lg:w-auto lg:max-w-none ">
              <Image className="rounded-md" src={history} alt="Workflow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
