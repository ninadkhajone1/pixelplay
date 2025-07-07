import React, { useState } from "react";
import Confetti from "react-confetti";

export default function XOXOGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-700 flex flex-col items-center justify-center text-white relative">
      {/* Confetti if Winner */}
      {winner && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={100}
            recycle={false}
            origin={{ x: 0, y: 1 }}
          />
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={100}
            recycle={false}
            origin={{ x: 1, y: 1 }}
          />
        </>
      )}

      <h1 className="text-3xl font-bold mb-4">XOXO Game</h1>

      <div
        className="grid grid-cols-3 gap-2 border-4 p-4 rounded-xl"
        style={{
          borderColor: "#38bdf8",
          boxShadow: "0 0 20px #38bdf8",
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 text-4xl font-bold rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: "#1e293b",
              color: cell === "X" ? "limegreen" : cell === "O" ? "red" : "white",
              border: "2px solid #38bdf8",
              boxShadow: "0 0 6px #38bdf8",
            }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xl">
        {winner ? (
          <p>
            Winner: <span className="font-bold">{winner}</span>
          </p>
        ) : (
          <p>Next Turn: <span className="font-bold">{xIsNext ? "X (Green)" : "O (Red)"}</span></p>
        )}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
      >
        Restart
      </button>
    </div>
  );
}
