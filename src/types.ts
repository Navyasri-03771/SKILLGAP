export type SkillPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface JobSkill {
  name: string;
  priority: SkillPriority;
  description: string;
}

export interface JobRole {
  id: string;
  name: string;
  tagline: string;
  skills: JobSkill[];
}

export interface SkillGapAnalysis {
  selectedJobId: string;
  selectedSkills: string[];
  matchingSkills: string[];
  missingSkills: JobSkill[];
  readinessPercentage: number;
  analyzedAt: string;
}

export interface SavedAnalysisRecord {
  id: string;
  title: string;
  roleName: string;
  selectedJobId: string;
  savedAt: string;
  analysis: SkillGapAnalysis;
  progressMap: LearningProgressMap;
}

export type LearningProgressMap = Record<string, number>;
