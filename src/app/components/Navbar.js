"use client";

import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const token = Cookies.get("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="w-full h-20 sticky top-0 bg-gray-300 dark:bg-gray-700 shadow-md">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <h1 className="text-black dark:text-white text-2xl font-bold">
            <Link href="/"> MyApp</Link>
          </h1>

          <ul className="hidden md:flex gap-x-6 text-black dark:text-white items-center">
            <li>
              <Link href="/addTask">
                <p>Add New Task</p>
              </Link>
            </li>
            <li>
              {token ? (
                <Link href="/profile">
                  <p>Profile</p>
                </Link>
              ) : (
                <Link href="/login">
                  <p>Log In</p>
                </Link>
              )}
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="bg-gray-500 dark:bg-gray-300 text-white dark:text-black p-2 rounded-md"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </li>
          </ul>
          {/* Hamburger Menu Button (Visible on Small Screens Only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Mobile Navigation Menu (Shown When Hamburger is Clicked) */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-gray-300 dark:bg-gray-800  shadow-md md:hidden">
              <ul className="flex flex-col text-black dark:text-white p-4">
                <li className="py-2">
                  {token ? (
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </Link>
                  ) : (
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Log In
                    </Link>
                  )}
                </li>
                <li className="py-2">
                  <Link href="/addTask" onClick={() => setIsMenuOpen(false)}>
                    Add New Task
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="bg-gray-400 dark:bg-gray-300 text-white dark:text-black p-2 rounded-md"
                  >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* Dark Mode Toggle Button */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
