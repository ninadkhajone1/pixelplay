import React, { useEffect, useRef, useState } from 'react';

const tileSize = 20;

const mazeMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,1],
  [1,1,1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1,1],
  [1,2,2,2,2,2,2,2,1,2,2,2,1,1,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,2,1,1,1,2,2,2,2,1,1,2,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,1,2,2,2,1,1,1,1,1,1,2,2,1,2,2,2,2,2,2,1,2,1],
  [1,1,1,1,1,2,1,1,1,2,2,2,1,1,2,2,2,1,1,1,2,1,1,1,1,1,2,1],
  [1,2,2,2,1,2,2,2,1,1,1,2,2,2,2,2,1,1,1,2,2,1,2,2,2,2,2,1],
  [1,2,1,2,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const mapHeight = mazeMap.length;
const mapWidth = mazeMap[0].length;

const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const PacmanGame = () => {
  const canvasRef = useRef(null);
  const [pacman, setPacman] = useState({ x: 1, y: 1, dir: 'ArrowRight' });
  const [ghost, setGhost] = useState({ x: 26, y: 1 });
  const [map, setMap] = useState(mazeMap.map(row => [...row]));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const move = (entity, direction) => {
    const dx = direction.x;
    const dy = direction.y;
    const newX = entity.x + dx;
    const newY = entity.y + dy;
    if (map[newY] && map[newY][newX] !== 1) {
      return { ...entity, x: newX, y: newY };
    }
    return entity;
  };

  const ghostAI = (ghost, pacman) => {
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;

    const moveOptions = [];

    if (dx > 0) moveOptions.push(directions.ArrowRight);
    else if (dx < 0) moveOptions.push(directions.ArrowLeft);

    if (dy > 0) moveOptions.push(directions.ArrowDown);
    else if (dy < 0) moveOptions.push(directions.ArrowUp);

    // Try best option first
    for (let dir of moveOptions) {
      const next = move(ghost, dir);
      if (next.x !== ghost.x || next.y !== ghost.y) return next;
    }

    // If blocked, move randomly
    const fallback = Object.values(directions).sort(() => Math.random() - 0.5);
    for (let dir of fallback) {
      const next = move(ghost, dir);
      if (next.x !== ghost.x || next.y !== ghost.y) return next;
    }

    return ghost;
  };

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, mapWidth * tileSize, mapHeight * tileSize);

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        if (map[y][x] === 1) {
          ctx.fillStyle = '#1f2937'; // wall
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        } else if (map[y][x] === 2) {
          ctx.fillStyle = '#facc15'; // dot
          ctx.beginPath();
          ctx.arc(x * tileSize + 10, y * tileSize + 10, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    // Draw Pacman
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x * tileSize + 10, pacman.y * tileSize + 10, 10, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(pacman.x * tileSize + 10, pacman.y * tileSize + 10);
    ctx.fill();

    // Draw Ghost
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ghost.x * tileSize + 10, ghost.y * tileSize + 10, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (directions[e.key]) {
        setPacman((prev) => ({ ...prev, dir: e.key }));
      }
    };

    const handleTouch = () => setGameOver(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch);

    const interval = setInterval(() => {
      if (gameOver) return;

      setPacman((prev) => {
        const next = move(prev, directions[prev.dir]);
        if (map[next.y][next.x] === 2) {
          const newMap = map.map((row) => [...row]);
          newMap[next.y][next.x] = 0;
          setMap(newMap);
          setScore((s) => s + 10);
        }
        return next;
      });

      setGhost((g) => ghostAI(g, pacman));

      if (pacman.x === ghost.x && pacman.y === ghost.y) {
        setGameOver(true);
      }

      draw();
    }, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch);
      clearInterval(interval);
    };
  }, [pacman, ghost, map, gameOver]);

  useEffect(() => {
    draw(); // Initial draw
  }, []);

  const restartGame = () => {
    setMap(mazeMap.map(row => [...row]));
    setPacman({ x: 1, y: 1, dir: 'ArrowRight' });
    setGhost({ x: 26, y: 1 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative flex flex-col items-center bg-black min-h-screen pt-6">
      <h1 className="text-yellow-300 text-3xl font-bold mb-4">Pac-Man</h1>
      <canvas
        ref={canvasRef}
        width={mapWidth * tileSize}
        height={mapHeight * tileSize}
        className="bg-black border-2 border-yellow-300"
      />
      <div className="text-yellow-200 mt-4 text-lg">Score: {score}</div>

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-10">
          <h2 className="text-red-500 text-4xl font-bold mb-4">Game Over</h2>
          <p className="text-yellow-200 text-xl mb-6">Final Score: {score}</p>
          <div className="flex gap-4">
            <button
              onClick={restartGame}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded"
            >
              Play Again
            </button>
            <a
              href="/"
              className="text-yellow-300 underline text-lg py-2 px-4"
            >
              Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacmanGame;
