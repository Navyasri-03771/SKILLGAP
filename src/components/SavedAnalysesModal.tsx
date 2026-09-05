import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SavedAnalysisRecord, UserProfile } from '../types';
import { Bookmark, X, Calendar, ArrowRight, Trash2, Download, CheckCircle2, Briefcase, User } from 'lucide-react';

interface SavedAnalysesModalProps {
  isOpen: boolean;
  savedList: SavedAnalysisRecord[];
  user?: UserProfile | null;
  onClose: () => void;
  onLoadRecord: (record: SavedAnalysisRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
}

export const SavedAnalysesModal: React.FC<SavedAnalysesModalProps> = ({
  isOpen,
  savedList,
  user,
  onClose,
  onLoadRecord,
  onDeleteRecord,
  onClearAll,
}) => {
  const handleExportJSON = (record: SavedAnalysisRecord) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `skillgap-${record.roleName.toLowerCase().replace(/\s+/g, '-')}-${new Date(record.savedAt).toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="saved-analyses-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-indigo-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/25">
                  <Bookmark className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-black text-slate-900 tracking-tight"
                    id="saved-analyses-title"
                  >
                    Saved SkillGap Analyses
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                    {user ? (
                      <>
                        <span className="inline-flex items-center gap-1 text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          <User className="w-3 h-3 text-indigo-600" />
                          {user.name} ({user.email})
                        </span>
                        <span>•</span>
                        <span>
                          {savedList.length} saved {savedList.length === 1 ? 'record' : 'records'} in this account
                        </span>
                      </>
                    ) : (
                      <span>
                        {savedList.length} saved {savedList.length === 1 ? 'record' : 'records'} stored locally
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {savedList.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-colors cursor-pointer"
                    title="Clear saved analyses for this account"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List Body */}
            <div className="p-6 overflow-y-auto space-y-3.5 flex-1 divide-y-0">
              {savedList.length === 0 ? (
                <div className="py-14 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                    <Bookmark className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="text-base font-bold text-slate-700">No Saved Analyses for This Account</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    {user ? (
                      <span>
                        No saved reports found for <strong className="text-slate-700">{user.name}</strong> ({user.email}). Each account maintains its own private library. Run an analysis on any job role and click <span className="font-semibold text-indigo-600">&ldquo;Save Analysis&rdquo;</span> to store your snapshots here.
                      </span>
                    ) : (
                      <span>
                        Run an analysis on any job role and click the <span className="font-semibold text-indigo-600">&ldquo;Save Analysis&rdquo;</span> button in the results to store your snapshot here.
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                savedList.map((item) => {
                  const dateStr = new Date(item.savedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  const percentage = item.analysis.readinessPercentage;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-extrabold text-base text-slate-900">
                            {item.roleName}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                              percentage >= 70
                                ? 'bg-emerald-100 text-emerald-800'
                                : percentage >= 40
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {percentage}% Match
                          </span>
                        </div>

                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {dateStr}
                          </span>
                          <span>
                            {item.analysis.matchingSkills.length} of{' '}
                            {item.analysis.matchingSkills.length + item.analysis.missingSkills.length} skills
                          </span>
                        </div>

                        {item.title && item.title !== item.roleName && (
                          <p className="text-xs text-indigo-600 font-medium italic">
                            &ldquo;{item.title}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 justify-end">
                        <button
                          type="button"
                          onClick={() => handleExportJSON(item)}
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200/70 text-xs font-semibold shadow-2xs active:scale-95 transition-all cursor-pointer"
                          title="Export as JSON file"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteRecord(item.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
                          title="Delete this saved analysis"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onLoadRecord(item);
                            onClose();
                          }}
                          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Load Analysis</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Saved analyses persist in your browser for future reviews.</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
