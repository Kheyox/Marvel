import React from 'react';
import { Clock, CheckCircle2, PlayCircle, EyeOff, Film, Tv, Sparkles, ExternalLink, ChevronRight, Play } from 'lucide-react';
import { MarvelItem, UserProgress, WatchStatus } from '../types';
import { calculateProgressStats, formatMinutesToHours } from '../utils/formatters';
import { STREAMING_PLATFORMS } from '../data/marvelData';
import { getHeroTheme } from '../utils/heroThemes';

interface BentoDashboardProps {
  items: MarvelItem[];
  progress: UserProgress;
  activeUniverseLabel?: string;
  selectedPlatform?: string;
  onSelectPlatform?: (platform: string) => void;
  onStatusChange: (itemId: string, status: WatchStatus) => void;
  onOpenDetails: (item: MarvelItem) => void;
}

export const BentoDashboard: React.FC<BentoDashboardProps> = ({
  items,
  progress,
  activeUniverseLabel,
  selectedPlatform,
  onSelectPlatform,
  onStatusChange,
  onOpenDetails,
}) => {
  const stats = calculateProgressStats(items, progress);

  // Find the next unwatched or currently watching item in chronological order
  const chronologicalSorted = [...items].sort((a, b) => a.chronologicalOrder - b.chronologicalOrder);
  
  const currentlyWatchingItem = chronologicalSorted.find((item) => progress[item.id]?.status === 'watching');
  const nextUnwatchedItem = chronologicalSorted.find((item) => (progress[item.id]?.status || 'unwatched') === 'unwatched');
  
  const activeFocusItem = currentlyWatchingItem || nextUnwatchedItem || chronologicalSorted[0];
  const focusHeroTheme = activeFocusItem ? getHeroTheme(activeFocusItem.title, activeFocusItem.keyCharacters, activeFocusItem.universe) : null;

  // Get next 4 upcoming unwatched items for the queue widget
  const upcomingQueue = chronologicalSorted
    .filter((item) => item.id !== activeFocusItem?.id && (progress[item.id]?.status || 'unwatched') !== 'watched')
    .slice(0, 4);

  // Platform availability counters
  const disneyCount = items.filter((i) => i.platforms.includes('Disney+')).length;
  const netflixCount = items.filter((i) => i.platforms.includes('Netflix')).length;
  const primeCount = items.filter((i) => i.platforms.includes('Prime Video')).length;

  return (
    <div className="space-y-4 mb-8">
      
      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* BENTO CARD 1: À REGARDER MAINTENANT (Next Watch Target) - 4 Cols */}
        <div className="md:col-span-4 bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative min-h-[260px] group hover:border-white/20 transition-all shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#E62429] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-[#E62429]" />
                {progress[activeFocusItem?.id]?.status === 'watching' ? 'En Cours' : 'À Regarder Maintenant'}
              </span>
              <span className="text-[10px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>{focusHeroTheme?.heroIcon}</span>
                <span>N° {activeFocusItem?.chronologicalOrder} Chrono</span>
              </span>
            </div>

            <h3 
              onClick={() => onOpenDetails(activeFocusItem)}
              className="text-2xl sm:text-3xl font-black uppercase italic leading-none mb-1 text-white hover:text-[#E62429] cursor-pointer transition-colors line-clamp-1"
            >
              {activeFocusItem?.title}
            </h3>
            <p className="text-white/70 text-xs line-clamp-2 mt-1 leading-relaxed">
              {activeFocusItem?.synopsis}
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3 mt-4">
            {/* Streaming Badges clickable */}
            {activeFocusItem?.platforms && activeFocusItem.platforms.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase text-white/50 font-bold">Disponible sur :</span>
                <div className="flex flex-wrap gap-1">
                  {activeFocusItem.platforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => onSelectPlatform && onSelectPlatform(p)}
                      className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Duration and Action Bar */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/50">
                <span>Durée : {formatMinutesToHours(activeFocusItem?.durationMinutes || 0)}</span>
                <span>{activeFocusItem?.releaseYear}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onStatusChange(activeFocusItem.id, 'watched')}
                  className="flex-1 bg-[#E62429] hover:bg-[#ff3237] text-white text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-red-950/50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Marquer comme vu</span>
                </button>
                <button
                  onClick={() => onOpenDetails(activeFocusItem)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  title="Voir la fiche détaillée"
                >
                  Fiche
                </button>
              </div>
            </div>
          </div>

          {/* Large Faded Chrono Order Number in background */}
          <div className="absolute -right-2 -bottom-4 text-[110px] font-black text-white/[0.03] italic leading-none pointer-events-none select-none">
            {String(activeFocusItem?.chronologicalOrder || 1).padStart(2, '0')}
          </div>
        </div>

        {/* BENTO CARD 2: SUIVI DE L'UNIVERS (Marvel Red Hero Banner with Progress Bar) - 8 Cols */}
        <div className="md:col-span-8 bg-[#E62429] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden min-h-[240px] sm:min-h-[260px] shadow-2xl w-full max-w-full">
          <div className="relative z-10 w-full sm:max-w-md space-y-2 mb-4 sm:mb-0">
            <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.25em]">
              {activeUniverseLabel ? `AVANCÉE • ${activeUniverseLabel.toUpperCase()}` : 'MASTERY CHECKPOINT'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase italic leading-none text-white tracking-tight break-words">
              Suivi de l'univers Marvel
            </h3>
            <p className="text-white/95 text-xs font-medium leading-relaxed">
              {stats.percentageCount === 100 
                ? 'Félicitations ! Vous avez regardé l’intégralité du catalogue Marvel !' 
                : `Vous avez complété ${stats.watchedItemsCount} sur ${stats.totalItemsCount} œuvres (${stats.percentageCount}%). Il vous reste ${stats.remainingFormatted.formattedShort} de visionnage.`}
            </p>

            {/* Global Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[10px] font-black uppercase text-white/90 mb-1">
                <span>Progression Totale</span>
                <span>{stats.percentageCount}% Complete</span>
              </div>
              <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500 shadow-md"
                  style={{ width: `${stats.percentageCount}%` }}
                />
              </div>
            </div>

            {/* Quick Streaming Platform Shortcuts */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-black uppercase text-white/80">Filtrer par :</span>
              <button
                onClick={() => onSelectPlatform && onSelectPlatform('Disney+')}
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedPlatform === 'Disney+' ? 'bg-white text-blue-900 border-white' : 'bg-black/30 text-white border-white/20 hover:bg-black/50'
                }`}
              >
                Disney+ ({disneyCount})
              </button>
              <button
                onClick={() => onSelectPlatform && onSelectPlatform('Netflix')}
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedPlatform === 'Netflix' ? 'bg-white text-red-900 border-white' : 'bg-black/30 text-white border-white/20 hover:bg-black/50'
                }`}
              >
                Netflix ({netflixCount})
              </button>
              <button
                onClick={() => onSelectPlatform && onSelectPlatform('Prime Video')}
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedPlatform === 'Prime Video' ? 'bg-white text-sky-900 border-white' : 'bg-black/30 text-white border-white/20 hover:bg-black/50'
                }`}
              >
                Prime Video ({primeCount})
              </button>
            </div>

          </div>

          <div className="relative z-10 bg-black/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-center w-full sm:w-auto sm:min-w-[170px] shadow-2xl">
            <p className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter">
              {stats.watchedItemsCount} <span className="text-lg sm:text-xl text-white/60 font-mono">/ {stats.totalItemsCount}</span>
            </p>
            <p className="text-[10px] uppercase font-bold text-white/90 tracking-widest mt-1">
              Contenus Vus
            </p>
            <div className="mt-2 sm:mt-3 pt-2 border-t border-white/10 text-xs font-mono font-bold text-white">
              {stats.percentageTime}% du temps total
            </div>
          </div>

          {/* Decorative Background Text */}
          <div className="absolute right-[-20px] bottom-[-20px] rotate-[-5deg] text-[100px] sm:text-[120px] font-black text-black/10 select-none pointer-events-none leading-none">
            MARVEL
          </div>
        </div>

        {/* BENTO CARD 3: PROCHAINS SUR LA LISTE (Upcoming Queue) - 4 Cols */}
        <div className="md:col-span-4 bg-[#111] border border-white/10 rounded-2xl p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                Prochains sur la liste
              </p>
              <span className="text-[10px] font-mono text-zinc-400">{upcomingQueue.length} suivants</span>
            </div>

            <div className="space-y-3">
              {upcomingQueue.length === 0 ? (
                <p className="text-xs text-white/40 italic py-4">Toutes les œuvres suivantes ont été visionnées !</p>
              ) : (
                upcomingQueue.map((item) => {
                  const itemTheme = getHeroTheme(item.title, item.keyCharacters, item.universe);
                  return (
                    <div key={item.id} className="flex items-center gap-3 group">
                      <span className="font-mono text-xs text-[#E62429] font-bold">
                        {String(item.chronologicalOrder).padStart(2, '0')}
                      </span>
                      <div 
                        onClick={() => onOpenDetails(item)}
                        className="flex-1 cursor-pointer"
                      >
                        <p className="text-xs font-bold uppercase text-white group-hover:text-[#E62429] transition-colors truncate flex items-center gap-1">
                          <span>{itemTheme.heroIcon}</span>
                          <span>{item.title}</span>
                        </p>
                        <p className="text-[10px] text-white/40 font-mono">
                          {formatMinutesToHours(item.durationMinutes)} • {item.releaseYear}
                        </p>
                      </div>
                      <button
                        onClick={() => onStatusChange(item.id, 'watched')}
                        className="w-6 h-6 rounded-full border border-white/20 hover:border-[#E62429] hover:bg-[#E62429]/20 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer shrink-0"
                        title="Cocher comme vu"
                      >
                        ✓
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-white/40 font-mono flex justify-between items-center">
            <span>Ordre Chronologique Officiel</span>
            <span className="text-[#E62429]">Marvel Studios</span>
          </div>
        </div>

        {/* BENTO CARD 4: PLATFORM BREAKDOWN QUICK SUMMARY - 8 Cols */}
        <div className="md:col-span-8 bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase text-[#E62429] tracking-wider">
                Catalogue par Plateforme de Streaming
              </span>
              <span className="text-[10px] text-white/40 font-mono">France & VOD</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Disney+ tile */}
              <div 
                onClick={() => onSelectPlatform && onSelectPlatform('Disney+')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPlatform === 'Disney+' ? 'bg-[#006E99]/30 border-[#006E99]' : 'bg-[#050505] border-white/10 hover:border-[#006E99]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-300">Disney+</span>
                  <span className="text-xs font-mono font-bold text-white">{disneyCount} titres</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1">Films MCU, Séries Disney+, X-Men, Star-Lord</p>
              </div>

              {/* Netflix tile */}
              <div 
                onClick={() => onSelectPlatform && onSelectPlatform('Netflix')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPlatform === 'Netflix' ? 'bg-[#E50914]/30 border-[#E50914]' : 'bg-[#050505] border-white/10 hover:border-[#E50914]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-red-400">Netflix</span>
                  <span className="text-xs font-mono font-bold text-white">{netflixCount} titres</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1">Séries Defenders, Spider-Man, Marvel Knights</p>
              </div>

              {/* Prime Video tile */}
              <div 
                onClick={() => onSelectPlatform && onSelectPlatform('Prime Video')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPlatform === 'Prime Video' ? 'bg-[#00A8E1]/30 border-[#00A8E1]' : 'bg-[#050505] border-white/10 hover:border-[#00A8E1]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-400">Prime Video</span>
                  <span className="text-xs font-mono font-bold text-white">{primeCount} titres</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1">Sony Spider-Verse, Hulk, Exclusivités</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
