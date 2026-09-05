import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JobRole, SkillGapAnalysis, LearningProgressMap } from '../types';
import { ReadinessScore } from './ReadinessScore';
import { LearningPriority } from './LearningPriority';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  SlidersHorizontal,
  Share2,
  Check,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';

interface ResultsProps {
  analysis: SkillGapAnalysis;
  jobRole: JobRole;
  progressMap: LearningProgressMap;
  onToggleLearned: (skillName: string) => void;
  onEditSkills?: () => void;
  onSaveAnalysis?: () => void;
  isSaved?: boolean;
}

export const Results: React.FC<ResultsProps> = ({
  analysis,
  jobRole,
  progressMap,
  onToggleLearned,
  onEditSkills,
  onSaveAnalysis,
  isSaved = false,
}) => {
  const { matchingSkills, missingSkills, readinessPercentage } = analysis;
  const [copiedAll, setCopiedAll] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleCopyFullReport = () => {
    const report = [
      `=== SkillGap Analysis Report ===`,
      `Target Role: ${jobRole.name}`,
      `Readiness Score: ${readinessPercentage}%`,
      `Matched Skills (${matchingSkills.length}): ${matchingSkills.join(', ') || 'None'}`,
      `Missing Skills (${missingSkills.length}): ${missingSkills.map((s) => `${s.name} [${s.priority}]`).join(', ') || 'None'}`,
      `Generated with SkillGap (Team 9)`,
    ].join('\n');

    navigator.clipboard.writeText(report);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSaveClick = () => {
    if (onSaveAnalysis) {
      onSaveAnalysis();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    }
  };

  return (
    <motion.section
      id="results"
      className="space-y-8 scroll-mt-24"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Section Header */}
      <div className="border-b border-slate-200/80 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-indigo-700 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            Analysis Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            Your SkillGap Report
          </h2>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Save Analysis Button */}
          {onSaveAnalysis && (
            <button
              type="button"
              onClick={handleSaveClick}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer ${
                justSaved || isSaved
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
              }`}
              id="btn-save-analysis"
              title="Save this analysis to your browser collection"
            >
              {justSaved || isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-emerald-100" />
                  <span>{justSaved ? 'Saved to Library!' : 'Analysis Saved'}</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save Analysis</span>
                </>
              )}
            </button>
          )}

          {onEditSkills && (
            <button
              type="button"
              onClick={onEditSkills}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
              title="Adjust your skills or select a different role"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Edit My Skills</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyFullReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            title="Copy entire breakdown report"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                <span className="text-emerald-300">Report Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Full Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Readiness Score Card */}
      <ReadinessScore
        percentage={readinessPercentage}
        matchingCount={matchingSkills.length}
        totalRequired={jobRole.skills.length}
        jobTitle={jobRole.name}
      />

      {/* 2-Column Comparison: Skills You Have vs Skills You're Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKILLS YOU HAVE */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between"
          id="skills-you-have-card"
        >
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>SKILLS YOU HAVE</span>
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {matchingSkills.length} of {jobRole.skills.length}
              </span>
            </div>

            {matchingSkills.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <p className="text-sm font-medium">
                  None of your currently selected skills match this role yet.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Click &ldquo;Edit My Skills&rdquo; above if you forgot to mark any skills.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {matchingSkills.map((skill, idx) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-sm font-semibold text-slate-800 hover:bg-emerald-50 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-200/70 text-emerald-800 flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-5 pt-3.5 border-t border-slate-100 font-medium">
            These skills strengthen your eligibility for entry-level opportunities in this role.
          </p>
        </motion.div>

        {/* SKILLS YOU'RE MISSING */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between"
          id="skills-youre-missing-card"
        >
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Circle className="w-4 h-4 stroke-[3]" />
                </div>
                <span>SKILLS YOU'RE MISSING</span>
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {missingSkills.length} remaining
              </span>
            </div>

            {missingSkills.length === 0 ? (
              <div className="py-8 text-center text-emerald-800">
                <p className="text-sm font-bold">
                  Great! You matched all sample skills for this role.
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  No skill gaps found in this sample role.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {missingSkills.map((skill, idx) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-sm font-semibold text-slate-800 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>{skill.name}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        skill.priority === 'HIGH'
                          ? 'bg-rose-100 text-rose-700'
                          : skill.priority === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      {skill.priority}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-5 pt-3.5 border-t border-slate-100 font-medium">
            Address these gaps systematically to reach target job readiness.
          </p>
        </motion.div>
      </div>

      {/* WHAT TO LEARN NEXT Section */}
      <div className="pt-2">
        <LearningPriority
          missingSkills={missingSkills}
          progressMap={progressMap}
          onToggleLearned={onToggleLearned}
        />
      </div>
    </motion.section>
  );
};


