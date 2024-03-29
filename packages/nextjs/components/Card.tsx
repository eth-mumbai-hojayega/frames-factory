import React from 'react';

interface CardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ id, name, image, description }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-xs max-h-sm">
        <div className="card bg-base-100 shadow-xl relative rounded-lg">
          <figure className="flex justify-center items-center">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover blur-xs rounded-b-lg"
            />
          </figure>
          <div className="card-body p-4 absolute top-0 w-full flex flex-col justify-center items-center text-white bg-black bg-opacity-40 rounded-t-lg">
            <div className="card-title text-lg font-bold">{name}</div>
            <div className="text-sm">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;