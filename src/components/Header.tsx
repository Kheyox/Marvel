import React from 'react';
import { Download, RotateCcw, Smartphone, RefreshCw } from 'lucide-react';
import { APP_VERSION } from '../version';

interface HeaderProps {
  onOpenExportImport: () => void;
  onOpenApkGuide: () => void;
  onResetProgress: () => void;
  itemsCount: number;
  watchedCount: number;
  watchedPercentage: number;
  totalHoursFormatted: string;
  hasUpdateAvailable?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExportImport,
  onOpenApkGuide,
  onResetProgress,
  itemsCount,
  watchedCount,
  watchedPercentage,
  totalHoursFormatted,
  hasUpdateAvailable = false,
}) => {
  return (
    <header className="bg-[#050505] border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl bg-opacity-95 shadow-2xl w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4">
          
          {/* Left Brand Identity */}
          <div className="flex items-center justify-between md:block">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[#E62429] font-black text-[9px] sm:text-xs uppercase tracking-[0.25em]">
                  Archive Numérique
                </span>
                <span className="bg-white/10 text-white/60 text-[9px] font-mono px-1.5 py-0.2 rounded border border-white/10">
                  v{APP_VERSION}
                </span>
              </div>
              <h1 className="text-xl sm:text-4xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter text-white">
                Marvel Chronology
              </h1>
            </div>

            {/* Mobile-only compact stats */}
            <div className="flex items-center gap-2.5 md:hidden">
              <div className="text-right">
                <p className="text-white/40 text-[8px] uppercase font-bold tracking-wider">
                  Progression
                </p>
                <p className="text-base font-mono font-black text-[#E62429] leading-tight">
                  {watchedPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Right Stats & Action Controls */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-6 border-t md:border-t-0 border-white/10 pt-2 md:pt-0">
            
            {/* Total Duration Stat (Hidden on very tiny mobile, visible sm+) */}
            <div className="hidden sm:block text-left md:text-right">
              <p className="text-white/40 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">
                Durée Totale
              </p>
              <p className="text-sm sm:text-2xl font-mono font-bold text-white leading-tight">
                {totalHoursFormatted}
              </p>
            </div>

            {/* Progression Stat (Desktop) */}
            <div className="hidden md:block text-right border-l border-white/10 pl-4 sm:pl-6">
              <p className="text-white/40 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">
                Progression
              </p>
              <p className="text-lg sm:text-2xl font-mono font-black text-[#E62429] leading-tight">
                {watchedPercentage}%
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 sm:border-l sm:border-white/10 sm:pl-4 sm:pl-6 w-full sm:w-auto justify-end">
              
              {/* Mobile / APK Button with Update Notification Badge */}
              <button
                onClick={onOpenApkGuide}
                className={`relative flex items-center gap-1 text-[11px] sm:text-xs font-black uppercase italic px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-lg transition-all cursor-pointer ${
                  hasUpdateAvailable 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black ring-2 ring-emerald-400 animate-pulse' 
                    : 'bg-[#E62429] hover:bg-[#ff3036] text-white shadow-red-950/60'
                }`}
                title="Mises à jour APK & Installation mobile"
              >
                {hasUpdateAvailable ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>MAJ !</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>APK / Mobile</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenExportImport}
                className="flex items-center gap-1 bg-[#111] hover:bg-white/10 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
                title="Exporter ou Importer votre progression"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden xs:inline">Sauvegarde</span>
              </button>

              <button
                onClick={onResetProgress}
                className="flex items-center gap-1 bg-[#111] hover:bg-[#E62429]/20 text-zinc-400 hover:text-red-300 text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl border border-white/10 hover:border-[#E62429]/50 transition-colors cursor-pointer"
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
