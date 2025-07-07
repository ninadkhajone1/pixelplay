import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BubbleGame() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const radius = 15;
  const rows = 12;
  const cols = 12;
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  const [grid, setGrid] = useState([]);
  const [currentBubble, setCurrentBubble] = useState(null);
  const [nextColor, setNextColor] = useState(getRandomColor());
  const [angle, setAngle] = useState(Math.PI / 2);
  const [gameOver, setGameOver] = useState(false);
  const [matchProcessed, setMatchProcessed] = useState(false);

  const shooter = { x: 240, y: 460 };

  useEffect(() => {
    const initialGrid = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) =>
        r < 5 && Math.random() < 0.5 ? { color: getRandomColor() } : null
      )
    );
    setGrid(initialGrid);
  }, []);

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const shootBubble = () => {
    if (!currentBubble && !gameOver) {
      setCurrentBubble({
        x: shooter.x,
        y: shooter.y,
        dx: Math.cos(angle) * 6,
        dy: -Math.sin(angle) * 6,
        color: nextColor,
      });
      setNextColor(getRandomColor());
    }
  };

  const placeBubble = (bubble) => {
    let row = Math.floor(bubble.y / (radius * 2));
    let col = Math.floor(bubble.x / (radius * 2));
    let placed = false;

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const newGrid = grid.map(row => [...row]);

      if (!newGrid[row][col]) {
        placed = true;
      } else {
        for (let dr = -1; dr <= 1 && !placed; dr++) {
          for (let dc = -1; dc <= 1 && !placed; dc++) {
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < rows && c >= 0 && c < cols && !newGrid[r][c]) {
              row = r;
              col = c;
              placed = true;
            }
          }
        }
      }

      if (placed) {
        newGrid[row][col] = { color: bubble.color };
        setGrid(newGrid);
        checkMatches(row, col, bubble.color, newGrid);
      }
    }
  };

  const checkMatches = (r, c, color, currentGrid) => {
    const match = [];
    const visited = new Set();

    const dfs = (x, y) => {
      const key = `${x},${y}`;
      if (x < 0 || x >= rows || y < 0 || y >= cols || visited.has(key) || !currentGrid[x][y] || currentGrid[x][y].color !== color) return;

      visited.add(key);
      match.push([x, y]);

      dfs(x + 1, y);
      dfs(x - 1, y);
      dfs(x, y + 1);
      dfs(x, y - 1);
    };

    dfs(r, c);

    if (match.length >= 3 && !matchProcessed) {
      const newGrid = currentGrid.map(row => [...row]);
      match.forEach(([x, y]) => {
        newGrid[x][y] = null;
      });
      setGrid(newGrid);
      setMatchProcessed(true);
    } else if (match.length < 3) {
      setMatchProcessed(false);
    }
  };

  const update = () => {
    if (!currentBubble) return;
    const bubble = { ...currentBubble };

    bubble.x += bubble.dx;
    bubble.y += bubble.dy;

    if (bubble.x < radius || bubble.x > 480 - radius) {
      bubble.dx *= -1;
    }

    if (bubble.y < radius) {
      placeBubble(bubble);
      setCurrentBubble(null);
      return;
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const b = grid[r][c];
        if (b) {
          const bx = c * radius * 2 + radius;
          const by = r * radius * 2 + radius;
          const dist = Math.hypot(bx - bubble.x, by - bubble.y);
          if (dist < radius * 2) {
            placeBubble(bubble);
            setCurrentBubble(null);
            return;
          }
        }
      }
    }

    if (bubble.y > 480 - radius) {
      setGameOver(true);
      return;
    }

    setCurrentBubble(bubble);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setAngle(Math.atan2(shooter.y - my, mx - shooter.x));
    };

    const handleClick = () => shootBubble();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const loop = () => {
      ctx.clearRect(0, 0, 480, 500);

      grid.forEach((row, r) => {
        row.forEach((b, c) => {
          if (b) {
            const x = c * radius * 2 + radius;
            const y = r * radius * 2 + radius;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = b.color;
            ctx.fill();
            ctx.stroke();
          }
        });
      });

      ctx.beginPath();
      ctx.moveTo(shooter.x, shooter.y);
      ctx.lineTo(shooter.x + Math.cos(angle) * 30, shooter.y - Math.sin(angle) * 30);
      ctx.strokeStyle = 'white';
      ctx.stroke();

      if (currentBubble) {
        ctx.beginPath();
        ctx.arc(currentBubble.x, currentBubble.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = currentBubble.color;
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(shooter.x, shooter.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = nextColor;
        ctx.fill();
        ctx.stroke();
      }

      update();
      if (!gameOver) requestAnimationFrame(loop);
    };

    loop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [grid, currentBubble, angle, gameOver]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white relative">
      <h1 className="text-3xl font-bold mb-2">Bubble Shooter</h1>
      <canvas
        ref={canvasRef}
        width={480}
        height={500}
        className="rounded-xl border border-white shadow-lg"
      />
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50">
          <h2 className="text-4xl font-bold mb-4">Game Over</h2>
          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="bg-blue-600 px-4 py-2 rounded">Play Again</button>
            <button onClick={() => navigate('/')} className="bg-gray-600 px-4 py-2 rounded">Home</button>
          </div>
        </div>
      )}
    </div>
  );
}
