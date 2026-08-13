import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Github, 
  Download, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowDownToLine, 
  ExternalLink,
  ShieldCheck,
  Settings,
  HelpCircle
} from 'lucide-react';
import { APP_VERSION, APP_BUILD_DATE } from '../version';
import { checkForGithubUpdates, getSavedGithubRepo, saveGithubRepo, GithubReleaseInfo } from '../utils/githubUpdater';

interface ApkGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'update' | 'pwa' | 'setup'>('update');
  const [githubRepo, setGithubRepo] = useState(getSavedGithubRepo());
  const [isChecking, setIsChecking] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<GithubReleaseInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
  
  // PWA Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPwaInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Auto-check on open
  useEffect(() => {
    if (isOpen && !hasCheckedOnce) {
      handleCheckUpdates();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    setErrorMsg(null);
    try {
      saveGithubRepo(githubRepo);
      const res = await checkForGithubUpdates(githubRepo);
      setUpdateInfo(res);
      setHasCheckedOnce(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur lors de la vérification');
      setUpdateInfo(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownloadAndInstall = (url: string) => {
    setDownloadProgress('Lancement du téléchargement de l\'APK...');
    // Direct link download to trigger Android package installer
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MarvelChronoTracker.apk';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadProgress('APK téléchargé ! Ouvrez le fichier dans vos notifications Android pour installer la mise à jour.');
    }, 1500);
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsPwaInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("Pour installer directement : Ouvrez le menu de votre navigateur Android (3 points ⋮) et appuyez sur 'Installer l'application' ou 'Ajouter à l'écran d'accueil'.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col scrollbar-thin text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E62429] flex items-center justify-center shadow-lg shadow-red-950/60 shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black italic uppercase text-white leading-tight">
                  Mises à Jour & APK Android
                </h2>
                <span className="bg-[#E62429]/20 text-[#E62429] border border-[#E62429]/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  v{APP_VERSION}
                </span>
              </div>
              <p className="text-xs text-white/50">
                Vérification automatique GitHub et téléchargement instantané
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-[#E62429] transition-colors cursor-pointer border border-white/10 text-white/70 hover:text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#050505] p-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('update')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase italic transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'update'
                ? 'bg-[#E62429] text-white shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>Mises à Jour APK</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase italic transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'pwa'
                ? 'bg-[#E62429] text-white shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Installation PWA</span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase italic transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'setup'
                ? 'bg-[#E62429] text-white shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Config Repo GitHub</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 space-y-5 flex-grow">
          
          {/* TAB 1: IN-APP UPDATER (Surveillance GitHub + Auto-Install) */}
          {activeTab === 'update' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Current Version Card */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Version actuelle installée</p>
                  <p className="text-xl font-black italic text-white flex items-center gap-2">
                    <span>v{APP_VERSION}</span>
                    <span className="text-xs text-white/50 font-normal font-mono">({APP_BUILD_DATE})</span>
                  </p>
                </div>
                <button
                  onClick={handleCheckUpdates}
                  disabled={isChecking}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin text-[#E62429]' : ''}`} />
                  <span>{isChecking ? 'Vérification...' : 'Vérifier maintenant'}</span>
                </button>
              </div>

              {/* Status Display: New Update Found / Up to Date / Error */}
              {isChecking ? (
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#E62429] animate-spin mx-auto" />
                  <p className="text-sm font-bold text-white">Interrogation du dépôt GitHub...</p>
                  <p className="text-xs text-white/50 font-mono">{githubRepo}</p>
                </div>
              ) : updateInfo ? (
                updateInfo.isNewer ? (
                  /* NEW UPDATE AVAILABLE */
                  <div className="bg-gradient-to-br from-emerald-950/60 to-[#050505] border-2 border-emerald-500/80 rounded-2xl p-5 space-y-4 shadow-2xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <ArrowDownToLine className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-emerald-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                              Mise à jour disponible !
                            </span>
                            <span className="text-xs font-mono font-bold text-white">
                              {updateInfo.tag_name}
                            </span>
                          </div>
                          <h4 className="text-base font-black uppercase text-white mt-1">
                            {updateInfo.name}
                          </h4>
                        </div>
                      </div>
                      {updateInfo.apkSizeMb && (
                        <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 text-white/70">
                          {updateInfo.apkSizeMb}
                        </span>
                      )}
                    </div>

                    {updateInfo.body && (
                      <div className="bg-black/60 border border-white/10 p-3 rounded-xl text-xs text-white/80 whitespace-pre-line max-h-32 overflow-y-auto">
                        {updateInfo.body}
                      </div>
                    )}

                    {/* Download Button */}
                    {updateInfo.apkDownloadUrl ? (
                      <div className="space-y-2 pt-2">
                        <button
                          onClick={() => handleDownloadAndInstall(updateInfo.apkDownloadUrl!)}
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase italic py-3 px-4 rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4 stroke-[3]" />
                          <span>Télécharger & Mettre à jour l'APK ({updateInfo.tag_name})</span>
                        </button>
                        <p className="text-[11px] text-center text-emerald-300/80">
                          💡 Une fois téléchargé, cliquez sur le fichier dans vos notifications Android pour installer la nouvelle version par-dessus l'ancienne (vos données et progression sont conservées).
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                        La release existe mais le fichier .apk est en cours de compilation sur GitHub Actions. Réessayez dans 1 à 2 minutes.
                      </div>
                    )}
                  </div>
                ) : (
                  /* ALREADY UP TO DATE */
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <div>
                      <h4 className="text-base font-black uppercase text-emerald-400">
                        Votre application est à jour !
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        Vous utilisez déjà la dernière version publiée (<span className="text-white font-mono font-bold">{updateInfo.tag_name}</span>).
                      </p>
                    </div>
                    {updateInfo.apkDownloadUrl && (
                      <button
                        onClick={() => handleDownloadAndInstall(updateInfo.apkDownloadUrl!)}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger à nouveau l'APK ({updateInfo.tag_name})</span>
                      </button>
                    )}
                  </div>
                )
              ) : null}

              {/* Error Notice */}
              {errorMsg && (
                <div className="bg-amber-950/30 border border-amber-500/50 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Dépôt GitHub non connecté ou aucune release publiée</span>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {errorMsg}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('setup')}
                      className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Configurer mon lien de dépôt GitHub →
                    </button>
                  </div>
                </div>
              )}

              {/* Progress status note */}
              {downloadProgress && (
                <div className="p-3 bg-blue-950/60 border border-blue-500/50 text-blue-200 text-xs rounded-xl flex items-center gap-2">
                  <Download className="w-4 h-4 animate-bounce text-blue-400" />
                  <span>{downloadProgress}</span>
                </div>
              )}

              {/* Google Play Protect explanation banner */}
              <div className="bg-blue-950/30 border border-blue-500/40 rounded-xl p-3.5 text-xs space-y-1.5 text-blue-200">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Avis Google Play Protect lors de l'installation</span>
                </div>
                <p className="text-white/80 leading-relaxed text-[11px]">
                  Android affiche par défaut l'alerte <em>« Play Protect n'a jamais vu d'appli de ce développeur »</em> pour <strong>tous les APKs installés en direct</strong> (hors Google Play Store payant). 
                  L'application est 100% saine et open-source. Cliquez simplement sur <strong>« Installer quand même »</strong>.
                </p>
              </div>

              {/* How it works info */}
              <div className="bg-[#050505] border border-white/10 rounded-xl p-4 text-xs space-y-2 text-white/60">
                <h5 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mise à jour automatique 100% sans aller sur GitHub :</span>
                </h5>
                <p>
                  1. À chaque modification enregistrée et exportée sur votre GitHub, le workflow compile une nouvelle APK.
                </p>
                <p>
                  2. Votre application vérifie périodiquement GitHub Releases. Dès qu'une version supérieure est détectée, elle propose de l'installer en 1 clic.
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: PWA INSTALLATION */}
          {activeTab === 'pwa' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-emerald-400 uppercase">
                    Alternative Instantanée : Progressive Web App (PWA)
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                    Si vous ne souhaitez pas installer d'APK manuellement, la PWA se met à jour <strong>automatiquement à chaque ouverture</strong> dès qu'un nouveau code est déployé !
                  </p>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/10 rounded-xl p-5 text-center space-y-3">
                <p className="text-xs text-white/70">
                  Sur votre smartphone Android (Chrome ou Brave) :
                </p>
                <button
                  onClick={handleInstallPWA}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase italic px-6 py-3 rounded-xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isPwaInstalled ? 'Application Déjà Installée ✓' : 'Installer l\'icône sur mon écran d\'accueil'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SETUP GITHUB REPO */}
          {activeTab === 'setup' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-black uppercase text-[#E62429] tracking-wider">
                  Lien de votre dépôt GitHub (pour les vérifications de MAJ) :
                </h4>
                <p className="text-xs text-white/70">
                  Indiquez le nom de votre repository GitHub (ex: <code className="bg-black/60 text-emerald-400 px-1 py-0.5 rounded font-mono">foreval69/marvel-chrono-tracker</code>).
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                    placeholder="pseudo/nom-du-repo"
                    className="flex-1 bg-black border border-white/20 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#E62429]"
                  />
                  <button
                    onClick={handleCheckUpdates}
                    className="bg-[#E62429] hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>

              {/* GitHub Actions workflow recap */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 space-y-3 text-xs leading-relaxed">
                <h5 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-white" />
                  <span>Workflow automatique déjà en place (.github/workflows/build-apk.yml) :</span>
                </h5>
                <ol className="list-decimal list-inside space-y-2 text-white/80">
                  <li>Chaque commit / synchronisation sur la branche <code>main</code> déclenche GitHub Actions.</li>
                  <li>GitHub compile l'APK Android avec Capacitor & Gradle.</li>
                  <li>GitHub crée automatiquement une <strong>Release</strong> contenant le fichier <code>MarvelChronoTracker.apk</code>.</li>
                  <li>Cette fenêtre dans l'application détecte la nouvelle Release et permet de l'installer directement !</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] text-white/40 font-mono">
            Marvel Chrono Tracker • Build v{APP_VERSION}
          </p>
          <button
            onClick={onClose}
            className="bg-[#E62429] hover:bg-red-600 text-white font-black text-xs uppercase italic px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-lg"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
