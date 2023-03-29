import React, { Fragment, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
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
  categories: { type: string; icon: string }[];
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
  const [loading, setLoading] = useState(true);

  //Fetch places from API
  useEffect(() => {
    fetch('https://pampilmousse-be.vercel.app/places/getPlaces')
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places);
        setLoading(false);
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
  // Update zipCode state when a zipCode is selected in the listbox
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
          name="description"
          content="Pampilmousse est un site qui permet de trouver des lieux adaptés aux enfants et aux familles, pour des sorties réussies !"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo-pampil.ico" />
      </Head>

      <main className="min-h-screen">
        <div className="bg-red-300 py-16">
          <div className="flex flex-col items-center py-2 pt-32">
            <h1
              className="mb-10
            text-center text-xl text-white"
            >
              Pampilmousse
              <br />
              Pour des sorties réussies !
            </h1>

            <div className="flex flex-col sm:flex-row  sm:space-x-4">
              {checkboxCategories}
            </div>

            <div className="my-10 w-48">
              <ListboxComp
                selectedZipCode={selectedZipCode}
                handleSelectedZipCode={handleSelectedZipCode}
                zipCodes={zipCodes}
              />
            </div>

            <div className="grid w-2/3 grid-cols-1 gap-y-10 gap-x-6 pb-40 sm:grid-cols-5">
              {loading ? (
                <div className="flex items-center justify-center sm:col-span-6 sm:mt-20">
                  <Stack>
                    <CircularProgress size={80} color="error" />
                  </Stack>
                </div>
              ) : placesDisplayed.length === 0 ? (
                <p className="animate-pulse rounded-md border p-3 text-center sm:col-start-3 sm:mt-10">
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
