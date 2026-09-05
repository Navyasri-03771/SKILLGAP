import React, { useState } from 'react';
import { getReadinessInterpretation } from '../utils/analyzer';
import { Info, Sparkles, Copy, Check, Award, Trophy, Target, Share2 } from 'lucide-react';

interface ReadinessScoreProps {
  percentage: number;
  matchingCount: number;
  totalRequired: number;
  jobTitle: string;
}

export const ReadinessScore: React.FC<ReadinessScoreProps> = ({
  percentage,
  matchingCount,
  totalRequired,
  jobTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const interpretation = getReadinessInterpretation(percentage);

  // Circular gauge math (radius = 54, circumference = 2 * PI * 54 ≈ 339.29)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine meter color based on percentage
  const getProgressColor = () => {
    if (percentage >= 90) return '#10b981'; // emerald-500
    if (percentage >= 70) return '#6366f1'; // indigo-500
    if (percentage >= 40) return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  const handleCopySummary = () => {
    const text = `🎯 SkillGap Analysis for ${jobTitle}:\n• Job Readiness: ${percentage}%\n• Matching Skills: ${matchingCount}/${totalRequired}\n• Status: ${interpretation.badgeLabel}\n• Evaluated with SkillGap (Team 9)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden"
      id="readiness-score-card"
    >
      {/* Background radial highlight */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-40 h-40 transform -rotate-90 drop-shadow-xs" aria-hidden="true">
            {/* Background track circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth="11"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={getProgressColor()}
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className="text-4xl font-black text-slate-900 tracking-tight"
              id="readiness-percentage-display"
            >
              {percentage}%
            </span>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">
              Match
            </span>
          </div>
        </div>

        {/* Text Breakdown */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border shadow-2xs">
              <span className={interpretation.badgeColor}>
                {interpretation.badgeLabel}
              </span>
            </div>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all cursor-pointer shadow-2xs"
              title="Copy analysis summary to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span className="text-emerald-700 font-bold">Summary Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share Summary</span>
                </>
              )}
            </button>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Job Readiness: {percentage}%
            </h3>
            <p className="text-sm font-bold text-indigo-600 mt-0.5">
              {matchingCount} of {totalRequired} required skills matched
            </p>
          </div>

          {/* Prompt required sentence: "Your current skill match for this sample role is X%." */}
          <p className="text-sm text-slate-700 font-semibold leading-relaxed">
            Your current skill match for this sample role is {percentage}%.
          </p>

          {/* Level interpretation card */}
          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs">
            <span className="font-bold text-slate-900">Analysis: </span>
            {interpretation.message}
          </div>

          {/* Important MVP Disclaimer */}
          <p className="text-[11px] text-slate-400 flex items-center justify-center md:justify-start gap-1 font-medium">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Educational estimate based on sample {jobTitle} requirements. Does not guarantee employment.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

