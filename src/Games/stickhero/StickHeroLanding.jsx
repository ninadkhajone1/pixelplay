import { useNavigate } from "react-router-dom";

export default function StickHeroLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 flex flex-col items-center justify-center text-black">
      <h1 className="text-4xl font-bold mb-6">Stick Hero</h1>
      <button
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        onClick={() => navigate("/stickhero/play")}
      >
        Start Game
      </button>
    </div>
  );
}
