import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BubbleLanding() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Bubble Shooter</h1>
      <div className="flex gap-6">
        <button
          onClick={() => navigate('/bubble/play')}
          className="px-6 py-3 text-xl bg-pink-500 hover:bg-pink-700 rounded shadow-lg"
        >
          Start Game
        </button>
        <button
          onClick={() => alert('Match 3 or more to pop!')}
          className="px-6 py-3 text-xl bg-gray-700 hover:bg-black rounded shadow-lg"
        >
          How to Play
        </button>
      </div>
    </div>
  );
}
