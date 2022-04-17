import { CommandPallate, Nav, NavOption } from "ui";
import { loginUrl } from "./history";

export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("refreshToken") !== null;
  }
  return false;
};

export default function Podcast() {
  const options: NavOption[] = [{ name: "Podcasts", href: "podcast" }];
  if (isLoggedIn()) {
    options.unshift({ name: "History", href: "history" });
  }
  return (
    <div className="bg-black h-screen">
      <Nav options={options} loggedIn={isLoggedIn()} loginUrl={loginUrl} />
      <div className="mt-10">
        <CommandPallate />
      </div>
    </div>
  );
}
