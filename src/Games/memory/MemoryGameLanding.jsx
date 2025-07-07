import { useNavigate } from 'react-router-dom';

export default function MemoryGameLanding() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-gray-900 to-black">
      <h1 className="text-5xl font-bold mb-6">🧠 Memory Match</h1>
      <p className="text-lg mb-8 text-center max-w-md">Flip the cards and test your memory! Match all pairs to win.</p>
      <button
        onClick={() => navigate('/memorygame')}
        className="bg-cyan-500 px-6 py-3 rounded-xl text-xl font-semibold hover:bg-cyan-400 transition"
      >
        Start Game
      </button>
    </div>
  );
}
