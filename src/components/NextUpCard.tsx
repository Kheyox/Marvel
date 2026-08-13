import React from 'react';
import { Play, CheckCircle2, Clock, Calendar, Sparkles, Film, ExternalLink, Film as FilmIcon } from 'lucide-react';
import { MarvelItem, WatchStatus } from '../types';
import { formatMinutesToHours } from '../utils/formatters';
import { getHeroTheme } from '../utils/heroThemes';
import { STREAMING_PLATFORMS } from '../data/marvelData';

interface NextUpCardProps {
  item: MarvelItem | null;
  onStatusChange: (itemId: string, status: WatchStatus) => void;
  onOpenDetails: (item: MarvelItem) => void;
}

export const NextUpCard: React.FC<NextUpCardProps> = ({
  item,
  onStatusChange,
  onOpenDetails,
}) => {
  if (!item) {
    return (
      <div className="w-full bg-gradient-to-r from-emerald-950/40 via-[#111] to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
          🎉
        </div>
        <div>
          <h3 className="text-lg font-black text-white uppercase italic">Félicitations ! Vous êtes à jour !</h3>
          <p className="text-xs text-white/60 mt-1 max-w-md mx-auto">
            Vous avez visionné tous les contenus de la sélection active. Changez d'ordre ou de saga pour continuer votre marathon Marvel.
          </p>
        </div>
      </div>
    );
  }

  const heroTheme = getHeroTheme(item.title, item.keyCharacters, item.universe);

  return (
    <div className="w-full bg-gradient-to-r from-[#18090a] via-[#111] to-[#0c0c14] border border-[#E62429]/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E62429]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-5">
        {/* Left: Poster thumbnail with badge */}
        <div 
          onClick={() => onOpenDetails(item)}
          className="relative w-full md:w-48 aspect-[16/9] md:aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-white/20 shrink-0 cursor-pointer group"
        >
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          
          <div className="absolute top-2 left-2 bg-[#E62429] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
            N° {item.chronologicalOrder} Chrono
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-mono font-bold">
            <span className="flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded">
              <Clock className="w-3 h-3 text-[#E62429]" />
              {formatMinutesToHours(item.durationMinutes)}
            </span>
            <span className="bg-black/70 px-1.5 py-0.5 rounded text-amber-400">
              ★ {item.imdbRating || '7.5'}
            </span>
          </div>
        </div>

        {/* Center: Info & Metadata */}
        <div className="flex-grow space-y-3 text-left w-full">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#E62429] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Prochain à Regarder
            </span>
            <span className="bg-white/10 text-white/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {item.phaseOrEra}
            </span>
            {item.inUniverseYear && (
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                ⏳ {item.inUniverseYear}
              </span>
            )}
            {item.postCreditsCount !== undefined && (
              <span className="bg-purple-950/80 text-purple-300 border border-purple-800/50 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                🎬 {item.postCreditsCount > 0 ? `${item.postCreditsCount} scène${item.postCreditsCount > 1 ? 's' : ''} post-générique` : 'Pas de scène post-générique'}
              </span>
            )}
          </div>

          <div>
            <h3 
              onClick={() => onOpenDetails(item)}
              className="text-xl sm:text-2xl font-black italic uppercase text-white hover:text-[#E62429] cursor-pointer transition-colors leading-tight"
            >
              {item.title}
            </h3>
            {item.originalTitle !== item.title && (
              <p className="text-xs text-white/50 font-mono mt-0.5">{item.originalTitle} ({item.releaseYear})</p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed max-w-2xl">
            {item.synopsis}
          </p>

          {/* Streaming Platforms */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Disponible sur :</span>
            {item.platforms.map((plat) => {
              const platformConfig = STREAMING_PLATFORMS[plat] || { badgeBg: 'bg-white/10', textColor: 'text-white' };
              return (
                <a
                  key={plat}
                  href={`https://www.google.com/search?q=regarder+${encodeURIComponent(item.title)}+sur+${encodeURIComponent(plat)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 hover:scale-105 transition-transform ${platformConfig.badgeBg} ${platformConfig.textColor}`}
                >
                  <span>{plat}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-row md:flex-col items-center gap-2.5 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0">
          <button
            onClick={() => onStatusChange(item.id, 'watched')}
            className="flex-1 md:flex-none w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>Marquer comme Vu</span>
          </button>

          <button
            onClick={() => onOpenDetails(item)}
            className="flex-1 md:flex-none w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <FilmIcon className="w-3.5 h-3.5 text-[#E62429]" />
            <span>Fiche Complète</span>
          </button>
        </div>
      </div>
    </div>
  );
};
