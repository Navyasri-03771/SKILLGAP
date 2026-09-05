import React, { useState } from 'react';
import { JobRole } from '../types';
import { JobSelector } from './JobSelector';
import { SkillSelector } from './SkillSelector';
import { ArrowDown, CheckCircle2, Sparkles, AlertCircle, RefreshCw, Loader2, ArrowRight } from 'lucide-react';

interface AnalyzerProps {
  jobRoles: JobRole[];
  allSkills: string[];
  selectedJobId: string;
  selectedSkills: string[];
  validationError: string | null;
  onSelectJob: (jobId: string) => void;
  onToggleSkill: (skill: string) => void;
  onSelectAllSkills: () => void;
  onClearAllSkills: () => void;
  onQuickPreset: (skills: string[]) => void;
  onAnalyze: () => void;
  onResetAll?: () => void;
}

export const Analyzer: React.FC<AnalyzerProps> = ({
  jobRoles,
  allSkills,
  selectedJobId,
  selectedSkills,
  validationError,
  onSelectJob,
  onToggleSkill,
  onSelectAllSkills,
  onClearAllSkills,
  onQuickPreset,
  onAnalyze,
  onResetAll,
}) => {
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAnalyzeClick = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      onAnalyze();
    }, 280);
  };

  const hasJob = Boolean(selectedJobId);
  const hasSkills = selectedSkills.length > 0;
  const isReady = hasJob && hasSkills;

  return (
    <section id="analyzer" className="scroll-mt-24 space-y-8">
      {/* Header & 3-Step Process Indicator */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-indigo-700 uppercase bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Interactive Evaluation
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5">
          Find Your SkillGap
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Follow these three simple steps to measure your match against industry standards.
        </p>

        {/* Dynamic Visual Step Indicator */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 text-left">
          <div
            className={`p-3.5 rounded-2xl border transition-all duration-200 ${
              hasJob
                ? 'bg-indigo-50/70 border-indigo-300 shadow-xs'
                : 'bg-white border-slate-200/80 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${hasJob ? 'text-indigo-600' : 'text-slate-400'}`}>
                Step 1
              </span>
              {hasJob && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 animate-in zoom-in-50 duration-150" />}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
              Target Job
            </span>
          </div>

          <div
            className={`p-3.5 rounded-2xl border transition-all duration-200 ${
              hasSkills
                ? 'bg-indigo-50/70 border-indigo-300 shadow-xs'
                : 'bg-white border-slate-200/80 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${hasSkills ? 'text-indigo-600' : 'text-slate-400'}`}>
                Step 2
              </span>
              {hasSkills && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-600 text-white">
                  {selectedSkills.length}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
              Your Skills
            </span>
          </div>

          <div
            className={`p-3.5 rounded-2xl border transition-all duration-200 ${
              isReady
                ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-200/80 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isReady ? 'text-emerald-700' : 'text-slate-400'}`}>
                Step 3
              </span>
              {isReady && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
              Analyze Gap
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8">
        {/* Step 1: Target Job Selection */}
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs tracking-wide">
            <span>1. CHOOSE YOUR TARGET JOB</span>
          </div>
          <JobSelector
            jobRoles={jobRoles}
            selectedJobId={selectedJobId}
            selectedSkills={selectedSkills}
            onSelectJob={onSelectJob}
          />
        </div>

        <hr className="border-slate-100" />

        {/* Step 2: Current Skills Selection */}
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs tracking-wide">
            <span>2. WHAT SKILLS DO YOU ALREADY KNOW?</span>
          </div>
          <SkillSelector
            allSkills={allSkills}
            selectedSkills={selectedSkills}
            onToggleSkill={onToggleSkill}
            onSelectAll={onSelectAllSkills}
            onClearAll={onClearAllSkills}
            onQuickPreset={onQuickPreset}
          />
        </div>

        {/* Validation Error Notice */}
        {validationError && (
          <div
            className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 shadow-2xs animate-bounce-short"
            id="analyzer-validation-error"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{validationError}</p>
              <p className="text-xs text-rose-600 mt-0.5">Please make sure to select a target job role and at least one skill.</p>
            </div>
          </div>
        )}

        {/* Step 3: Analyze Button & Micro-Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {!selectedJobId ? (
              <span className="font-medium text-slate-500">
                Step 1: Select a target job role from the cards above.
              </span>
            ) : selectedSkills.length === 0 ? (
              <span className="font-medium text-amber-600">
                Step 2: Click the skill chips you currently know.
              </span>
            ) : (
              <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ready to benchmark against industry standards!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onResetAll && (hasJob || hasSkills) && (
              <button
                type="button"
                onClick={onResetAll}
                className="px-4 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                title="Reset input fields"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleAnalyzeClick}
              disabled={isCalculating}
              className="relative flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2.5 disabled:opacity-80"
              id="analyze-skill-gap-btn"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Calculating Match...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-indigo-200 animate-pulse" />
                  <span>Analyze My Skill Gap</span>
                  <ArrowRight className="w-4 h-4 text-indigo-200" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

