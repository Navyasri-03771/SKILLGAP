import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Analyzer } from './components/Analyzer';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SavedAnalysesModal } from './components/SavedAnalysesModal';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
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
import {
  getCurrentUser,
  logoutUser,
  loginDemoUser,
} from './utils/authStorage';
import {
  SkillGapAnalysis,
  LearningProgressMap,
  SavedAnalysisRecord,
  UserProfile,
  AuthModalMode,
  ActiveAppView,
} from './types';
import {
  CheckCircle2,
  AlertCircle,
  X,
  BookmarkCheck,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function App() {
  // Auth & View State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeView, setActiveView] = useState<ActiveAppView>('home');
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);

  // Application Analyzer State
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

  // Load user data (scoped by account ID to ensure complete account separation)
  const loadUserData = (user: UserProfile | null) => {
    const userId = user?.id;
    const records = getSavedAnalyses(userId);
    setSavedAnalyses(records);

    const { data: savedAnalysis, corrupted } = loadAnalysisFromStorage(userId);
    const savedProgress = loadProgressFromStorage(userId);
    setProgressMap(savedProgress);

    if (savedAnalysis) {
      setAnalysis(savedAnalysis);
      setSelectedJobId(savedAnalysis.selectedJobId);
      setSelectedSkills(savedAnalysis.selectedSkills);
    } else {
      setAnalysis(null);
      setSelectedSkills([]);
      if (user?.targetRole) {
        const matched = JOB_ROLES.find(
          (r) => r.name.toLowerCase() === user.targetRole?.toLowerCase()
        );
        setSelectedJobId(matched ? matched.id : '');
      } else {
        setSelectedJobId('');
      }
    }

    if (corrupted) {
      setRestoreNotification({
        message: 'Saved analysis could not be restored. Starting a new analysis.',
        type: 'warning',
      });
    }
  };

  // On mount: check auth session & load user-specific saved analyses
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setActiveView('app'); // If already logged in, take straight to application
      loadUserData(user);
    } else {
      setActiveView('home'); // If not logged in, show first home page
      loadUserData(null);
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

  // Auth Handlers
  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveView('app'); // Transition into Skill Analyzer
    setAuthModalMode(null);
    setSaveToast(`Welcome, ${user.name}! Your Skill Analyzer is ready.`);

    // Load the specific user's saved records and analysis
    loadUserData(user);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setActiveView('home');
    setSaveToast('You have been signed out.');

    // Clear state completely to prevent cross-account display
    setSelectedJobId('');
    setSelectedSkills([]);
    setAnalysis(null);
    setProgressMap({});
    setSavedAnalyses([]);
    setValidationError(null);
  };

  const handleQuickDemo = () => {
    const demo = loginDemoUser();
    handleAuthSuccess(demo);
  };

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

  // Quick preset helper
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

    // Persist in LocalStorage specifically for this user account
    saveAnalysisToStorage(newAnalysis, currentUser?.id);

    // Smoothly scroll to results
    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Save current analysis to library (tagged with currentUser.id)
  const handleSaveCurrentAnalysis = () => {
    if (!analysis) return;
    const currentJob = JOB_ROLES.find((r) => r.id === analysis.selectedJobId);
    if (!currentJob) return;

    const record: SavedAnalysisRecord = {
      id: `record-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      savedAt: new Date().toISOString(),
      selectedJobId: currentJob.id,
      roleName: currentJob.name,
      title: `${currentJob.name} Analysis (${analysis.readinessPercentage}% Readiness)`,
      analysis,
      progressMap,
    };

    const updated = saveAnalysisRecord(record, currentUser?.id);
    setSavedAnalyses(updated);
    setSaveToast(`Analysis saved to ${currentUser ? currentUser.name + "'s account" : 'your library'}!`);
  };

  // Load a saved record
  const handleLoadSavedRecord = (record: SavedAnalysisRecord) => {
    setAnalysis(record.analysis);
    setSelectedJobId(record.selectedJobId);
    setSelectedSkills(record.analysis.selectedSkills);
    setProgressMap(record.progressMap || {});

    // Save as active analysis for this user
    saveAnalysisToStorage(record.analysis, currentUser?.id);
    saveProgressToStorage(record.progressMap || {}, currentUser?.id);

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
    const updated = deleteSavedAnalysis(id, currentUser?.id);
    setSavedAnalyses(updated);
  };

  // Clear all saved records for this account
  const handleClearAllSavedRecords = () => {
    clearAllSavedAnalyses(currentUser?.id);
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
    saveProgressToStorage(updatedProgressMap, currentUser?.id);
  };

  // Feature 5: Reset Analysis workflow
  const handleConfirmReset = () => {
    clearSkillGapStorage(currentUser?.id);

    setSelectedJobId('');
    setSelectedSkills([]);
    setAnalysis(null);
    setProgressMap({});
    setValidationError(null);
    setIsResetModalOpen(false);
    setRestoreNotification(null);

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
      {/* Header with Login & Register buttons */}
      <Header
        user={currentUser}
        activeView={activeView}
        hasAnalysis={Boolean(analysis)}
        readinessPercentage={analysis?.readinessPercentage}
        selectedRoleName={currentJobRole?.name}
        savedCount={savedAnalyses.length}
        onSelectView={(view) => setActiveView(view)}
        onOpenLogin={() => setAuthModalMode('login')}
        onOpenRegister={() => setAuthModalMode('register')}
        onQuickDemo={handleQuickDemo}
        onLogout={handleLogout}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenReset={() => setIsResetModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Restored or Corrupted Notification Banner */}
      {restoreNotification && activeView === 'app' && (
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
            {activeView === 'app' && (
              <button
                type="button"
                onClick={() => setIsSavedModalOpen(true)}
                className="ml-2 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Open Library
              </button>
            )}
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

      {/* MAIN VIEW CONTENT: Home vs Application */}
      {activeView === 'home' ? (
        /* FIRST HOME PAGE: Contains matter about application and features represent */
        <div>
          {/* If user is logged in, show top quick-access banner to jump to application */}
          {currentUser && (
            <div className="bg-indigo-50 border-b border-indigo-200/80 py-2.5 px-4">
              <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
                <span className="text-indigo-900 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Logged in as <strong>{currentUser.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveView('app')}
                  className="font-bold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to Skill Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <LandingPage
            onOpenRegister={() => setAuthModalMode('register')}
            onOpenLogin={() => setAuthModalMode('login')}
            onQuickDemo={handleQuickDemo}
          />
        </div>
      ) : (
        /* MY APPLICATION VIEW: Opened after login ("then after login open my application all this") */
        <div>
          {/* User Welcome Bar */}
          <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black shadow-sm text-sm">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-slate-900">
                      Welcome, {currentUser?.name || 'Developer'}!
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Active Session
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Target Track: <span className="font-semibold text-indigo-600">{currentUser?.targetRole || 'Software Engineering'}</span> • Analyze your skills below to track your readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSavedModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Saved Analyses ({savedAnalyses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('home')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  View About & Features
                </button>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <Hero onStartAnalysis={() => handleNavigate('analyzer')} />

          {/* Main Application Container */}
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
        </div>
      )}

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
        user={currentUser}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadRecord={handleLoadSavedRecord}
        onDeleteRecord={handleDeleteSavedRecord}
        onClearAll={handleClearAllSavedRecords}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        mode={authModalMode}
        onClose={() => setAuthModalMode(null)}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthModalMode(mode)}
      />
    </div>
  );
}


