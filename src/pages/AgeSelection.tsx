import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const ageGroups = [
  {
    label: "6–8",
    image: "/img/age-6-8.png",
  },
  {
    label: "8–12",
    image: "/img/age-8-14.png",
  },
  {
    label: "12–18",
    image: "/img/age-14-18.png",
  },
];

const AgeSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (ageGroup: string) => {
    navigate(`/themes?age=${ageGroup}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl p-8 rounded-3xl bg-white/80 border border-white/30 backdrop-blur-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Selecciona tu edad
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {ageGroups.map((group, index) => (
            <motion.button
              key={group.label}
              onClick={() => handleSelect(group.label)}
              whileHover={{
                scale: 1.08,
                rotate: [0, 2, -2, 0],
                transition: {
                  duration: 0.4,
                  ease: "easeInOut", // <-- No spring
                },
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/70 border border-white/40 shadow-md"
            >
              <img
                src={group.image}
                alt={`Edad ${group.label}`}
                className="w-32 h-32 object-contain mb-4"
              />
              <span className="text-lg font-semibold text-gray-800">
                {group.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500 shadow-lg flex items-center justify-center transition"
            onClick={() => navigate("/themes")}
          >
            <span className="text-5xl text-white">›</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AgeSelection;
