export default function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-[#111827] p-2 rounded-2xl w-[90%] max-w-md shadow-xl border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl hover:text-red-500 transition z-10"
        >
          ×
        </button>
        <img
          src="/about-pixelplay.png"
          alt="About PixelPlay"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
