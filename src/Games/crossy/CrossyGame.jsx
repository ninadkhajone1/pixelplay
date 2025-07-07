// same imports as before
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const LANE_HEIGHT = 60;
const PLAYER_SIZE = 20;

const COLORS = {
  grass: '#4CAF50',
  road: '#555',
  river: '#2196F3',
  rail: '#999',
  player: '#FF0000',
  car: '#FF3D00',
  bus: '#FF9100',
  boat: '#00B0FF',
  train: '#666',
  window: '#4FC3F7',
};

const LANE_TYPES = ['road', 'river', 'rail'];
let laneId = 0;

function generateLane(score = 0, isGrass = false, index = 0) {
  if (isGrass) {
    return { id: laneId++, type: 'grass', obstacles: [], nextSpawn: null };
  }

  const type = LANE_TYPES[Math.min(Math.floor(score / 5), LANE_TYPES.length - 1)];

  const obsType =
    type === 'road'
      ? Math.random() > 0.5 ? 'car' : 'bus'
      : type === 'river'
      ? 'boat'
      : 'train';

  const width = obsType === 'bus' ? 80 : obsType === 'boat' ? 70 : 50;

  const initialVehicle = {
    x: Math.random() < 0.5 ? -width : CANVAS_WIDTH,
    width,
    height: 30,
    speed: (Math.random() < 0.5 ? -1 : 1) * (1 + score / 5),
    type: obsType,
  };

  return {
    id: laneId++,
    type,
    obstacles: [initialVehicle],
    nextSpawn: Date.now() + 2000 + index * 400,
  };
}

export default function GameCrossy() {
  const canvasRef = useRef();
  const navigate = useNavigate();
  const [lanes, setLanes] = useState([]);
  const [player, setPlayer] = useState({
    x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
    laneIndex: 0,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const laneCount = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT) + 1;
    const newLanes = [];

    for (let i = 0; i < laneCount; i++) {
      newLanes.push(generateLane(0, i === 0, i));
    }

    setLanes(newLanes);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let frameId;

    const drawVehicle = (ctx, obs, y) => {
      ctx.save();
      ctx.translate(obs.x + obs.width / 2, y + 30);
      ctx.fillStyle = COLORS[obs.type];

      if (obs.type === 'car' || obs.type === 'bus') {
        ctx.beginPath();
        ctx.moveTo(-obs.width / 2 + 5, -15);
        ctx.lineTo(obs.width / 2 - 5, -15);
        ctx.quadraticCurveTo(obs.width / 2, -15, obs.width / 2, 0);
        ctx.lineTo(obs.width / 2, 15);
        ctx.quadraticCurveTo(obs.width / 2, 15, obs.width / 2 - 5, 15);
        ctx.lineTo(-obs.width / 2 + 5, 15);
        ctx.quadraticCurveTo(-obs.width / 2, 15, -obs.width / 2, 0);
        ctx.lineTo(-obs.width / 2, -15);
        ctx.quadraticCurveTo(-obs.width / 2, -15, -obs.width / 2 + 5, -15);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = COLORS.window;
        ctx.fillRect(-obs.width / 4, -10, obs.width / 2, 6);
        ctx.fillRect(-obs.width / 4, 4, obs.width / 2, 6);
      }

      if (obs.type === 'boat') {
        ctx.beginPath();
        ctx.moveTo(-obs.width / 2, 0);
        ctx.lineTo(0, -15);
        ctx.lineTo(obs.width / 2, 0);
        ctx.quadraticCurveTo(0, 20, -obs.width / 2, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = COLORS.window;
        ctx.fillRect(-10, -6, 20, 12);
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const now = Date.now();

      lanes.forEach((lane, index) => {
        const y = CANVAS_HEIGHT - (index + 1) * LANE_HEIGHT;
        ctx.fillStyle = COLORS[lane.type];
        ctx.fillRect(0, y, CANVAS_WIDTH, LANE_HEIGHT);

        if (lane.type !== 'grass' && now > lane.nextSpawn && lane.obstacles.length < 3) {
          const obsType =
            lane.type === 'road'
              ? Math.random() > 0.5 ? 'car' : 'bus'
              : lane.type === 'river'
              ? 'boat'
              : 'train';

          const width = obsType === 'bus' ? 80 : obsType === 'boat' ? 70 : 50;
          const lastObs = lane.obstacles[lane.obstacles.length - 1];
          const safeToSpawn = !lastObs || Math.abs(lastObs.x - CANVAS_WIDTH / 2) > 120;

          if (safeToSpawn) {
            lane.obstacles.push({
              x: Math.random() < 0.5 ? -width : CANVAS_WIDTH,
              width,
              height: 30,
              speed: (Math.random() < 0.5 ? -1 : 1) * (1 + score / 5),
              type: obsType,
            });

            lane.nextSpawn = now + 3000 + Math.random() * 2000;
          }
        }

        lane.obstacles.forEach((obs) => {
          obs.x += obs.speed;
          if (obs.x < -obs.width) obs.x = CANVAS_WIDTH;
          if (obs.x > CANVAS_WIDTH) obs.x = -obs.width;

          drawVehicle(ctx, obs, y);

          if (
            index === player.laneIndex &&
            player.x + PLAYER_SIZE > obs.x &&
            player.x < obs.x + obs.width
          ) {
            setGameOver(true);
          }
        });
      });

      const py = CANVAS_HEIGHT - (player.laneIndex + 1) * LANE_HEIGHT;
      ctx.fillStyle = COLORS.player;
      ctx.beginPath();
      ctx.arc(player.x + PLAYER_SIZE / 2, py + PLAYER_SIZE / 2, PLAYER_SIZE / 2, 0, 2 * Math.PI);
      ctx.fill();

      frameId = requestAnimationFrame(draw);
    };

    if (!gameOver) frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [lanes, player, gameOver, score]);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      let newX = player.x;
      let newLane = player.laneIndex;

      if (e.key === 'ArrowLeft') newX -= 20;
      if (e.key === 'ArrowRight') newX += 20;
      if (e.key === 'ArrowUp') {
        newLane += 1;
        setScore((s) => s + 1);

        if (newLane >= lanes.length - 5) {
          const newLanes = [];
          for (let i = 0; i < 3; i++) {
            newLanes.push(generateLane(score + i + 1, false, lanes.length + i));
          }
          setLanes((prev) => {
            const updated = [...prev.slice(3), ...newLanes];
            return updated;
          });

          newLane -= 3;
        }
      }

      if (newX >= 0 && newX <= CANVAS_WIDTH - PLAYER_SIZE) player.x = newX;
      player.laneIndex = newLane;
      setPlayer({ ...player });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [player, lanes, score, gameOver]);

  const restartGame = () => {
    laneId = 0;
    setScore(0);
    setGameOver(false);
    setPlayer({
      x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
      laneIndex: 0,
    });

    const laneCount = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT) + 1;
    const newLanes = [];
    for (let i = 0; i < laneCount; i++) {
      newLanes.push(generateLane(0, i === 0, i));
    }
    setLanes(newLanes);
  };

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-white text-2xl font-bold mt-4">Crossy Road</h2>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-white mt-4 rounded-xl"
      />
      <p className="text-white mt-3 text-lg">Score: {score}</p>

      {gameOver && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-xl">
          <p className="text-3xl text-white font-bold mb-4">Game Over</p>
          <p className="text-white text-xl mb-4">Your Score: {score}</p>
          <button
            onClick={restartGame}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mb-2"
          >
            Play Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
}
