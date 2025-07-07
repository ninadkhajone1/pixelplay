import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import games from '../data/gameData'; // ✅ use shared game data

export default function Navbar() {
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item === 'Contact') setShowContact(true);
    if (item === 'About') setShowAbout(true);
  };

  const filteredGames = searchTerm
    ? games.filter((g) =>
        g.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectGame = (game) => {
    setSearchTerm('');
    navigate(game.link);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center text-white bg-transparent">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/log.png" alt="Logo" className="w-10 h-10 object-contain rounded" />
          <span className="text-2xl font-bold tracking-wide">PixelPlay</span>
        </div>

        {/* Nav + Search */}
        <div className="flex items-center space-x-4 relative">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search games..."
              className="bg-white/10 placeholder-white/60 px-3 py-1 rounded-md w-28 focus:w-52 transition-all duration-300 outline-none text-white text-sm"
            />
            {focused && filteredGames.length > 0 && (
              <div className="absolute mt-1 w-52 bg-black bg-opacity-90 rounded shadow-lg z-20 max-h-60 overflow-auto">
                {filteredGames.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer"
                    onMouseDown={() => handleSelectGame(game)} // prevent blur before click
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-6 h-6 object-contain rounded"
                    />
                    <span className="text-sm">{game.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav Buttons */}
          <button
            className="px-4 py-2 rounded-md transition duration-300 hover:bg-white/10 hover:ring-1 hover:ring-white/10 text-white/80"
            onClick={() => window.location.href = '/'}
          >
            Home
          </button>

          <button
            onClick={() => handleClick('About')}
            className="px-4 py-2 rounded-md transition duration-300 hover:bg-white/10 hover:ring-1 hover:ring-white/10 text-white/80"
          >
            About
          </button>

          <button
            onClick={() => handleClick('Contact')}
            className="px-4 py-2 rounded-md transition duration-300 hover:bg-white/10 hover:ring-1 hover:ring-white/10 text-white/80"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Modals */}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </>
  );
}
