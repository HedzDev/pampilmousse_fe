import React from 'react';
import Image from 'next/image';

export default function PlaceCard(props: any) {
  //Props destructuring
  const { place } = props;
  const src = place.imageSrc;

  //Places categories
  const categoriesList = [
    { type: 'Restaurant', icon: '🍽️' },
    { type: 'Bar', icon: '🍸' },
    { type: 'Café', icon: '☕️' },
    { type: 'Musée', icon: '🎨' },
    { type: 'Cinéma', icon: '🎥' },
    { type: 'Médecin', icon: '👨‍⚕️' },
  ];
  return (
    <>
      <a
        href={place.href}
        className="duration:800 group rounded-md bg-red-200 p-3 transition-shadow delay-75 hover:shadow-[7px_10px_0_1px_rgb(0,0,0)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="aspect-w-1 aspect-h-1  w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            loader={() => src}
            src={src}
            alt={place.imageAlt}
            width={150}
            height={150}
            referrerPolicy={'no-referrer'}
            unoptimized
            className="h-full w-full object-cover object-center"
          />
        </div>
        <h2 className="pt-2 text-lg font-medium text-gray-900">{place.name}</h2>
        <div className="py flex flex-col-reverse justify-between">
          <p className="mt-4 w-2/3 text-xs font-medium text-gray-600">
            {place.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="pr-2 text-sm font-medium text-gray-900">
              {place.zipCode}
            </p>
            <div className="flex space-x-1">
              {categoriesList.map((category: any, i: any) => {
                if (place.categories.includes(category.type)) {
                  return (
                    <div className="text-xl" key={i}>
                      {category.icon}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="">
          {place.tags.map((tag: any, i: any) => (
            <div
              className="mt-1 border text-center text-xs font-medium text-gray-900"
              key={i}
            >
              {tag}
            </div>
          ))}
        </div>
      </a>
    </>
  );
}
