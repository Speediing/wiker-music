import * as React from "react";

export interface ButtonProps {
  text?: string;
  onClick: (e: any) => void;
}
export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className="block w-full rounded-md border border-transparent px-5 py-3 bg-rose-500 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
    >
      {text}
    </button>
  );
};
