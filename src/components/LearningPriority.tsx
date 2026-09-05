import React from 'react';
import { JobSkill, LearningProgressMap, SkillPriority } from '../types';
import { CheckCircle2, RotateCcw, Sparkles, Trophy, BookOpen, ExternalLink, Check } from 'lucide-react';

interface LearningPriorityProps {
  missingSkills: JobSkill[];
  progressMap: LearningProgressMap;
  onToggleLearned: (skillName: string) => void;
}

export const LearningPriority: React.FC<LearningPriorityProps> = ({
  missingSkills,
  progressMap,
  onToggleLearned,
}) => {
  if (missingSkills.length === 0) {
    return (
      <div
        className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border-2 border-emerald-200/80 rounded-3xl p-8 text-center text-emerald-950 shadow-sm"
        id="all-skills-matched-banner"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
          <Trophy className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-black tracking-tight">
          Great! You matched all sample skills for this role.
        </h4>
        <p className="text-sm text-emerald-800 mt-2 max-w-lg mx-auto font-medium">
          No skill gaps found in this sample role. You possess 100% of the foundational requirements for this benchmark!
        </p>
      </div>
    );
  }

  // Calculate overall learning checklist progress
  const learnedCount = missingSkills.filter((s) => progressMap[s.name] === 100).length;
  const learningPercentage = Math.round((learnedCount / missingSkills.length) * 100);

  const getPriorityBadge = (priority: SkillPriority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            HIGH PRIORITY
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            MEDIUM PRIORITY
          </span>
        );
      case 'LOW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            LOW PRIORITY
          </span>
        );
    }
  };

  return (
    <div className="space-y-5" id="learning-priority-section">
      {/* Header with Learning Tracker Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>WHAT TO LEARN NEXT</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Missing skills sorted by industry impact. Click &ldquo;Mark as Learned&rdquo; as you acquire them.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700">
              Gap Mastery: {learnedCount} of {missingSkills.length}
            </span>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
              {learningPercentage}%
            </span>
          </div>
        </div>

        {/* Dynamic Progress Fill */}
        <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${learningPercentage}%` }}
          />
        </div>
      </div>

      {/* Grid of Missing Skills with Interactive Progress Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missingSkills.map((skill) => {
          const progress = progressMap[skill.name] || 0;
          const isLearned = progress === 100;

          return (
            <div
              key={skill.name}
              className={`p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                isLearned
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs'
              }`}
              id={`learning-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {getPriorityBadge(skill.priority)}
                  {isLearned ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" /> Mastered
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">
                      Pending
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-slate-900">
                  {skill.name}
                </h4>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar & Dynamic Action Button */}
              <div className="mt-5 pt-3.5 border-t border-slate-100">
                <div className="w-full bg-slate-100 rounded-full h-2 mb-3.5 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isLearned ? 'bg-emerald-500 w-full' : 'bg-slate-200 w-0'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onToggleLearned(skill.name)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                    isLearned
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/20'
                  }`}
                  id={`btn-toggle-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {isLearned ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Revert to In Progress</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Mark as Learned</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

