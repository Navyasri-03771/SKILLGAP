import React from 'react';
import { Target, Sliders, BarChart3, RefreshCw, Bookmark } from 'lucide-react';

interface HeaderProps {
  hasAnalysis: boolean;
  readinessPercentage?: number;
  selectedRoleName?: string;
  savedCount?: number;
  onOpenSaved?: () => void;
  onOpenReset: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  hasAnalysis,
  readinessPercentage,
  selectedRoleName,
  savedCount = 0,
  onOpenSaved,
  onOpenReset,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Team Identity */}
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-hidden"
            id="brand-logo-btn"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/35 transition-all duration-200 ring-2 ring-indigo-500/20">
                <Target className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="MVP Live" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  SkillGap
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  Team 9
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Know your gap. Learn what matters. Get job-ready.
              </p>
            </div>
          </button>
        </div>

        {/* Dynamic Status & Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dynamic Active Role Pill (if analyzed) */}
          {hasAnalysis && selectedRoleName && (
            <div
              onClick={() => onNavigate('results')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Click to view results"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{selectedRoleName}</span>
              {readinessPercentage !== undefined && (
                <span className="bg-indigo-600 text-white px-2 py-0.2 rounded-full text-[10px] font-bold">
                  {readinessPercentage}% Match
                </span>
              )}
            </div>
          )}

          {/* Navigation links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => onNavigate('analyzer')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 active:scale-95 transition-all cursor-pointer"
              id="nav-analyzer-btn"
            >
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Analyzer</span>
            </button>

            {hasAnalysis && (
              <button
                onClick={() => onNavigate('results')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 active:scale-95 border border-indigo-200/70 transition-all cursor-pointer"
                id="nav-results-btn"
              >
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Results</span>
                {readinessPercentage !== undefined && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                    {readinessPercentage}%
                  </span>
                )}
              </button>
            )}

            {/* Saved Analyses Trigger Button */}
            {onOpenSaved && (
              <button
                onClick={onOpenSaved}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 active:scale-95 transition-all cursor-pointer"
                id="header-saved-btn"
                title="View saved analyses"
              >
                <Bookmark className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Saved</span>
                {savedCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                    {savedCount}
                  </span>
                )}
              </button>
            )}

            {hasAnalysis && (
              <button
                onClick={onOpenReset}
                className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 active:scale-95 transition-all cursor-pointer"
                id="header-reset-btn"
                title="Reset current analysis"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 ease-out" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};


