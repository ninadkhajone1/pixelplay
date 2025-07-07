import { useNavigate } from "react-router-dom";
import stoneIcon from "../../assets/stone.png"; // optional image

export default function StonePaperLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center text-white">
      {/* Optional icon */}
      <img src={stoneIcon} alt="Stone Icon" className="w-20 h-20 mb-4" />
      <h1 className="text-4xl font-bold mb-6">Stone Paper Scissors</h1>
      <button
        className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
        onClick={() => navigate("/stonepaperscissors/play")}
      >
        Start Game
      </button>
    </div>
  );
}
