export type WatchStatus = 'unwatched' | 'watching' | 'watched';

export type MarvelUniverse = 'mcu' | 'xmen' | 'spiderman_raimi_webb' | 'sony_spiderverse' | 'fox_other' | 'marvel_classics';

export type ContentType = 'film' | 'serie';

export type ViewMode = 'grid' | 'timeline' | 'checklist';

export type WatchOrderPreset = 'chronological' | 'release' | 'essential' | 'infinity_saga' | 'multiverse_saga' | 'spiderman' | 'xmen' | 'defenders';

export interface StreamingPlatform {
  name: string;
  badgeBg: string;
  textColor: string;
  logoLetter?: string;
  iconName?: string;
}

export interface MarvelItem {
  id: string;
  title: string;
  originalTitle: string;
  releaseYear: number;
  chronologicalOrder: number; // Order in chronological timeline
  releaseOrder: number;      // Order in release timeline
  durationMinutes: number;   // Duration in minutes
  type: ContentType;
  universe: MarvelUniverse;
  phaseOrEra: string;        // e.g. "MCU Phase 1", "X-Men Era Originale", "Sony Spider-Verse"
  posterUrl: string;
  backdropUrl?: string;
  platforms: string[];       // e.g. ["Disney+", "Canal+"]
  synopsis: string;
  keyCharacters: string[];
  imdbRating?: number;
  episodesCount?: number;    // If series
  notes?: string;
  
  // MarvelWatchlist enhancements
  inUniverseYear?: string;      // e.g. "1942-1945", "1995", "2010", "2023-2024"
  postCreditsCount?: number;    // Number of post-credits scenes (e.g. 0, 1, 2, 5)
  postCreditsDescription?: string; // e.g. "2 scènes (1 mi-générique + 1 fin)"
  isEssential?: boolean;        // Essential MCU Watchlist
  saga?: string;                // e.g. "Saga de l'Infini", "Saga du Multivers", "The Defenders"
  phase?: string;               // e.g. "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6"
  disneyPlusUrl?: string;       // Direct streaming link helper
}

export interface UserProgress {
  [itemId: string]: {
    status: WatchStatus;
    rating?: number; // Optional personal rating 1-5 stars
    watchedDate?: string;
  };
}

export type SortOption = 'chronological' | 'release' | 'duration_asc' | 'duration_desc' | 'rating';

