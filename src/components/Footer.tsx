import React from 'react';
import { Target, Heart, GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-10 text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-8 border-b border-slate-100 text-center md:text-left">
          {/* Brand and Tagline */}
          <div className="max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">SkillGap</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                Team 9
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 mt-2">
              An educational employability tool for students.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              "Know your gap. Learn what matters. Get job-ready."
            </p>
          </div>

          {/* Academic Context / Value Proposition */}
          <div className="max-w-md text-center md:text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>College AI Vibe Coding Project • Team 9</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Designed for final-year Computer Science Engineering students to benchmark their current skill sets against target software roles.
            </p>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Skill requirements shown are sample data for educational purposes and may vary by company and job description.
            </span>
          </p>
          <p className="shrink-0 text-slate-400">
            &copy; {new Date().getFullYear()} SkillGap • Team 9
          </p>
        </div>
      </div>
    </footer>
  );
};
