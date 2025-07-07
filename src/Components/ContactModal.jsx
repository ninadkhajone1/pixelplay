export default function ContactModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      style={{
        backgroundImage: "url('/contactbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl max-w-md relative animate-scale-up bg-opacity-90">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl hover:text-red-500 transition"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">👨‍💻 Contact</h2>
        <p className="text-lg text-center leading-relaxed">
          ⚒️ Developer is currently busy developing projects ,
          no wait might be chilling ,
          no wait he is introvert with no friends definitely might be overthinking ,
          So till then .<br />
         enjoy the Games and share!
        </p>
      </div>
    </div>
  );
}
