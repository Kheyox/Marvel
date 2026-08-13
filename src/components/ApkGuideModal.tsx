import React, { useState, useEffect } from 'react';
import { X, Smartphone, Github, Download, CheckCircle2, Sparkles, ExternalLink, Terminal, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface ApkGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pwa' | 'github' | 'capacitor'>('pwa');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("Pour installer sur Android : Ouvrez le menu de Chrome (les 3 petits points ⋮ en haut à droite) et appuyez sur 'Installer l'application' ou 'Ajouter à l'écran d'accueil'.");
    }
  };

  const copyCapacitorCommands = () => {
    const commands = `npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Marvel Chrono" "com.marvelchrono.tracker" --web-dir dist
npm run build
npx cap add android
npx cap sync android
npx cap open android`;
    navigator.clipboard.writeText(commands);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col scrollbar-thin text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E62429] flex items-center justify-center shadow-lg shadow-red-950/60">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase text-white leading-tight">
                Utiliser sur Mobile & Générer l'APK
              </h2>
              <p className="text-xs text-white/50">
                Installation directe PWA ou génération d'un fichier .APK via GitHub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-[#E62429] transition-colors cursor-pointer border border-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#050505] p-2 gap-2">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase italic transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'pwa'
                ? 'bg-[#E62429] text-white shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. PWA (Direct sur Mobile)</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase italic transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'github'
                ? 'bg-[#E62429] text-white shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>2. APK via GitHub Actions</span>
          </button>

          <button
            onClick={() => setActiveTab('capacitor')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase italic transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'capacitor'
                ? 'bg-[#E62429] text-white shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>3. Android Studio (Local)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 flex-grow">
          
          {/* TAB 1: PWA (Instant Native Mobile Experience) */}
          {activeTab === 'pwa' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-emerald-400 uppercase">
                    Méthode recommandée (Instantanée & Sans compilation)
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                    L'application est 100% configurée en **PWA (Progressive Web App)**. Elle s'installe comme une véritable application Android : icône dédiée Marvel, plein écran sans barre d'adresse, et fonctionne hors-ligne !
                  </p>
                </div>
              </div>

              {/* Install button */}
              <div className="bg-[#050505] border border-white/10 rounded-xl p-5 text-center space-y-3">
                <p className="text-xs text-white/70">
                  Si vous êtes déjà sur votre smartphone (Chrome ou Brave sur Android) :
                </p>
                <button
                  onClick={handleInstallPWA}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase italic px-6 py-3 rounded-xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isInstalled ? 'Application Déjà Installée ✓' : 'Installer sur mon téléphone'}</span>
                </button>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 space-y-3 text-xs">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider text-[#E62429]">
                  Comment faire manuellement sur Android :
                </h5>
                <ol className="list-decimal list-inside space-y-2 text-white/80 leading-relaxed">
                  <li>Ouvrez le lien de l'application sur **Google Chrome** ou **Brave** sur votre mobile.</li>
                  <li>Appuyez sur les **3 petits points ⋮** en haut à droite du navigateur.</li>
                  <li>Sélectionnez **« Installer l'application »** ou **« Ajouter à l'écran d'accueil »**.</li>
                  <li>L'icône **Marvel Chrono** apparaît sur votre écran d'accueil comme un vrai APK !</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: GITHUB ACTIONS (Automated APK Build) */}
          {activeTab === 'github' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-blue-950/40 border border-blue-500/40 rounded-xl p-4 flex items-start gap-3">
                <Github className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-blue-300 uppercase">
                    Workflow GitHub Actions pré-configuré (.apk automatique)
                  </h4>
                  <p className="text-xs text-blue-200/80 mt-1 leading-relaxed">
                    Nous avons déjà créé pour vous le fichier <code className="bg-black/50 px-1 py-0.5 rounded text-white font-mono">.github/workflows/build-apk.yml</code>. Dès que vous exportez vers GitHub, GitHub compile automatiquement l'APK téléchargeable !
                  </p>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/10 rounded-xl p-5 space-y-3 text-xs leading-relaxed">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-2">
                  <span>Étapes pour générer votre fichier .APK :</span>
                </h5>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#E62429] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <p>Dans Google AI Studio, cliquez sur le menu en haut à droite et choisissez **« Export to GitHub »** (ou téléchargez le fichier ZIP).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#E62429] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <p>Sur votre dépôt GitHub, ouvrez l'onglet **« Actions »** en haut.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#E62429] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <p>Le workflow **« Build Android APK »** se lance automatiquement (ou cliquez sur *Run workflow*).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#E62429] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                    <p>Une fois terminé (environ 2 min), téléchargez l'artefact **« Marvel-Chrono-Tracker-APK »** contenant le fichier <code className="bg-black/60 px-1 py-0.5 rounded text-emerald-400 font-mono">app-debug.apk</code> et transférez-le sur votre téléphone !</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAPACITOR LOCAL */}
          {activeTab === 'capacitor' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#050505] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-400">
                    Commandes Capacitor pour compiler en local avec Android Studio :
                  </span>
                  <button
                    onClick={copyCapacitorCommands}
                    className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-white"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>

                <pre className="bg-black border border-white/10 p-3 rounded-lg text-[11px] font-mono text-zinc-300 overflow-x-auto leading-loose">
{`npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Marvel Chrono" "com.marvelchrono.tracker" --web-dir dist
npm run build
npx cap add android
npx cap sync android
npx cap open android`}
                </pre>
                <p className="text-xs text-white/50">
                  Ces commandes ouvrent le projet dans Android Studio où vous pouvez faire <span className="text-white font-bold">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</span>.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] text-white/40 font-mono">
            ID: com.marvelchrono.tracker
          </p>
          <button
            onClick={onClose}
            className="bg-[#E62429] hover:bg-red-600 text-white font-black text-xs uppercase italic px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
