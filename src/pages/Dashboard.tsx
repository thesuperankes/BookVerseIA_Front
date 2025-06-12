import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CrearModal from "./StoryGenerator";
import { useNavigate } from "react-router";

const cuentos = [
  {
    id: 1,
    title: "El Dragón Verde",
    emoji: "🐉",
    synopsis:
      "Un pequeño dragón descubre su poder interior en un reino mágico.",
  },
  {
    id: 2,
    title: "Nave Misteriosa",
    emoji: "🛸",
    synopsis: "Niños aventureros encuentran una nave oculta en el bosque.",
  },
  {
    id: 3,
    title: "Castillo Encantado",
    emoji: "🏰",
    synopsis: "Un castillo antiguo esconde secretos y portales mágicos.",
  },
  {
    id: 4,
    title: "El Tesoro Pirata",
    emoji: "💰",
    synopsis:
      "Un mapa antiguo guía a un grupo de amigos hacia un tesoro escondido.",
  },
  {
    id: 5,
    title: "Fantasma Curioso",
    emoji: "👻",
    synopsis: "Un fantasma tímido quiere hacer amigos en Halloween.",
  },
  {
    id: 6,
    title: "Romance en la Nube",
    emoji: "☁️",
    synopsis: "Dos corazones se encuentran flotando entre las nubes.",
  },
  {
    id: 7,
    title: "Expedición Marina",
    emoji: "⛵",
    synopsis: "Una aventura oceánica con criaturas increíbles bajo el mar.",
  },
  {
    id: 8,
    title: "Lupa Detectives",
    emoji: "🔍",
    synopsis: "Un equipo de niños detectives resuelve un gran misterio.",
  },
];

export default function Dashboard() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showCrearModal, setShowCrearModal] = useState(false);

  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/reader`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-rose-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, easing: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm backdrop-blur-2xl bg-white/80 border border-white/30 rounded-3xl shadow-2xl p-6"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Dashboard
        </h2>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {cuentos.map((cuento) => (
            <motion.button
              key={cuento.id}
              onClick={() => setSelectedStory(cuento)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square flex flex-col items-center justify-center bg-white/30 hover:bg-white/50 transition rounded-xl backdrop-blur-md border border-white/20 shadow-md"
            >
              <span className="text-2xl">{cuento.emoji}</span>
              <span className="text-[10px] text-center font-medium mt-1 text-gray-800">
                {cuento.title}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={() => setShowCrearModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition"
        >
          CREAR
        </motion.button>
      </motion.div>

      {/* 🔮 Modal de sinopsis con animación */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            key="storyModal"
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-[90%] max-w-lg bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedStory.title}
                </h3>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-600 hover:text-gray-900 text-lg"
                >
                  ✖️
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-shrink-0 w-full sm:w-24 h-24 flex items-center justify-center bg-white rounded-xl text-4xl shadow-inner">
                  {selectedStory.emoji}
                </div>
                <div className="text-sm text-gray-800 leading-relaxed">
                  {selectedStory.synopsis}
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => handleSelect()}
                  className="px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition"
                >
                  Leer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧪 Modal de creación con animación */}
      <AnimatePresence>
        {showCrearModal && (
          <motion.div
            key="crearModal"
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg mx-auto"
            >
              <CrearModal
                onClose={() => setShowCrearModal(false)}
                onSubmit={(data) => {
                  console.log("Generar cuento con:", data);
                  setShowCrearModal(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
