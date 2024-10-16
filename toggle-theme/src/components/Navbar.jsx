import React from "react";
import { FaUser } from "react-icons/fa";
import ThemeBtn from "./ThemeBtn";

function Navbar() {
  return (
    <nav className="flex h-14 w-full bg-slate-800 dark:bg-gray-100 text-2xl justify-between text-white dark:text-gray-800 p-3">
      <h2>Navbar</h2>
      <div className="flex justify-between gap-x-2">
      <ThemeBtn />
        <FaUser className=" text-3xl"/>
      </div>
    </nav>
  );
}

export default Navbar;
