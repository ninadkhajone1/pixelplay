import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaGithub,
  FaDiscord,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-black via-gray-900 to-black text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <img src="/log.png" alt="PixelPlay" className="w-10 h-10 rounded" />
            <span className="text-2xl font-bold tracking-wide">PixelPlay</span>
          </div>
          <p className="text-gray-400 text-sm">
            Explore a world of fun, mini-games, and classic arcade vibes—all in one place!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
            <li><Link to="/#games" className="hover:text-cyan-400">Games</Link></li>
            <li><button onClick={() => window.scrollTo({ top: 0 })} className="hover:text-cyan-400">About</button></li>
            <li><button onClick={() => window.scrollTo({ top: 0 })} className="hover:text-cyan-400">Contact</button></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
          <div className="flex flex-wrap gap-4 text-2xl">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-125 transition-transform text-[#1DA1F2] hover:drop-shadow-[0_0_8px_#1DA1F2]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-125 transition-transform text-white hover:drop-shadow-[0_0_8px_white]"
            >
              <FaGithub />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-125 transition-transform text-[#5865F2] hover:drop-shadow-[0_0_8px_#5865F2]"
            >
              <FaDiscord />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-125 transition-transform text-[#E1306C] hover:drop-shadow-[0_0_8px_#E1306C]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-125 transition-transform text-[#1877F2] hover:drop-shadow-[0_0_8px_#1877F2]"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-125 transition-transform text-[#FF0000] hover:drop-shadow-[0_0_8px_#FF0000]"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Note or Newsletter */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Note</h4>
          <p className="text-gray-400 text-sm">
            New games dropping soon! Stay tuned and keep playing 🎮
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 text-gray-500 text-xs border-t border-white/10 pt-4">
        © {new Date().getFullYear()} PixelPlay. All rights reserved.
      </div>
    </footer>
  );
}
