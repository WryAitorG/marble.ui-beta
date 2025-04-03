"use client";

import Link from "next/link";

export default function NavbarWithSearch() {
  return (
    <header className="bg-white w-full">
      <div className="flex h-16 w-full items-center gap-8 px-6">
        {/* 🔥 Logo */}
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold transition-transform transform hover:scale-105">
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1 rounded-lg shadow-md">
              MarbleUI
            </span>
          </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-300"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            <Link
              href="#"
              className="block rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-900"
            >
              Login
            </Link>
            <Link
              href="#"
              className="hidden rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:text-gray-900 sm:block"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
