export type WatchStatus = 'unwatched' | 'watching' | 'watched';

export type MarvelUniverse = 'mcu' | 'xmen' | 'spiderman_raimi_webb' | 'sony_spiderverse' | 'fox_other' | 'marvel_classics';

export type ContentType = 'film' | 'serie';

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
}

export interface UserProgress {
  [itemId: string]: {
    status: WatchStatus;
    rating?: number; // Optional personal rating 1-5 stars
    watchedDate?: string;
  };
}

export type SortOption = 'chronological' | 'release' | 'duration_asc' | 'duration_desc' | 'rating';
