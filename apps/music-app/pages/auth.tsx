import { CommandPallate, Nav } from "ui";

export default function Index() {
  const options = [{ name: "History", href: "history" }];
  return (
    <div className="bg-black h-screen">
      <Nav options={options} loggedIn={false} />
      <div className="mt-10">
        <CommandPallate />
      </div>
    </div>
  );
}
