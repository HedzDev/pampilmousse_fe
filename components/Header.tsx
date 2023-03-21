import React from 'react';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'À propos', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  return (
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
  );
}

// <Disclosure
//   as="nav"
//   className="fixed top-0 left-0 right-0 flex justify-between py-6 text-white"
// >
//   {({ open }) => (
//     <>
//       <div className="px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             {/* Mobile menu button*/}
//             <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//               <span className="sr-only">Open main menu</span>
//               {open ? (
//                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </Disclosure.Button>
//           </div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex flex-shrink-0 items-center">
//               <Link href="/" className="pl-9 text-4xl font-bold">
//                 Pampilmousse
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? 'bg-gray-900 text-white'
//                         : 'text-white hover:border-y-2',
//                       'rounded-md py-2 text-sm font-medium'
//                     )}
//                     aria-current={item.current ? 'page' : undefined}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Disclosure.Panel className="sm:hidden">
//         <div className="space-y-1 px-2 pt-2 pb-3">
//           {navigation.map((item) => (
//             <Disclosure.Button
//               key={item.name}
//               as="a"
//               href={item.href}
//               className={classNames(
//                 item.current
//                   ? 'bg-gray-900 text-white'
//                   : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                 'block rounded-md px-3 py-2 text-base font-medium'
//               )}
//               aria-current={item.current ? 'page' : undefined}
//             >
//               {item.name}
//             </Disclosure.Button>
//           ))}
//         </div>
//       </Disclosure.Panel>
//     </>
//   )}
// </Disclosure>
