import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import PlaceCard from '@/components/PlaceCard';

export type PlaceProps = {
  name: string;
  description: string;
  tags: string[];
  zipCode: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

//Zip codes
const zipCodes = [
  { code: 75, name: 'Paris' },
  { code: 92, name: 'Hauts-de-Seine' },
  { code: 93, name: 'Seine-Saint-Denis' },
  { code: 94, name: 'Val-de-Marne' },
  { code: 77, name: 'Seine-et-Marne' },
  { code: 95, name: "Val-d'Oise" },
  { code: 91, name: 'Essonne' },
];
//Tags names
const tags: string[] = ['Table à langer', 'Aire de jeux', 'Chaise-bébé'];

export default function Home() {
  //States
  const [places, setPlaces] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [tagsFilters, setTagsFilters] = useState<string[]>([]);
  const [selectedZipCode, setSelectedZipCode] = useState(zipCodes[0]);

  //Fetch places from API
  useEffect(() => {
    fetch('http://localhost:4000/places/getPlaces')
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places);
      });
  }, []);

  //Update tagsFilters state when a tag is checked or unchecked and add or remove a tag from the array
  function updateTagsFilters(checked: any, tag: string) {
    if (checked) {
      setTagsFilters((prev) => [...prev, tag]);
    } else {
      setTagsFilters((prev) => prev.filter((t) => t !== tag));
    }
  }

  function handleSelectedZipCode(value: any) {
    setSelectedZipCode(value);
    setZipCode(value.code.toString());
  }

  //Filter places by tags and zipCode
  const filteredPlaces =
    tagsFilters.length === 0
      ? places
      : places
          .filter((place: { tags: string[] }) =>
            tagsFilters.every((tag) => place.tags.includes(tag))
          )
          .filter((place: { zipCode: number }) =>
            place.zipCode.toString().startsWith(zipCode)
          );

  //Create buttons for each tag and add a class if the tag is checked
  const buttonCategories = tags.map((tag, i) => {
    const isActive = tagsFilters.includes(tag);
    const buttonsClasses = `w-48 px-4 py-2 rounded-xl ${
      isActive
        ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white'
        : 'bg-gray-200 text-gray-900'
    }`;

    return (
      <button
        key={i}
        type="button"
        name={tag}
        className={buttonsClasses}
        onClick={(e) =>
          updateTagsFilters(
            (e.target as HTMLButtonElement).classList.toggle('bg-cyan-500'),
            tag
          )
        }
      >
        {tag}
      </button>
    );
  });

  //Create a card for each place and display it
  const placesDisplayed = filteredPlaces.map((place: PlaceProps, i) => {
    return <PlaceCard key={i} place={place} />;
  });

  return (
    <>
      <Head>
        <title>Friendly | Home</title>
        <meta
          name="Friendly, pour des sorties réussies"
          content="Friendly, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className="bg-red-300 lg:grid lg:h-2/3">
          <div className="flex flex-col items-center  py-2 pt-32">
            <h1
              className="mb-20
            text-center text-xl text-white"
            >
              Bienvenue chez Friendly <br />
              Le spécialiste des sorties réussies !
            </h1>

            <div className="space-x-4">{buttonCategories}</div>

            <div className="my-10 w-48">
              <Listbox value={selectedZipCode} onChange={handleSelectedZipCode}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedZipCode.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute left-0 z-10 mt-3 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {zipCodes.map((zip, zipId) => (
                          <Listbox.Option
                            key={zipId}
                            className={({ active }) =>
                              `relative left-0 cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'text-gray-900'
                              }`
                            }
                            value={zip}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {zip.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </Listbox.Button>
                </div>
              </Listbox>
            </div>

            <div className="grid w-1/2 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {placesDisplayed.length === 0 ? (
                <p>Pas de lieux correspondant à la recherche 😓</p>
              ) : (
                placesDisplayed
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
