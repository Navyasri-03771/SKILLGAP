import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Analyzer } from './components/Analyzer';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SavedAnalysesModal } from './components/SavedAnalysesModal';
import { JOB_ROLES, ALL_PREDEFINED_SKILLS } from './data/jobRoles';
import { runSkillGapAnalysis } from './utils/analyzer';
import {
  saveAnalysisToStorage,
  loadAnalysisFromStorage,
  saveProgressToStorage,
  loadProgressFromStorage,
  clearSkillGapStorage,
  getSavedAnalyses,
  saveAnalysisRecord,
  deleteSavedAnalysis,
  clearAllSavedAnalyses,
} from './utils/storage';
import { SkillGapAnalysis, LearningProgressMap, SavedAnalysisRecord } from './types';
import { CheckCircle2, AlertCircle, X, BookmarkCheck } from 'lucide-react';

export default function App() {
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [progressMap, setProgressMap] = useState<LearningProgressMap>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [restoreNotification, setRestoreNotification] = useState<{
    message: string;
    type: 'success' | 'warning';
  } | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysisRecord[]>([]);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Load saved analysis & progress & saved records from LocalStorage on mount
  useEffect(() => {
    const { data: savedAnalysis, corrupted } = loadAnalysisFromStorage();
    const savedProgress = loadProgressFromStorage();
    const records = getSavedAnalyses();
    setProgressMap(savedProgress);
    setSavedAnalyses(records);

    if (corrupted) {
      setRestoreNotification({
        message: 'Saved analysis could not be restored. Starting a new analysis.',
        type: 'warning',
      });
      return;
    }

    if (savedAnalysis) {
      setAnalysis(savedAnalysis);
      setSelectedJobId(savedAnalysis.selectedJobId);
      setSelectedSkills(savedAnalysis.selectedSkills);
      setRestoreNotification({
        message: 'Your latest analysis has been restored.',
        type: 'success',
      });
    }
  }, []);

  // Auto-dismiss restore notification after 6 seconds
  useEffect(() => {
    if (restoreNotification) {
      const timer = setTimeout(() => {
        setRestoreNotification(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [restoreNotification]);

  // Auto-dismiss save toast after 4 seconds
  useEffect(() => {
    if (saveToast) {
      const timer = setTimeout(() => {
        setSaveToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [saveToast]);

  // Handle Target Job selection
  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    if (validationError && jobId) {
      setValidationError(null);
    }
  };

  // Toggle individual skill
  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      const exists = prev.some((s) => s.toLowerCase() === skill.toLowerCase());
      if (exists) {
        return prev.filter((s) => s.toLowerCase() !== skill.toLowerCase());
      } else {
        return [...prev, skill];
      }
    });
    if (validationError) {
      setValidationError(null);
    }
  };

  // Select all 23 skills
  const handleSelectAllSkills = () => {
    setSelectedSkills([...ALL_PREDEFINED_SKILLS]);
    if (validationError) setValidationError(null);
  };

  // Clear all selected skills
  const handleClearAllSkills = () => {
    setSelectedSkills([]);
  };

  // Quick preset helper (e.g. Frontend Core, Python Core)
  const handleQuickPreset = (presetSkills: string[]) => {
    setSelectedSkills(presetSkills);
    if (validationError) setValidationError(null);
  };

  // Execute Skill Gap Analysis
  const handleAnalyze = () => {
    setValidationError(null);

    // Validation Case 1: No job selected
    if (!selectedJobId) {
      setValidationError('Please select a target job role first.');
      const analyzerEl = document.getElementById('job-selector-section');
      analyzerEl?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Validation Case 2: No skills selected
    if (selectedSkills.length === 0) {
      setValidationError('Please select at least one skill to analyze your skill gap.');
      const skillsEl = document.getElementById('skills-selector-section');
      skillsEl?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const job = JOB_ROLES.find((r) => r.id === selectedJobId);
    if (!job) {
      setValidationError('Please select a target job role first.');
      return;
    }

    // Run exact mathematical comparison
    const newAnalysis = runSkillGapAnalysis(job, selectedSkills);
    setAnalysis(newAnalysis);

    // Persist in LocalStorage
    saveAnalysisToStorage(newAnalysis);

    // Smoothly scroll to results
    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Save current analysis to library
  const handleSaveCurrentAnalysis = () => {
    if (!analysis) return;
    const currentJob = JOB_ROLES.find((r) => r.id === analysis.selectedJobId);
    if (!currentJob) return;

    const record: SavedAnalysisRecord = {
      id: `record-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: new Date().toISOString(),
      selectedJobId: currentJob.id,
      roleName: currentJob.name,
      title: `${currentJob.name} Analysis (${analysis.readinessPercentage}% Readiness)`,
      analysis,
      progressMap,
    };

    const updated = saveAnalysisRecord(record);
    setSavedAnalyses(updated);
    setSaveToast(`Analysis saved for ${currentJob.name}! View it anytime under Saved.`);
  };

  // Load a saved record
  const handleLoadSavedRecord = (record: SavedAnalysisRecord) => {
    setAnalysis(record.analysis);
    setSelectedJobId(record.selectedJobId);
    setSelectedSkills(record.analysis.selectedSkills);
    setProgressMap(record.progressMap || {});

    // Save as active analysis
    saveAnalysisToStorage(record.analysis);
    saveProgressToStorage(record.progressMap || {});

    setSaveToast(`Loaded saved analysis for ${record.roleName}.`);

    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Delete individual record
  const handleDeleteSavedRecord = (id: string) => {
    const updated = deleteSavedAnalysis(id);
    setSavedAnalyses(updated);
  };

  // Clear all saved records
  const handleClearAllSavedRecords = () => {
    clearAllSavedAnalyses();
    setSavedAnalyses([]);
  };

  // Toggle learning progress (0% <-> 100%)
  const handleToggleLearned = (skillName: string) => {
    const currentProgress = progressMap[skillName] || 0;
    const newProgress = currentProgress === 100 ? 0 : 100;

    const updatedProgressMap = {
      ...progressMap,
      [skillName]: newProgress,
    };

    setProgressMap(updatedProgressMap);
    saveProgressToStorage(updatedProgressMap);
  };

  // Feature 5: Reset Analysis workflow
  const handleConfirmReset = () => {
    // Clear LocalStorage active session
    clearSkillGapStorage();

    // Reset component state
    setSelectedJobId('');
    setSelectedSkills([]);
    setAnalysis(null);
    setProgressMap({});
    setValidationError(null);
    setIsResetModalOpen(false);
    setRestoreNotification(null);

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentJobRole = JOB_ROLES.find((r) => r.id === analysis?.selectedJobId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <Header
        hasAnalysis={Boolean(analysis)}
        readinessPercentage={analysis?.readinessPercentage}
        selectedRoleName={currentJobRole?.name}
        savedCount={savedAnalyses.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenReset={() => setIsResetModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Restored from Storage or Corrupted Notification Banner */}
      {restoreNotification && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 w-full">
          <div
            className={`p-3.5 rounded-xl border text-sm flex items-center justify-between shadow-xs transition-all ${
              restoreNotification.type === 'success'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
            role="status"
            id="restore-notification-toast"
          >
            <div className="flex items-center gap-2.5">
              {restoreNotification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span className="font-medium text-xs sm:text-sm">
                {restoreNotification.message}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setRestoreNotification(null)}
              className="p-1 rounded-md text-slate-500 hover:text-slate-700 hover:bg-black/5 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Save Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-semibold">
            <BookmarkCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{saveToast}</span>
            <button
              type="button"
              onClick={() => setIsSavedModalOpen(true)}
              className="ml-2 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Open Library
            </button>
            <button
              type="button"
              onClick={() => setSaveToast(null)}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero onStartAnalysis={() => handleNavigate('analyzer')} />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
        {/* Analyzer Section (Features 1 & 2 & 3 Input) */}
        <Analyzer
          jobRoles={JOB_ROLES}
          allSkills={ALL_PREDEFINED_SKILLS}
          selectedJobId={selectedJobId}
          selectedSkills={selectedSkills}
          validationError={validationError}
          onSelectJob={handleSelectJob}
          onToggleSkill={handleToggleSkill}
          onSelectAllSkills={handleSelectAllSkills}
          onClearAllSkills={handleClearAllSkills}
          onQuickPreset={handleQuickPreset}
          onAnalyze={handleAnalyze}
          onResetAll={handleClearAllSkills}
        />

        {/* Results Dashboard (Features 3 & 4) */}
        {analysis && currentJobRole ? (
          <Results
            analysis={analysis}
            jobRole={currentJobRole}
            progressMap={progressMap}
            onToggleLearned={handleToggleLearned}
            onEditSkills={() => handleNavigate('analyzer')}
            onSaveAnalysis={handleSaveCurrentAnalysis}
          />
        ) : (
          <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 shadow-2xs">
            <p className="text-slate-400 font-semibold text-sm">
              Select your target job and skills above to see your customized SkillGap report.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Reset Confirmation Modal (Feature 5) */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />

      {/* Saved Analyses Modal */}
      <SavedAnalysesModal
        isOpen={isSavedModalOpen}
        savedList={savedAnalyses}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadRecord={handleLoadSavedRecord}
        onDeleteRecord={handleDeleteSavedRecord}
        onClearAll={handleClearAllSavedRecords}
      />
    </div>
  );
}

