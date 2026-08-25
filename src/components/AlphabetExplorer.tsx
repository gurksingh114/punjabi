import { useEffect, useState } from "react";
import { Volume2, Edit3, ArrowRight, ArrowLeft } from "lucide-react";
import { GURMUKHI_LETTERS } from "../data/punjabiData";
import { GurmukhiLetter } from "../types";
import { speakLetterDetails, playChime, playSuccessChime, subscribeSpeaking } from "../utils/audio";

interface AlphabetExplorerProps {
  onStartTracing: (letter: GurmukhiLetter) => void;
  onLetterExplored: () => void;
}

export function AlphabetExplorer({ onStartTracing, onLetterExplored }: AlphabetExplorerProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "vowel" | "consonant" | "additional">(
    "all",
  );
  const [activeLetter, setActiveLetter] = useState<GurmukhiLetter>(GURMUKHI_LETTERS[0]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => subscribeSpeaking(setSpeaking), []);

  const filteredLetters = GURMUKHI_LETTERS.filter((l) => {
    if (selectedFilter === "all") return true;
    return l.category === selectedFilter;
  });

  const handlePlayAudio = (letter: GurmukhiLetter) => {
    setActiveLetter(letter);
    speakLetterDetails(letter);
    onLetterExplored();
  };

  const handleNextLetter = () => {
    const currentIndex = GURMUKHI_LETTERS.findIndex((l) => l.id === activeLetter.id);
    const nextIndex = (currentIndex + 1) % GURMUKHI_LETTERS.length;
    handlePlayAudio(GURMUKHI_LETTERS[nextIndex]);
  };

  const handlePrevLetter = () => {
    const currentIndex = GURMUKHI_LETTERS.findIndex((l) => l.id === activeLetter.id);
    const prevIndex = (currentIndex - 1 + GURMUKHI_LETTERS.length) % GURMUKHI_LETTERS.length;
    handlePlayAudio(GURMUKHI_LETTERS[prevIndex]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -bottom-8 -right-6 opacity-[0.06] text-[160px] sm:text-[200px] font-black text-ink pointer-events-none select-none font-gurmukhi leading-none">
          ੳਅੲ
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <button
              id={`hero-letter-btn-${activeLetter.id}`}
              onClick={() => handlePlayAudio(activeLetter)}
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-paper text-ink flex items-center justify-center text-7xl sm:text-8xl font-black font-gurmukhi hover:scale-105 active:scale-96 transition-transform duration-150 relative ${
                speaking ? "speaking-pulse" : "shadow-card"
              }`}
              title="Hear pronunciation"
            >
              <span>{activeLetter.letter}</span>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
            </button>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className="text-2xl sm:text-4xl font-black tracking-tight text-ink font-baloo">
                  {activeLetter.name}
                </span>
                <span className="text-lg sm:text-xl font-bold font-gurmukhi text-saffron-dark bg-saffron/12 px-3 py-0.5 rounded-xl">
                  {activeLetter.gurmukhiName}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-sm">
                <span className="font-semibold text-muted">Sound</span>
                <span className="font-bold text-ink bg-paper px-2.5 py-0.5 rounded-lg">
                  {activeLetter.phoneticSound}
                </span>
              </div>

              <div className="mt-3.5 flex items-center justify-center sm:justify-start gap-3 bg-paper px-4 py-2.5 rounded-2xl">
                <span className="text-3xl" aria-hidden>
                  {activeLetter.exampleEmoji}
                </span>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-bold font-gurmukhi text-ink leading-tight">
                    {activeLetter.exampleWord}{" "}
                    <span className="text-xs font-baloo font-normal text-muted">
                      ({activeLetter.exampleRoman})
                    </span>
                  </p>
                  <p className="text-xs text-muted">
                    Meaning: <span className="font-medium text-ink">{activeLetter.exampleEnglish}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto">
            <button
              id="hero-speak-again-btn"
              onClick={() => handlePlayAudio(activeLetter)}
              className="flex-1 sm:flex-none btn-primary px-5 py-2.5 font-bold flex items-center justify-center gap-2 text-sm sm:text-base min-h-11"
            >
              <Volume2 className="w-5 h-5" />
              <span>{speaking ? "Speaking…" : "Hear it"}</span>
            </button>

            <button
              id="hero-trace-btn"
              onClick={() => {
                playSuccessChime();
                onStartTracing(activeLetter);
              }}
              className="flex-1 sm:flex-none btn-success px-5 py-2.5 font-bold flex items-center justify-center gap-2 text-sm sm:text-base min-h-11"
            >
              <Edit3 className="w-5 h-5" />
              <span>Trace Letter</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                id="hero-prev-btn"
                onClick={handlePrevLetter}
                title="Previous letter"
                className="p-2.5 min-h-11 min-w-11 bg-white rounded-2xl text-ink shadow-card active:scale-96"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                id="hero-next-btn"
                onClick={handleNextLetter}
                title="Next letter"
                className="p-2.5 min-h-11 min-w-11 bg-white rounded-2xl text-ink shadow-card active:scale-96"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(
            [
              { id: "all", label: "All letters" },
              { id: "vowel", label: "Matra roots" },
              { id: "consonant", label: "Consonants" },
              { id: "additional", label: "Bindi sounds" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              id={`filter-${tab.id}-btn`}
              onClick={() => {
                playChime();
                setSelectedFilter(tab.id);
              }}
              className={`px-4 py-2 min-h-11 rounded-full font-bold text-sm transition-colors duration-150 ${
                selectedFilter === tab.id
                  ? "bg-saffron text-white"
                  : "bg-white text-muted shadow-card"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white px-3 py-1 rounded-full text-xs font-bold text-muted shadow-card">
          {filteredLetters.length} letters
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5 sm:gap-3.5">
        {filteredLetters.map((letter) => {
          const isSelected = activeLetter.id === letter.id;

          return (
            <div
              key={letter.id}
              id={`letter-card-${letter.id}`}
              onClick={() => handlePlayAudio(letter)}
              className={`group relative rounded-2xl p-3 sm:p-3.5 text-center cursor-pointer transition-transform duration-150 select-none flex flex-col items-center justify-between ${
                isSelected
                  ? "bg-saffron/10 ring-2 ring-saffron/40 -translate-y-0.5"
                  : "bg-white shadow-card hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center justify-between w-full text-[11px] font-bold text-muted mb-0.5">
                <span className="font-baloo truncate">{letter.name}</span>
                <span className="text-base" aria-hidden>
                  {letter.exampleEmoji}
                </span>
              </div>

              <div className="my-1.5 text-4xl sm:text-5xl font-black font-gurmukhi text-ink">
                {letter.letter}
              </div>

              <div className="w-full bg-paper rounded-xl py-1 px-1.5 mt-1">
                <p className="text-xs font-bold font-gurmukhi text-ink truncate">{letter.exampleWord}</p>
                <p className="text-[10px] text-muted truncate">{letter.exampleEnglish}</p>
              </div>

              <div className="flex items-center justify-center gap-1 mt-2 w-full pt-1.5 border-t border-ink/10">
                <button
                  id={`play-sound-${letter.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(letter);
                  }}
                  title="Hear letter"
                  className="p-2 min-h-11 min-w-11 rounded-lg bg-saffron/10 text-saffron-dark"
                >
                  <Volume2 className="w-3.5 h-3.5 mx-auto" />
                </button>
                <button
                  id={`quick-trace-${letter.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSuccessChime();
                    onStartTracing(letter);
                  }}
                  title="Trace"
                  className="p-2 min-h-11 rounded-lg bg-teal/10 text-teal flex items-center gap-1 text-[11px] font-bold px-3"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trace</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
