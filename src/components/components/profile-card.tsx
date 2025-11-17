import { motion } from 'framer-motion';
import { Zap, Mail, Linkedin, Github, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

export interface StudentProfile {
  // Automatisch aus Datenbank
  name: string;
  email: string;
  university: string;
  studyProgram: string;
  level: number; // 1-6 für die Stufen (automatisch → Farbe)
  profileImageUrl?: string;
  initials?: string;
  
  // Vom Studenten wählbar
  specialization?: string; // Vertiefungsrichtung
  motivationImageUrl?: string;
  bio?: string;
  
  // Social Links (optional)
  linkedinUrl?: string;
  githubUrl?: string;
}

interface ProfileCardProps {
  profile: StudentProfile;
  colorTheme?: ColorTheme; // Optional override, sonst wird es vom Level bestimmt
}

const colorThemes = {
  blue: {
    glow: 'bg-blue-500/5',
    border: 'border-blue-500/20',
    ring: 'border-blue-400/30',
    text: 'text-blue-400',
    badge: 'border-blue-500/30 text-blue-400',
    buttonBg: 'bg-blue-500/10 hover:bg-blue-500/20',
    buttonBorder: 'border-blue-500/30',
    hoverText: 'hover:text-blue-400',
    gradient: 'from-transparent via-blue-500/10 to-transparent',
  },
  orange: {
    glow: 'bg-orange-500/5',
    border: 'border-orange-500/20',
    ring: 'border-orange-400/30',
    text: 'text-orange-400',
    badge: 'border-orange-500/30 text-orange-400',
    buttonBg: 'bg-orange-500/10 hover:bg-orange-500/20',
    buttonBorder: 'border-orange-500/30',
    hoverText: 'hover:text-orange-400',
    gradient: 'from-transparent via-orange-500/10 to-transparent',
  },
  green: {
    glow: 'bg-green-500/5',
    border: 'border-green-500/20',
    ring: 'border-green-400/30',
    text: 'text-green-400',
    badge: 'border-green-500/30 text-green-400',
    buttonBg: 'bg-green-500/10 hover:bg-green-500/20',
    buttonBorder: 'border-green-500/30',
    hoverText: 'hover:text-green-400',
    gradient: 'from-transparent via-green-500/10 to-transparent',
  },
  red: {
    glow: 'bg-red-500/5',
    border: 'border-red-500/20',
    ring: 'border-red-400/30',
    text: 'text-red-400',
    badge: 'border-red-500/30 text-red-400',
    buttonBg: 'bg-red-500/10 hover:bg-red-500/20',
    buttonBorder: 'border-red-500/30',
    hoverText: 'hover:text-red-400',
    gradient: 'from-transparent via-red-500/10 to-transparent',
  },
  purple: {
    glow: 'bg-purple-500/5',
    border: 'border-purple-500/20',
    ring: 'border-purple-400/30',
    text: 'text-purple-400',
    badge: 'border-purple-500/30 text-purple-400',
    buttonBg: 'bg-purple-500/10 hover:bg-purple-500/20',
    buttonBorder: 'border-purple-500/30',
    hoverText: 'hover:text-purple-400',
    gradient: 'from-transparent via-purple-500/10 to-transparent',
  },
  gold: {
    glow: 'bg-yellow-500/5',
    border: 'border-yellow-500/20',
    ring: 'border-yellow-400/30',
    text: 'text-yellow-400',
    badge: 'border-yellow-500/30 text-yellow-400',
    buttonBg: 'bg-yellow-500/10 hover:bg-yellow-500/20',
    buttonBorder: 'border-yellow-500/30',
    hoverText: 'hover:text-yellow-400',
    gradient: 'from-transparent via-yellow-500/10 to-transparent',
  },
};

// Map level (1-6) zu Farbe
const levelToColor = (level: number): ColorTheme => {
  const colors: ColorTheme[] = ['blue', 'green', 'orange', 'purple', 'red', 'gold'];
  return colors[Math.max(0, Math.min(level - 1, colors.length - 1))];
};

export function ProfileCard({ profile, colorTheme }: ProfileCardProps) {
  // Verwende colorTheme falls übergeben, sonst bestimme es vom Level
  const selectedColor = colorTheme || levelToColor(profile.level);
  const theme = colorThemes[selectedColor];
  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 relative overflow-hidden"
      >
        {/* Subtle glow effect */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${theme.glow} rounded-full blur-3xl`} />
        
        <div className="relative">
          {/* Header with profile image */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="relative">
                <Avatar className={`w-32 h-32 border-4 ${theme.border}`}>
                  <AvatarImage 
                    src={profile.profileImageUrl || "https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN0dWRlbnR8ZW58MXx8fHwxNzYwNjk2MzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"} 
                    alt={`${profile.name} Profilbild`} 
                  />
                  <AvatarFallback className={theme.text.replace('text-', 'bg-').replace('/400', '/500')}>
                    {profile.initials || profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {/* Electric ring animation */}
                <motion.div
                  className={`absolute inset-0 border-2 ${theme.ring} rounded-full`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>

            {/* Name and Status */}
            <div className="flex-1 text-center sm:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <h1 className="text-white">{profile.name}</h1>
                  <Zap className={`w-5 h-5 ${theme.text}`} />
                </div>
                <p className="text-slate-400 mb-3">Student | {profile.studyProgram}</p>
                <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                  {profile.specialization && (
                    <Badge variant="outline" className={theme.badge}>
                      {profile.specialization}
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    {profile.university}
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6">
            <div className={`h-px bg-gradient-to-r ${theme.gradient} mb-6`} />
            <p className="text-slate-300 leading-relaxed">
              {profile.bio || `Student der ${profile.studyProgram} an der ${profile.university}, in der vertiefungsrichtung ${profile.specialization}.`}
            </p>
          </motion.div>
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-3 justify-center sm:justify-start">
            <motion.a
              href={`mailto:${profile.email}`}
              className={`flex items-center gap-2 px-4 py-2 ${theme.buttonBg} border ${theme.buttonBorder} ${theme.text} rounded-lg transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </motion.a>
            {profile.linkedinUrl && (
              <motion.a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-400 ${theme.hoverText} rounded-lg transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            )}
            {profile.githubUrl && (
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-400 ${theme.hoverText} rounded-lg transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {/* AStA Link */}
            <motion.a
              href="https://asta-hka.de"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-400 ${theme.hoverText} rounded-lg transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="AStA Hochschule Karlsruhe"
            >
              <Users className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
