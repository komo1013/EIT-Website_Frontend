import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from './ui/switch';
import { CheckCircle2, Circle, Eye, EyeOff, Briefcase, Plus, Trash2, User, Copy, Users, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProjectParticipant {
  id: string;
  name: string;
  email: string;
}

export interface ProjectData {
  projectId: string; // Unique ID für Datenbank-Synchronisation
  professor: string;
  tasks: ProjectTask[];
  participants: ProjectParticipant[]; // Liste der Teilnehmer
  ownerId: string; // Creator der Projektarbeit
}

interface ProjectSectionProps {
  colorTheme: ColorTheme;
  projectData: ProjectData;
  onProjectUpdate: (projectData: ProjectData) => void;
  currentUserId: string; // Current user ID
  isVisible?: boolean;
  onVisibilityToggle?: () => void;
}

const colorThemes = {
  blue: {
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    glow: 'bg-blue-500/5',
    gradient: 'from-transparent via-blue-500/10 to-transparent',
    switchBg: 'bg-blue-500',
  },
  orange: {
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    glow: 'bg-orange-500/5',
    gradient: 'from-transparent via-orange-500/10 to-transparent',
    switchBg: 'bg-orange-500',
  },
  green: {
    text: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    glow: 'bg-green-500/5',
    gradient: 'from-transparent via-green-500/10 to-transparent',
    switchBg: 'bg-green-500',
  },
  red: {
    text: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    glow: 'bg-red-500/5',
    gradient: 'from-transparent via-red-500/10 to-transparent',
    switchBg: 'bg-red-500',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    glow: 'bg-purple-500/5',
    gradient: 'from-transparent via-purple-500/10 to-transparent',
    switchBg: 'bg-purple-500',
  },
  gold: {
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    glow: 'bg-yellow-500/5',
    gradient: 'from-transparent via-yellow-500/10 to-transparent',
    switchBg: 'bg-yellow-500',
  },
};

export function ProjectSection({ 
  colorTheme, 
  projectData,
  onProjectUpdate,
  currentUserId,
  isVisible = true,
  onVisibilityToggle 
}: ProjectSectionProps) {
  const theme = colorThemes[colorTheme];
  const [copied, setCopied] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [newParticipantEmail, setNewParticipantEmail] = useState('');

  // Check if current user can edit (is owner or participant)
  const isOwner = currentUserId === projectData.ownerId;
  const isParticipant = projectData.participants.some(p => p.id === currentUserId);
  const canEdit = isOwner || isParticipant;

  const handleProfessorChange = (value: string) => {
    if (!canEdit) return;
    onProjectUpdate({ ...projectData, professor: value });
    syncToDatabase(projectData.projectId);
  };

  const handleTaskToggle = (taskId: string) => {
    if (!canEdit) return;
    const updatedTasks = projectData.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onProjectUpdate({ ...projectData, tasks: updatedTasks });
    syncToDatabase(projectData.projectId);
  };

  const handleAddTask = () => {
    if (!canEdit) return;
    const newTask: ProjectTask = {
      id: Date.now().toString(),
      title: '',
      completed: false,
    };
    onProjectUpdate({ ...projectData, tasks: [...projectData.tasks, newTask] });
    syncToDatabase(projectData.projectId);
  };

  const handleTaskTitleChange = (taskId: string, title: string) => {
    if (!canEdit) return;
    const updatedTasks = projectData.tasks.map(task =>
      task.id === taskId ? { ...task, title } : task
    );
    onProjectUpdate({ ...projectData, tasks: updatedTasks });
    syncToDatabase(projectData.projectId);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!canEdit) return;
    const updatedTasks = projectData.tasks.filter(task => task.id !== taskId);
    onProjectUpdate({ ...projectData, tasks: updatedTasks });
    syncToDatabase(projectData.projectId);
  };

  const handleCopyProjectId = () => {
    navigator.clipboard.writeText(projectData.projectId);
    setCopied(true);
    toast.success('Projekt-ID kopiert!', {
      description: 'Teile diese ID mit deinen Projektpartnern.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddParticipant = () => {
    if (!isOwner || !newParticipantEmail.trim()) return;
    
    // Mock: In der Realität würde hier eine API-Anfrage an die Datenbank gemacht
    const newParticipant: ProjectParticipant = {
      id: Date.now().toString(),
      name: newParticipantEmail.split('@')[0], // Mock name from email
      email: newParticipantEmail,
    };
    
    onProjectUpdate({
      ...projectData,
      participants: [...projectData.participants, newParticipant],
    });
    setNewParticipantEmail('');
    syncToDatabase(projectData.projectId);
    toast.success('Partner hinzugefügt!', {
      description: `${newParticipant.name} kann jetzt mitbearbeiten.`,
    });
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (!isOwner) return;
    const updatedParticipants = projectData.participants.filter(p => p.id !== participantId);
    onProjectUpdate({ ...projectData, participants: updatedParticipants });
    syncToDatabase(projectData.projectId);
    toast.success('Partner entfernt');
  };

  // Mock-Funktion für Datenbank-Synchronisation
  const syncToDatabase = (projectId: string) => {
    // In der Realität würde hier eine API-Anfrage gemacht:
    // await fetch('/api/projects/' + projectId, { method: 'PUT', body: JSON.stringify(projectData) });
    console.log(`[SYNC] Projektarbeit ${projectId} wird synchronisiert...`);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 relative overflow-hidden"
      >
        {/* Subtle glow effect */}
        <div className={`absolute bottom-0 left-0 w-48 h-48 ${theme.glow} rounded-full blur-3xl`} />
        
        <div className="relative">
          {/* Header with controls */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Briefcase className={`w-5 h-5 ${theme.text}`} />
                <h3 className="text-white">Projektarbeiten</h3>
                <span className="text-xs text-slate-500">ID: {projectData.projectId.slice(0, 8)}...</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Copy Project ID Button */}
                <button
                  onClick={handleCopyProjectId}
                  className={`p-2 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} hover:scale-105 transition-all duration-300`}
                  title="Projekt-ID kopieren"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>

                {/* Manage Participants Button */}
                {isOwner && (
                  <button
                    onClick={() => setShowParticipants(!showParticipants)}
                    className={`p-2 rounded-lg border ${theme.border} ${showParticipants ? theme.bg : 'bg-slate-800/50'} ${theme.text} hover:scale-105 transition-all duration-300`}
                    title="Partner verwalten"
                  >
                    <Users className="w-4 h-4" />
                  </button>
                )}
                
                {/* Visibility Toggle - nur für Owner */}
                {isOwner && onVisibilityToggle && (
                  <button
                    onClick={onVisibilityToggle}
                    className={`p-2 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} hover:scale-105 transition-all duration-300`}
                    title={isVisible ? 'Für andere verstecken' : 'Für andere sichtbar machen'}
                  >
                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
            <div className={`h-px bg-gradient-to-r ${theme.gradient}`} />
          </div>

          {/* Participant Management */}
          {showParticipants && isOwner && (
            <div className={`mb-6 p-4 rounded-lg border ${theme.border} ${theme.bg}`}>
              <h4 className="text-sm text-slate-300 mb-3">Partner verwalten</h4>
              
              {/* Add Participant */}
              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  value={newParticipantEmail}
                  onChange={(e) => setNewParticipantEmail(e.target.value)}
                  placeholder="E-Mail des Partners"
                  className={`flex-1 bg-slate-800/50 border ${theme.border} rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500`}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddParticipant()}
                />
                <button
                  onClick={handleAddParticipant}
                  className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} hover:scale-105 transition-all`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Participants List */}
              <div className="space-y-2">
                {projectData.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                    <div>
                      <div className="text-sm text-white">{participant.name}</div>
                      <div className="text-xs text-slate-400">{participant.email}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveParticipant(participant.id)}
                      className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {projectData.participants.length === 0 && (
                  <div className="text-xs text-slate-500 text-center py-2">
                    Noch keine Partner hinzugefügt
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professor Field */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <User className={`w-4 h-4 ${theme.text}`} />
              <label className="text-sm text-slate-300">Betreuender Professor</label>
            </div>
            <input
              type="text"
              value={projectData.professor}
              onChange={(e) => handleProfessorChange(e.target.value)}
              placeholder="z.B. Prof. Dr. Schmidt"
              disabled={!canEdit}
              className={`w-full bg-slate-800/50 border ${theme.border} rounded-lg px-4 py-2 text-white placeholder-slate-500 transition-all duration-200 ${
                canEdit ? 'focus:ring-2 focus:ring-current' : 'cursor-not-allowed opacity-75'
              }`}
              style={canEdit ? { outlineColor: theme.text.replace('text-', '') } : {}}
            />
          </div>

          {/* Add Task Button */}
          {canEdit && (
            <div className="mb-4">
              <button
                onClick={handleAddTask}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} hover:scale-[1.02] transition-all duration-200`}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Aufgabe hinzufügen</span>
              </button>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {projectData.tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className={`flex items-center gap-3 p-4 rounded-lg border ${theme.border} ${theme.bg} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {task.completed ? (
                    <CheckCircle2 className={`w-5 h-5 ${theme.text} flex-shrink-0`} />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                  
                  {canEdit ? (
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => handleTaskTitleChange(task.id, e.target.value)}
                      placeholder="Aufgabentitel eingeben..."
                      className={`flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none ${
                        task.completed ? 'line-through text-slate-400' : ''
                      }`}
                    />
                  ) : (
                    <span className={`${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'} transition-all duration-300`}>
                      {task.title}
                    </span>
                  )}
                </div>

                {/* Controls - nur für Berechtigte */}
                {canEdit && (
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                      className="data-[state=checked]:bg-current"
                      style={{
                        color: task.completed ? theme.switchBg.replace('bg-', '') : undefined,
                      }}
                    />
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {projectData.tasks.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Noch keine Projektarbeiten eingetragen</p>
            </div>
          )}

          {/* Participants Info (for non-owners) */}
          {!isOwner && projectData.participants.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Users className="w-3 h-3" />
                <span>
                  {projectData.participants.length} {projectData.participants.length === 1 ? 'Partner' : 'Partner'}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
