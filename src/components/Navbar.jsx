import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import logo from "../assets/pageturner-logo.png";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
      </li>
      <li>
        <a href="/course" className="hover:text-blue-600 transition-colors">Course</a>
      </li>
      <li>
        <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
      </li>
      <li>
        <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          sticky
            ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200"
            : "bg-white"
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden text-gray-800 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-gray-200"
              >
                {navItems}
              </ul>
            </div>
            <a href="/" className="flex items-center gap-2 text-2xl font-bold cursor-pointer text-gray-800 hover:text-blue-600 transition-colors">
              <img src={logo} alt="PageTurner Logo" style={{ height: "60px", width: "170px" }} className="object-contain" />
              <span className="hidden sm:inline-block align-middle"></span>
            </a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-gray-800">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className="px-3 py-2 border border-gray-300 rounded-md flex items-center gap-2 bg-white">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 bg-transparent text-gray-800 placeholder-gray-500"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            {authUser ? (
              <Logout />
            ) : (
              <div className="">
                <a
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
