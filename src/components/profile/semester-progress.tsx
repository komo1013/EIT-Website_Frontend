import { ColorTheme } from './profile-card';
import { Eye, EyeOff } from 'lucide-react';
export interface Lab {
  id: string;
  name: string;
  location: string;
  semester: number;
  preparation?: string;
  startDate?: string;
  endDate?: string;
  dayOfWeek?: number;
  time?: string;
  frequency?: 'once' | 'weekly' | 'biweekly';
}

export interface SemesterData {
  semester: number;
  labs: Lab[];
  preparation: string;
  voluntaryLabs?: Lab[];
}

interface SemesterProgressProps {
  colorTheme: ColorTheme;
  semesterData: SemesterData[];
  onSemesterUpdate: (data: SemesterData[]) => void;
  isOwner: boolean;
  isVisible: boolean;
  isEditorMode?: boolean;
  onVisibilityToggle: () => void;
  onVoluntaryLabAdd?: (lab: Lab) => void;
  onAddLabToSemester?: (semester: number) => void;
  onRemoveLabFromSemester?: (semester: number, labId: string) => void;
  onMoveLabInSemester?: (semester: number, labId: string, direction: 'up' | 'down') => void;
  onReorderLabInSemester?: (semester: number, draggedId: string, targetId: string) => void;
  onUpdateLabField?: (semester: number, labId: string, field: keyof Lab, value: string | number | undefined) => void;
  onUpdateSemesterPreparation?: (semester: number, preparation: string) => void;
}

export function SemesterProgress({
  colorTheme,
  semesterData,
  onSemesterUpdate,
  isOwner,
  isVisible,
  isEditorMode,
  onVisibilityToggle,
  onAddLabToSemester,
  onRemoveLabFromSemester,
  onMoveLabInSemester,
  onReorderLabInSemester,
  onUpdateLabField,
  onUpdateSemesterPreparation,
}: SemesterProgressProps) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Semester Fortschritt</h2>
        {isOwner && (
          <button onClick={onVisibilityToggle} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        
          </button>
        )}
      </div>
      
      {isVisible && (
        <div className="space-y-4">
          {semesterData.map((sem) => (
            <div key={sem.semester} className="border-l-2 border-white/20 pl-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="font-bold">Semester {sem.semester}</h3>
                {isEditorMode && onAddLabToSemester && (
                  <button
                    type="button"
                    onClick={() => onAddLabToSemester(sem.semester)}
                    className="rounded-md border border-blue-400/40 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-100 transition hover:bg-blue-500/20"
                  >
                    Labor hinzufügen
                  </button>
                )}
              </div>

              {isEditorMode ? (
                <div className="space-y-3">
                  <label className="block text-xs text-slate-300">
                    Vorbereitung
                    <input
                      value={sem.preparation}
                      onChange={(e) => onUpdateSemesterPreparation?.(sem.semester, e.target.value) ?? onSemesterUpdate(
                        semesterData.map(item => item.semester === sem.semester ? { ...item, preparation: e.target.value } : item)
                      )}
                      className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                    />
                  </label>

                  {sem.labs.length > 0 ? (
                    <div className="space-y-3">
                      {sem.labs.map((lab, index) => (
                        <div
                          key={lab.id}
                          draggable
                          onDragStart={(event) => {
                            event.dataTransfer.setData('text/plain', lab.id);
                          }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={(event) => {
                            event.preventDefault();
                            const draggedId = event.dataTransfer.getData('text/plain');
                            if (draggedId && onReorderLabInSemester) {
                              onReorderLabInSemester(sem.semester, draggedId, lab.id);
                            }
                          }}
                          className="rounded-md border border-white/10 bg-slate-900/30 p-3"
                        >
                          <div className="mb-2 flex items-center gap-2 text-slate-400">
                            <span className="cursor-grab active:cursor-grabbing" title="Verschieben">⋮⋮</span>
                            <span className="text-[10px] uppercase tracking-[0.2em]">Drag & Drop</span>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <label className="block text-xs text-slate-300">
                              Laborname
                              <input
                                value={lab.name}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'name', e.target.value) ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, name: e.target.value } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              />
                            </label>
                            <label className="block text-xs text-slate-300">
                              Raum
                              <input
                                value={lab.location}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'location', e.target.value) ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, location: e.target.value } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              />
                            </label>
                          </div>

                          <div className="mt-3 grid gap-3 md:grid-cols-2">
                            <label className="block text-xs text-slate-300">
                              Wochentag
                              <select
                                value={lab.dayOfWeek ?? 0}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'dayOfWeek', Number(e.target.value)) ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, dayOfWeek: Number(e.target.value) } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              >
                                {['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'].map((weekday, dayIndex) => (
                                  <option key={weekday} value={dayIndex}>{weekday}</option>
                                ))}
                              </select>
                            </label>
                            <label className="block text-xs text-slate-300">
                              Uhrzeit
                              <input
                                type="time"
                                value={lab.time ?? ''}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'time', e.target.value || undefined) ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, time: e.target.value || undefined } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              />
                            </label>
                          </div>

                          <div className="mt-3 grid gap-3 md:grid-cols-2">
                            <label className="block text-xs text-slate-300">
                              Startdatum
                              <input
                                type="date"
                                value={lab.startDate ?? ''}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'startDate', e.target.value || undefined) ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, startDate: e.target.value || undefined } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              />
                            </label>
                            <label className="block text-xs text-slate-300">
                              Enddatum
                              <input
                                type="date"
                                value={lab.endDate ?? ''}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'endDate', e.target.value || undefined) ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, endDate: e.target.value || undefined } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              />
                            </label>
                          </div>

                          <div className="mt-3 grid gap-3 md:grid-cols-2">
                            <label className="block text-xs text-slate-300">
                              Wiederholung
                              <select
                                value={lab.frequency ?? 'weekly'}
                                onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'frequency', e.target.value as 'once' | 'weekly' | 'biweekly') ?? onSemesterUpdate(
                                  semesterData.map(item => item.semester === sem.semester ? {
                                    ...item,
                                    labs: item.labs.map(l => l.id === lab.id ? { ...l, frequency: e.target.value as 'once' | 'weekly' | 'biweekly' } : l)
                                  } : item)
                                )}
                                className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                              >
                                <option value="once">Einmalig</option>
                                <option value="weekly">Wöchentlich</option>
                                <option value="biweekly">Alle 2 Wochen</option>
                              </select>
                            </label>

                            <div className="flex items-end gap-2">
                              <button
                                type="button"
                                onClick={() => onMoveLabInSemester?.(sem.semester, lab.id, 'up')}
                                disabled={index === 0}
                                className="flex-1 rounded border border-white/10 bg-white/5 px-2 py-2 text-xs text-slate-200 disabled:opacity-30"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => onMoveLabInSemester?.(sem.semester, lab.id, 'down')}
                                disabled={index === sem.labs.length - 1}
                                className="flex-1 rounded border border-white/10 bg-white/5 px-2 py-2 text-xs text-slate-200 disabled:opacity-30"
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                onClick={() => onRemoveLabFromSemester?.(sem.semester, lab.id)}
                                className="flex-1 rounded border border-red-400/30 bg-red-500/10 px-2 py-2 text-xs text-red-100"
                              >
                                Löschen
                              </button>
                            </div>
                          </div>

                          <label className="mt-3 block text-xs text-slate-300">
                            Hinweis
                            <input
                              value={lab.preparation ?? ''}
                              onChange={(e) => onUpdateLabField?.(sem.semester, lab.id, 'preparation', e.target.value) ?? onSemesterUpdate(
                                semesterData.map(item => item.semester === sem.semester ? {
                                  ...item,
                                  labs: item.labs.map(l => l.id === lab.id ? { ...l, preparation: e.target.value } : l)
                                } : item)
                              )}
                              className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm opacity-60">Keine Labore</p>
                  )}
                </div>
              ) : (
                <>
                  {sem.labs.length > 0 ? (
                    <ul className="space-y-1">
                      {sem.labs.map((lab) => (
                        <li key={lab.id} className="text-sm">
                          {lab.name} - {lab.location}
                          {lab.dayOfWeek !== undefined && (
                            <span className="opacity-70"> · {['Mo','Di','Mi','Do','Fr','Sa','So'][lab.dayOfWeek]}</span>
                          )}
                          {lab.time && <span className="opacity-70"> · {lab.time}</span>}
                          {lab.frequency && (
                            <span className="opacity-70"> · {lab.frequency === 'biweekly' ? 'alle 2 Wochen' : lab.frequency === 'weekly' ? 'wöchentlich' : 'einmalig'}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm opacity-60">Keine Labore</p>
                  )}
                  {sem.preparation && <p className="text-xs mt-2 opacity-60">{sem.preparation}</p>}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
