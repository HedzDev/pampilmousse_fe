import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import PlaceCard from '@/components/PlaceCard';
import ListboxComp from '@/components/ListboxComp';
import CheckboxComp from '@/components/CheckboxComp';

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
  const [selectedZipCode, setSelectedZipCode] = useState<{
    code: number;
    name: string;
  }>(zipCodes[0]);

  console.log(tagsFilters);

  //Fetch places from API
  useEffect(() => {
    fetch('https://pampilmousse-be.vercel.app/places/getPlaces')
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places);
      });
  }, []);

  //Update tagsFilters state when a tag is checked or unchecked and add or remove a tag from the array
  function updateTagsFilters(checked: any, tag: string) {
    if (checked) {
      setTagsFilters([...tagsFilters, tag]);
    } else {
      setTagsFilters((prev) => prev.filter((t) => t !== tag));
    }
  }

  function handleSelectedZipCode(value: any) {
    setSelectedZipCode(value);
    setZipCode(value.code.toString());
  }

  //Filter places by tags and zipCode
  let filteredPlaces = places;

  if (tagsFilters.length > 0) {
    filteredPlaces = filteredPlaces.filter((place: { tags: string[] }) =>
      tagsFilters.every((tag) => place.tags.includes(tag))
    );
  }
  if (zipCode) {
    filteredPlaces = filteredPlaces.filter((place: { zipCode: number }) =>
      place.zipCode.toString().startsWith(zipCode)
    );
  }

  //Create checkboxes for each tag and add a class if the tag is checked
  const checkboxCategories = tags.map((tag, i) => {
    return (
      <Fragment key={i}>
        <CheckboxComp updateTagsFilters={updateTagsFilters} tag={tag} />
      </Fragment>
    );
  });

  //Create a card for each place and display it
  const placesDisplayed = filteredPlaces.map((place: PlaceProps, i) => {
    return <PlaceCard key={i} place={place} />;
  });

  return (
    <>
      <Head>
        <title>Pampilmousse | Home</title>
        <meta
          name="Pampilmousse, pour des sorties réussies"
          content="Pampilmousse, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className="bg-red-300 py-16 lg:grid lg:h-2/3">
          <div className="flex flex-col items-center py-2 pt-32">
            <h1
              className="mb-20
            text-center text-xl text-white"
            >
              Bienvenue chez Pampilmousse <br />
              Le spécialiste des sorties réussies !
            </h1>

            <div className="flex lg:flex-row lg:space-x-4">
              {checkboxCategories}
            </div>

            <div className="my-10 w-48">
              <ListboxComp
                selectedZipCode={selectedZipCode}
                handleSelectedZipCode={handleSelectedZipCode}
                zipCodes={zipCodes}
              />
            </div>

            <div className="relative grid w-1/2 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {placesDisplayed.length === 0 ? (
                <p className="absolute top-20 left-0 right-0 text-center text-lg">
                  Oups! Pas de lieu correspondant à la recherche 😓
                </p>
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
