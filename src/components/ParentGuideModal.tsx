import React from 'react';
import { X, Sparkles, Volume2, Heart } from 'lucide-react';
import { speakPunjabi, playChime } from '../utils/audio';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-amber-500 p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-baloo">
                Parents & Educators Guide
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                Helping your toddler learn Punjabi with joy and confidence
              </p>
            </div>
          </div>

          <button
            id="close-parent-guide-btn"
            onClick={() => {
              playChime();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto text-slate-700 text-sm">
          
          {/* Welcome Intro */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
            <span className="text-2xl">🙏</span>
            <div>
              <h4 className="font-bold text-slate-900 text-base font-baloo">
                ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akal) & Welcome!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                This app is specifically crafted for toddlers and early learners to develop receptive and expressive vocabulary in Punjabi (Gurmukhi script and spoken vernacular) through multimodal learning: visual icons, auditory pronunciation, tactile finger-tracing, and joyful mini-games.
              </p>
            </div>
          </div>

          {/* Key Modules Overview */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>How Each Section Helps Your Child</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="font-bold text-amber-900 text-xs sm:text-sm block">
                  🔤 Gurmukhi Alphabet (ਵਰਣਮਾਲਾ)
                </span>
                <p className="text-xs text-slate-600">
                  Explores all traditional letters and consonants with high-clarity phonetic sounds and concrete vocabulary associations.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="font-bold text-emerald-900 text-xs sm:text-sm block">
                  ✏️ Guided Finger Tracing
                </span>
                <p className="text-xs text-slate-600">
                  Builds fine motor control and letterform recognition with dotted stroke lines, chunky brushes, and instant celebrations.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="font-bold text-rose-900 text-xs sm:text-sm block">
                  🗣️ Spoken Vocabulary & Audio
                </span>
                <p className="text-xs text-slate-600">
                  Over 100 categorized toddler words (Animals, Fruits, Colors, Family, Counting) featuring natural audio synthesis and slow-repeat pacing.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="font-bold text-sky-900 text-xs sm:text-sm block">
                  🎮 Interactive Play & Games
                </span>
                <p className="text-xs text-slate-600">
                  4 mini-games (Balloon Pop, Memory Match, Find the Object, Counting Safari) that reinforce listening comprehension and active recall.
                </p>
              </div>
            </div>
          </div>

          {/* Practical Tips for Parents */}
          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 space-y-2">
            <h4 className="font-bold text-emerald-900 text-xs sm:text-sm flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span>3 Golden Tips for Practicing at Home</span>
            </h4>
            <ul className="text-xs text-emerald-800 space-y-1.5 list-disc pl-4 font-medium">
              <li>
                <strong>Repeat Along Aloud:</strong> Encourage your toddler to mirror the spoken words immediately after pressing the audio button.
              </li>
              <li>
                <strong>Point & Name in Daily Life:</strong> When eating an apple, say <em>"Eh Seb hai (ਇਹ ਸੇਬ ਹੈ)!"</em> or when spotting a cow say <em>"Gaan (ਗਾਂ)!"</em> to ground vocabulary in real life.
              </li>
              <li>
                <strong>Praise Effort Generously:</strong> Use authentic Punjabi praise phrases like <em>"Shabash! (ਸ਼ਾਬਾਸ਼!)"</em> and <em>"Bohot Vadiya! (ਬਹੁਤ ਵਧੀਆ!)"</em>.
              </li>
            </ul>
          </div>

          {/* Test Audio Pronunciation Button */}
          <div className="flex items-center justify-between bg-amber-50 p-3.5 rounded-2xl border border-amber-200/80">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Test Punjabi Voice Synthesis:
              </span>
              <span className="text-[11px] text-slate-500">
                Plays "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਬਹੁਤ ਵਧੀਆ!"
              </span>
            </div>

            <button
              id="test-voice-btn"
              onClick={() => speakPunjabi("ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਬਹੁਤ ਵਧੀਆ!", 1.1, 0.8)}
              className="btn-primary px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Test Audio</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            id="close-guide-footer-btn"
            onClick={() => {
              playChime();
              onClose();
            }}
            className="btn-primary px-5 py-2 rounded-2xl font-bold text-white text-xs sm:text-sm cursor-pointer"
          >
            Got it, Let's Learn!
          </button>
        </div>

      </div>
    </div>
  );
};
