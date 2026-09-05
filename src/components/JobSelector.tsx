import React from 'react';
import { motion } from 'motion/react';
import { JobRole } from '../types';
import { Briefcase, Check, Code, Database, FileSpreadsheet, Server, Terminal } from 'lucide-react';

interface JobSelectorProps {
  jobRoles: JobRole[];
  selectedJobId: string;
  selectedSkills?: string[];
  onSelectJob: (jobId: string) => void;
}

export const JobSelector: React.FC<JobSelectorProps> = ({
  jobRoles,
  selectedJobId,
  selectedSkills = [],
  onSelectJob,
}) => {
  // Normalize user skills to calculate live preview match count per role card
  const normalizedUserSkills = new Set(selectedSkills.map((s) => s.trim().toLowerCase()));

  // Map role IDs to appropriate domain icons and badges
  const getRoleTheme = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'frontend':
        return {
          icon: <Code className="w-5 h-5" />,
          accent: isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600',
          badge: 'Web & UI',
        };
      case 'backend':
        return {
          icon: <Server className="w-5 h-5" />,
          accent: isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600',
          badge: 'Server & APIs',
        };
      case 'python':
        return {
          icon: <Terminal className="w-5 h-5" />,
          accent: isSelected ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-600',
          badge: 'Scripting & OOP',
        };
      case 'data-analyst':
        return {
          icon: <FileSpreadsheet className="w-5 h-5" />,
          accent: isSelected ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600',
          badge: 'Analytics & SQL',
        };
      case 'java':
        return {
          icon: <Database className="w-5 h-5" />,
          accent: isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600',
          badge: 'Enterprise & Systems',
        };
      default:
        return {
          icon: <Briefcase className="w-5 h-5" />,
          accent: isSelected ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700',
          badge: 'Software Engineering',
        };
    }
  };

  return (
    <div className="space-y-4" id="job-selector-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-base font-bold text-slate-900">
            Choose Your Target Job
          </label>
          <p className="text-xs text-slate-500 mt-0.5">
            Select one of the 5 industry benchmark roles to compare your current skill set.
          </p>
        </div>

        {/* Dropdown for quick selection on mobile or keyboard */}
        <div className="sm:w-64">
          <select
            value={selectedJobId}
            onChange={(e) => onSelectJob(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer shadow-2xs"
            id="job-role-dropdown"
            aria-label="Choose your target job"
          >
            <option value="">-- Select a Target Job Role --</option>
            {jobRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} ({role.skills.length} skills)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {jobRoles.map((role, idx) => {
          const isSelected = selectedJobId === role.id;
          const theme = getRoleTheme(role.id, isSelected);

          // Calculate how many skills student currently knows for this role
          const currentMatchCount = role.skills.filter((skill) =>
            normalizedUserSkills.has(skill.name.trim().toLowerCase())
          ).length;

          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectJob(role.id)}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 shadow-md ring-4 ring-indigo-500/15'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
              id={`job-card-${role.id}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectJob(role.id);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-2xs ${theme.accent}`}
                  >
                    {theme.icon}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {theme.badge}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        Active
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  {role.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {role.tagline}
                </p>
              </div>

              {/* Sample skills list preview & live match tally */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {role.skills.length} Required Skills
                  </span>
                  {selectedSkills.length > 0 && (
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                        currentMatchCount === role.skills.length
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentMatchCount > 0
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {currentMatchCount}/{role.skills.length} known
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {role.skills.map((skill) => {
                    const isSkillKnown = normalizedUserSkills.has(skill.name.trim().toLowerCase());
                    return (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                          isSkillKnown
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
                            : 'bg-slate-100/90 text-slate-700'
                        }`}
                      >
                        {isSkillKnown && <span className="text-emerald-600 text-[10px]">✓</span>}
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


