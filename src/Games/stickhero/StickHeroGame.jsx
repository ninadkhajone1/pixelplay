// src/pages/StickHeroGame.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./StickHero.css";

export default function StickHeroGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const GAME_HEIGHT = 400;
    const GAME_WIDTH = 800;

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    let animationId;
    let growing = false;
    let stickLength = 0;
    let stickFalling = false;
    let stickFallen = false;
    let fallStartTime = 0;
    let ninjaMoving = false;
    let stickAngle = 0;
    let keepStickVisible = false;

    const ninja = {
      x: 80,
      y: GAME_HEIGHT - 140,
      width: 40,
      height: 40,
      image: new Image(),
    };
    ninja.image.src = "/ninja.png";

    const platforms = [
      { x: 50, width: 80 },
      { x: 200, width: 80 },
    ];

    function generateNextPlatform() {
      const last = platforms[platforms.length - 1];
      const minGap = 100;
      const maxGap = 200;
      const gap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
      const newWidth = 80;
      platforms.push({
        x: last.x + last.width + gap,
        width: newWidth,
      });
    }

    function drawSky() {
      const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
      gradient.addColorStop(0, "#ffafbd");
      gradient.addColorStop(1, "#ffc3a0");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    function drawBirds() {
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText("~ ~ ~", (Date.now() / 10) % canvas.width, 50);
    }

    function drawPlatforms(offsetX) {
      ctx.fillStyle = "black";
      platforms.forEach((p) => {
        ctx.fillRect(p.x - offsetX, GAME_HEIGHT - 100, p.width, 100);
      });
    }

    function drawStick(offsetX) {
      const base = platforms[0];
      if (!base) return;

      ctx.save();
      ctx.translate(base.x + base.width - offsetX, GAME_HEIGHT - 100);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 0);

      const angle = stickFalling
        ? Math.min((Date.now() - fallStartTime) / 300, 1) * (Math.PI / 2)
        : stickFallen && keepStickVisible
        ? Math.PI / 2
        : 0;

      ctx.rotate(angle);
      ctx.lineTo(0, -stickLength);
      ctx.stroke();
      ctx.restore();
    }

    function drawNinja(offsetX) {
      ctx.drawImage(
        ninja.image,
        ninja.x - offsetX,
        ninja.y,
        ninja.width,
        ninja.height
      );
    }

    let offsetX = 0;

    function gameLoop() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      drawSky();
      drawBirds();
      drawPlatforms(offsetX);
      drawStick(offsetX);
      drawNinja(offsetX);

      if (growing) {
        stickLength += 3;
      }

      if (stickFalling && (Date.now() - fallStartTime > 300)) {
        stickFalling = false;
        stickFallen = true;
        keepStickVisible = true;

        const base = platforms[0];
        const next = platforms[1];
        const stickEndX = base.x + base.width + stickLength;

        if (stickEndX >= next.x && stickEndX <= next.x + next.width) {
          ninjaMoving = true;
        } else {
          setTimeout(() => setGameOver(true), 500);
        }
      }

      if (ninjaMoving) {
        ninja.x += 4;
        offsetX += 4;

        const nextPlatform = platforms[1];
        if (ninja.x >= nextPlatform.x + 10) {
          ninjaMoving = false;
          stickLength = 0;
          stickFallen = false;
          keepStickVisible = false;
          platforms.shift();
          generateNextPlatform();
          setScore((s) => s + 1);
        }
      }

      if (!gameOver) {
        animationId = requestAnimationFrame(gameLoop);
      }
    }

    window.addEventListener("mousedown", () => {
      if (!gameOver && !ninjaMoving) {
        growing = true;
      }
    });

    window.addEventListener("mouseup", () => {
      if (!gameOver && growing) {
        growing = false;
        stickFalling = true;
        fallStartTime = Date.now();
      }
    });

    generateNextPlatform();
    gameLoop();

    return () => cancelAnimationFrame(animationId);
  }, [gameOver]);

  return (
    <div className="stickhero-wrapper">
      <div className="stickhero-box">
        <canvas ref={canvasRef}></canvas>
        <div className="score">Score: {score}</div>
        {gameOver && (
          <div className="gameover">
            <h1>Game Over</h1>
            <Link to="/stickhero">Retry</Link>
          </div>
        )}
        <Link className="home-btn" to="/">Home</Link>
      </div>
    </div>
  );
}
