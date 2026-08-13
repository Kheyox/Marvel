import React from 'react';
import { X, Clock, Star, Film, CheckCircle2, PlayCircle, EyeOff, Users, ExternalLink, Calendar, Sparkles, Check } from 'lucide-react';
import { MarvelItem, WatchStatus } from '../types';
import { formatMinutesToHours } from '../utils/formatters';
import { STREAMING_PLATFORMS } from '../data/marvelData';
import { getHeroTheme } from '../utils/heroThemes';

interface ItemDetailModalProps {
  item: MarvelItem | null;
  status: WatchStatus;
  onClose: () => void;
  onStatusChange: (itemId: string, status: WatchStatus) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  status,
  onClose,
  onStatusChange,
}) => {
  if (!item) return null;

  const heroTheme = getHeroTheme(item.title, item.keyCharacters, item.universe);
  const isWatched = status === 'watched';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#050505]/80 hover:bg-[#E62429] text-white p-2 rounded-full transition-colors border border-white/10 cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner Image */}
        <div className="relative w-full h-56 sm:h-72 bg-[#050505] overflow-hidden">
          <img
            src={item.posterUrl}
            alt={item.title}
            className={`w-full h-full object-cover object-center filter ${
              isWatched ? 'brightness-90 saturate-[0.85]' : 'brightness-90'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent" />

          {/* Superhero Hero Badge Overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="bg-black/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-lg">
              <span className="text-base">{heroTheme.heroIcon}</span>
              <span className={heroTheme.accentText}>{heroTheme.heroName}</span>
            </span>
          </div>

          {/* Chronological Tag Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="bg-[#E62429] text-white font-black text-xs px-3 py-1 rounded-lg uppercase italic shadow-lg border border-white/20">
              Ordre Chronologique : N° {item.chronologicalOrder}
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-[#050505]/90 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E62429]" />
                {formatMinutesToHours(item.durationMinutes)} ({item.durationMinutes} min)
              </span>
              {item.imdbRating && (
                <span className="bg-amber-400 text-black text-xs font-mono font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-black" />
                  {item.imdbRating} / 10
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 flex-grow">
          
          {/* Titles & Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                item.type === 'serie' ? 'bg-purple-950 text-purple-300 border-purple-800' : 'bg-[#E62429] text-white border-white/20'
              }`}>
                {item.type === 'serie' ? `Série TV (${item.episodesCount || ''} épisodes)` : 'Film Cinéma'}
              </span>
              <span className="text-xs font-black text-white/50 uppercase tracking-widest">
                • {item.phaseOrEra}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase text-white leading-tight mt-2 flex items-center gap-2">
              {isWatched && <Check className="w-6 h-6 text-emerald-400 inline stroke-[3]" />}
              <span>{item.title}</span>
            </h2>
            {item.originalTitle !== item.title && (
              <p className="text-xs font-mono text-white/50 italic mt-0.5">Titre original: {item.originalTitle}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#E62429]" />
                <span>Sortie : <strong className="text-white">{item.releaseYear}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-blue-400" />
                <span>Ordre de sortie : <strong className="text-white">N° {item.releaseOrder}</strong></span>
              </div>
              {item.inUniverseYear && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Chronologie de l'histoire : <strong className="text-amber-300">{item.inUniverseYear}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Post-Credits Scene Section */}
          {item.postCreditsCount !== undefined && (
            <div className="bg-purple-950/30 border border-purple-800/40 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span>🎬</span>
                  Guide des Scènes Post-Génériques
                </h3>
                <span className="text-xs font-black bg-purple-900 text-purple-200 px-2 py-0.5 rounded">
                  {item.postCreditsCount > 0 ? `${item.postCreditsCount} scène${item.postCreditsCount > 1 ? 's' : ''}` : 'Aucune'}
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-sans">
                {item.postCreditsDescription || (item.postCreditsCount > 0 ? `${item.postCreditsCount} scène(s) à ne pas manquer après le générique !` : 'Pas de scène post-générique.')}
              </p>
            </div>
          )}

          {/* Synopsis Section */}

          <div className="space-y-2 bg-[#050505] border border-white/10 p-4 rounded-xl">
            <h3 className="text-xs font-black text-white/50 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Synopsis
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {item.synopsis}
            </p>
          </div>

          {/* Key Characters Section */}
          {item.keyCharacters && item.keyCharacters.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Personnages Clés & Héros
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.keyCharacters.map((char) => (
                  <span
                    key={char}
                    className="bg-[#050505] border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-xl"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Streaming Platform Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-white/50 uppercase tracking-widest">
              Où regarder en France :
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.platforms.map((plat) => {
                const config = STREAMING_PLATFORMS[plat] || {
                  badgeBg: 'bg-white/10',
                  textColor: 'text-white',
                };
                return (
                  <a
                    key={plat}
                    href={`https://www.google.com/search?q=regarder+${encodeURIComponent(item.title)}+sur+${encodeURIComponent(plat)}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-md hover:scale-105 transition-transform ${config.badgeBg} ${config.textColor}`}
                  >
                    <span>{plat}</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer with Checkbox + Status Change controls */}
        <div className="p-4 bg-[#050505] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Explicit Checkbox Control */}
          <label className="flex items-center gap-2 cursor-pointer bg-[#111] hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/50 px-3.5 py-2 rounded-xl transition-all">
            <input
              type="checkbox"
              checked={isWatched}
              onChange={(e) => onStatusChange(item.id, e.target.checked ? 'watched' : 'unwatched')}
              className="w-4 h-4 rounded border-white/30 text-emerald-500 focus:ring-emerald-500 bg-black cursor-pointer accent-emerald-500"
            />
            <span className={`text-xs font-bold ${isWatched ? 'text-emerald-400 font-black' : 'text-white/80'}`}>
              {isWatched ? 'Marqué comme VU ✓' : 'Cocher comme Vu'}
            </span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onStatusChange(item.id, 'unwatched')}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                status === 'unwatched' ? 'bg-white/20 text-white border-white' : 'bg-[#111] text-white/40 border-white/10 hover:text-white'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>À voir</span>
            </button>

            <button
              onClick={() => onStatusChange(item.id, 'watching')}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                status === 'watching' ? 'bg-amber-400 text-black border-amber-300 font-black' : 'bg-[#111] text-white/40 border-white/10 hover:text-amber-300'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>En cours</span>
            </button>

            <button
              onClick={() => onStatusChange(item.id, 'watched')}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                status === 'watched' ? 'bg-emerald-600 text-white border-emerald-500 font-black' : 'bg-[#111] text-white/40 border-white/10 hover:text-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Vu !</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
