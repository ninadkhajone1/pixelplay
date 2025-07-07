import { useNavigate } from "react-router-dom";
import bird from "../../assets/bird.png";

export default function FlappyBirdLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-700 flex flex-col items-center justify-center text-white">
      {/* Flappy Bird Icon */}
      <img
        src={bird}
        alt="Flappy Bird"
        className="w-24 h-24 mb-4 drop-shadow-lg"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Flappy Bird</h1>

      {/* Buttons */}
      <div className="flex flex-col space-y-4">
        <button
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
          onClick={() => navigate("/flappybird/play")}
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
