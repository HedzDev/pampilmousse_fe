import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Listbox } from '@headlessui/react';

export type PlaceProps = {
  name: string;
  description: string;
  tags: string[];
  zipCode: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export default function Home() {
  //States
  const [places, setPlaces] = useState([]);
  const [zipCode, setZipCode] = useState<string>('');
  const [tagsFilters, setTagsFilters] = useState<string[]>([]);

  //Tags names
  const tags = ['change-table', 'playground', 'child-chair'];

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

  //Filter places by tags and zipCode
  const filteredPlaces =
    tagsFilters.length === 0
      ? places
      : places
          .filter((place) =>
            tagsFilters.every((tag) => place.tags.includes(tag))
          )
          .filter((place) => place.zipCode.toString().startsWith(zipCode));

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
    return (
      <a
        key={i}
        href={place.href}
        className="group"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={place.imageSrc}
            alt={place.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h2 className="t-1 text-lg font-medium text-gray-900">{place.name}</h2>
        <div className="flex justify-between">
          <p className="mt-1 text-sm font-medium text-gray-900">
            {place.description}
          </p>
          <p className="mt-1 pr-2 text-sm font-medium text-gray-900">
            {place.zipCode}
          </p>
        </div>
        <div>
          {place.tags.map((tag, i) => (
            <div
              className="mt-1 border text-center text-xs font-medium text-gray-900"
              key={i}
            >
              {tag}
            </div>
          ))}
        </div>
      </a>
    );
  });

  return (
    <>
      <Head>
        <title>Friendly | Home</title>
        <meta
          name="description"
          content="Friendly, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-32 flex min-h-screen flex-col items-center py-2">
        <h1 className="">Welcome to Friendly!</h1>
        <p>
          Comment ça marche ?
          <br />
          1. Choisissez un ou plusieurs filtres
          <br />
          2. Choisissez un département
          <br />
          3. Cliquez sur les lieux qui vous intéressent
          <br />
          <br />
          <br />
        </p>
        <div className="space-x-4">{buttonCategories}</div>
        <div className="">
          <select onChange={(e) => setZipCode(e.target.value)}>
            <option value="75">Paris</option>
            <option value="92">Hauts-de-Seine</option>
            <option value="93">Seine-Saint-Denis</option>
            <option value="94">Val De Marne</option>
            <option value="77">Seine Et Marne</option>
            <option value="95">Val D'Oise</option>
            <option value="91">Essonne</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {placesDisplayed.length === 0 ? (
            <p>Pas de lieux correspondant à la recherche 😓</p>
          ) : (
            placesDisplayed
          )}
        </div>
      </main>
    </>
  );
}
