import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Game2048() {
  const navigate = useNavigate();
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);

  const containerRef = useRef(null);
  const start = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const newGrid = [...grid];
    addNumber(newGrid);
    addNumber(newGrid);
    setGrid(newGrid);
    // eslint-disable-next-line
  }, []);

  const addNumber = (grid) => {
    const empty = [];
    grid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell === 0) empty.push({ i, j });
      })
    );
    if (empty.length === 0) return;
    const { i, j } = empty[Math.floor(Math.random() * empty.length)];
    grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  };

  const move = (direction) => {
    const newGrid = [...grid.map((row) => [...row])];
    let moved = false;

    const merge = (arr) => {
      let newArr = arr.filter((val) => val !== 0);
      for (let i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] === newArr[i + 1]) {
          newArr[i] *= 2;
          setScore((prev) => prev + newArr[i]);
          newArr[i + 1] = 0;
        }
      }
      return newArr.filter((val) => val !== 0);
    };

    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        switch (direction) {
          case "up":
            row.push(newGrid[j][i]);
            break;
          case "down":
            row.push(newGrid[3 - j][i]);
            break;
          case "left":
            row.push(newGrid[i][j]);
            break;
          case "right":
            row.push(newGrid[i][3 - j]);
            break;
          default:
            break;
        }
      }

      const merged = merge(row);
      while (merged.length < 4) merged.push(0);

      for (let j = 0; j < 4; j++) {
        let val =
          direction === "down"
            ? merged[3 - j]
            : direction === "right"
            ? merged[3 - j]
            : merged[j];
        switch (direction) {
          case "up":
          case "down":
            if (newGrid[j][i] !== val) moved = true;
            newGrid[j][i] = val;
            break;
          case "left":
          case "right":
            if (newGrid[i][j] !== val) moved = true;
            newGrid[i][j] = val;
            break;
          default:
            break;
        }
      }
    }

    if (moved) {
      addNumber(newGrid);
      setGrid(newGrid);
    }
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") move("up");
      else if (e.key === "ArrowDown") move("down");
      else if (e.key === "ArrowLeft") move("left");
      else if (e.key === "ArrowRight") move("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Touch and Mouse Swipe Controls
  useEffect(() => {
    const container = containerRef.current;

    const handleStart = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      start.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleEnd = (e) => {
      const touch = e.changedTouches ? e.changedTouches[0] : e;
      const dx = touch.clientX - start.current.x;
      const dy = touch.clientY - start.current.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 20) move("right");
        else if (dx < -20) move("left");
      } else {
        if (dy > 20) move("down");
        else if (dy < -20) move("up");
      }
    };

    container.addEventListener("mousedown", handleStart);
    container.addEventListener("mouseup", handleEnd);
    container.addEventListener("touchstart", handleStart);
    container.addEventListener("touchend", handleEnd);

    return () => {
      container.removeEventListener("mousedown", handleStart);
      container.removeEventListener("mouseup", handleEnd);
      container.removeEventListener("touchstart", handleStart);
      container.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-black">Score: {score}</h2>
      <div className="grid grid-cols-4 gap-4">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-20 h-20 flex items-center justify-center text-2xl font-bold bg-white rounded shadow text-black"
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-yellow-400 text-white font-semibold rounded hover:bg-yellow-500"
      >
        Home
      </button>
    </div>
  );
}
