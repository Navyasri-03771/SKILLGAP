import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  Lock,
  User,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Zap,
} from 'lucide-react';
import { UserProfile, AuthModalMode } from '../types';
import { loginUser, registerUser, loginDemoUser, checkAccountExists } from '../utils/authStorage';
import { JOB_ROLES } from '../data/jobRoles';

interface AuthModalProps {
  mode: AuthModalMode;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  onClose,
  onSuccess,
  onSwitchMode,
}) => {
  const isLogin = mode === 'login';

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetRole, setTargetRole] = useState(JOB_ROLES[0]?.name || 'Frontend Engineer');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountExistsNotice, setAccountExistsNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!mode) return null;

  // Real-time check if an account already exists while typing in the registration form
  const existingCheck = !isLogin ? checkAccountExists(email, name) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const res = loginUser(email, password);
        setIsLoading(false);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Invalid credentials.');
        }
      } else {
        // Register validation
        if (password !== confirmPassword) {
          setIsLoading(false);
          setError('Passwords do not match.');
          return;
        }
        if (!agreeTerms) {
          setIsLoading(false);
          setError('Please accept the terms to continue.');
          return;
        }

        const res = registerUser(name, email, password, targetRole);
        setIsLoading(false);

        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else if (res.alreadyExists && res.existingUser) {
          // User already created this account! Automatically show the login form
          setEmail(res.existingUser.email);
          setPassword('');
          setConfirmPassword('');
          setError(null);
          setAccountExistsNotice(
            `You already created an account with ${res.existingUser.email}! Please enter your password to log in.`
          );
          onSwitchMode('login');
        } else {
          setError(res.error || 'Failed to register account.');
        }
      }
    }, 250);
  };

  const handle1ClickDemo = () => {
    setError(null);
    setAccountExistsNotice(null);
    setIsLoading(true);
    setTimeout(() => {
      const demo = loginDemoUser();
      setIsLoading(false);
      onSuccess(demo);
      onClose();
    }, 200);
  };

  const handleFillDemoValues = () => {
    if (isLogin) {
      setEmail('demo@skillgap.io');
      setPassword('password123');
    } else {
      setName('Alex Rivera');
      setEmail('alex.rivera@example.com');
      setPassword('securePass123');
      setConfirmPassword('securePass123');
      setTargetRole('Fullstack Engineer');
    }
    setError(null);
    setAccountExistsNotice(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 my-8"
        id="auth-dialog"
      >
        {/* Header Ribbon / Tabs */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-6 sm:p-7 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              SkillGap Platform
            </span>
          </div>

          <h2 id="auth-modal-title" className="text-2xl font-extrabold tracking-tight text-white">
            {isLogin ? 'Sign In to SkillGap' : 'Create Free Account'}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 leading-relaxed">
            {isLogin
              ? 'Access your personalized skill gap analyzer, save reports, and track your progress.'
              : 'Start analyzing your skills against real industry benchmarks in under 60 seconds.'}
          </p>

          {/* Quick Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-black/20 rounded-xl mt-5 text-xs font-bold text-center">
            <button
              type="button"
              onClick={() => {
                setError(null);
                onSwitchMode('login');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                isLogin
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setAccountExistsNotice(null);
                onSwitchMode('register');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Account Exists Redirect Notice */}
          {accountExistsNotice && isLogin && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="p-3.5 bg-amber-50 border border-amber-300/80 rounded-2xl flex items-start gap-3 text-amber-950 text-xs shadow-xs"
              id="account-already-exists-notice"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-amber-950 text-sm">Account Already Exists</p>
                <p className="mt-0.5 text-amber-800 leading-relaxed font-medium">
                  {accountExistsNotice}
                </p>
              </div>
            </motion.div>
          )}

          {/* Quick 1-Click Demo Shortcut */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Want to test instantly?</p>
                <p className="text-[11px] text-slate-500">Skip registration with 1-click demo</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handle1ClickDemo}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
              id="btn-auth-demo-login"
            >
              <span>Demo Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="e.g. Alex Chen"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Target Role Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Tech Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                    >
                      {JOB_ROLES.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Inline helper if email is already registered during registration */}
              {existingCheck?.exists && !isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-2 text-xs text-amber-900"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="truncate">
                      Account already exists for <strong>{existingCheck.user?.email}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(existingCheck.user?.email || email);
                      setError(null);
                      setAccountExistsNotice(
                        `You already created an account for ${existingCheck.user?.email}! Please enter your password to sign in.`
                      );
                      onSwitchMode('login');
                    }}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] shrink-0 transition-colors cursor-pointer shadow-2xs"
                  >
                    Log In
                  </button>
                </motion.div>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleFillDemoValues}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Auto-fill demo credentials
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Terms checkbox for register */}
            {!isLogin && (
              <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span>
                  I agree to save my skill profile and access the interactive gap analyzer dashboard.
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              id="auth-submit-btn"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isLogin ? (
                <>
                  <span>Sign In & Open Analyzer</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Create Account & Open Analyzer</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer toggle */}
          <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
            {isLogin ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    onSwitchMode('register');
                  }}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Register now for free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    onSwitchMode('login');
                  }}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
