import React from 'react';
import Head from 'next/head';

function About() {
  return (
    <>
      <Head>
        <title>Friendly | À propos</title>
        <meta
          name="description"
          content="Friendly, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" mx-auto flex w-8/12 flex-col justify-center">
        <h1 className="my-40 ">L'histoire de Friendly</h1>
        <p className="w-60">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
          obcaecati nobis neque iusto quidem nemo? Repellendus veniam eos earum
          quia, laborum accusantium delectus mollitia nam inventore pariatur
          repudiandae, corporis saepe ipsa, doloribus quos doloremque! Similique
          velit ab itaque rerum dolorum eveniet a. Amet ducimus veritatis quia
          maiores, officiis dolor consequuntur quae voluptatem voluptates eos
          hic neque necessitatibus impedit nemo quasi!
        </p>
      </div>
    </>
  );
}

export default About;
