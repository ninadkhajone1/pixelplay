import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const emojis = ["🐱", "🐶", "🐼", "🐵", "🦊", "🐸", "🦁", "🐯"];

const shuffleCards = () =>
  [...emojis, ...emojis]
    .sort(() => 0.5 - Math.random())
    .map((emoji, i) => ({
      id: i,
      emoji,
      flipped: false,
      matched: false,
    }));

export default function MemoryGameMain() {
  const [cards, setCards] = useState(shuffleCards());
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (firstCard && secondCard) {
      setLockBoard(true);
      setTimeout(() => {
        if (firstCard.emoji === secondCard.emoji) {
          setCards((prev) =>
            prev.map((card) =>
              card.emoji === firstCard.emoji
                ? { ...card, matched: true }
                : card
            )
          );
        } else {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }
        setFirstCard(null);
        setSecondCard(null);
        setLockBoard(false);
      }, 800);
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    if (allMatched) {
      setTimeout(() => setGameWon(true), 400);
    }
  }, [cards]);

  const handleCardClick = (clickedCard) => {
    if (lockBoard || clickedCard.flipped || clickedCard.matched || gameWon) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
      )
    );

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      setSecondCard(clickedCard);
    }
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
    setGameWon(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white relative p-6">
      {gameWon && (
        <>
          <Confetti width={width} height={height} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-10 py-8 rounded-2xl text-center shadow-xl z-50">
            <h1 className="text-3xl font-bold text-green-400 mb-4">🎉 You Won! 🎉</h1>
            <p className="text-lg mb-6 text-white/90">All pairs matched!</p>
            <button
              onClick={restartGame}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold mb-4 transition"
            >
              🔄 Play Again
            </button>
            <br />
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
            >
              🏠 Home
            </button>
          </div>
        </>
      )}

      <h2 className="text-3xl font-bold mb-6 text-pink-400 flex items-center gap-2">
        🧠 Match the Cards
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`w-20 h-24 rounded-xl flex items-center justify-center cursor-pointer select-none text-3xl font-bold transition-all duration-300 
              ${
                card.flipped || card.matched
                  ? "bg-white text-black shadow-lg"
                  : "bg-gray-800 text-pink-400 hover:bg-gray-700"
              }`}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}
