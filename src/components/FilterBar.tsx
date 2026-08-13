import React from 'react';
import { Search, ArrowUpDown, LayoutGrid, GitCommit, Film, Tv, CheckCircle2, PlayCircle, EyeOff, X, Filter, ListChecks } from 'lucide-react';
import { SortOption, ViewMode } from '../types';
import { UNIVERSE_LABELS, STREAMING_PLATFORMS } from '../data/marvelData';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedUniverse: string;
  onUniverseChange: (universe: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSelectAllWatched?: () => void;
  onUnselectAllWatched?: () => void;
  filteredCount: number;
  totalCount: number;
}


export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSort,
  onSortChange,
  selectedUniverse,
  onUniverseChange,
  selectedPlatform,
  onPlatformChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
  onSelectAllWatched,
  onUnselectAllWatched,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-3 sm:p-5 mb-6 shadow-2xl space-y-3 sm:space-y-4 w-full max-w-full overflow-x-hidden">
      
      {/* Search Row + View Mode Toggles */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3 w-full">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher (Deadpool, Iron Man, Spider-Man)..."
            className="w-full bg-[#050505] text-white placeholder-white/40 text-xs rounded-xl pl-10 pr-8 py-2.5 border border-white/10 focus:outline-none focus:border-[#E62429] focus:ring-1 focus:ring-[#E62429] transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-0.5 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View mode toggle + Quick Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto">
          
          {/* Quick Bulk Watch buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-white/60">
            {onSelectAllWatched && (
              <button
                onClick={onSelectAllWatched}
                className="hover:text-emerald-400 text-white/80 bg-[#050505] hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-800/50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors text-[11px] sm:text-xs font-bold cursor-pointer flex items-center gap-1"
                title="Cocher et marquer tous les éléments affichés comme vus"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>✓ Tout cocher vu</span>
              </button>
            )}
            {onUnselectAllWatched && (
              <button
                onClick={onUnselectAllWatched}
                className="hover:text-white text-white/40 bg-[#050505] hover:bg-white/10 border border-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors text-[11px] sm:text-xs font-bold cursor-pointer"
                title="Décocher tout"
              >
                Décocher tout
              </button>
            )}
          </div>

          {/* Grid vs Checklist vs Timeline mode button */}
          <div className="bg-[#050505] p-1 rounded-xl border border-white/10 flex items-center gap-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase italic transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#E62429] text-white shadow-lg shadow-red-950/50'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
              title="Vue Grille d'affiches"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grille</span>
            </button>
            <button
              onClick={() => onViewModeChange('checklist')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase italic transition-all cursor-pointer ${
                viewMode === 'checklist'
                  ? 'bg-[#E62429] text-white shadow-lg shadow-red-950/50'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
              title="Vue Liste Checklist compacte (comme MarvelWatchlist)"
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>Checklist</span>
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase italic transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-[#E62429] text-white shadow-lg shadow-red-950/50'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
              title="Vue Frise chronologique"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Frise</span>
            </button>
          </div>


        </div>

      </div>

      {/* STREAMING PLATFORM FILTER ROW (Disney+, Netflix, Prime Video, etc.) */}
      <div className="overflow-x-auto pb-1 scrollbar-thin border-t border-b border-white/10 py-2.5 sm:py-3 w-full max-w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          <span className="text-[10px] font-black uppercase text-[#E62429] tracking-widest mr-1 flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-[#E62429]" /> Plateformes :
          </span>

          <button
            onClick={() => onPlatformChange('all')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              selectedPlatform === 'all'
                ? 'bg-white/20 text-white border-white font-black uppercase italic'
                : 'bg-[#050505] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            Toutes
          </button>

          <button
            onClick={() => onPlatformChange('Disney+')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              selectedPlatform === 'Disney+'
                ? 'bg-[#006E99] text-white border-[#006E99] shadow-lg font-black italic ring-2 ring-blue-400'
                : 'bg-[#050505] text-blue-300 border-white/10 hover:border-[#006E99]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#006E99]" />
            Disney+
          </button>

          <button
            onClick={() => onPlatformChange('Netflix')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              selectedPlatform === 'Netflix'
                ? 'bg-[#E50914] text-white border-[#E50914] shadow-lg font-black italic ring-2 ring-red-500'
                : 'bg-[#050505] text-red-400 border-white/10 hover:border-[#E50914]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            Netflix
          </button>

          <button
            onClick={() => onPlatformChange('Prime Video')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              selectedPlatform === 'Prime Video'
                ? 'bg-[#00A8E1] text-black border-[#00A8E1] shadow-lg font-black italic ring-2 ring-sky-300'
                : 'bg-[#050505] text-sky-400 border-white/10 hover:border-[#00A8E1]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00A8E1]" />
            Prime Video
          </button>

          <button
            onClick={() => onPlatformChange('Canal+')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              selectedPlatform === 'Canal+'
                ? 'bg-zinc-200 text-black border-white shadow-lg font-black italic ring-2 ring-zinc-300'
                : 'bg-[#050505] text-zinc-300 border-white/10 hover:border-white/30'
            }`}
          >
            Canal+
          </button>

          <button
            onClick={() => onPlatformChange('VOD / Achat')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              selectedPlatform === 'VOD / Achat'
                ? 'bg-amber-500 text-black border-amber-400 shadow-lg font-black italic ring-2 ring-amber-300'
                : 'bg-[#050505] text-amber-400 border-white/10 hover:border-amber-500/50'
            }`}
          >
            VOD / Achat
          </button>
        </div>
      </div>

      {/* Universe Filter Tabs */}
      <div className="overflow-x-auto pb-1 scrollbar-thin w-full max-w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mr-1">Univers :</span>
          {Object.entries(UNIVERSE_LABELS).map(([key, info]) => {
            const isSelected = selectedUniverse === key;
            return (
              <button
                key={key}
                onClick={() => onUniverseChange(key)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#E62429] text-white border-[#E62429] shadow-lg shadow-red-950/50 font-black uppercase italic'
                    : 'bg-[#050505] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls: Sorting, Type, Status Filter */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-white/10 text-xs w-full">
        
        {/* Sort Select */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#E62429] shrink-0" />
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full sm:w-auto bg-[#050505] text-white text-xs rounded-xl px-2.5 py-1.5 border border-white/10 focus:outline-none focus:border-[#E62429] cursor-pointer font-bold"
          >
            <option value="chronological">⏱️ Ordre Chronologique</option>
            <option value="release">🎬 Ordre de Sortie</option>
            <option value="duration_asc">⏳ Du + court au + long</option>
            <option value="duration_desc">⏳ Du + long au + court</option>
            <option value="rating">⭐ Meilleure note IMDB</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-[#050505] p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => onStatusChange('all')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              selectedStatus === 'all' ? 'bg-white/20 text-white font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => onStatusChange('unwatched')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
              selectedStatus === 'unwatched' ? 'bg-white/20 text-amber-300 font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            <EyeOff className="w-3 h-3 text-amber-400" />
            <span className="hidden xs:inline">À voir</span>
          </button>
          <button
            onClick={() => onStatusChange('watching')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
              selectedStatus === 'watching' ? 'bg-white/20 text-blue-400 font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            <PlayCircle className="w-3 h-3 text-blue-400" />
            <span className="hidden xs:inline">En cours</span>
          </button>
          <button
            onClick={() => onStatusChange('watched')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
              selectedStatus === 'watched' ? 'bg-white/20 text-emerald-400 font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="hidden xs:inline">Vus</span>
          </button>
        </div>

        {/* Content Type Filter */}
        <div className="flex items-center gap-1 bg-[#050505] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => onTypeChange('all')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              selectedType === 'all' ? 'bg-white/20 text-white font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => onTypeChange('film')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
              selectedType === 'film' ? 'bg-white/20 text-[#E62429] font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            <Film className="w-3 h-3 text-[#E62429]" />
            Films
          </button>
          <button
            onClick={() => onTypeChange('serie')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
              selectedType === 'serie' ? 'bg-white/20 text-purple-400 font-black' : 'text-white/40 hover:text-white'
            }`}
          >
            <Tv className="w-3 h-3 text-purple-400" />
            Séries
          </button>
        </div>

        {/* Counter Badge */}
        <div className="text-white/40 font-mono text-xs w-full sm:w-auto text-right">
          Affichage : <strong className="text-white">{filteredCount}</strong> / {totalCount}
        </div>

      </div>

    </div>
  );
};
