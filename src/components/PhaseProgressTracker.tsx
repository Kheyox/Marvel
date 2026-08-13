import React from 'react';
import { MCU_PHASES_INFO } from '../data/watchOrders';
import { MarvelItem, UserProgress } from '../types';
import { CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface PhaseProgressTrackerProps {
  items: MarvelItem[];
  progress: UserProgress;
  activePhaseFilter: string | null;
  onSelectPhaseFilter: (phaseId: string | null) => void;
  selectedType?: string;
}

export const PhaseProgressTracker: React.FC<PhaseProgressTrackerProps> = ({
  items,
  progress,
  activePhaseFilter,
  onSelectPhaseFilter,
  selectedType = 'all',
}) => {
  // Compute progress for each Phase
  const phasesData = MCU_PHASES_INFO.map((phase) => {
    const phaseItems = items.filter((item) => {
      const matchesPhase = item.phaseOrEra.includes(phase.id) || item.phase === phase.id;
      if (!matchesPhase) return false;
      if (selectedType !== 'all' && item.type !== selectedType) return false;
      return true;
    });
    const totalCount = phaseItems.length;
    const watchedCount = phaseItems.filter((item) => progress[item.id]?.status === 'watched').length;
    const percentage = totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;
    const isCompleted = totalCount > 0 && watchedCount === totalCount;

    return {
      ...phase,
      totalCount,
      watchedCount,
      percentage,
      isCompleted,
    };
  });

  return (
    <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#E62429]" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            Progression par Phase MCU (Saga de l'Infini & Multivers)
          </h3>
        </div>
        {activePhaseFilter && (
          <button
            onClick={() => onSelectPhaseFilter(null)}
            className="text-[11px] font-bold text-[#E62429] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Afficher toutes les phases</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {phasesData.map((phase) => {
          const isSelected = activePhaseFilter === phase.id;

          return (
            <button
              key={phase.id}
              onClick={() => onSelectPhaseFilter(isSelected ? null : phase.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-red-950/40 border-[#E62429] ring-2 ring-[#E62429]/40'
                  : phase.isCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                  : 'bg-[#080808] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-black uppercase text-white tracking-wide">
                    {phase.id}
                  </span>
                  {phase.isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-white/50">
                      {phase.percentage}%
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-white/40 truncate">{phase.years}</p>
              </div>

              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/60 mb-1">
                  <span>{phase.watchedCount} / {phase.totalCount}</span>
                  <span className="text-white/40 font-normal">vus</span>
                </div>

                {/* Micro progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      phase.isCompleted ? 'bg-emerald-500' : phase.color
                    }`}
                    style={{ width: `${phase.percentage}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
