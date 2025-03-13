import React from "react";

// Navbar component
const Navbar = () => {
  return (
    <>
      <div className="min-h-[20vh]">
        <nav className="bg-slate-800 text-white flex justify-center items-center">
          <div className="myContainer flex justify-between items-center px-4 py-6 h-16">
            {/* Logo */}
            <div className="logo text-xl md:text-xl font-bold">
              <span className="text-green-800">&lt;</span>Secure
              <span className="text-green-600">IT/&gt;</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;