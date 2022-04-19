import React from "react";

export interface HeaderProps {
  header: string;
}

export const Header = ({ header }: HeaderProps) => {
  return (
    <header className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{header}</h1>
      </div>
    </header>
  );
};
