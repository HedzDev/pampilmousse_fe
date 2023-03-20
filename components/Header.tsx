import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex justify-between  py-6 text-white">
        <Link href="/" className="pl-9 text-4xl font-bold">
          Pampilmousse
        </Link>
        <nav className="space-x-7 pr-9">
          <Link href="/" className="p-2 hover:border-y-2">
            Home
          </Link>
          <Link href="/about" className="  p-2 hover:border-y-2 ">
            À propos
          </Link>
          <Link href="/contact" className="  p-2 hover:border-y-2 ">
            Contact
          </Link>
        </nav>
      </header>
    </>
  );
}
