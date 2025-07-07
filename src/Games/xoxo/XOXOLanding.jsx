// src/Games/xoxo/XOXOLanding.jsx
import { useNavigate } from "react-router-dom";

export default function XOXOLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-700 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe (XOXO)</h1>

      <div className="flex flex-col space-y-4">
        <button
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
          onClick={() => navigate("/xoxo/play")}
        >
          Start
        </button>
        <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
          Score
        </button>
      </div>
    </div>
  );
}
