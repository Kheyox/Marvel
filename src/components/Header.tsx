import React from 'react';
import { Download, RotateCcw, Smartphone } from 'lucide-react';

interface HeaderProps {
  onOpenExportImport: () => void;
  onOpenApkGuide: () => void;
  onResetProgress: () => void;
  itemsCount: number;
  watchedCount: number;
  watchedPercentage: number;
  totalHoursFormatted: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExportImport,
  onOpenApkGuide,
  onResetProgress,
  itemsCount,
  watchedCount,
  watchedPercentage,
  totalHoursFormatted,
}) => {
  return (
    <header className="bg-[#050505] border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl bg-opacity-95 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          
          {/* Left Brand Identity */}
          <div className="flex flex-col">
            <span className="text-[#E62429] font-black text-xs uppercase tracking-[0.3em] mb-1">
              Archive Numérique
            </span>
            <h1 className="text-3xl sm:text-5xl font-black italic uppercase leading-none tracking-tighter text-white">
              Marvel Chronology
            </h1>
          </div>

          {/* Right Stats & Action Controls */}
          <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
            
            {/* Total Duration Stat */}
            <div className="text-left md:text-right">
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                Durée Totale
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-white">
                {totalHoursFormatted}
              </p>
            </div>

            {/* Progression Stat */}
            <div className="text-left md:text-right border-l border-white/10 pl-4 sm:pl-6">
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                Progression
              </p>
              <p className="text-xl sm:text-2xl font-mono font-black text-[#E62429]">
                {watchedPercentage}%
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 sm:pl-6">
              
              {/* Mobile / APK Button */}
              <button
                onClick={onOpenApkGuide}
                className="flex items-center gap-1.5 bg-[#E62429] hover:bg-[#ff3036] text-white text-xs font-black uppercase italic px-3 py-2 rounded-xl shadow-lg shadow-red-950/60 transition-all cursor-pointer"
                title="Installer sur mobile ou générer un APK"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>APK / Mobile</span>
              </button>

              <button
                onClick={onOpenExportImport}
                className="flex items-center gap-1.5 bg-[#111] hover:bg-white/10 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
                title="Exporter ou Importer votre progression"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">Sauvegarde</span>
              </button>

              <button
                onClick={onResetProgress}
                className="flex items-center gap-1.5 bg-[#111] hover:bg-[#E62429]/20 text-zinc-400 hover:text-red-300 text-xs font-bold px-2.5 py-2 rounded-xl border border-white/10 hover:border-[#E62429]/50 transition-colors cursor-pointer"
                title="Réinitialiser tout le suivi"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
