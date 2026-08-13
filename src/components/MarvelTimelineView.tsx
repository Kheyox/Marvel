import React from 'react';
import { Clock, CheckCircle2, PlayCircle, EyeOff, Info, Film, Layers, Check } from 'lucide-react';
import { MarvelItem, WatchStatus } from '../types';
import { formatMinutesToHours } from '../utils/formatters';
import { STREAMING_PLATFORMS } from '../data/marvelData';
import { getHeroTheme } from '../utils/heroThemes';

interface MarvelTimelineViewProps {
  items: MarvelItem[];
  progress: Record<string, { status: WatchStatus }>;
  onStatusChange: (itemId: string, status: WatchStatus) => void;
  onOpenDetails: (item: MarvelItem) => void;
}

export const MarvelTimelineView: React.FC<MarvelTimelineViewProps> = ({
  items,
  progress,
  onStatusChange,
  onOpenDetails,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center my-8">
        <Film className="w-12 h-12 text-white/40 mx-auto mb-3" />
        <h3 className="text-lg font-black uppercase italic text-white">Aucune œuvre trouvée</h3>
        <p className="text-xs text-white/40 mt-1">
          Modifiez vos filtres pour afficher la frise chronologique.
        </p>
      </div>
    );
  }

  let currentEra = '';

  return (
    <div className="relative my-8 px-2 sm:px-4">
      {/* Central Chronological Connecting Vertical Line */}
      <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#E62429] via-white/10 to-[#E62429] -translate-x-1/2 rounded-full pointer-events-none opacity-80" />

      <div className="space-y-8 relative z-10">
        {items.map((item, index) => {
          const itemStatus = progress[item.id]?.status || 'unwatched';
          const isEven = index % 2 === 0;
          const isWatched = itemStatus === 'watched';
          const heroTheme = getHeroTheme(item.title, item.keyCharacters, item.universe);

          // Check if era changed to insert era section header
          const showEraHeader = item.phaseOrEra !== currentEra;
          if (showEraHeader) {
            currentEra = item.phaseOrEra;
          }

          return (
            <React.Fragment key={item.id}>
              
              {/* Era Header Divider */}
              {showEraHeader && (
                <div className="flex justify-center my-6 relative z-20">
                  <div className="bg-[#050505] border border-[#E62429] text-[#E62429] font-black text-xs px-4 py-1.5 rounded-full shadow-2xl uppercase italic tracking-widest flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#E62429]" />
                    <span>{item.phaseOrEra}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 group">
                
                {/* Desktop Left Content / Right Content Alternating layout */}
                <div className={`w-full sm:w-[45%] ${isEven ? 'sm:order-1 sm:text-right' : 'sm:order-3 sm:text-left'}`}>
                  
                  <div className={`bg-[#111] border hover:border-[#E62429]/60 rounded-2xl p-4 shadow-2xl transition-all duration-300 space-y-3 ${
                    isWatched ? 'border-emerald-500/60 bg-[#0d1f15]' : 'border-white/10'
                  }`}>
                    
                    {/* Header info with explicit Checkbox */}
                    <div className={`flex flex-wrap items-center gap-2 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      <span className="bg-[#E62429] text-white text-[10px] font-black italic uppercase px-2 py-0.5 rounded-lg shadow-sm">
                        N° {item.chronologicalOrder} Chrono
                      </span>
                      <span className="text-xs text-white/50 font-mono">
                        {heroTheme.heroIcon} {item.releaseYear}
                      </span>
                      <span className="bg-[#050505] text-white/80 border border-white/10 text-[11px] px-2 py-0.5 rounded-lg font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#E62429]" />
                        {formatMinutesToHours(item.durationMinutes)}
                      </span>

                      {/* Explicit Checkbox in Timeline Card */}
                      <label 
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-black cursor-pointer shadow border transition-all ${
                          isWatched
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-[#050505] text-white/60 hover:text-white border-white/20'
                        }`}
                        title={isWatched ? "Décocher" : "Cocher comme Vu"}
                      >
                        <input
                          type="checkbox"
                          checked={isWatched}
                          onChange={(e) => onStatusChange(item.id, e.target.checked ? 'watched' : 'unwatched')}
                          className="w-3.5 h-3.5 rounded border-white/30 text-emerald-500 focus:ring-emerald-500 bg-black cursor-pointer accent-emerald-500"
                        />
                        <span className="text-[10px] uppercase">{isWatched ? 'VU ✓' : 'À VOIR'}</span>
                      </label>
                    </div>

                    {/* Poster + Title Row */}
                    <div className="flex items-start gap-3 cursor-pointer" onClick={() => onOpenDetails(item)}>
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded-xl border border-white/10 shrink-0 shadow-md"
                        loading="lazy"
                      />
                      <div className="flex-grow">
                        <h4 className="text-base font-black italic uppercase text-white group-hover:text-[#E62429] transition-colors line-clamp-1 flex items-center gap-1">
                          {isWatched && <Check className="w-4 h-4 text-emerald-400 inline stroke-[3]" />}
                          <span>{item.title}</span>
                        </h4>
                        <p className="text-xs text-white/60 line-clamp-2 mt-1 leading-relaxed">
                          {item.synopsis}
                        </p>
                      </div>
                    </div>

                    {/* Platforms Badges */}
                    <div className={`flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      {item.platforms.map((plat) => {
                        const platformConfig = STREAMING_PLATFORMS[plat] || {
                          badgeBg: 'bg-white/10',
                          textColor: 'text-white',
                        };
                        return (
                          <span
                            key={plat}
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${platformConfig.badgeBg} ${platformConfig.textColor}`}
                          >
                            {plat}
                          </span>
                        );
                      })}
                    </div>

                    {/* Action Status Bar */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 bg-[#050505] border border-white/10 p-1 rounded-xl w-full">
                        <button
                          onClick={() => onStatusChange(item.id, 'unwatched')}
                          className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                            itemStatus === 'unwatched'
                              ? 'bg-white/10 text-white'
                              : 'text-white/40 hover:text-white'
                          }`}
                        >
                          <EyeOff className="w-3 h-3" />
                          <span>À voir</span>
                        </button>

                        <button
                          onClick={() => onStatusChange(item.id, 'watching')}
                          className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                            itemStatus === 'watching'
                              ? 'bg-amber-400 text-black'
                              : 'text-white/40 hover:text-amber-300'
                          }`}
                        >
                          <PlayCircle className="w-3 h-3" />
                          <span>En cours</span>
                        </button>

                        <button
                          onClick={() => onStatusChange(item.id, 'watched')}
                          className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                            itemStatus === 'watched'
                              ? 'bg-emerald-600 text-white'
                              : 'text-white/40 hover:text-emerald-400'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Vu !</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onOpenDetails(item)}
                        className="p-1.5 text-white/40 hover:text-white bg-[#050505] hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer shrink-0"
                        title="Voir plus de détails"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

                {/* Central Step Circle Node */}
                <div className="sm:order-2 shrink-0 z-20 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-black text-xs shadow-2xl transition-all duration-300 ${
                      itemStatus === 'watched'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-emerald-900/50 scale-110'
                        : itemStatus === 'watching'
                        ? 'bg-amber-950 border-amber-500 text-amber-400 shadow-amber-900/50 scale-110'
                        : 'bg-[#050505] border-white/20 text-white/60'
                    }`}
                  >
                    {isWatched ? '✓' : item.chronologicalOrder}
                  </div>
                </div>

                {/* Spacer for desktop symmetry */}
                <div className={`hidden sm:block w-[45%] ${isEven ? 'order-3' : 'order-1'}`} />

              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
