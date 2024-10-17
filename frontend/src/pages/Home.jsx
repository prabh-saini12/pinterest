import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pins && pins.length > 0 ? (
              pins.map((e, i) => <PinCard key={i} pin={e} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">No Pins Yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
