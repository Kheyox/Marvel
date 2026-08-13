import React, { useState } from 'react';
import { X, Copy, Check, Download, Upload, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserProgress, MarvelItem } from '../types';

interface ExportImportModalProps {
  progress: UserProgress;
  items: MarvelItem[];
  onImportProgress: (newProgress: UserProgress) => void;
  onClose: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  progress,
  items,
  onImportProgress,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const jsonString = JSON.stringify(progress, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleImport = () => {
    setImportError('');
    setImportSuccess(false);
    try {
      if (!importText.trim()) {
        setImportError('Veuillez coller le texte JSON de votre sauvegarde.');
        return;
      }
      const parsed = JSON.parse(importText);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Format JSON invalide.');
      }
      onImportProgress(parsed);
      setImportSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setImportError('Erreur de lecture du JSON. Assurez-vous d’avoir collé le bon code de sauvegarde.');
    }
  };

  const handleDownloadTextChecklist = () => {
    const lines = items.map((item) => {
      const status = progress[item.id]?.status || 'unwatched';
      const mark = status === 'watched' ? '[X]' : status === 'watching' ? '[/]' : '[ ]';
      return `${mark} N°${item.chronologicalOrder} - ${item.title} (${item.releaseYear}) - ${item.durationMinutes} min [${item.platforms.join(', ')}]`;
    });

    const textContent = `--- MA LISTE MARVEL & SUIVI DE VISIONNAGE ---\n` +
      `Généré le ${new Date().toLocaleDateString('fr-FR')}\n\n` +
      lines.join('\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Marvel-Chrono-Tracker-Checklist.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-black italic uppercase text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-[#E62429]" />
              Sauvegarde & Restauration
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Exporter ou importer votre avancement sur un autre appareil
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white bg-[#050505] rounded-full transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Export */}
        <div className="space-y-2">
          <h3 className="text-xs font-black text-white/60 uppercase tracking-widest flex items-center gap-1.5">
            1. Exporter vos données de progression
          </h3>
          <div className="relative">
            <textarea
              readOnly
              value={jsonString}
              rows={4}
              className="w-full bg-[#050505] text-white/80 font-mono text-xs rounded-xl p-3 border border-white/10 focus:outline-none resize-none"
            />
            <button
              onClick={handleCopyJson}
              className="absolute top-2.5 right-2.5 bg-[#E62429] hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le JSON</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleDownloadTextChecklist}
            className="w-full mt-2 bg-[#050505] hover:bg-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Télécharger ma liste au format fichier .TXT</span>
          </button>
        </div>

        {/* Section 2: Import */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <h3 className="text-xs font-black text-white/60 uppercase tracking-widest flex items-center gap-1.5">
            2. Importer / Restaurer un code JSON
          </h3>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Collez votre code JSON de sauvegarde ici..."
            rows={3}
            className="w-full bg-[#050505] text-white font-mono text-xs rounded-xl p-3 border border-white/10 focus:outline-none focus:border-[#E62429] resize-none"
          />

          {importError && (
            <p className="text-xs text-red-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {importError}
            </p>
          )}

          {importSuccess && (
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Progression importée avec succès !
            </p>
          )}

          <button
            onClick={handleImport}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Appliquer l’importation</span>
          </button>
        </div>

      </div>
    </div>
  );
};
