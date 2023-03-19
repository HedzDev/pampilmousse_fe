import React from 'react';
import Head from 'next/head';

function About() {
  return (
    <>
      <Head>
        <title>Friendly | À propos</title>
        <meta
          name="L'histoir de Friendly et de ses créateurs"
          content="Friendly, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <div className="flex flex-col content-center justify-center bg-yellow-400 pt-[30rem] pl-96 lg:h-2/3">
          <h1 className="text-4xl">Friendly</h1>
          <p className="w-1/3 pl-12">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
            obcaecati nobis neque iusto quidem nemo? Repellendus veniam eos
            earum quia, laborum accusantium delectus mollitia nam inventore
            pariatur repudiandae, corporis saepe ipsa, doloribus quos
            doloremque! Similique velit ab itaque rerum dolorum eveniet a. Amet
            ducimus veritatis quia maiores, officiis dolor consequuntur quae
            voluptatem voluptates eos hic neque necessitatibus impedit nemo
            quasi!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
