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
  userId?: string;
  userEmail?: string;
  title: string;
  roleName: string;
  selectedJobId: string;
  savedAt: string;
  analysis: SkillGapAnalysis;
  progressMap: LearningProgressMap;
}

export type LearningProgressMap = Record<string, number>;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetRole?: string;
  createdAt: string;
}

export type AuthModalMode = 'login' | 'register' | null;

export type ActiveAppView = 'home' | 'app';
