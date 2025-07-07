import React from 'react';
import GameCard from './GameCard';
import games from '../data/gameData';

export default function GamesGallery() {
  return (
    <div className="bg-[url('/gaa.jpg')] bg-cover bg-center bg-no-repeat p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            image={game.image}
            link={game.link}
          />
        ))}
      </div>
    </div>
  );
}
