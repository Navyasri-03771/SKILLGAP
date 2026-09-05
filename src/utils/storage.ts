import { SkillGapAnalysis, LearningProgressMap, SavedAnalysisRecord } from '../types';

const ANALYSIS_KEY = 'skillGapAnalysis';
const PROGRESS_KEY = 'skillGapProgress';
const SAVED_ANALYSES_KEY = 'skillGapSavedAnalyses';

export function saveAnalysisToStorage(analysis: SkillGapAnalysis): void {
  try {
    localStorage.setItem(ANALYSIS_KEY, JSON.stringify(analysis));
  } catch (error) {
    console.warn('LocalStorage save failed for analysis', error);
  }
}

export function loadAnalysisFromStorage(): { data: SkillGapAnalysis | null; corrupted: boolean } {
  try {
    const raw = localStorage.getItem(ANALYSIS_KEY);
    if (!raw) return { data: null, corrupted: false };
    const parsed = JSON.parse(raw) as SkillGapAnalysis;
    if (
      parsed &&
      typeof parsed.selectedJobId === 'string' &&
      Array.isArray(parsed.selectedSkills) &&
      Array.isArray(parsed.matchingSkills) &&
      Array.isArray(parsed.missingSkills) &&
      typeof parsed.readinessPercentage === 'number'
    ) {
      return { data: parsed, corrupted: false };
    }
    return { data: null, corrupted: true };
  } catch (error) {
    console.warn('LocalStorage load failed for analysis', error);
    return { data: null, corrupted: true };
  }
}

export function saveProgressToStorage(progress: LearningProgressMap): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn('LocalStorage save failed for progress', error);
  }
}

export function loadProgressFromStorage(): LearningProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed as LearningProgressMap;
    }
    return {};
  } catch (error) {
    console.warn('LocalStorage load failed for progress', error);
    return {};
  }
}

export function clearSkillGapStorage(): void {
  try {
    localStorage.removeItem(ANALYSIS_KEY);
    localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.warn('LocalStorage clear failed', error);
  }
}

// Multi-record Saved Analyses feature
export function getSavedAnalyses(): SavedAnalysisRecord[] {
  try {
    const raw = localStorage.getItem(SAVED_ANALYSES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.warn('LocalStorage load failed for saved analyses', error);
    return [];
  }
}

export function saveAnalysisRecord(record: SavedAnalysisRecord): SavedAnalysisRecord[] {
  try {
    const existing = getSavedAnalyses();
    // Filter out if duplicate ID exists, then prepend newly saved
    const filtered = existing.filter((item) => item.id !== record.id);
    const updated = [record, ...filtered];
    localStorage.setItem(SAVED_ANALYSES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn('LocalStorage save failed for record', error);
    return getSavedAnalyses();
  }
}

export function deleteSavedAnalysis(id: string): SavedAnalysisRecord[] {
  try {
    const existing = getSavedAnalyses();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(SAVED_ANALYSES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn('LocalStorage delete failed for record', error);
    return getSavedAnalyses();
  }
}

export function clearAllSavedAnalyses(): void {
  try {
    localStorage.removeItem(SAVED_ANALYSES_KEY);
  } catch (error) {
    console.warn('LocalStorage clear failed for saved analyses', error);
  }
}
