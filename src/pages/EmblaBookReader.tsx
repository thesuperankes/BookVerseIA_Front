import React, { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";

/**
 * Slide component – shows a scene.
 * If `unlocked` is false, show blur + lock.
 */
const StorySlide = ({ scene, unlocked, onSelect }) => (
  <div className="embla__slide flex-shrink-0 w-full h-full px-4 flex items-center justify-center">
    <div
      className={`w-full max-w-md h-[85vh] rounded-3xl shadow-xl p-6 border border-white/20 backdrop-blur-xl relative flex flex-col justify-between transition-all duration-300 ${
        unlocked ? "bg-white/40" : "bg-white/10 pointer-events-none blur-sm"
      }`}
    >
      {/* Lock overlay */}
      {!unlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl">
          <span className="text-2xl text-white">🔒</span>
        </div>
      )}

      {/* Illustration */}
      {scene.imagePrompt && (
        <img
          src={`https://placehold.co/600x300?text=${encodeURIComponent(scene.imagePrompt)}`}
          alt="Ilustración"
          className="rounded-xl mb-4"
        />
      )}

      {/* Content */}
      <p className="text-gray-900 text-sm whitespace-pre-line mb-4 flex-1 overflow-y-auto">
        {scene.content}
      </p>

      {/* Options */}
      {unlocked && scene.options?.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          {scene.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(opt.nextSceneId)}
              className="py-2 px-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 text-sm shadow-md"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

const EmblaBookReader = ({ storyData }) => {
  /* Embla gives us a viewport ref (attach to outer div) and API */
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: false });

  // Cover slide generated from meta
  const coverSlide = useMemo(() => {
    const firstScene = storyData.story.scenes[0];
    return {
      id: "cover",
      content: storyData.story.title,
      imagePrompt: null,
      options: [{ text: "Comenzar la historia", nextSceneId: firstScene.id }]
    };
  }, [storyData]);

  // Map id → scene for quick access
  const sceneMap = useMemo(() => {
    const m = new Map();
    storyData.story.scenes.forEach((s) => m.set(s.id, s));
    return m;
  }, [storyData]);

  // Full slide list is static: cover + all scenes
  const slides = useMemo(() => [coverSlide, ...storyData.story.scenes], [coverSlide, storyData]);

  // Which scene ids have been unlocked/visited
  const [unlocked, setUnlocked] = useState(new Set(["cover"]));

  // Scroll to a particular scene id
  const goToScene = useCallback(
    (sceneId) => {
      const index = slides.findIndex((s) => s.id === sceneId);
      if (index !== -1 && emblaApi) emblaApi.scrollTo(index);
    },
    [slides, emblaApi]
  );

  // Handle option click
  const handleChoice = useCallback(
    (nextSceneId) => {
      const nextScene = sceneMap.get(nextSceneId);
      if (!nextScene) return;
      setUnlocked((prev) => new Set(prev).add(nextSceneId));
      goToScene(nextSceneId);
    },
    [sceneMap, goToScene]
  );

  // Initial unlock first real scene
  useEffect(() => {
    const firstId = storyData.story.scenes[0].id;
    setUnlocked(new Set(["cover", firstId]));
  }, [storyData]);

  // Navigation buttons
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
        {storyData.story.title}
      </h1>

      {/* Embla viewport */}
      <div className="embla w-full max-w-screen-2xl rounded-2xl overflow-hidden relative" ref={viewportRef}>
        {/* Embla container */}
        <div className="embla__container flex">
          {slides.map((scene, idx) => (
            <StorySlide
              key={`${scene.id}-${idx}`}
              scene={scene}
              unlocked={unlocked.has(scene.id)}
              onSelect={handleChoice}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default EmblaBookReader;
