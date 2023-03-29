import React from 'react';
import Head from 'next/head';

function About() {
  return (
    <>
      <Head>
        <title>Pampilmousse | À propos</title>
        <meta
          name="L'histoire de Pampilmousse et de ses créateurs"
          content="Pampilmousse, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo-pampil.ico" />
      </Head>
      <main className="min-h-screen">
        <div className="flex h-screen flex-col content-center justify-center bg-yellow-400 px-10 sm:px-20">
          <h1 className="mb-6 text-4xl font-semibold">Pampilmousse</h1>

          <p className="">
            <span className="text-2xl">P</span>ampilmousse est né dans la tête
            de deux parents qui avait une petite fille formidable et avec
            laquelle il passait beaucoup de temps dans les cafés, restaurants,
            musées ou tout autres lieux de divertissement de la capitale, mais
            tout ces endroits n&apos;étaient malheureusement pas équipés pour
            recevoir dans de bonnes conditions notre fille chérie !
            <br />
            <br />
            <br />
            C&apos;est là que l&apos;idée a émergé !
          </p>
        </div>
      </main>
    </>
  );
}

export default About;
