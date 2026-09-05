import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Layers, Sparkles, BookOpen, Briefcase, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  const steps = [
    { label: 'Current Skills', icon: Layers, desc: 'What you know', color: 'text-sky-600 bg-sky-50' },
    { label: 'Compare', icon: ChevronRight, desc: 'Industry benchmark', color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Skill Gap', icon: Sparkles, desc: 'Exact missing skills', color: 'text-amber-600 bg-amber-50' },
    { label: 'Learn', icon: BookOpen, desc: 'Prioritized roadmap', color: 'text-rose-600 bg-rose-50' },
    { label: 'Job-Ready', icon: Briefcase, desc: 'Targeted preparation', color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
      {/* Subtle decorative background circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-r from-indigo-200/20 via-violet-200/20 to-blue-200/20 blur-3xl -z-10 pointer-events-none rounded-full" />

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Project Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-bold mb-6 shadow-xs hover:border-indigo-300 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>Know your gap. Learn what matters. Get job-ready.</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]"
        >
          Know Exactly What Skills You Need for Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Dream Job.
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Select your target role, tell us what you already know, and discover the skills you should focus on next.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onStartAnalysis}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
            id="start-analysis-hero-btn"
          >
            <span className="relative z-10">Start Skill Analysis</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Value badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            5 Industry Benchmark Roles
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            23 Predefined Skills
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            100% Deterministic Math
          </span>
        </motion.div>

        {/* Visual Concept Flow Diagram */}
        <div className="mt-12 pt-8 border-t border-slate-200/70">
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-4">
            How SkillGap Works
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + idx * 0.07 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  className="group relative flex flex-col items-center p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 text-center cursor-default"
                >
                  <div className={`w-9 h-9 rounded-lg ${step.color} flex items-center justify-center mb-2 font-bold text-xs group-hover:scale-110 transition-transform duration-200 shadow-2xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {step.label}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {step.desc}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};


