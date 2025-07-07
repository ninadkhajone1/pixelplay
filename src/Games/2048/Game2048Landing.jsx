// src/Games/2048/Game2048Landing.jsx
import { useNavigate } from "react-router-dom";

export default function Game2048Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 flex flex-col items-center justify-center text-black">
      <h1 className="text-4xl font-bold mb-6">2048</h1>

      <div className="flex flex-col space-y-4">
        <button
          className="px-6 py-3 bg-white rounded-lg hover:bg-gray-100 transition font-semibold"
          onClick={() => navigate("/2048/play")}
        >
          Start
        </button>
        <button className="px-6 py-3 bg-white rounded-lg hover:bg-gray-100 transition font-semibold">
          Score
        </button>
      </div>
    </div>
  );
}
