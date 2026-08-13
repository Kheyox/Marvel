import React, { useState } from 'react';
import { Clock, CheckCircle2, PlayCircle, EyeOff, Star, Info, Check } from 'lucide-react';
import { MarvelItem, WatchStatus } from '../types';
import { formatMinutesToHours } from '../utils/formatters';
import { STREAMING_PLATFORMS } from '../data/marvelData';
import { getHeroTheme } from '../utils/heroThemes';

interface MarvelCardProps {
  item: MarvelItem;
  status: WatchStatus;
  onStatusChange: (itemId: string, status: WatchStatus) => void;
  onOpenDetails: (item: MarvelItem) => void;
}

export const MarvelCard: React.FC<MarvelCardProps> = ({
  item,
  status,
  onStatusChange,
  onOpenDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const heroTheme = getHeroTheme(item.title, item.keyCharacters, item.universe);

  const getStatusBorder = () => {
    switch (status) {
      case 'watched':
        return 'border-emerald-500/80 bg-[#0d1f15] shadow-emerald-950/40 ring-1 ring-emerald-500/50';
      case 'watching':
        return 'border-amber-500/80 bg-[#1f1a0d] shadow-amber-950/40 ring-1 ring-amber-500/50';
      default:
        return 'border-white/10 bg-[#111] hover:border-[#E62429]/60 hover:shadow-red-950/30';
    }
  };

  const isWatched = status === 'watched';

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden shadow-2xl ${getStatusBorder()}`}
    >
      {/* Top Banner & Poster Area */}
      <div 
        onClick={() => onOpenDetails(item)}
        className="cursor-pointer relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-[#050505] group-hover:opacity-95"
      >
        {imageLoaded ? (
          <img
            src={item.posterUrl}
            alt={item.title}
            onError={() => setImageLoaded(false)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
              isWatched ? 'filter brightness-90 saturate-[0.85]' : ''
            }`}
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${heroTheme.gradientBg} p-4 flex flex-col justify-between relative overflow-hidden`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black italic tracking-wider text-white flex items-center gap-1.5">
                <span>{heroTheme.heroIcon}</span>
                <span className="text-[#E62429]">MARVEL</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase bg-black/60 px-2 py-0.5 rounded text-white/80 border border-white/10">
                {heroTheme.heroName}
              </span>
            </div>
            <div>
              <p className="text-white font-black uppercase text-base line-clamp-2 leading-tight">{item.title}</p>
              <p className="text-xs text-white/70 mt-1 font-mono">{item.releaseYear} • {item.phaseOrEra}</p>
            </div>
          </div>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

        {/* Hero Character & Chrono Rank Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          <div className="flex items-center gap-1 bg-[#E62429] text-white font-black text-[10px] px-2 py-0.5 rounded-md uppercase italic shadow-md border border-white/20">
            <span>N° {item.chronologicalOrder} Chrono</span>
          </div>
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 shadow-md">
            <span>{heroTheme.heroIcon}</span>
            <span className={heroTheme.accentText}>{heroTheme.heroName}</span>
          </div>
        </div>

        {/* TOP RIGHT: Explicit Interactive Checkbox ("Case à cocher") */}
        <div 
          className="absolute top-2.5 right-2.5 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <label 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black cursor-pointer shadow-xl backdrop-blur-md border transition-all ${
              isWatched
                ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/50'
                : 'bg-[#050505]/85 text-white/80 hover:text-white border-white/20 hover:border-emerald-400'
            }`}
            title={isWatched ? "Décocher pour repasser en non vu" : "Cocher pour marquer comme VU"}
          >
            <input
              type="checkbox"
              checked={isWatched}
              onChange={(e) => onStatusChange(item.id, e.target.checked ? 'watched' : 'unwatched')}
              className="w-4 h-4 rounded border-white/30 text-emerald-500 focus:ring-emerald-500 bg-black cursor-pointer accent-emerald-500"
            />
            <span className="uppercase text-[10px] font-black tracking-wider flex items-center gap-0.5">
              {isWatched ? (
                <>
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                  <span>VU !</span>
                </>
              ) : (
                <span>À VOIR</span>
              )}
            </span>
          </label>
        </div>

        {/* Bottom Poster Overlay Badges */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2 pointer-events-none">
          <div className="w-full">
            <div className="flex items-center justify-between mb-0.5">
              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                item.type === 'serie' 
                  ? 'bg-purple-950/90 text-purple-300 border-purple-700/60' 
                  : 'bg-[#E62429]/90 text-white border-white/20'
              }`}>
                {item.type === 'serie' ? `Série (${item.episodesCount || ''} ép.)` : 'Film'}
              </span>
              
              <div className="flex items-center gap-1.5">
                <span className="bg-[#050505]/90 text-white border border-white/10 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#E62429]" />
                  {formatMinutesToHours(item.durationMinutes)}
                </span>
                {item.imdbRating && (
                  <span className="bg-amber-400 text-black text-[10px] font-mono font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                    <Star className="w-3 h-3 fill-black text-black" />
                    {item.imdbRating}
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-base font-black italic uppercase text-white leading-tight line-clamp-1 group-hover:text-[#E62429] transition-colors flex items-center gap-1.5">
              {isWatched && <Check className="w-4 h-4 text-emerald-400 inline shrink-0 stroke-[3]" />}
              <span>{item.title}</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
        
        {/* Era & Synopsis */}
        <div onClick={() => onOpenDetails(item)} className="cursor-pointer space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-[#E62429] uppercase tracking-widest">
              {item.phaseOrEra}
            </p>
            <span className="text-[10px] font-mono text-white/40">
              {item.releaseYear}
            </span>
          </div>
          <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
            {item.synopsis}
          </p>
        </div>

        {/* Streaming Platforms Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mr-1">
            Disponible :
          </span>
          {item.platforms.map((plat) => {
            const platformConfig = STREAMING_PLATFORMS[plat] || {
              badgeBg: 'bg-white/10',
              textColor: 'text-white',
              logoLetter: plat[0],
            };
            return (
              <span
                key={plat}
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm ${platformConfig.badgeBg} ${platformConfig.textColor}`}
                title={`Regarder sur ${plat}`}
              >
                {plat}
              </span>
            );
          })}
        </div>

        {/* Watch Progress Action Toggle Bar */}
        <div className="pt-2">
          <div className="bg-[#050505] border border-white/10 p-1 rounded-xl flex items-center justify-between gap-1">
            
            <button
              onClick={() => onStatusChange(item.id, 'unwatched')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                status === 'unwatched'
                  ? 'bg-white/10 text-white font-black'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
              title="Marquer comme à voir"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">À voir</span>
            </button>

            <button
              onClick={() => onStatusChange(item.id, 'watching')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                status === 'watching'
                  ? 'bg-amber-400 text-black font-black'
                  : 'text-white/40 hover:text-amber-300 hover:bg-white/5'
              }`}
              title="Marquer comme en cours"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">En cours</span>
            </button>

            <button
              onClick={() => onStatusChange(item.id, 'watched')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                status === 'watched'
                  ? 'bg-emerald-600 text-white font-black shadow-lg shadow-emerald-950/50'
                  : 'text-white/40 hover:text-emerald-400 hover:bg-white/5'
              }`}
              title="Marquer comme vu !"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Vu !</span>
            </button>

            <button
              onClick={() => onOpenDetails(item)}
              className="p-1.5 text-white/40 hover:text-[#E62429] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              title="Fiche détaillée"
            >
              <Info className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
