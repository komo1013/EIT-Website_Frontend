import { useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff, Plus, MapPin, BookOpen, Trash2, Calendar, Clock } from 'lucide-react';

export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

export interface Lab {
  id: string;
  name: string;
  location: string;
  semester: number;
  preparation?: string;
  startDate?: string; // ISO date format
  frequency?: 'weekly' | 'biweekly'; // wöchentlich oder zweiwöchentlich
}

export interface SemesterData {
  semester: number;
  labs: Lab[];
  preparation: string;
}

interface SemesterProgressProps {
  colorTheme: ColorTheme;
  semesterData: SemesterData[];
  onSemesterUpdate: (semesterData: SemesterData[]) => void;
  isOwner: boolean;
  isVisible: boolean;
  onVisibilityToggle: () => void;
}

export function SemesterProgress({
  colorTheme,
  semesterData,
  onSemesterUpdate,
  isOwner,
  isVisible,
  onVisibilityToggle,
}: SemesterProgressProps) {
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);
  const [expandedLab, setExpandedLab] = useState<string | null>(null);
  const [editingPrep, setEditingPrep] = useState<number | null>(null);

  const colorClasses: Record<ColorTheme, { text: string; bg: string; border: string; glow: string }> = {
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', glow: 'rgba(96, 165, 250, 0.3)' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', glow: 'rgba(251, 146, 60, 0.3)' },
    green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', glow: 'rgba(74, 222, 128, 0.3)' },
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', glow: 'rgba(248, 113, 113, 0.3)' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', glow: 'rgba(192, 132, 252, 0.3)' },
    gold: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', glow: 'rgba(250, 204, 21, 0.3)' },
  };

  const colors = colorClasses[colorTheme];

  const addLab = (semester: number) => {
    const newLab: Lab = {
      id: Date.now().toString(),
      name: '',
      location: '',
      semester,
      preparation: '',
      startDate: '',
      frequency: 'weekly',
    };
    
    const updatedData = semesterData.map(sem =>
      sem.semester === semester
        ? { ...sem, labs: [...sem.labs, newLab] }
        : sem
    );
    onSemesterUpdate(updatedData);
    setExpandedLab(newLab.id);
  };

  const updateLab = (semesterNum: number, labId: string, updates: Partial<Lab>) => {
    const updatedData = semesterData.map(sem =>
      sem.semester === semesterNum
        ? {
            ...sem,
            labs: sem.labs.map(lab =>
              lab.id === labId ? { ...lab, ...updates } : lab
            ),
          }
        : sem
    );
    onSemesterUpdate(updatedData);
  };

  const deleteLab = (semesterNum: number, labId: string) => {
    const updatedData = semesterData.map(sem =>
      sem.semester === semesterNum
        ? { ...sem, labs: sem.labs.filter(lab => lab.id !== labId) }
        : sem
    );
    onSemesterUpdate(updatedData);
    if (expandedLab === labId) {
      setExpandedLab(null);
    }
  };

  const updatePreparation = (semesterNum: number, value: string) => {
    const updatedData = semesterData.map(sem =>
      sem.semester === semesterNum ? { ...sem, preparation: value } : sem
    );
    onSemesterUpdate(updatedData);
  };

  if (!isVisible && !isOwner) return null;

  return (
    <div className="relative">
      {/* Glow effect */}
      <div 
        className="absolute -inset-2 rounded-xl blur-lg opacity-20"
        style={{
          background: `linear-gradient(135deg, ${colors.glow}, transparent)`,
        }}
      />
      
      <div className={clsx(
        "relative p-6 rounded-xl border shadow-lg backdrop-blur-sm",
        "bg-slate-900/50",
        colors.border
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white flex items-center gap-2">
            <BookOpen className={clsx("w-5 h-5", colors.text)} />
            Semester Fortschritt
          </h3>
          
          {isOwner && (
            <button
              onClick={onVisibilityToggle}
              className={clsx(
                "p-2 rounded-lg transition-all duration-200",
                colors.bg,
                "hover:bg-white/10"
              )}
              title={isVisible ? "Für andere ausblenden" : "Für andere anzeigen"}
            >
              {isVisible ? (
                <Eye className={clsx("w-4 h-4", colors.text)} />
              ) : (
                <EyeOff className="w-4 h-4 text-slate-400" />
              )}
            </button>
          )}
        </div>

        {/* Semester List */}
        <div className="space-y-4">
          {semesterData.map((semData) => (
            <div key={semData.semester} className={clsx(
              "p-4 rounded-lg border transition-all duration-200",
              colors.border,
              expandedSemester === semData.semester ? colors.bg : "bg-slate-800/30"
            )}>
              {/* Semester Header */}
              <button
                onClick={() => setExpandedSemester(
                  expandedSemester === semData.semester ? null : semData.semester
                )}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    colors.bg,
                    colors.border,
                    "border"
                  )}>
                    <span className={clsx(colors.text)}>{semData.semester}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white">Semester {semData.semester}</div>
                    <div className="text-xs text-slate-400">
                      {semData.labs.length} {semData.labs.length === 1 ? 'Labor' : 'Labore'}
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "transform transition-transform",
                  expandedSemester === semData.semester && "rotate-180"
                )}>
                  <svg className={clsx("w-5 h-5", colors.text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedSemester === semData.semester && (
                <div className="mt-4 space-y-4">
                  {/* Labore */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm text-slate-300">Labore</label>
                      {isOwner && (
                        <button
                          onClick={() => addLab(semData.semester)}
                          className={clsx(
                            "flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors",
                            colors.bg,
                            colors.text,
                            "hover:bg-white/10"
                          )}
                        >
                          <Plus className="w-3 h-3" />
                          Labor hinzufügen
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {semData.labs.length === 0 ? (
                        <div className="text-sm text-slate-400 text-center py-4 border border-dashed border-slate-600 rounded">
                          Noch keine Labore eingetragen
                        </div>
                      ) : (
                        semData.labs.map((lab) => (
                          <div key={lab.id} className={clsx(
                            "rounded-lg border transition-all",
                            "bg-slate-800/50",
                            colors.border
                          )}>
                            {/* Lab Header */}
                            <div className="p-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={lab.name}
                                  onChange={(e) => updateLab(semData.semester, lab.id, { name: e.target.value })}
                                  placeholder="Labor-Name"
                                  disabled={!isOwner}
                                  className={clsx(
                                    "flex-1 bg-slate-900/50 border rounded px-3 py-2 text-sm text-white placeholder-slate-500",
                                    colors.border,
                                    isOwner && "focus:ring-1",
                                    !isOwner && "cursor-not-allowed opacity-75"
                                  )}
                                  style={isOwner ? { outlineColor: colors.glow } : {}}
                                />
                                {isOwner && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)}
                                      className={clsx(
                                        "p-2 rounded transition-colors",
                                        expandedLab === lab.id ? colors.bg : "hover:bg-slate-700/50"
                                      )}
                                    >
                                      <Calendar className={clsx("w-4 h-4", expandedLab === lab.id ? colors.text : "text-slate-400")} />
                                    </button>
                                    <button
                                      onClick={() => deleteLab(semData.semester, lab.id)}
                                      className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 mt-2">
                                <MapPin className={clsx("w-4 h-4", colors.text)} />
                                <input
                                  type="text"
                                  value={lab.location}
                                  onChange={(e) => updateLab(semData.semester, lab.id, { location: e.target.value })}
                                  placeholder="Raum/Gebäude (z.B. A-101, Labor 3)"
                                  disabled={!isOwner}
                                  className={clsx(
                                    "flex-1 bg-slate-900/50 border rounded px-3 py-2 text-sm text-white placeholder-slate-500",
                                    colors.border,
                                    isOwner && "focus:ring-1",
                                    !isOwner && "cursor-not-allowed opacity-75"
                                  )}
                                  style={isOwner ? { outlineColor: colors.glow } : {}}
                                />
                              </div>
                            </div>

                            {/* Lab Details - Expandable */}
                            {expandedLab === lab.id && isOwner && (
                              <div className={clsx("p-3 border-t space-y-3", colors.border)}>
                                {/* Start Date */}
                                <div>
                                  <label className="text-xs text-slate-400 mb-1 block">Startdatum</label>
                                  <input
                                    type="date"
                                    value={lab.startDate || ''}
                                    onChange={(e) => updateLab(semData.semester, lab.id, { startDate: e.target.value })}
                                    className={clsx(
                                      "w-full bg-slate-900/50 border rounded px-3 py-2 text-sm text-white",
                                      colors.border,
                                      "focus:ring-1"
                                    )}
                                    style={{ outlineColor: colors.glow }}
                                  />
                                </div>

                                {/* Frequency */}
                                <div>
                                  <label className="text-xs text-slate-400 mb-1 block flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Häufigkeit
                                  </label>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => updateLab(semData.semester, lab.id, { frequency: 'weekly' })}
                                      className={clsx(
                                        "flex-1 px-3 py-2 rounded text-sm border transition-colors",
                                        lab.frequency === 'weekly'
                                          ? `${colors.bg} ${colors.border} ${colors.text}`
                                          : "bg-slate-800/50 border-slate-600 text-slate-400 hover:bg-slate-700/50"
                                      )}
                                    >
                                      Wöchentlich
                                    </button>
                                    <button
                                      onClick={() => updateLab(semData.semester, lab.id, { frequency: 'biweekly' })}
                                      className={clsx(
                                        "flex-1 px-3 py-2 rounded text-sm border transition-colors",
                                        lab.frequency === 'biweekly'
                                          ? `${colors.bg} ${colors.border} ${colors.text}`
                                          : "bg-slate-800/50 border-slate-600 text-slate-400 hover:bg-slate-700/50"
                                      )}
                                    >
                                      Zweiwöchentlich
                                    </button>
                                  </div>
                                </div>

                                {/* Preparation */}
                                <div>
                                  <label className="text-xs text-slate-400 mb-1 block">Vorbereitung für dieses Labor</label>
                                  <textarea
                                    value={lab.preparation || ''}
                                    onChange={(e) => updateLab(semData.semester, lab.id, { preparation: e.target.value })}
                                    placeholder="Vorbereitungshinweise..."
                                    rows={2}
                                    className={clsx(
                                      "w-full bg-slate-900/50 border rounded px-3 py-2 text-sm text-white placeholder-slate-500 resize-none",
                                      colors.border,
                                      "focus:ring-1"
                                    )}
                                    style={{ outlineColor: colors.glow }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Semester Vorbereitung */}
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Allgemeine Vorbereitung (Semester)</label>
                    <textarea
                      value={semData.preparation}
                      onChange={(e) => updatePreparation(semData.semester, e.target.value)}
                      onFocus={() => setEditingPrep(semData.semester)}
                      onBlur={() => setEditingPrep(null)}
                      placeholder="Vorbereitungshinweise für dieses Semester..."
                      disabled={!isOwner}
                      rows={3}
                      className={clsx(
                        "w-full bg-slate-900/50 border rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 resize-none",
                        colors.border,
                        isOwner && "focus:ring-1",
                        !isOwner && "cursor-not-allowed opacity-75",
                        editingPrep === semData.semester && colors.bg
                      )}
                      style={isOwner ? { outlineColor: colors.glow } : {}}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
