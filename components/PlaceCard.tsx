import React from 'react';

export default function PlaceCard(props: any) {
  //Props destructuring
  const { place } = props;

  return (
    <>
      <a
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
