import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-pink-100">
      <div className="w-[90%] max-w-sm backdrop-blur-2xl bg-white/80 border border-white/30 rounded-2xl p-10 shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">¡Bienvenido!</h1>

        <motion.button
          onClick={() => navigate("/age")}
          className="px-8 py-4 text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-lg"
          whileHover={{
            scale: 1.1,
            rotate: 5, // solo un valor: destino (de 0 a 5 grados)
            transition: { type: "spring", stiffness: 300, damping: 12 },
          }}
          whileTap={{
            scale: 0.95,
            rotate: 0,
            transition: { duration: 0.2 },
          }}
          animate={{
            y: [0, -5, 0],
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          INICIAR
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
