import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Sparkles, X, Search } from 'lucide-react';

interface SkillSelectorProps {
  allSkills: string[];
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onQuickPreset: (presetSkills: string[]) => void;
}

type SkillCategory = 'all' | 'frontend' | 'backend' | 'data' | 'core';

export const SkillSelector: React.FC<SkillSelectorProps> = ({
  allSkills,
  selectedSkills,
  onToggleSkill,
  onSelectAll,
  onClearAll,
  onQuickPreset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const selectedSet = new Set(selectedSkills.map((s) => s.toLowerCase()));

  // Categorization map for intuitive filtering
  const categoryMap: Record<string, SkillCategory> = {
    HTML: 'frontend',
    CSS: 'frontend',
    JavaScript: 'frontend',
    React: 'frontend',
    'Tailwind CSS': 'frontend',
    'Node.js': 'backend',
    Express: 'backend',
    Python: 'backend',
    Java: 'backend',
    'Spring Boot': 'backend',
    'REST APIs': 'backend',
    Git: 'core',
    OOP: 'core',
    DSA: 'core',
    SQL: 'data',
    MongoDB: 'data',
    PostgreSQL: 'data',
    Pandas: 'data',
    NumPy: 'data',
    'Power BI': 'data',
    Excel: 'data',
    'Data Modeling': 'data',
  };

  // Filter skills based on search and category
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesSearch = skill.toLowerCase().includes(searchQuery.trim().toLowerCase());
      if (!matchesSearch) return false;
      if (activeCategory === 'all') return true;
      const cat = categoryMap[skill] || 'core';
      return cat === activeCategory;
    });
  }, [allSkills, searchQuery, activeCategory]);

  // Presets
  const presets = [
    { label: 'Frontend Stack', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git'] },
    { label: 'Python & Data', skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Excel'] },
    { label: 'Backend Core', skills: ['Node.js', 'Express', 'SQL', 'REST APIs', 'Git'] },
    { label: 'CS Fundamentals', skills: ['OOP', 'DSA', 'Git', 'SQL'] },
  ];

  return (
    <div className="space-y-4" id="skills-selector-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <label className="block text-base font-bold text-slate-900">
              What Skills Do You Already Know?
            </label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              {selectedSkills.length} of {allSkills.length} selected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on chips to toggle your current skills. Use search or presets to speed up selection.
          </p>
        </div>

        {/* Global toggles */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={onSelectAll}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold transition-all cursor-pointer shadow-2xs"
            id="skills-select-all-btn"
          >
            Select All
          </button>
          {selectedSkills.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 font-bold transition-all cursor-pointer shadow-2xs"
              id="skills-clear-all-btn"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
              Clear Selection
            </button>
          )}
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. React, SQL, Python)..."
            className="w-full pl-9.5 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
            id="skills-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'data', label: 'Data' },
            { id: 'core', label: 'Core / CS' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as SkillCategory)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo helper presets */}
      <div className="flex items-center flex-wrap gap-2 text-xs bg-gradient-to-r from-indigo-50/50 to-purple-50/40 p-2.5 rounded-xl border border-indigo-100">
        <span className="text-slate-600 font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Quick Demo Presets:
        </span>
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onQuickPreset(preset.skills)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-600 hover:text-white border border-slate-200/90 text-slate-700 font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 text-[11px]"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Selectable Skill Chips */}
      <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Selectable skills">
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const isSelected = selectedSet.has(skill.toLowerCase());
            return (
              <motion.button
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.15 }}
                type="button"
                onClick={() => onToggleSkill(skill)}
                className={`group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/40'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/30'
                }`}
                id={`skill-chip-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                aria-pressed={isSelected}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  ) : (
                    <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                  )}
                </div>
                <span>{skill}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="w-full text-center py-6 text-slate-400 text-xs font-medium bg-white rounded-xl border border-dashed border-slate-200">
            No skills found matching &ldquo;{searchQuery}&rdquo;. Try another term or clear the filter.
          </div>
        )}
      </div>
    </div>
  );
};


