import React, { useRef, useMemo, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

const Page = React.forwardRef(({ content, imagePrompt, options, onSelect, locked, isActive }, ref) => {
  return (
    <div
      ref={ref}
      className={`p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between h-full relative overflow-hidden border-4 transition-all duration-300 ${
        isActive ? "border-blue-500" : "border-transparent"
      }`}
    >
      {locked && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10 flex items-center justify-center">
          <div className="text-gray-600 text-lg font-semibold">🔒 Página bloqueada</div>
        </div>
      )}
      <div className={locked ? "blur-sm pointer-events-none" : ""}>
        {imagePrompt && (
          <img
            src={`https://placehold.co/300x150?text=${encodeURIComponent(
              imagePrompt
            )}`}
            alt="escena"
            className="mb-4 rounded"
          />
        )}
        <p className="text-gray-800 text-sm whitespace-pre-line mb-4">{content}</p>
      </div>
      {!locked && options && options.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm hover:bg-blue-600"
              onClick={() => onSelect(opt.nextSceneId)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

const InteractiveBook = ({ storyData }) => {
  const flipBook = useRef();
  const sceneIndexMap = useRef({});
  const [unlockedScenes, setUnlockedScenes] = useState([storyData.story.scenes[0].id]);
  const [currentPage, setCurrentPage] = useState(0);

  const orderedScenes = useMemo(() => {
    const result = [];
    storyData.story.scenes.forEach((scene, idx) => {
      sceneIndexMap.current[scene.id] = idx + 1; // offset by 1 due to cover
      result.push(scene);
    });
    return result;
  }, [storyData]);

  const handleChoice = (nextId) => {
    if (!unlockedScenes.includes(nextId)) {
      setUnlockedScenes((prev) => [...prev, nextId]);
    }
    const nextIndex = sceneIndexMap.current[nextId];
    if (nextIndex !== undefined && flipBook.current) {
      setTimeout(() => {
        const flipInstance = flipBook.current?.pageFlip?.();
        if (flipInstance) {
          flipInstance.flip(nextIndex);
        }
      }, 100);
    }
  };

  useEffect(() => {
    let raf:any;
    const checkReady = () => {
      const pageFlipInstance = flipBook.current?.pageFlip?.();
      if (pageFlipInstance) {
        pageFlipInstance.on("flip", (e) => setCurrentPage(e.data));
      } else {
        raf = requestAnimationFrame(checkReady);
      }
    };
    checkReady();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center py-10">
      <div className="w-[90%] max-w-3xl">
        <HTMLFlipBook
          width={300}
          height={450}
          size="stretch"
          minWidth={315}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={false}
          ref={flipBook}
        >
          {/* Portada */}
          <div className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg h-full p-6">
            <h1 className="text-2xl font-bold">{storyData.story.title}</h1>
            <p className="mt-2">Un cuento interactivo de aventuras</p>
          </div>

          {/* Escenas */}
          {orderedScenes.map((scene, index) => (
            <Page
              key={scene.id}
              content={scene.content}
              imagePrompt={scene.imagePrompt}
              options={scene.options}
              onSelect={handleChoice}
              locked={!unlockedScenes.includes(scene.id)}
              isActive={currentPage === index + 1} // +1 for cover offset
            />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default InteractiveBook;