import React from 'react';
import Head from 'next/head';

function About() {
  return (
    <>
      <Head>
        <title>Pampilmousse | À propos</title>
        <meta
          name="L'histoir de Friendly et de ses créateurs"
          content="Friendly, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <div className="flex flex-col content-center justify-center bg-yellow-400 pt-[30rem] pl-96 lg:h-2/3">
          <h1 className="mb-6 text-4xl">Pampilmousse</h1>

          <p className="w-1/3 pl-12">
            Pampilmousse est né dans la tête de deux parents qui avait une
            petite fille formidable et avec laquelle il passait beaucoup de
            temps dans les cafés, restaurants, musées ou tout autres lieux de
            divertissement de la capitale, mais tout ces endroits n'étaient
            malheureusement pas équipé pour recevoir dans de bonnes conditions
            notre fille chérie !
            <br />
            <br />
            <br />
            C'est là que l'idée a émergé !
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
