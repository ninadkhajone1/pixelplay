import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import birdImg from "../../assets/bird.png";
import cloudImg from "../../assets/clouds.png";

export default function FlappyBirdGame() {
  const navigate = useNavigate();
  const [birdPosition, setBirdPosition] = useState(300);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cloudOffset, setCloudOffset] = useState(0);
  const scoredPipes = useRef(new Set());

  const gravity = 0.6;
  const jumpStrength = -10;
  const pipeWidth = 60;
  const pipeGap = 220; // Wider gap for easier play
  const gameHeight = 600;
  const gameWidth = 400;
  const birdSize = 40;

  useEffect(() => {
    setPipes([createPipe(gameWidth + 100), createPipe(gameWidth + 300)]);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setVelocity((v) => v + gravity);
      setBirdPosition((pos) => {
        const newPos = pos + velocity;
        if (newPos >= gameHeight - birdSize) {
          triggerGameOver();
          return gameHeight - birdSize;
        }
        if (newPos < 0) return 0;
        return newPos;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [velocity, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setPipes((prev) =>
        prev
          .map((pipe) => ({ ...pipe, x: pipe.x - 3 }))
          .filter((pipe) => pipe.x + pipeWidth > 0)
      );
      setCloudOffset((prev) => (prev - 1) % gameWidth);
    }, 20);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setPipes((prev) => [...prev, createPipe(gameWidth)]);
    }, 1800); // Appears sooner
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    pipes.forEach((pipe, index) => {
      const inXRange = pipe.x < 70 && pipe.x + pipeWidth > 30;
      const hitPipe =
        birdPosition < pipe.topHeight ||
        birdPosition + birdSize > pipe.topHeight + pipeGap;

      if (inXRange && hitPipe) {
        triggerGameOver();
      }

      if (pipe.x + pipeWidth < 40 && !scoredPipes.current.has(index)) {
        scoredPipes.current.add(index);
        setScore((s) => s + 1);
      }
    });
  }, [birdPosition, pipes]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        setVelocity(jumpStrength);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function createPipe(x) {
    const topHeight = Math.floor(Math.random() * 180) + 100; // leaves enough gap
    return { x, topHeight };
  }

  function triggerGameOver() {
    setGameOver(true);
  }

  function restartGame() {
    setBirdPosition(300);
    setVelocity(0);
    setScore(0);
    setGameOver(false);
    scoredPipes.current.clear();
    setPipes([createPipe(gameWidth + 100), createPipe(gameWidth + 300)]);
  }

  return (
    <div className="pt-24 flex justify-center bg-gradient-to-b from-sky-400 to-blue-600 min-h-screen">
      <div
        className="relative overflow-hidden"
        style={{
          width: gameWidth,
          height: gameHeight,
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          backgroundColor: "#87CEEB",
        }}
      >
        {/* Moving Cloud at top */}
        <div
          className="absolute top-0 left-0 w-full h-20 overflow-hidden z-0"
          style={{ height: 80 }}
        >
          <img
            src={cloudImg}
            alt="Clouds"
            className="absolute"
            style={{
              top: 0,
              left: cloudOffset,
              width: 800,
              height: 80,
              objectFit: "cover",
              opacity: 0.8,
            }}
          />
        </div>

        {/* Bird */}
        <img
          src={birdImg}
          alt="Bird"
          className="absolute z-10"
          style={{
            width: birdSize,
            height: birdSize,
            left: 40,
            top: birdPosition,
          }}
        />

        {/* Pipes */}
        {pipes.map((pipe, idx) => (
          <div key={idx}>
            {/* Top Pipe */}
            <div
              className="absolute bg-green-600 z-10"
              style={{
                width: pipeWidth,
                height: pipe.topHeight,
                left: pipe.x,
                top: 0,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
            {/* Bottom Pipe */}
            <div
              className="absolute bg-green-600 z-10"
              style={{
                width: pipeWidth,
                height: gameHeight - pipe.topHeight - pipeGap,
                left: pipe.x,
                top: pipe.topHeight + pipeGap,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            />
          </div>
        ))}

        {/* Score */}
        <div className="absolute top-2 left-3 text-white font-bold text-xl z-20 drop-shadow-md">
          Score: {score}
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center space-y-4 z-20">
            <h2 className="text-3xl font-bold text-white">Game Over</h2>
            <p className="text-xl text-white">Score: {score}</p>
            <button
              onClick={restartGame}
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/flappybird")}
              className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
