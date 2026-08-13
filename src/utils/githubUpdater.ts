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

export function getSavedGithubRepo(): string {
  try {
    return localStorage.getItem(GITHUB_REPO_STORAGE_KEY) || 'foreval69/marvel-chrono-tracker';
  } catch {
    return 'foreval69/marvel-chrono-tracker';
  }
}

export function saveGithubRepo(repo: string): void {
  try {
    localStorage.setItem(GITHUB_REPO_STORAGE_KEY, repo.trim().replace(/^https?:\/\/github\.com\//, ''));
  } catch (e) {
    console.error('Failed to save github repo', e);
  }
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
  const cleanRepo = repoName.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/+$/, '');
  if (!cleanRepo || !cleanRepo.includes('/')) {
    throw new Error('Veuillez entrer un nom de dépôt valide au format "utilisateur/depot" (ex: foreval69/marvel-chrono-tracker)');
  }

  const url = `https://api.github.com/repos/${cleanRepo}/releases/latest`;
  
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Aucune version publiée trouvée sur le dépôt ${cleanRepo}. Exécutez le workflow GitHub Actions au moins une fois.`);
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
