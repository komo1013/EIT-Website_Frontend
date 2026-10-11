import { ColorTheme } from './profile-card';
import { Eye, EyeOff } from 'lucide-react';
export interface StudyMilestone {
  id: string;
  title: string;
  completed: boolean;
}

interface StudyChecklistProps {
  colorTheme: ColorTheme;
  milestones: StudyMilestone[];
  onMilestoneToggle: (id: string) => void;
  onMilestoneTitleChange?: (id: string, title: string) => void;
  onAddMilestone?: () => void;
  onRemoveMilestone?: (id: string) => void;
  onMoveMilestone?: (id: string, direction: 'up' | 'down') => void;
  onReorderMilestone?: (draggedId: string, targetId: string) => void;
  isOwner: boolean;
  isVisible: boolean;
  isEditorMode?: boolean;
  onVisibilityToggle: () => void;
}

export function StudyChecklist({
  colorTheme,
  milestones,
  onMilestoneToggle,
  onMilestoneTitleChange,
  onAddMilestone,
  onRemoveMilestone,
  onMoveMilestone,
  onReorderMilestone,
  isOwner,
  isVisible,
  isEditorMode,
  onVisibilityToggle,
}: StudyChecklistProps) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Studien-Checkliste</h2>
        {isOwner && (
          <button onClick={onVisibilityToggle} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {isVisible && (
        <div className="space-y-3">
          {isEditorMode && onAddMilestone && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onAddMilestone}
                className="rounded-md border border-blue-400/40 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-100 transition hover:bg-blue-500/20"
              >
                Eintrag hinzufügen
              </button>
            </div>
          )}

          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              draggable={isEditorMode}
              onDragStart={(event) => {
                event.dataTransfer.setData('text/plain', milestone.id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const draggedId = event.dataTransfer.getData('text/plain');
                if (draggedId && onReorderMilestone) {
                  onReorderMilestone(draggedId, milestone.id);
                }
              }}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/20 p-2"
            >
              {isEditorMode ? (
                <>
                  <div className="cursor-grab active:cursor-grabbing text-slate-400" title="Verschieben">⋮⋮</div>
                  <input
                    type="checkbox"
                    checked={milestone.completed}
                    onChange={() => onMilestoneToggle(milestone.id)}
                    disabled={!isOwner}
                    className="w-4 h-4"
                  />
                  <input
                    value={milestone.title}
                    onChange={(e) => onMilestoneTitleChange?.(milestone.id, e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-sm text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onMoveMilestone?.(milestone.id, 'up')}
                    disabled={index === 0}
                    className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => onMoveMilestone?.(milestone.id, 'down')}
                    disabled={index === milestones.length - 1}
                    className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveMilestone?.(milestone.id)}
                    className="rounded border border-red-400/30 bg-red-500/10 px-2 py-1 text-xs text-red-100"
                  >
                    Löschen
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={milestone.completed}
                    onChange={() => onMilestoneToggle(milestone.id)}
                    disabled={!isOwner}
                    className="w-4 h-4"
                  />
                  <span className={milestone.completed ? 'line-through opacity-60' : ''}>{milestone.title}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
