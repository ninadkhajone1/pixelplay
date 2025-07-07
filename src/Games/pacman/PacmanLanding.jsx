import { useNavigate } from "react-router-dom";

export default function PacmanLanding() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">👾 Pac-Man</h1>
      <div className="space-x-6">
        <button
          onClick={() => navigate("/pacman/play")}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition transform hover:scale-105"
        >
          Start Game
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold rounded-lg transition transform hover:scale-105"
        >
          Home
        </button>
      </div>
    </div>
  );
}
