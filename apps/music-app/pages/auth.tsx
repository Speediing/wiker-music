import { CommandPallate, Nav } from "ui";

export default function Index() {
  return (
    <div className="bg-black h-screen">
      <Nav />
      <div className="mt-10">
        <CommandPallate />
      </div>
    </div>
  );
}
