import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const holes = Array(9).fill(null);

export default function WhackGame() {
  const [score, setScore] = useState(0);
  const [activeMole, setActiveMole] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const navigate = useNavigate();

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Game timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      setShowConfetti(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Mole appearing logic
  useEffect(() => {
    if (gameOver) return;
    const moleInterval = setInterval(() => {
      setActiveMole(Math.floor(Math.random() * holes.length));
    }, 800);

    return () => clearInterval(moleInterval);
  }, [gameOver]);

  const whackMole = (index) => {
    if (index === activeMole) {
      setScore(score + 1);
      setActiveMole(null);
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setShowConfetti(false);
    setActiveMole(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/bg-darkgrass.jpg')] bg-cover bg-center text-white px-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />
      )}

      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Whack-a-Mole</h1>
      <div className="flex gap-10 text-lg mb-6 font-semibold drop-shadow">
        <p>⏱ Time Left: <span className="text-yellow-400">{timeLeft}s</span></p>
        <p>🔨 Score: <span className="text-green-400">{score}</span></p>
      </div>

      <div className="grid grid-cols-3 gap-6 bg-black/40 p-6 rounded-xl shadow-lg">
        {holes.map((_, index) => (
          <div
            key={index}
            onClick={() => whackMole(index)}
            className={`w-24 h-24 rounded-full cursor-pointer flex items-center justify-center text-3xl transition-all duration-300 border-2 border-gray-700 ${
              index === activeMole
                ? 'bg-red-600 hover:bg-red-700 shadow-md animate-pulse'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {index === activeMole ? '🐹' : ''}
          </div>
        ))}
      </div>

      {/* Game Over Popup */}
      {gameOver && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
          <h2 className="text-4xl font-bold text-yellow-300 mb-4">🎉 Game Over!</h2>
          <p className="text-xl text-white mb-6">Your Score: <span className="text-green-400">{score}</span></p>
          <div className="flex gap-6">
            <button
              onClick={restartGame}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white shadow-lg"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-700 hover:bg-black rounded text-white shadow-lg"
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
