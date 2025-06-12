import { useState } from "react";
import { useNavigate } from "react-router";

function toBase64UrlSafe(obj) {
  const json = JSON.stringify(obj);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default function CrearModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [theme, setTheme] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const navigate = useNavigate();

  const genres = [
    { name: "Aventura", emoji: "💰" },
    { name: "Fantasia", emoji: "🐉" },
    { name: "Comedia", emoji: "🎭" },
    { name: "Misterio", emoji: "🔍" },
  ];

  const handleSubmit = () => {
    if (!title || !character || !setting || !theme || !selectedGenre) return;

    const storyParams = {
      title,
      character,
      setting,
      theme,
      genre: selectedGenre,
    };

    const base64Data = toBase64UrlSafe(storyParams);
    navigate(`/reader?data=${base64Data}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
      <div className="w-[90%] max-w-lg bg-white/90 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Crear Historia</h3>
          <button
            onClick={onClose}
            className="text-lg text-gray-700 hover:text-gray-900"
          >
            ✖️
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Título de la historia
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 border border-white/60 shadow-inner"
              placeholder="El viaje mágico"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Personaje principal
            </label>
            <input
              type="text"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 border border-white/60 shadow-inner"
              placeholder="Nombre del personaje"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Entorno de la historia
            </label>
            <input
              type="text"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 border border-white/60 shadow-inner"
              placeholder="Un bosque encantado, el espacio, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Tema principal
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 border border-white/60 shadow-inner"
              placeholder="Amistad, valentía, descubrimiento..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Selecciona el género
            </label>
            <div className="grid grid-cols-4 gap-2">
              {genres.map((g) => (
                <button
                  key={g.name}
                  onClick={() => setSelectedGenre(g.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${
                    selectedGenre === g.name
                      ? "bg-blue-100 border-blue-500 ring-2 ring-blue-400"
                      : "bg-white/70 border-white/50 hover:bg-white/90"
                  }`}
                >
                  <span className="text-xl">{g.emoji}</span>
                  <span className="text-[10px] text-gray-800 mt-1">
                    {g.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={
              !title || !character || !setting || !theme || !selectedGenre
            }
            className="w-full py-3 rounded-xl bg-blue-400 hover:bg-blue-500 transition font-semibold text-white shadow-md disabled:opacity-50"
          >
            GENERAR
          </button>
        </div>
      </div>
    </div>
  );
}
