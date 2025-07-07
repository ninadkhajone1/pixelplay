// File: src/Games/rockpaperscissors/RockPaperScissorsGame.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rockIcon from "../../assets/rock.png";
import paperIcon from "../../assets/paper.png";
import scissorsIcon from "../../assets/scissors.png";
import "./rps.css";

const choices = [
  { name: "rock", icon: rockIcon },
  { name: "paper", icon: paperIcon },
  { name: "scissors", icon: scissorsIcon },
];

export default function RockPaperScissorsGame() {
  const navigate = useNavigate();
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  useEffect(() => {
    if (playerChoice) {
      const timer = setTimeout(() => {
        const random = Math.floor(Math.random() * 3);
        const comp = choices[random];
        setComputerChoice(comp.name);

        if (playerChoice === comp.name) {
          setResult("draw");
          setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
        } else if (
          (playerChoice === "rock" && comp.name === "scissors") ||
          (playerChoice === "paper" && comp.name === "rock") ||
          (playerChoice === "scissors" && comp.name === "paper")
        ) {
          setResult("win");
          setScore((prev) => ({ ...prev, win: prev.win + 1 }));
        } else {
          setResult("lose");
          setScore((prev) => ({ ...prev, lose: prev.lose + 1 }));
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [playerChoice]);

  const handlePlay = (choice) => {
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult("");
  };

  const getIcon = (name) => {
    return choices.find((c) => c.name === name)?.icon;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 pt-20">
      <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>

      {!playerChoice && (
        <>
          <p className="mb-6 text-lg">Select your Weapon</p>
          <div className="flex space-x-6 mb-8">
            {choices.map((choice) => (
              <button
                key={choice.name}
                className="hover:scale-110 transition"
                onClick={() => handlePlay(choice.name)}
              >
                <img src={choice.icon} alt={choice.name} className="w-20 h-20" />
                <p className="text-center mt-2 capitalize">{choice.name}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {playerChoice && (
        <>
          <div className="flex items-center space-x-8 mb-4 animate-shake">
            <div className="text-center">
              <p className="mb-2">Player</p>
              <img
                src={getIcon(playerChoice)}
                alt={playerChoice}
                className="w-24 h-24"
              />
            </div>
            <p className="text-xl">vs</p>
            <div className="text-center">
              <p className="mb-2">Computer</p>
              <img
                src={getIcon(computerChoice)}
                alt={computerChoice}
                className="w-24 h-24"
              />
            </div>
          </div>

          <p className="text-xl mb-4">
            {result === "win"
              ? "Congrats, You Won! 🎉"
              : result === "lose"
              ? "Oops, You Lost. 😢"
              : result === "draw"
              ? "It's a Draw! 🤝"
              : ""}
          </p>

          <button
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition mb-6"
            onClick={() => setPlayerChoice(null)}
          >
            Play Again
          </button>
        </>
      )}

      <div className="flex space-x-10 text-lg mt-4 border-t pt-4 border-gray-700">
        <p>Won: {score.win}</p>
        <p>Lost: {score.lose}</p>
        <p>Draw: {score.draw}</p>
      </div>

      <button
        className="mt-10 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}
