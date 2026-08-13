import { APP_VERSION } from '../version';

export interface GithubReleaseInfo {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  apkDownloadUrl?: string;
  apkSizeMb?: string;
  isNewer: boolean;
}

const GITHUB_REPO_STORAGE_KEY = 'marvel_tracker_github_repo';
export const DEFAULT_GITHUB_REPO = 'Kheyox/Marvel';

export function cleanRepoString(input: string): string {
  if (!input) return DEFAULT_GITHUB_REPO;
  return input
    .trim()
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\.git$/i, '')
    .replace(/\/+$/, '')
    .trim();
}

export function getSavedGithubRepo(): string {
  try {
    const saved = localStorage.getItem(GITHUB_REPO_STORAGE_KEY);
    if (!saved || saved === 'foreval69/marvel-chrono-tracker') {
      return DEFAULT_GITHUB_REPO;
    }
    return cleanRepoString(saved);
  } catch {
    return DEFAULT_GITHUB_REPO;
  }
}

export function saveGithubRepo(repo: string): string {
  const cleaned = cleanRepoString(repo) || DEFAULT_GITHUB_REPO;
  try {
    localStorage.setItem(GITHUB_REPO_STORAGE_KEY, cleaned);
  } catch (e) {
    console.error('Failed to save github repo', e);
  }
  return cleaned;
}

// Compare semantic or tag versions
function compareVersions(current: string, latest: string): boolean {
  // Normalize by stripping 'v' and spaces
  const cleanCurrent = current.replace(/^v/i, '').trim();
  const cleanLatest = latest.replace(/^v/i, '').trim();

  if (cleanCurrent === cleanLatest) return false;

  const currentParts = cleanCurrent.split('.').map(p => parseInt(p, 10) || 0);
  const latestParts = cleanLatest.split('.').map(p => parseInt(p, 10) || 0);

  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
    const cur = currentParts[i] || 0;
    const lat = latestParts[i] || 0;
    if (lat > cur) return true;
    if (lat < cur) return false;
  }

  // If string formats differ but numerically equal, consider newer if latest != current
  return cleanLatest !== cleanCurrent;
}

/**
 * Checks GitHub API for the latest release in the repository
 */
export async function checkForGithubUpdates(repoName: string): Promise<GithubReleaseInfo | null> {
  const cleanRepo = cleanRepoString(repoName);
  if (!cleanRepo || !cleanRepo.includes('/')) {
    throw new Error('Veuillez entrer un nom de dépôt valide au format "Kheyox/Marvel" ou "https://github.com/Kheyox/Marvel"');
  }

  const url = `https://api.github.com/repos/${cleanRepo}/releases/latest`;
  
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Aucune version publiée (Release) trouvée sur https://github.com/${cleanRepo}. Dès que le workflow GitHub Actions s'exécute sur le repo, le fichier APK apparaîtra ici automatiquement.`);
    }
    if (response.status === 403) {
      throw new Error(`Limite temporaire de requêtes GitHub atteinte pour votre adresse IP. Réessayez dans quelques minutes ou téléchargez directement depuis https://github.com/${cleanRepo}/releases.`);
    }
    throw new Error(`Erreur lors de la vérification GitHub (${response.status}) : ${response.statusText}`);
  }

  const data = await response.json();
  
  // Find APK asset in release
  const apkAsset = data.assets?.find((asset: any) => 
    asset.name.toLowerCase().endsWith('.apk') || asset.content_type === 'application/vnd.android.package-archive'
  );

  const apkDownloadUrl = apkAsset ? apkAsset.browser_download_url : undefined;
  const apkSizeMb = apkAsset ? (apkAsset.size / (1024 * 1024)).toFixed(1) + ' Mo' : undefined;

  const isNewer = compareVersions(APP_VERSION, data.tag_name);

  return {
    tag_name: data.tag_name,
    name: data.name || data.tag_name,
    published_at: data.published_at,
    body: data.body || '',
    html_url: data.html_url,
    apkDownloadUrl,
    apkSizeMb,
    isNewer,
  };
}
