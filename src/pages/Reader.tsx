import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import EmblaBookReader from "./EmblaBookReader";
import aiService from "../services/ai.service";
import InteractiveBook from "./InteractiveBook";

function fromBase64UrlSafe(str: string): any {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(json);
}

const BookReaderContainer = () => {
  const location = useLocation();
  const [storyData, setStoryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Para evitar llamadas múltiples
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return; // ya se ejecutó
    calledRef.current = true;

    const params = new URLSearchParams(location.search);
    const encoded = params.get("data");

    if (!encoded) {
      setError("No se proporcionaron datos.");
      return;
    }

    try {
      const rawData = fromBase64UrlSafe(encoded);

      const {
        title,
        character,
        setting,
        theme,
        genre
      } = rawData;

      if (!title || !character || !setting || !theme || !genre) {
        throw new Error("Faltan campos requeridos.");
      }

      const adaptedParams = {
        title,
        characterName: character,
        environment: setting,
        theme: genre,
        objetive: theme,
      };

      aiService
        .generateStory(adaptedParams)
        .then((result:any) => setStoryData(result))
        .catch((err: any) => {
          console.error("Error generando historia:", err);
          setError("No se pudo generar la historia.");
        });
    } catch (e) {
      console.error("Error procesando datos:", e);
      setError("Datos malformateados o incompletos.");
    }
  }, [location.search]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!storyData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Generando historia...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 p-6">
      <div className="w-full max-w-4xl p-8 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-sm text-gray-600">Lectura</h2>
          <h1 className="text-3xl font-bold text-blue-700">
            {storyData.story?.title || "Título de la historia"}
          </h1>
        </div>
        <InteractiveBook storyData={storyData} />
      </div>
    </div>
  );
};

export default BookReaderContainer;
