import React from 'react';

interface CardProps {
  name: string;
  image: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, image, description }) => {
  return (
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-8 shadow-lg bg-white">
      <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover rounded-t-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/40 rounded-t-2xl"></div>
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{description}</div>
    </article>
  );
};

export default Card;
