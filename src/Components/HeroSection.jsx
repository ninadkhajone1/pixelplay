import { useState, useEffect } from "react";

const slides = [
  {
    title: "Valorant",
    description: "Explore the world of FPS games",
    image: "valobg.jpg",
    link: "https://playvalorant.com/",
  },
  {
    title: "Minecraft",
    description:"Explore your own unique worlds, survive the night, and create anything you can imagine! ",
    image: "mine.jpg",
    link: "https://www.minecraft.net/en-us",
  },
  {
    title: "GTA V",
    description: "Experience blockbuster hits Grand Theft Auto V and GTA Online ",
    image: "gtavlog.jpg",
    link: "https://www.rockstargames.com/gta-v",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // slower autoplay
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Slide Container */}
      <div
        className="flex h-full transition-transform duration-[1000ms] ease-in-out"
        style={{
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-screen h-screen flex-shrink-0 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end px-10 py-10 z-10">
              <div>
                <h1 className="text-white text-5xl font-extrabold max-w-2xl drop-shadow-[0_0_12px_#00f6ff]">
                  {slide.title}
                </h1>
                <p className="text-white text-lg max-w-xl mt-4">{slide.description}</p>
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-xl w-fit"
                >
                  Play Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
    {/* Previous Arrow */}
{/* Previous Arrow */}
<button
  onClick={prevSlide}
  className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 group"
>
  <span className="block w-5 h-5 border-t-2 border-l-2 border-white transform -rotate-45 group-hover:scale-125 transition-transform duration-300" />
</button>

{/* Next Arrow */}
<button
  onClick={nextSlide}
  className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 group"
>
  <span className="block w-5 h-5 border-t-2 border-r-2 border-white transform rotate-45 group-hover:scale-125 transition-transform duration-300" />
</button>

    </div>
  );
}
