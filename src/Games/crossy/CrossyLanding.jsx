import React from 'react';
import { useNavigate } from 'react-router-dom';

const CrossyLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-400 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Crossy Road</h1>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => navigate('/crossy/play')}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-2xl text-xl shadow-md transition"
        >
          Start
        </button>
        <button
          onClick={() => alert('Scoreboard coming soon!')}
          className="text-white underline text-lg"
        >
          Score
        </button>
      </div>
    </div>
  );
};

export default CrossyLanding;
