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
  onVisibilityToggle: () => void;
}

export function ProjectSection({
  colorTheme,
  projectData,
  onProjectUpdate,
  currentUserId,
  isVisible,
  onVisibilityToggle,
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
    </div>
  );
}
