import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({ cartItems }) {
  return (
    <div className="w-full h-14 bg-zinc-800 flex p-3 justify-between items-center text-white">
      <h2 className="text-2xl font-semibold ml-4">Shopping mall</h2>
      <div className="flex justify-between space-x-6 mr-4">
      <div className="indicator">
        <Link to="./cart">
        <span className="indicator-item badge badge-secondary">{cartItems.length}</span>
          <FaShoppingCart className="text-xl" />
        </Link>
    </div>
        <FaUserAlt className="text-xl" />
      </div>
    </div>
  );
}

export default Navbar;
