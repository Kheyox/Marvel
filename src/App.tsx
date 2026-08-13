import React, { useState, useEffect, useMemo } from 'react';
import { MARVEL_ITEMS, UNIVERSE_LABELS } from './data/marvelData';
import { MarvelItem, UserProgress, WatchStatus, SortOption } from './types';
import { Header } from './components/Header';
import { BentoDashboard } from './components/BentoDashboard';
import { FilterBar } from './components/FilterBar';
import { MarvelCard } from './components/MarvelCard';
import { MarvelTimelineView } from './components/MarvelTimelineView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ExportImportModal } from './components/ExportImportModal';
import { ApkGuideModal } from './components/ApkGuideModal';
import { calculateProgressStats, formatMinutesToHours } from './utils/formatters';
import { checkForGithubUpdates, getSavedGithubRepo } from './utils/githubUpdater';
import { Film } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'marvel_chrono_tracker_progress_v1';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved Marvel progress:', e);
    }
    return {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('chronological');
  const [selectedUniverse, setSelectedUniverse] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const [selectedItemForModal, setSelectedItemForModal] = useState<MarvelItem | null>(null);
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);
  const [isApkGuideOpen, setIsApkGuideOpen] = useState(false);
  const [hasUpdateAvailable, setHasUpdateAvailable] = useState(false);

  // Background check for updates
  useEffect(() => {
    const checkBgUpdates = async () => {
      try {
        const repo = getSavedGithubRepo();
        const info = await checkForGithubUpdates(repo);
        if (info && info.isNewer) {
          setHasUpdateAvailable(true);
        }
      } catch {
        // Silently ignore if offline or repo not configured yet
      }
    };
    checkBgUpdates();
  }, []);

  // --- LOCALSTORAGE SYNC ---
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save Marvel progress to localStorage:', e);
    }
  }, [progress]);

  // --- HANDLERS ---
  const handleStatusChange = (itemId: string, newStatus: WatchStatus) => {
    setProgress((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        status: newStatus,
        watchedDate: newStatus === 'watched' ? new Date().toISOString() : undefined,
      },
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser tout votre suivi de visionnage ?')) {
      setProgress({});
    }
  };

  // --- FILTERING & SORTING LOGIC ---
  const filteredAndSortedItems = useMemo(() => {
    return MARVEL_ITEMS.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesOriginalTitle = item.originalTitle.toLowerCase().includes(query);
        const matchesSynopsis = item.synopsis.toLowerCase().includes(query);
        const matchesCharacters = item.keyCharacters?.some((c) => c.toLowerCase().includes(query));
        const matchesEra = item.phaseOrEra.toLowerCase().includes(query);
        const matchesYear = item.releaseYear.toString().includes(query);

        if (!matchesTitle && !matchesOriginalTitle && !matchesSynopsis && !matchesCharacters && !matchesEra && !matchesYear) {
          return false;
        }
      }

      // Universe filter
      if (selectedUniverse !== 'all' && item.universe !== selectedUniverse) {
        return false;
      }

      // Streaming Platform filter (Disney+, Netflix, Prime Video, etc.)
      if (selectedPlatform !== 'all') {
        if (!item.platforms.includes(selectedPlatform)) {
          return false;
        }
      }

      // Content Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      // Watch Status filter
      if (selectedStatus !== 'all') {
        const itemStatus = progress[item.id]?.status || 'unwatched';
        if (itemStatus !== selectedStatus) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (selectedSort) {
        case 'chronological':
          return a.chronologicalOrder - b.chronologicalOrder;
        case 'release':
          return a.releaseOrder - b.releaseOrder;
        case 'duration_asc':
          return a.durationMinutes - b.durationMinutes;
        case 'duration_desc':
          return b.durationMinutes - a.durationMinutes;
        case 'rating':
          return (b.imdbRating || 0) - (a.imdbRating || 0);
        default:
          return a.chronologicalOrder - b.chronologicalOrder;
      }
    });
  }, [searchQuery, selectedUniverse, selectedPlatform, selectedType, selectedStatus, selectedSort, progress]);

  // Bulk Watch / Unwatch for currently visible items
  const handleMarkAllVisibleAsWatched = () => {
    const updated = { ...progress };
    filteredAndSortedItems.forEach((item) => {
      updated[item.id] = { status: 'watched', watchedDate: new Date().toISOString() };
    });
    setProgress(updated);
  };

  const handleMarkAllVisibleAsUnwatched = () => {
    const updated = { ...progress };
    filteredAndSortedItems.forEach((item) => {
      updated[item.id] = { status: 'unwatched' };
    });
    setProgress(updated);
  };

  const globalStats = calculateProgressStats(MARVEL_ITEMS, progress);
  const activeUniverseInfo = UNIVERSE_LABELS[selectedUniverse];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E62429] selection:text-white pb-20 w-full max-w-full overflow-x-hidden">
      
      {/* Top Header Navigation */}
      <Header
        onOpenExportImport={() => setIsExportImportOpen(true)}
        onOpenApkGuide={() => setIsApkGuideOpen(true)}
        onResetProgress={handleResetProgress}
        itemsCount={globalStats.totalItemsCount}
        watchedCount={globalStats.watchedItemsCount}
        watchedPercentage={globalStats.percentageCount}
        totalHoursFormatted={globalStats.totalFormatted.formattedShort}
        hasUpdateAvailable={hasUpdateAvailable}
      />

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 overflow-x-hidden">
        
        {/* Bento Grid Summary Dashboard */}
        <BentoDashboard
          items={MARVEL_ITEMS}
          progress={progress}
          activeUniverseLabel={selectedUniverse !== 'all' ? activeUniverseInfo?.label : undefined}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          onStatusChange={handleStatusChange}
          onOpenDetails={setSelectedItemForModal}
        />

        {/* Filter Controls Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          selectedUniverse={selectedUniverse}
          onUniverseChange={setSelectedUniverse}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSelectAllWatched={handleMarkAllVisibleAsWatched}
          onUnselectAllWatched={handleMarkAllVisibleAsUnwatched}
          filteredCount={filteredAndSortedItems.length}
          totalCount={MARVEL_ITEMS.length}
        />

        {/* Display Content: Bento Grid vs Vertical Timeline */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center my-8 max-w-lg mx-auto shadow-2xl">
            <Film className="w-12 h-12 text-[#E62429] mx-auto mb-3 animate-pulse" />
            <h3 className="text-xl font-black uppercase italic text-white">Aucun résultat</h3>
            <p className="text-xs text-white/50 mt-1 mb-4">
              Aucun film ou série ne correspond à vos filtres actuels.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedUniverse('all');
                setSelectedPlatform('all');
                setSelectedType('all');
                setSelectedStatus('all');
              }}
              className="bg-[#E62429] hover:bg-red-500 text-white text-xs font-black uppercase italic px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedItems.map((item) => (
              <MarvelCard
                key={item.id}
                item={item}
                status={progress[item.id]?.status || 'unwatched'}
                onStatusChange={handleStatusChange}
                onOpenDetails={setSelectedItemForModal}
              />
            ))}
          </div>
        ) : (
          <MarvelTimelineView
            items={filteredAndSortedItems}
            progress={progress}
            onStatusChange={handleStatusChange}
            onOpenDetails={setSelectedItemForModal}
          />
        )}

      </main>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItemForModal}
        status={selectedItemForModal ? progress[selectedItemForModal.id]?.status || 'unwatched' : 'unwatched'}
        onClose={() => setSelectedItemForModal(null)}
        onStatusChange={handleStatusChange}
      />

      {/* Export / Import Modal */}
      {isExportImportOpen && (
        <ExportImportModal
          progress={progress}
          items={MARVEL_ITEMS}
          onImportProgress={(imported) => setProgress(imported)}
          onClose={() => setIsExportImportOpen(false)}
        />
      )}

      {/* APK & Mobile Guide Modal */}
      <ApkGuideModal
        isOpen={isApkGuideOpen}
        onClose={() => setIsApkGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/40 max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#E62429] italic uppercase">MARVEL CHRONO TRACKER</span>
            <span>• Bento Grid Interface</span>
          </div>
          <p className="text-white/40">
            Marvel Studios, Disney, Sony Pictures & Fox Rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
