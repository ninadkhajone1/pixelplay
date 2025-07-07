import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WhackLanding() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-200 to-red-300 text-black">
      <h1 className="text-5xl font-bold mb-6">Whack-a-Mole</h1>
      <div className="flex gap-6">
        <button
          onClick={() => navigate('/whack/play')}
          className="px-6 py-3 text-xl bg-red-500 hover:bg-red-700 text-white rounded"
        >
          Start Game
        </button>
        <button
          onClick={() => alert('Keep practicing to beat your high score!')}
          className="px-6 py-3 text-xl bg-gray-700 hover:bg-black text-white rounded"
        >
          Score
        </button>
      </div>
    </div>
  );
}
