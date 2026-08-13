import React from 'react';
import { MarvelItem, WatchStatus, UserProgress } from '../types';
import { formatMinutesToHours } from '../utils/formatters';
import { STREAMING_PLATFORMS } from '../data/marvelData';
import { getHeroTheme } from '../utils/heroThemes';
import { CheckCircle2, PlayCircle, EyeOff, Star, Info, Clock, Check, ExternalLink } from 'lucide-react';

interface MarvelChecklistViewProps {
  items: MarvelItem[];
  progress: UserProgress;
  onStatusChange: (itemId: string, status: WatchStatus) => void;
  onRatingChange: (itemId: string, rating: number) => void;
  onOpenDetails: (item: MarvelItem) => void;
}

export const MarvelChecklistView: React.FC<MarvelChecklistViewProps> = ({
  items,
  progress,
  onStatusChange,
  onRatingChange,
  onOpenDetails,
}) => {
  return (
    <div className="w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Table header */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#080808] border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-white/50">
        <div className="col-span-1 text-center">État</div>
        <div className="col-span-1 text-center">Ordre</div>
        <div className="col-span-4">Titre & Héros</div>
        <div className="col-span-2">Époque / Phase</div>
        <div className="col-span-2 text-center">Post-Générique</div>
        <div className="col-span-2 text-right">Plateformes & Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {items.map((item) => {
          const itemProgress = progress[item.id] || { status: 'unwatched' };
          const isWatched = itemProgress.status === 'watched';
          const isWatching = itemProgress.status === 'watching';
          const heroTheme = getHeroTheme(item.title, item.keyCharacters, item.universe);

          return (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center transition-colors ${
                isWatched
                  ? 'bg-emerald-950/20 hover:bg-emerald-950/30'
                  : isWatching
                  ? 'bg-amber-950/20 hover:bg-amber-950/30'
                  : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Checkbox column */}
              <div className="col-span-1 flex items-center justify-between md:justify-center w-full md:w-auto">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWatched}
                    onChange={(e) => onStatusChange(item.id, e.target.checked ? 'watched' : 'unwatched')}
                    className="w-5 h-5 rounded border-white/20 text-emerald-500 focus:ring-emerald-500 bg-black cursor-pointer accent-emerald-500"
                  />
                  <span className="md:hidden text-xs font-black uppercase text-white/80">
                    {isWatched ? 'VU ✓' : 'À VOIR'}
                  </span>
                </label>

                {/* Mobile Order badge */}
                <div className="md:hidden flex items-center gap-1.5">
                  <span className="bg-[#E62429] text-white text-[10px] font-black px-2 py-0.5 rounded">
                    N° {item.chronologicalOrder}
                  </span>
                </div>
              </div>

              {/* Order column (Desktop) */}
              <div className="hidden md:flex col-span-1 flex-col items-center justify-center">
                <span className="bg-[#E62429] text-white font-black text-xs px-2 py-0.5 rounded shadow">
                  #{item.chronologicalOrder}
                </span>
                <span className="text-[9px] font-mono text-white/40 mt-0.5">
                  Sortie: #{item.releaseOrder}
                </span>
              </div>

              {/* Title & Poster info */}
              <div className="col-span-4 flex items-center gap-3 w-full">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  onClick={() => onOpenDetails(item)}
                  className="w-12 h-16 object-cover rounded-lg shrink-0 border border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
                <div className="min-w-0 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{heroTheme.heroIcon}</span>
                    <h4
                      onClick={() => onOpenDetails(item)}
                      className={`text-sm sm:text-base font-black italic uppercase truncate cursor-pointer hover:text-[#E62429] transition-colors ${
                        isWatched ? 'text-emerald-300 line-through opacity-80' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60 font-mono mt-0.5">
                    <span>{item.releaseYear}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E62429]" />
                      {formatMinutesToHours(item.durationMinutes)}
                    </span>
                    {item.imdbRating && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400 font-bold">★ {item.imdbRating}</span>
                      </>
                    )}
                    {item.isEssential && (
                      <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded text-[9px] font-bold">
                        ⚡ Pilier MCU
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Era / In-Universe Year */}
              <div className="col-span-2 w-full md:w-auto">
                <div className="flex flex-col">
                  {item.inUniverseYear && (
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      ⏳ {item.inUniverseYear}
                    </span>
                  )}
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                    {item.phaseOrEra}
                  </span>
                </div>
              </div>

              {/* Post-Credits Scene Guide Badge */}
              <div className="col-span-2 flex flex-col md:items-center w-full md:w-auto">
                {item.postCreditsCount !== undefined ? (
                  <div
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                      item.postCreditsCount > 0
                        ? 'bg-purple-950/80 text-purple-300 border-purple-700/60'
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}
                    title={item.postCreditsDescription || `${item.postCreditsCount} scène(s)`}
                  >
                    <span>🎬</span>
                    <span>{item.postCreditsCount > 0 ? `${item.postCreditsCount} scène${item.postCreditsCount > 1 ? 's' : ''}` : 'Aucune'}</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-white/30">-</span>
                )}
              </div>

              {/* Streaming Platforms & Status Actions */}
              <div className="col-span-2 flex items-center justify-between md:justify-end gap-2 w-full">
                {/* Platforms badges */}
                <div className="flex items-center gap-1">
                  {item.platforms.slice(0, 2).map((plat) => {
                    const cfg = STREAMING_PLATFORMS[plat] || { badgeBg: 'bg-white/10', textColor: 'text-white' };
                    return (
                      <span
                        key={plat}
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${cfg.badgeBg} ${cfg.textColor}`}
                      >
                        {plat}
                      </span>
                    );
                  })}
                </div>

                {/* Details Button */}
                <button
                  onClick={() => onOpenDetails(item)}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Voir la fiche complète"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
