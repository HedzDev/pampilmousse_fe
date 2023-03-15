import React from 'react';
import Link from 'next/link';

export default function Header(props: any) {
  //console.log('props', props);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex justify-between pt-4">
        <p className="pl-9">Friendly</p>
        <nav className="space-x-4 pr-9">
          <Link href="/">Home</Link>
          <Link href="/about">À propos</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}
