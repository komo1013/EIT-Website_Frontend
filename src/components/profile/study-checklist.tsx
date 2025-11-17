import { ColorTheme } from './profile-card';

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
          <button onClick={onVisibilityToggle} className="text-sm opacity-60 hover:opacity-100">
            {isVisible ? 'Ausblenden' : 'Einblenden'}
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
