import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

// const inter = Inter({ subsets: ['latin'] });

export type PlaceProps = {
  name: string;
  description: string;
  tags: string[];
  zipCode: number;
};

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [tagsFilters, setTagsFilters] = useState(new Set<string>());

  const tags = ['change-table', 'playground', 'child-chair'];

  useEffect(() => {
    fetch('http://localhost:4000/places/getPlaces')
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places);
      });
  }, []);

  function updateTagsFilters(checked: any, tagsFilter: string) {
    if (checked) {
      setTagsFilters((prev) => new Set(prev).add(tagsFilter));
    }
    if (!checked) {
      setTagsFilters((prev) => {
        const newSet = new Set(prev);
        newSet.delete(tagsFilter);
        return newSet;
      });
    }
  }

  const filteredPlaces =
    tagsFilters.size === 0
      ? places
      : places.filter((el) => el.tags.some((tag: any) => tagsFilters.has(tag)));

  const checkboxCategories = tags.map((tag, i) => {
    return (
      <div key={i}>
        <label>
          <input
            type="checkbox"
            name={tag}
            onChange={(e) => updateTagsFilters(e.target.checked, tag)}
          />
          {tag}
        </label>
      </div>
    );
  });

  const placesDisplayed = filteredPlaces.map((place: PlaceProps, i) => {
    return (
      <div className={styles.card} key={i}>
        <h2>{place.name}</h2>
        <p>{place.description}</p>
        {/* <p>
          {place.tags.map((tag, i) => (
            <span className={styles.tagsSpan} key={i}>
              {tag}
            </span>
          ))}
        </p> */}
        <p> {place.zipCode}</p>
      </div>
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
      <header>
        <p>LOGO</p>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Friendly!</h1>
        <div>{checkboxCategories}</div>
        <div className={styles.cardsBlock}>{placesDisplayed}</div>
      </main>
    </>
  );
}
