import React from 'react';
import { WATCH_ORDER_PRESETS } from '../data/watchOrders';
import { WatchOrderPreset } from '../types';
import { Compass, Film, Tv, Layers } from 'lucide-react';

interface WatchOrderSelectorProps {
  activePreset: WatchOrderPreset;
  onSelectPreset: (preset: WatchOrderPreset) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const WatchOrderSelector: React.FC<WatchOrderSelectorProps> = ({
  activePreset,
  onSelectPreset,
  selectedType,
  onTypeChange,
}) => {
  const currentConfig = WATCH_ORDER_PRESETS.find((p) => p.id === activePreset) || WATCH_ORDER_PRESETS[0];

  return (
    <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#E62429]" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            Guides & Ordres de Visionnage Recommandés
          </h3>
        </div>
        <span className="text-[11px] font-mono text-white/50">
          Ordre actif : <strong className="text-white">{currentConfig.title}</strong>
        </span>
      </div>

      {/* Preset pills row with smooth horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {WATCH_ORDER_PRESETS.map((preset) => {
          const isSelected = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#E62429] text-white border-white/30 shadow-lg shadow-red-950/50 scale-[1.02]'
                  : 'bg-[#080808] text-white/70 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-sm">{preset.icon}</span>
              <span className="font-black uppercase tracking-wider">{preset.shortTitle}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono ${
                isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-white/60'
              }`}>
                {preset.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Type Filter: Tout vs Films vs Séries */}
      <div className="bg-[#080808] border border-white/10 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#E62429]" />
          <span className="text-[11px] font-black uppercase text-white/70 tracking-wider">
            Format :
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1 bg-[#141414] p-1 rounded-xl border border-white/10 w-full sm:w-auto">
          <button
            onClick={() => onTypeChange('all')}
            className={`py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedType === 'all'
                ? 'bg-[#E62429] text-white shadow-md shadow-red-950/60'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Tout</span>
          </button>

          <button
            onClick={() => onTypeChange('film')}
            className={`py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedType === 'film'
                ? 'bg-[#E62429] text-white shadow-md shadow-red-950/60'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-3.5 h-3.5 shrink-0" />
            <span>Films</span>
          </button>

          <button
            onClick={() => onTypeChange('serie')}
            className={`py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedType === 'serie'
                ? 'bg-[#E62429] text-white shadow-md shadow-red-950/60'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-3.5 h-3.5 shrink-0" />
            <span>Séries</span>
          </button>
        </div>
      </div>

      {/* Description of active preset */}
      <div className="bg-[#080808]/60 border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="space-y-0.5">
          <p className="text-white/90 font-medium">
            {currentConfig.description}
          </p>
          <p className="text-[11px] text-[#E62429] font-bold">
            💡 {currentConfig.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};
