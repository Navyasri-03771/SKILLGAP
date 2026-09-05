import { SkillGapAnalysis, LearningProgressMap, SavedAnalysisRecord } from '../types';

const BASE_ANALYSIS_KEY = 'skillGapAnalysis';
const BASE_PROGRESS_KEY = 'skillGapProgress';
const BASE_SAVED_ANALYSES_KEY = 'skillGapSavedAnalyses';

/**
 * Returns a unique storage key scoped to the specific user account.
 * This guarantees strict data isolation between accounts.
 */
function getScopedKey(base: string, userId?: string): string {
  if (userId && userId.trim().length > 0) {
    return `${base}_user_${userId.trim()}`;
  }
  return `${base}_guest`;
}

export function saveAnalysisToStorage(analysis: SkillGapAnalysis, userId?: string): void {
  try {
    const key = getScopedKey(BASE_ANALYSIS_KEY, userId);
    localStorage.setItem(key, JSON.stringify(analysis));
  } catch (error) {
    console.warn('LocalStorage save failed for analysis', error);
  }
}

export function loadAnalysisFromStorage(userId?: string): { data: SkillGapAnalysis | null; corrupted: boolean } {
  try {
    const key = getScopedKey(BASE_ANALYSIS_KEY, userId);
    const raw = localStorage.getItem(key);
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

export function saveProgressToStorage(progress: LearningProgressMap, userId?: string): void {
  try {
    const key = getScopedKey(BASE_PROGRESS_KEY, userId);
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.warn('LocalStorage save failed for progress', error);
  }
}

export function loadProgressFromStorage(userId?: string): LearningProgressMap {
  try {
    const key = getScopedKey(BASE_PROGRESS_KEY, userId);
    const raw = localStorage.getItem(key);
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

export function clearSkillGapStorage(userId?: string): void {
  try {
    const analysisKey = getScopedKey(BASE_ANALYSIS_KEY, userId);
    const progressKey = getScopedKey(BASE_PROGRESS_KEY, userId);
    localStorage.removeItem(analysisKey);
    localStorage.removeItem(progressKey);
  } catch (error) {
    console.warn('LocalStorage clear failed', error);
  }
}

// Multi-record Saved Analyses feature - strictly scoped per user account
export function getSavedAnalyses(userId?: string): SavedAnalysisRecord[] {
  try {
    const key = getScopedKey(BASE_SAVED_ANALYSES_KEY, userId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Double check that only records matching this user ID (or legacy) are included
      return parsed.filter((item) => !item.userId || !userId || item.userId === userId);
    }
    return [];
  } catch (error) {
    console.warn('LocalStorage load failed for saved analyses', error);
    return [];
  }
}

export function saveAnalysisRecord(record: SavedAnalysisRecord, userId?: string): SavedAnalysisRecord[] {
  try {
    const key = getScopedKey(BASE_SAVED_ANALYSES_KEY, userId);
    const existing = getSavedAnalyses(userId);
    
    // Explicitly tag record with the current user ID
    const scopedRecord: SavedAnalysisRecord = {
      ...record,
      userId: userId || record.userId,
    };

    // Filter out if duplicate ID exists, then prepend newly saved
    const filtered = existing.filter((item) => item.id !== scopedRecord.id);
    const updated = [scopedRecord, ...filtered];
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn('LocalStorage save failed for record', error);
    return getSavedAnalyses(userId);
  }
}

export function deleteSavedAnalysis(id: string, userId?: string): SavedAnalysisRecord[] {
  try {
    const key = getScopedKey(BASE_SAVED_ANALYSES_KEY, userId);
    const existing = getSavedAnalyses(userId);
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn('LocalStorage delete failed for record', error);
    return getSavedAnalyses(userId);
  }
}

export function clearAllSavedAnalyses(userId?: string): void {
  try {
    const key = getScopedKey(BASE_SAVED_ANALYSES_KEY, userId);
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('LocalStorage clear failed for saved analyses', error);
  }
}

