import { WatchOrderPreset } from '../types';

export interface WatchOrderConfig {
  id: WatchOrderPreset;
  title: string;
  shortTitle: string;
  badge: string;
  icon: string;
  description: string;
  recommendation: string;
  filterFn?: (itemId: string, itemUniverse: string, isEssential?: boolean) => boolean;
}

export const WATCH_ORDER_PRESETS: WatchOrderConfig[] = [
  {
    id: 'chronological',
    title: 'Ordre Chronologique (Histoire In-Universe)',
    shortTitle: 'Chronologique',
    badge: 'Recommandé Rewatch',
    icon: '⏱️',
    description: 'Suivez la ligne temporelle de l\'univers Marvel de la Seconde Guerre mondiale (1942) jusqu\'aux événements les plus récents (2026+).',
    recommendation: 'Idéal si vous avez déjà vu les films et souhaitez vivre l\'histoire dans l\'ordre temporel exact des faits.',
  },
  {
    id: 'release',
    title: 'Ordre de Sortie Cinéma (Phases 1 à 6)',
    shortTitle: 'Sortie Cinéma',
    badge: 'Recommandé Débutants',
    icon: '🎬',
    description: 'Découvrez les œuvres dans l\'ordre exact de leur sortie en salle, de Iron Man (2008) jusqu\'aux dernières productions.',
    recommendation: 'Le meilleur ordre pour une première découverte : respecte les révélations, le suspense et les scènes post-génériques voulues par les créateurs.',
  },
  {
    id: 'essential',
    title: 'Ordre Essentiel & Rapide (MCU Marathon)',
    shortTitle: 'Essentiel MCU',
    badge: 'Gain de Temps',
    icon: '⚡',
    description: 'La sélection condensée des films piliers indispensables pour comprendre toute la trame des Avengers et du Multivers sans détours.',
    recommendation: 'Parfait si vous voulez rattraper les films majeurs rapidement sans regarder toutes les séries.',
  },
  {
    id: 'infinity_saga',
    title: 'La Saga de l\'Infini (Phases 1, 2, 3)',
    shortTitle: 'Saga de l\'Infini',
    badge: '2008 - 2019',
    icon: '💎',
    description: 'L\'épopée complète des 6 Pierres d\'Infinité et du combat contre Thanos, de Iron Man à Avengers: Endgame.',
    recommendation: 'L\'âge d\'or du MCU : 23 films cultes.',
  },
  {
    id: 'multiverse_saga',
    title: 'La Saga du Multivers (Phases 4, 5, 6)',
    shortTitle: 'Saga du Multivers',
    badge: '2021 - 2027',
    icon: '🌀',
    description: 'L\'exploration des réalités alternatives, des variants et des incursions cosmiques de Loki à Secret Wars.',
    recommendation: 'Comprend les nouvelles séries Disney+ et les films du Multivers.',
  },
  {
    id: 'spiderman',
    title: 'Saga Spider-Man Multivers Complète',
    shortTitle: 'Spider-Verse',
    badge: 'Tobey / Andrew / Tom',
    icon: '🕷️',
    description: 'Tous les films Spider-Man (Trilogie Raimi, Amazing Spider-Man, MCU, Sony Spider-Verse animé et Venom).',
    recommendation: 'Pour préparer au mieux Spider-Man: No Way Home et Beyond the Spider-Verse.',
  },
  {
    id: 'xmen',
    title: 'Saga Complète X-Men & Mutants',
    shortTitle: 'X-Men & Mutants',
    badge: 'Fox & MCU',
    icon: '🧬',
    description: 'L\'univers complet des Mutants Fox (X-Men, Wolverine, Logan, Deadpool) menant à Deadpool & Wolverine dans le MCU.',
    recommendation: 'Indispensable pour maîtriser les variants mutants.',
  },
  {
    id: 'defenders',
    title: 'The Defenders Saga (Marvel Street-Level)',
    shortTitle: 'The Defenders',
    badge: 'Daredevil & Co',
    icon: '⚔️',
    description: 'L\'arc sombre et urbain : Daredevil, Jessica Jones, Luke Cage, Iron Fist, The Defenders et The Punisher.',
    recommendation: 'À voir pour préparer la nouvelle série Daredevil: Born Again.',
  },
];

// Phase Progress Breakdown metadata
export interface PhaseProgressInfo {
  id: string;
  name: string;
  saga: string;
  years: string;
  color: string;
  borderColor: string;
}

export const MCU_PHASES_INFO: PhaseProgressInfo[] = [
  { id: 'Phase 1', name: 'Phase 1 : Rassemblement', saga: 'Saga de l\'Infini', years: '2008 - 2012', color: 'bg-red-600', borderColor: 'border-red-500' },
  { id: 'Phase 2', name: 'Phase 2 : Émancipation', saga: 'Saga de l\'Infini', years: '2013 - 2015', color: 'bg-amber-600', borderColor: 'border-amber-500' },
  { id: 'Phase 3', name: 'Phase 3 : Guerre Civile & Thanos', saga: 'Saga de l\'Infini', years: '2016 - 2019', color: 'bg-purple-600', borderColor: 'border-purple-500' },
  { id: 'Phase 4', name: 'Phase 4 : Nouveau Départ & Multivers', saga: 'Saga du Multivers', years: '2021 - 2022', color: 'bg-blue-600', borderColor: 'border-blue-500' },
  { id: 'Phase 5', name: 'Phase 5 : Menaces Cosmiques & Incursions', saga: 'Saga du Multivers', years: '2023 - 2025', color: 'bg-emerald-600', borderColor: 'border-emerald-500' },
  { id: 'Phase 6', name: 'Phase 6 : Climax Secret Wars', saga: 'Saga du Multivers', years: '2025 - 2027', color: 'bg-indigo-600', borderColor: 'border-indigo-500' },
];
