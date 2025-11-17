import { useState } from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

export interface StudyMilestone {
  id: string;
  title: string;
  completed: boolean;
}

interface StudyChecklistProps {
  colorTheme: ColorTheme;
  milestones: StudyMilestone[];
  onMilestoneToggle: (milestoneId: string) => void;
  isOwner?: boolean; // Ist der aktuelle User der Kontoinhaber?
  isVisible?: boolean; // Sichtbarkeit für andere User
  onVisibilityToggle?: () => void;
}

const colorThemes = {
  blue: {
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    glow: 'bg-blue-500/5',
    gradient: 'from-transparent via-blue-500/10 to-transparent',
    checkbox: 'border-blue-500/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500',
  },
  orange: {
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    glow: 'bg-orange-500/5',
    gradient: 'from-transparent via-orange-500/10 to-transparent',
    checkbox: 'border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500',
  },
  green: {
    text: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    glow: 'bg-green-500/5',
    gradient: 'from-transparent via-green-500/10 to-transparent',
    checkbox: 'border-green-500/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
  },
  red: {
    text: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    glow: 'bg-red-500/5',
    gradient: 'from-transparent via-red-500/10 to-transparent',
    checkbox: 'border-red-500/50 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    glow: 'bg-purple-500/5',
    gradient: 'from-transparent via-purple-500/10 to-transparent',
    checkbox: 'border-purple-500/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500',
  },
  gold: {
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    glow: 'bg-yellow-500/5',
    gradient: 'from-transparent via-yellow-500/10 to-transparent',
    checkbox: 'border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500',
  },
};

export function StudyChecklist({ 
  colorTheme, 
  milestones, 
  onMilestoneToggle, 
  isOwner = false,
  isVisible = true,
  onVisibilityToggle 
}: StudyChecklistProps) {
  const theme = colorThemes[colorTheme];

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 relative overflow-hidden h-full"
      >
        {/* Subtle glow effect */}
        <div className={`absolute top-0 right-0 w-48 h-48 ${theme.glow} rounded-full blur-3xl`} />
        
        <div className="relative">
          {/* Header with visibility toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className={`w-5 h-5 ${theme.text}`} />
                <h3 className="text-white">Studienfortschritt</h3>
              </div>
              
              {/* Visibility Toggle - nur für Kontoinhaber */}
              {isOwner && onVisibilityToggle && (
                <motion.button
                  onClick={onVisibilityToggle}
                  className={`p-2 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} hover:scale-105 transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isVisible ? 'Für andere verstecken' : 'Für andere sichtbar machen'}
                >
                  {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </motion.button>
              )}
            </div>
            <div className={`h-px bg-gradient-to-r ${theme.gradient}`} />
          </div>

          {/* Milestone List */}
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.08, duration: 0.5 }}
                className="flex items-center gap-3 group"
              >
                <Checkbox
                  id={milestone.id}
                  checked={milestone.completed}
                  onCheckedChange={() => isOwner && onMilestoneToggle(milestone.id)}
                  disabled={!isOwner}
                  className={theme.checkbox}
                />
                <label
                  htmlFor={milestone.id}
                  className={`flex-1 text-sm ${
                    milestone.completed ? 'text-slate-400 line-through' : 'text-slate-200'
                  } transition-all duration-300 ${isOwner ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {milestone.title}
                </label>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Fortschritt</span>
              <span className={`text-sm ${theme.text}`}>
                {milestones.filter(m => m.completed).length} / {milestones.length}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(to right, ${theme.text.replace('text-', '')})`,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${(milestones.filter(m => m.completed).length / milestones.length) * 100}%`,
                }}
                transition={{ duration: 1, delay: 1 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
