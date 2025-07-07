import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import GamesGallery from "./Components/GamesGallery";
import FlappyBirdLanding from "./Games/flappybird/FlappyBirdLanding";
import FlappyBirdGame from "./Games/flappybird/FlappyBirdGame";
import Game2048Landing from "./Games/2048/Game2048Landing";
import Game2048Main from "./Games/2048/Game2048Main";
import XOXOLanding from "./Games/xoxo/XOXOLanding";
import XOXOGame from "./Games/xoxo/XOXOGame";
import StonePaperLanding from "./Games/StonePaperScissors/StonePaperLanding";
import StonePaperGame from "./Games/StonePaperScissors/StonePaperGame";
import StickHeroLanding from "./Games/stickhero/StickHeroLanding";
import StickHeroGame from "./Games/stickhero/StickHeroGame";
import MemoryGameLanding from './Games/memory/MemoryGameLanding';
import MemoryGameMain from './Games/memory/MemoryGameMain';
import PacmanLanding from "./Games/pacman/PacmanLanding";
import PacmanGame from "./Games/pacman/PacmanGame";
import CrossyLanding from "./Games/crossy/CrossyLanding";
import CrossyGame from "./Games/crossy/CrossyGame";
import WhackLanding from './Games/whack/WhackLanding';
import WhackGame from './Games/whack/WhackGame';
import BubbleLanding from './Games/bubble/BubbleLanding';
import BubbleGame from './Games/bubble/BubbleGame';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
  <Route
    path="/"
    element={
      <>
        <HeroSection />
        <GamesGallery />
        <Footer />
      </>
    }
  />
  <Route path="/flappybird" element={<FlappyBirdLanding />} />
  <Route path="/flappybird/play" element={<FlappyBirdGame />} />
  <Route path="/2048" element={<Game2048Landing />} />
  <Route path="/2048/play" element={<Game2048Main />} />
  <Route path="/xoxo" element={<XOXOLanding />} />
  <Route path="/xoxo/play" element={<XOXOGame />} />
  <Route path="/stonepaperscissors" element={<StonePaperLanding />} />
  <Route path="/stonepaperscissors/play" element={<StonePaperGame />} />
  <Route path="/stickhero" element={<StickHeroLanding />} />
  <Route path="/stickhero/play" element={<StickHeroGame />} />
  <Route path="/memorygame" element={<MemoryGameMain />} />
  <Route path="/memory" element={<MemoryGameLanding />} />
  <Route path="/pacman" element={<PacmanLanding />} />
  <Route path="/pacman/play" element={<PacmanGame />} />
  <Route path="/crossy" element={<CrossyLanding />} />
  <Route path="/crossy/play" element={<CrossyGame />} />
  <Route path="/whack" element={<WhackLanding />} />
  <Route path="/whack/play" element={<WhackGame />} />
  <Route path="/bubble" element={<BubbleLanding />} />
  <Route path="/bubble/play" element={<BubbleGame />} />


</Routes>

    </div>
  );
}
