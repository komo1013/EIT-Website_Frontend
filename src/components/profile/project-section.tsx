import { ColorTheme } from './profile-card';
import { Eye, EyeOff } from 'lucide-react';

export interface ProjectData {
  projectId: string;
  professor: string;
  tasks: Array<{ id: string; title: string; completed: boolean }>;
  participants: Array<{ id: string; name: string }>;
  ownerId: string;
}

interface ProjectSectionProps {
  colorTheme: ColorTheme;
  projectData: ProjectData;
  onProjectUpdate: (data: ProjectData) => void;
  currentUserId: string;
  isVisible: boolean;
  isEditorMode?: boolean;
  onVisibilityToggle: () => void;
  onTaskTitleChange?: (taskId: string, title: string) => void;
  onAddTask?: () => void;
  onRemoveTask?: (taskId: string) => void;
  onMoveTask?: (taskId: string, direction: 'up' | 'down') => void;
  onReorderTask?: (draggedId: string, targetId: string) => void;
}

export function ProjectSection({
  colorTheme,
  projectData,
  onProjectUpdate,
  currentUserId,
  isVisible,
  isEditorMode,
  onVisibilityToggle,
  onTaskTitleChange,
  onAddTask,
  onRemoveTask,
  onMoveTask,
  onReorderTask,
}: ProjectSectionProps) {
  const handleTaskToggle = (taskId: string) => {
    onProjectUpdate({
      ...projectData,
      tasks: projectData.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projekt</h2>
        <button onClick={onVisibilityToggle} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        
        </button>
      </div>
      
      {isVisible && (
        <>
          {isEditorMode ? (
            <div className="space-y-3">
              <label className="block text-sm text-slate-200">
                Professor
                <input
                  value={projectData.professor}
                  onChange={(e) => onProjectUpdate({ ...projectData, professor: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-white outline-none"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onAddTask}
                  className="rounded-md border border-blue-400/40 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-100 transition hover:bg-blue-500/20"
                >
                  Aufgabe hinzufügen
                </button>
              </div>

              <div className="space-y-2">
                {projectData.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData('text/plain', task.id);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const draggedId = event.dataTransfer.getData('text/plain');
                      if (draggedId && onReorderTask) {
                        onReorderTask(draggedId, task.id);
                      }
                    }}
                    className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/20 p-2"
                  >
                    <div className="cursor-grab active:cursor-grabbing text-slate-400" title="Verschieben">⋮⋮</div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                      className="w-4 h-4"
                    />
                    <input
                      value={task.title}
                      onChange={(e) => onTaskTitleChange?.(task.id, e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-slate-950/40 px-2 py-1.5 text-sm text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => onMoveTask?.(task.id, 'up')}
                      disabled={index === 0}
                      className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveTask?.(task.id, 'down')}
                      disabled={index === projectData.tasks.length - 1}
                      className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveTask?.(task.id)}
                      className="rounded border border-red-400/30 bg-red-500/10 px-2 py-1 text-xs text-red-100"
                    >
                      Löschen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm mb-4">Professor: {projectData.professor}</p>
              <div className="space-y-2">
                {projectData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                      className="w-4 h-4"
                    />
                    <span className={task.completed ? 'line-through opacity-60' : ''}>{task.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
