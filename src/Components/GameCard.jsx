import React from 'react';
import { Link } from 'react-router-dom';

export default function GameCard({ title, image, link }) {
  return (
    <div className="relative w-full max-w-[280px] h-[400px] rounded-xl overflow-hidden shadow-xl bg-gray-800 mx-auto transform transition-all duration-200 ease-out hover:scale-110 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 brightness-50"
      />

      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4 space-y-6">
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain rounded drop-shadow-md"
          />
        </div>
        <h3 className="text-xl font-bold text-center">{title}</h3>
        <Link to={link}>
          <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 hover:text-white transition">
            Play Now
          </button>
        </Link>
      </div>
    </div>
  );
}
