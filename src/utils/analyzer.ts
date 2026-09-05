import { JobRole, JobSkill, SkillGapAnalysis } from '../types';
import { PRIORITY_ORDER } from '../data/jobRoles';

export function runSkillGapAnalysis(
  job: JobRole,
  userSkillNames: string[]
): SkillGapAnalysis {
  const normalizedUserSkills = new Set(
    userSkillNames.map((s) => s.trim().toLowerCase())
  );

  const matchingSkills: string[] = [];
  const missingSkills: JobSkill[] = [];

  for (const skill of job.skills) {
    if (normalizedUserSkills.has(skill.name.trim().toLowerCase())) {
      matchingSkills.push(skill.name);
    } else {
      missingSkills.push(skill);
    }
  }

  // Sort missing skills: HIGH -> MEDIUM -> LOW
  missingSkills.sort((a, b) => {
    const pA = PRIORITY_ORDER[a.priority] || 99;
    const pB = PRIORITY_ORDER[b.priority] || 99;
    return pA - pB;
  });

  const totalRequired = job.skills.length;
  const matchCount = matchingSkills.length;
  const readinessPercentage = totalRequired > 0 ? Math.round((matchCount / totalRequired) * 100) : 0;

  return {
    selectedJobId: job.id,
    selectedSkills: userSkillNames,
    matchingSkills,
    missingSkills,
    readinessPercentage,
    analyzedAt: new Date().toISOString(),
  };
}

export function getReadinessInterpretation(percentage: number): {
  message: string;
  badgeColor: string;
  badgeLabel: string;
} {
  if (percentage >= 90) {
    return {
      message: 'Your selected skills closely match this sample role.',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badgeLabel: 'Exceptional Match',
    };
  }
  if (percentage >= 70) {
    return {
      message: "You're close to a strong skill match. Strengthen the remaining gaps.",
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      badgeLabel: 'Strong Foundation',
    };
  }
  if (percentage >= 40) {
    return {
      message: "You're building a good foundation. Focus on the missing priority skills.",
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      badgeLabel: 'Developing Match',
    };
  }
  return {
    message: 'Start with the core skills for this role.',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    badgeLabel: 'Early Stage',
  };
}
