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
  onVisibilityToggle: () => void;
  onVoluntaryLabAdd?: (lab: Lab) => void;
}

export function SemesterProgress({
  colorTheme,
  semesterData,
  onSemesterUpdate,
  isOwner,
  isVisible,
  onVisibilityToggle,
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
              <h3 className="font-bold mb-2">Semester {sem.semester}</h3>
              {sem.labs.length > 0 ? (
                <ul className="space-y-1">
                  {sem.labs.map((lab) => (
                    <li key={lab.id} className="text-sm">
                      {lab.name} - {lab.location}
                      {lab.dayOfWeek !== undefined && (
                        <span className="opacity-70"> · {['Mo','Di','Mi','Do','Fr','Sa','So'][lab.dayOfWeek]}</span>
                      )}
                      {lab.time && <span className="opacity-70"> · {lab.time}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm opacity-60">Keine Labore</p>
              )}
              {sem.preparation && <p className="text-xs mt-2 opacity-60">{sem.preparation}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
