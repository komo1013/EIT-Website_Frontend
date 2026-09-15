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
  isOwner: boolean;
  isVisible: boolean;
  onVisibilityToggle: () => void;
}

export function StudyChecklist({
  colorTheme,
  milestones,
  onMilestoneToggle,
  isOwner,
  isVisible,
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
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={milestone.completed}
                onChange={() => onMilestoneToggle(milestone.id)}
                disabled={!isOwner}
                className="w-4 h-4"
              />
              <span className={milestone.completed ? 'line-through opacity-60' : ''}>{milestone.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
