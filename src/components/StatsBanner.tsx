import React from 'react';
import { Clock, CheckCircle2, PlayCircle, EyeOff, Film, Calendar, Tv, Sparkles, PieChart } from 'lucide-react';
import { calculateProgressStats } from '../utils/formatters';
import { MarvelItem, UserProgress } from '../types';

interface StatsBannerProps {
  items: MarvelItem[];
  progress: UserProgress;
  activeUniverseLabel?: string;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ items, progress, activeUniverseLabel }) => {
  const stats = calculateProgressStats(items, progress);

  return (
    <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-6 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top Header info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-800/80">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              <span>Bilan du Visionnage {activeUniverseLabel ? `(${activeUniverseLabel})` : ''}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Durée totale cumulée : <strong className="text-zinc-200">{stats.totalFormatted.formatted}</strong> ({stats.totalDurationMinutes} min)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-800/50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {stats.watchedDurationMinutes} min visionnées ({stats.percentageTime}%)
            </span>
            <span className="bg-amber-950/70 text-amber-300 border border-amber-800/50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Reste : {stats.remainingFormatted.formattedShort}
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center text-xs text-zinc-300 font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <span>Avancée globale :</span>
              <strong className="text-emerald-400">{stats.watchedItemsCount} sur {stats.totalItemsCount} œuvres vus</strong>
            </span>
            <span className="text-emerald-400 font-bold text-sm">{stats.percentageCount}%</span>
          </div>
          <div className="w-full bg-zinc-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-700/50 flex">
            <div
              className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/30"
              style={{ width: `${stats.percentageCount}%` }}
              title={`Visionné : ${stats.percentageCount}%`}
            />
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">Visionnés</p>
              <p className="text-base font-extrabold text-white">
                {stats.watchedItemsCount} <span className="text-xs font-normal text-zinc-400">/ {stats.totalItemsCount}</span>
              </p>
              <p className="text-[10px] text-emerald-400 font-medium">{stats.watchedFormatted.formattedShort}</p>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/50 text-amber-400 flex items-center justify-center shrink-0">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">En cours</p>
              <p className="text-base font-extrabold text-white">{stats.watchingItemsCount}</p>
              <p className="text-[10px] text-amber-400/80 font-medium">En visionnage</p>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">Restants</p>
              <p className="text-base font-extrabold text-white">{stats.unwatchedItemsCount}</p>
              <p className="text-[10px] text-zinc-400 font-medium">{stats.remainingFormatted.formattedShort}</p>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-800/50 text-red-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">Temps Total</p>
              <p className="text-sm font-extrabold text-white">{stats.totalFormatted.formattedShort}</p>
              <p className="text-[10px] text-red-400 font-medium">{stats.totalDurationMinutes} min cumulées</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
