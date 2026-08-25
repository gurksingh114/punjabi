import {
  Volume2,
  VolumeX,
  HelpCircle,
  Type,
  Pencil,
  BookOpen,
  Gamepad2,
  Music,
  Star,
  type LucideIcon,
} from "lucide-react";
import { AppSection } from "../types";
import { playChime } from "../utils/audio";

interface HeaderProps {
  currentSection: AppSection;
  onSelectSection: (section: AppSection) => void;
  starsCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenParentGuide: () => void;
}

const navItems: {
  id: AppSection;
  label: string;
  gurmukhi: string;
  icon: LucideIcon;
}[] = [
  { id: "alphabet", label: "Alphabet", gurmukhi: "ਅੱਖਰ", icon: Type },
  { id: "tracing", label: "Trace", gurmukhi: "ਲਿਖੋ", icon: Pencil },
  { id: "vocabulary", label: "Words", gurmukhi: "ਸ਼ਬਦ", icon: BookOpen },
  { id: "games", label: "Games", gurmukhi: "ਖੇਡੋ", icon: Gamepad2 },
  { id: "rhymes", label: "Rhymes", gurmukhi: "ਕਵਿਤਾਵਾਂ", icon: Music },
  { id: "stickers", label: "Stickers", gurmukhi: "ਸਟਿੱਕਰ", icon: Star },
];

export function Header({
  currentSection,
  onSelectSection,
  starsCount,
  isMuted,
  onToggleMute,
  onOpenParentGuide,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <button
            id="brand-home-btn"
            onClick={() => {
              playChime();
              onSelectSection("alphabet");
            }}
            className="flex items-center text-left group min-w-0"
          >
            <img
              src="/logo.png"
              alt="Punjabi Pathshala · ਪੰਜਾਬੀ ਪਾਠਸ਼ਾਲਾ"
              className="h-10 sm:h-12 w-auto max-w-[min(70vw,18rem)] group-hover:scale-[1.02] transition-transform duration-150 ease-out"
            />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-stars-badge"
              onClick={() => {
                playChime();
                onSelectSection("stickers");
              }}
              title="Stars and stickers"
              className="flex items-center gap-1.5 bg-saffron/10 hover:bg-saffron/15 text-saffron-dark font-bold text-xs sm:text-sm px-3.5 py-2 rounded-full min-h-11"
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="font-extrabold tabular-nums">{starsCount.toLocaleString()}</span>
              <span className="hidden sm:inline text-xs font-semibold">Stars</span>
            </button>

            <button
              id="sound-toggle-btn"
              onClick={() => {
                playChime();
                onToggleMute();
              }}
              title={isMuted ? "Unmute voice" : "Mute voice"}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-150 ${
                isMuted
                  ? "bg-rose-50 text-rose-700"
                  : "bg-teal/10 text-teal"
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              id="parent-guide-btn"
              onClick={() => {
                playChime();
                onOpenParentGuide();
              }}
              title="Parents guide"
              className="min-h-11 px-3 sm:px-3.5 rounded-full bg-white text-ink flex items-center gap-1.5 text-xs font-bold shadow-card"
            >
              <HelpCircle className="w-4 h-4 text-muted" />
              <span className="hidden md:inline">Guide</span>
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => {
                  playChime();
                  onSelectSection(item.id);
                }}
                className={`shrink-0 min-h-11 min-w-[6.75rem] px-3 rounded-2xl font-bold transition-[background-color,color,transform] duration-150 ease-out flex items-center justify-center gap-2 ${
                  isActive
                    ? "bg-saffron text-white"
                    : "bg-white text-ink hover:bg-saffron/10 shadow-card"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.25} />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-xs sm:text-sm">{item.label}</span>
                  <span
                    className={`text-[10px] font-gurmukhi hidden sm:block ${
                      isActive ? "text-white/80" : "text-muted"
                    }`}
                  >
                    {item.gurmukhi}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
