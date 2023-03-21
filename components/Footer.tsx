import React from 'react';
import Link from 'next/link';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="relative h-56 bg-gray-600 p-10 text-white">
        <p className="text-2xl font-bold text-red-300">Pampilmousse</p>
        <div className="mt-6 inline-flex flex-col">
          <Link className="text-m hover:text-red-300" href="/">
            Home
          </Link>
          <Link className="text-m hover:text-red-300" href="/about">
            À propos
          </Link>
          <Link className="text-m hover:text-red-300" href="/contact">
            Contact
          </Link>
        </div>

        <div className="absolute bottom-2 right-0 left-0 text-center text-xs">
          copyright © {year} - Made with 💚 by BabaHedz
        </div>
      </div>
    </>
  );
}

export default Footer;
