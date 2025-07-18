'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-2 lg:px-8 lg:py-4">
        <div className="text-lg font-bold">
          <Link href="/" passHref>
            <span className="text-2xl font-bold cursor-pointer">Logo</span>
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`w-full lg:flex lg:items-center lg:w-auto ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 py-4 lg:py-0">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <li key={item}>
                <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} passHref>
                  <span className="block py-2 px-4 text-gray-700 hover:text-blue-500 cursor-pointer">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
