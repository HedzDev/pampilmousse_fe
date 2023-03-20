import React from 'react';
import Link from 'next/link';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="h-56 bg-gray-600 text-white">
        <div className="grid grid-cols-2">
          <div className="text-l flex flex-col text-white">
            <p className="text-2xl font-bold">Pampilmousse</p>
            <Link className="" href="/">
              Home
            </Link>
            <Link className="" href="/about">
              À propos
            </Link>
            <Link className="" href="/contact">
              Contact
            </Link>
          </div>
        </div>
        <div className="pt-20 text-center text-xs">
          copyright © {year} - Made with 💚 by BabaHedz
        </div>
      </div>
    </>
  );
}

export default Footer;
