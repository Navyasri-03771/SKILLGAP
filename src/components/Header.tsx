import React from 'react';
import {
  Target,
  Sliders,
  BarChart3,
  RefreshCw,
  Bookmark,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Sparkles,
  LayoutDashboard,
  Home,
  Zap,
} from 'lucide-react';
import { UserProfile, ActiveAppView } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  activeView: ActiveAppView;
  hasAnalysis: boolean;
  readinessPercentage?: number;
  selectedRoleName?: string;
  savedCount?: number;
  onSelectView: (view: ActiveAppView) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onQuickDemo: () => void;
  onLogout: () => void;
  onOpenSaved?: () => void;
  onOpenReset: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeView,
  hasAnalysis,
  readinessPercentage,
  selectedRoleName,
  savedCount = 0,
  onSelectView,
  onOpenLogin,
  onOpenRegister,
  onQuickDemo,
  onLogout,
  onOpenSaved,
  onOpenReset,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectView('home')}
            className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-hidden"
            id="brand-logo-btn"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/35 transition-all duration-200 ring-2 ring-indigo-500/20">
                <Target className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                title="Active Platform"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  SkillGap
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Know your gap. Learn what matters.
              </p>
            </div>
          </button>
        </div>

        {/* Center / Navigation Bar */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Home / About Tab */}
          <button
            type="button"
            onClick={() => onSelectView('home')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'home'
                ? 'text-indigo-700 bg-indigo-50/90 font-bold border border-indigo-200/70'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70'
            }`}
            id="nav-home-btn"
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Home / About</span>
          </button>

          {/* If Logged In: "Skill Analyzer" Button */}
          {user ? (
            <button
              type="button"
              onClick={() => onSelectView('app')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeView === 'app'
                  ? 'text-indigo-700 bg-indigo-50/90 font-bold border border-indigo-200/70 shadow-xs'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70'
              }`}
              id="nav-app-btn"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              <span>Skill Analyzer</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Session" />
            </button>
          ) : (
            /* If Not Logged In: Features anchor */
            <button
              type="button"
              onClick={() => {
                onSelectView('home');
                setTimeout(() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Features</span>
            </button>
          )}

          {/* Analyzer Section quick-nav if in app */}
          {user && activeView === 'app' && (
            <>
              {hasAnalysis && (
                <button
                  type="button"
                  onClick={() => onNavigate('results')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 active:scale-95 border border-indigo-200/70 transition-all cursor-pointer"
                  id="nav-results-btn"
                >
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span className="hidden md:inline">Results</span>
                  {readinessPercentage !== undefined && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                      {readinessPercentage}%
                    </span>
                  )}
                </button>
              )}

              {onOpenSaved && (
                <button
                  type="button"
                  onClick={onOpenSaved}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 active:scale-95 transition-all cursor-pointer"
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
                  type="button"
                  onClick={onOpenReset}
                  className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 active:scale-95 transition-all cursor-pointer"
                  id="header-reset-btn"
                  title="Reset active analysis"
                >
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 ease-out" />
                  <span className="hidden md:inline">Reset</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Right Auth Area */}
        <div className="flex items-center gap-2">
          {user ? (
            /* Logged In User Pill & Logout */
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-2xl"
                title={`Signed in as ${user.email}`}
              >
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[110px]">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {user.targetRole || 'Developer'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                id="btn-logout"
                title="Sign out of your account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            /* Logged Out: Register and Login Buttons */
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-all cursor-pointer"
                id="nav-login-btn"
              >
                <LogIn className="w-4 h-4 text-slate-500" />
                <span>Log In</span>
              </button>

              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                id="nav-register-btn"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>

              <button
                type="button"
                onClick={onQuickDemo}
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer"
                title="Instant 1-Click Demo Login"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Demo</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};



