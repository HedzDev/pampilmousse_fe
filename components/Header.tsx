import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Home', href: '/', current: false },
  {
    name: 'À propos',
    href: '/about',
    current: false,
  },
  {
    name: 'Contact',
    href: '/contact',
    current: false,
  },
];

function classNames(...classes: any) {
  //
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const router = useRouter();
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    // Change the background color of the header depending on the page
    switch (router.pathname) {
      case '/':
        setBgColor('bg-red-300');
        break;
      case '/about':
        setBgColor('bg-yellow-400');
        break;
      case '/contact':
        setBgColor('bg-green-300');
        break;
      default:
        break;
    }
  }, [router.pathname]);

  const updatedNavigation = navigation.map((item) => ({
    //
    ...item,
    current: router.pathname === item.href,
  }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 flex justify-between py-14 text-white ${bgColor}`}
    >
      <nav className="space-x-7 pr-9">
        <Disclosure
          as="nav"
          className="fixed top-0 left-0 right-0 flex justify-between py-6 text-white"
        >
          {(
            { open } // open is a boolean value that indicates if the menu is open or not
          ) => (
            <>
              <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-400 hover:text-white focus:outline-none ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className=" flex flex-shrink-0 items-center">
                      <Link
                        href="/"
                        className="hidden pl-9 text-4xl font-bold sm:flex"
                      >
                        Pampilmousse
                      </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex h-20 items-center space-x-4">
                        {updatedNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'border-b-2 bg-gray-900 px-1 py-2 text-white'
                                : 'text-white hover:border-b-2',
                              'py text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile menu, show/hide based on menu state. */}
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {updatedNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-400 text-white'
                          : 'text-white hover:bg-gray-300 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Link href="/">
          <Image
            src="/pampilmousse-logo.png"
            alt="logo"
            width={50}
            height={50}
            className="absolute -top-10 right-[30%] h-40 w-40 sm:right-0 sm:-top-16 sm:flex sm:h-60 sm:w-60"
          />
        </Link>
      </nav>
    </header>
  );
}
