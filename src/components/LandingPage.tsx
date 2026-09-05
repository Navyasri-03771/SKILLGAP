import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Target,
  BarChart3,
  BookOpen,
  Check,
  ShieldCheck,
  Zap,
  Code2,
  Database,
  Cpu,
  ChevronRight,
  Users,
  Compass,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';
import { JOB_ROLES } from '../data/jobRoles';

interface LandingPageProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onQuickDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenRegister,
  onOpenLogin,
  onQuickDemo,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Target,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: '5 Calibrated Job Profiles',
      description:
        'Target Frontend, Backend, Fullstack, Data Analyst, or DevOps roles based on real entry-level industry hiring benchmarks.',
    },
    {
      icon: BarChart3,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: '100% Deterministic Readiness Score',
      description:
        'Accurate mathematical readiness percentage calculated from your exact matches against role requirements without random guessing.',
    },
    {
      icon: Layers,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      title: 'Prioritized Gap Categorization',
      description:
        'Instantly view what skills are HIGH priority (non-negotiable fundamentals) versus MEDIUM priority (competitive resume boosters).',
    },
    {
      icon: BookOpen,
      color: 'bg-violet-50 text-violet-600 border-violet-200',
      title: 'Interactive "What to Learn Next"',
      description:
        'An organized curriculum roadmap that lets you check off completed topics and dynamically recalculates your progress as you learn.',
    },
    {
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'Personal Analysis Library',
      description:
        'Save snapshots of multiple roles, compare your readiness across different tech domains, and export reports directly to JSON.',
    },
    {
      icon: Zap,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      title: 'Zero Fluff, Zero Spam',
      description:
        'Designed specifically for engineering students and self-taught career switchers who need clarity on where to invest their time.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Choose Target Role',
      desc: 'Pick from 5 industry-standard job benchmarks calibrated for entry-level positions.',
      icon: Target,
    },
    {
      step: '02',
      title: 'Select Current Skills',
      desc: 'Quickly tag what technologies, languages, and tools you already know from our 35+ skill catalog.',
      icon: Code2,
    },
    {
      step: '03',
      title: 'Get Gap Report & Roadmap',
      desc: 'Instantly view your readiness score, see missing requirements, and follow a prioritized curriculum.',
      icon: BarChart3,
    },
  ];

  const faqs = [
    {
      q: 'How does SkillGap calculate my readiness score?',
      a: 'The readiness percentage is calculated deterministically: (Matching Skills ÷ Total Required Skills for Role) × 100%. We do not use probabilistic or hallucinated models; your score represents pure mathematical alignment with our entry-level job benchmarks.',
    },
    {
      q: 'What roles are currently benchmarked?',
      a: 'SkillGap currently benchmarks 5 core tech tracks: Frontend Engineer, Backend Developer, Fullstack Engineer, Data Analyst, and DevOps Engineer. Each contains 5 to 8 carefully chosen high- and medium-priority skills.',
    },
    {
      q: 'Can I save my analyses and track progress over time?',
      a: 'Yes! Once registered or logged in, you can save as many analysis snapshots as you want to your personal browser library, toggle learned skills, and reload previous reports anytime.',
    },
    {
      q: 'Is this platform free for students?',
      a: '100% free. Our mission is to help engineering graduates and career switchers close the employability gap without paywalls.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-indigo-200/30 via-violet-200/30 to-blue-200/30 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-bold shadow-xs mb-6"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Empowering Engineering Students & Career Switchers</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
          >
            Know Exactly What Skills You Need For Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
              Dream Tech Job.
            </span>
          </motion.h1>

          {/* Subtitle / Matter About Application */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Stop guessing what recruiters want. SkillGap provides a clean, deterministic
            employability analysis. Pick your target role, input your existing toolkit, and get an
            immediate readiness score with a prioritized <strong>"What to Learn Next"</strong>{' '}
            action plan.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <button
              type="button"
              onClick={onOpenRegister}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
              id="hero-register-btn"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200/90 shadow-2xs active:scale-95 transition-all cursor-pointer"
              id="hero-login-btn"
            >
              <span>Sign In to Analyzer</span>
            </button>

            <button
              type="button"
              onClick={onQuickDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-bold text-sm border border-indigo-200/70 active:scale-95 transition-all cursor-pointer"
              id="hero-quick-demo-btn"
              title="Test the full application immediately"
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>1-Click Demo Login</span>
            </button>
          </motion.div>

          {/* Guarantee Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              5 Industry Benchmarks
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Deterministic Math
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Free & Browser Persistent
            </span>
          </div>

          {/* Interactive Preview Mock Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-left"
          >
            <div className="bg-slate-900 px-5 py-3.5 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-400 font-mono text-[11px]">
                  live-preview: skill-gap-analysis.tsx
                </span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/30">
                Sample Report
              </span>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Selected Target Role
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">Frontend Engineer</h3>
                  <p className="text-xs text-slate-500">
                    5 of 8 benchmark competencies acquired
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 block">
                      Readiness Score
                    </span>
                    <span className="text-2xl font-black text-indigo-700">63%</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                    Promising
                  </span>
                </div>
              </div>

              {/* Mini tags comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Skills In Toolkit (5)
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-slate-700">
                      HTML/CSS
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-slate-700">
                      JavaScript
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-slate-700">
                      React
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-slate-700">
                      Git & GitHub
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-slate-700">
                      Tailwind CSS
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
                  <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-2">
                    <Target className="w-4 h-4 text-rose-600" />
                    Missing Gaps to Address (3)
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-rose-700 font-semibold">
                      TypeScript (HIGH)
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-rose-700 font-semibold">
                      REST APIs (HIGH)
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-700">
                      Testing / Jest (MED)
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to action inside preview */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Sign up to analyze your own custom skillset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Matter About Application Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              The Mission
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
              Why We Built SkillGap
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Every year, thousands of engineering students and self-learners finish degrees or
              bootcamps only to feel lost when reading junior job descriptions. Job postings are
              often cluttered with unrealistic wish-lists, while online roadmaps are endless and
              unprioritized.
            </p>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              SkillGap replaces the ambiguity with mathematical clarity. By distilling real junior
              role benchmarks into clean, prioritized requirements, we show you exactly where your
              readiness stands today and give you a focused, high-ROI learning checklist to reach
              hireable status.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-indigo-400">0%</span>
                <p className="text-xs text-slate-400 mt-1">Guesswork or AI Hallucinations</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-indigo-400">5 Tracks</span>
                <p className="text-xs text-slate-400 mt-1">Fullstack, Frontend, Backend & more</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-indigo-400">1 Click</span>
                <p className="text-xs text-slate-400 mt-1">Immediate progress tracking & saving</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid (Matter & Features represent) */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Core Features Built For Your Career Growth
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Everything you need to evaluate, plan, and execute your transition into tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${feat.color} border flex items-center justify-center mb-4 shadow-2xs`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works 3-Step Walkthrough */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-indigo-50/50 to-white rounded-3xl border border-indigo-100 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              From Uncertainty to a Clear Tech Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative"
                >
                  <span className="text-3xl font-black text-indigo-100 absolute top-4 right-4">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benchmarked Roles Showcase */}
      <section id="roles" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Role Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Curated Industry Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Each role tracks core competencies vetted against junior job specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {JOB_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900">{role.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {role.skills.length} Skills
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{role.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {role.skills.slice(0, 4).map((s) => (
                    <span
                      key={s.name}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                    >
                      {s.name}
                    </span>
                  ))}
                  {role.skills.length > 4 && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 font-bold">
                      +{role.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenLogin}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-between cursor-pointer"
              >
                <span>Analyze this role</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`text-indigo-600 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Find Your Real Tech Readiness?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Join other ambitious developers and students who use SkillGap to benchmark their skills,
            bridge gaps, and prepare for interviews.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-indigo-700 font-bold rounded-xl text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Create Free Account
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-500/30 hover:bg-indigo-500/50 text-white font-bold rounded-xl text-sm border border-white/20 active:scale-95 transition-all cursor-pointer"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
