"use client";

import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Card from "~~/components/Card";
import Modal from "~~/components/JourneyModal";
// import fakeData from "~~/components/data/fakeData";
import { getAllJourneys } from "~~/utils/apis";

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [journeys, setJourneys] = useState<any[]>([]); 

  const handleSelectItem = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  useEffect(() => {
    // Fetch journeys when the component mounts
    const fetchJourneys = async () => {
      try {
        const fetchedJourneys = await getAllJourneys();
        setJourneys(fetchedJourneys);
        console.log("Fetched journeys:", fetchedJourneys);
      } catch (error) {
        console.error("Error fetching journeys:", error);
      }
    };
  
    fetchJourneys();
  
    return () => setJourneys([]);
  }, []);


  return (
    <div className="">
      <div className="flex justify-center my-4">
        <button
          onClick={handleSelectItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {journeys.map((journey: any) => (
            <Card name={journey.name} image={journey.image} description={journey.desc} />
          ))}
        </div>
      </div>

      {/* Render the modal component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
