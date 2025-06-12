import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const genres = [
  { name: "Horror", emoji: "👻" },
  { name: "Aventura", emoji: "💰" },
  { name: "Fantasia", emoji: "🐉" },
  { name: "Medieval", emoji: "🏰" },
  { name: "Scientific", emoji: "🛸" },
  { name: "Comedia", emoji: "🎭" },
  { name: "Misterio", emoji: "🔍" },
  { name: "Romance", emoji: "❤️" },
  { name: "Piratas", emoji: "⛵" },
];

export default function Favoritos() {
  const [selected, setSelected] = useState<string[]>([]);
  const maxSelection = 12;
  const minSelection = 4;
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const toggleGenre = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : prev.length < maxSelection
        ? [...prev, name]
        : prev
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, easing: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/80 border border-white/30 rounded-3xl shadow-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Favoritos
        </h2>
        <p className="text-sm text-center text-gray-700 mb-6">
          Selecciona entre {minSelection} y {maxSelection} géneros
        </p>

        <div className="grid grid-cols-3 gap-4">
          {genres.map(({ name, emoji }, index) => (
            <motion.button
              key={name}
              onClick={() => toggleGenre(name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.05,
                rotate: selected.includes(name) ? 0 : 2,
              }}
              className={`flex flex-col items-center justify-center rounded-2xl p-4 h-28 transition backdrop-blur-md border border-white/20 shadow-md ${
                selected.includes(name)
                  ? "bg-white/60 scale-105 ring-2 ring-blue-400"
                  : "bg-white/30 hover:bg-white/40"
              }`}
            >
              <span className="text-4xl">{emoji}</span>
              <span className="mt-2 text-sm font-medium text-gray-800">
                {name}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-800">
            Géneros seleccionados:{" "}
            <span className="font-semibold">{selected.length}</span>
          </p>
        </div>

        <AnimatePresence>
          {selected.length >= minSelection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex justify-center"
            >
              <motion.button
                onClick={handleContinue}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 18px rgba(59,130,246,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg transition"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
