import { ProfileCard, ColorTheme, StudentProfile } from './src/components/profile/profile-card';
import {useState, useEffect} from "react"
import clsx from "clsx";
import { Switch } from './src/components/components/ui/switch';
import { ImageWithFallback } from './src/components/components/figma/ImageWithFallback';
import { ColorPicker } from './src/components/profile/color-picker';
import { ProjectSection, ProjectData } from './src/components/profile/project-section';
import { StudyChecklist, StudyMilestone } from './src/components/profile/study-checklist';
import { SemesterProgress, SemesterData, Lab } from './src/components/profile/semester-progress';
import { Toaster } from './src/components/components/ui/sonner';

interface LabOnDay {
  lab: Lab;
  semester: number;
}

function MiniCalendar({ 
  currentBg, 
  isOn, 
  semesterData 
}: { 
  currentBg: { via: string; particle: string; grid: string };
  isOn: boolean;
  semesterData: SemesterData[];
}) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  
  // Today's date: October 24, 2025
  const today = new Date(2025, 9, 24); // Month is 0-indexed
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  
  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday = 0
  
  const days = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Helper function to check if a lab occurs on a specific date
  const getLabsOnDate = (day: number): LabOnDay[] => {
    const targetDate = new Date(currentYear, currentMonth, day);
    const labsOnDay: LabOnDay[] = [];

    semesterData.forEach(semData => {
      semData.labs.forEach((lab: Lab) => {
        if (!lab.startDate) return;

        const startDate = new Date(lab.startDate);
        if (startDate > targetDate) return; // Lab hasn't started yet

        const daysDiff = Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (lab.frequency === 'weekly') {
          // Check if it's the same day of week
          if (targetDate.getDay() === startDate.getDay()) {
            labsOnDay.push({ lab, semester: semData.semester });
          }
        } else if (lab.frequency === 'biweekly') {
          // Check if it's the same day of week and the week count is even
          if (targetDate.getDay() === startDate.getDay() && daysDiff % 14 === 0) {
            labsOnDay.push({ lab, semester: semData.semester });
          }
        }
      });
    });

    return labsOnDay;
  }
  
  return (
    <div className="relative">
      {/* Glow effect */}
      <div 
        className="absolute -inset-2 rounded-xl blur-lg opacity-20"
        style={{
          background: `linear-gradient(135deg, ${currentBg.particle.replace('0.2', '0.4')}, transparent)`,
        }}
      />
      
      <div className={clsx(
        "relative p-4 rounded-xl border shadow-lg backdrop-blur-sm",
        isOn ? "bg-white/80 border-slate-200" : "bg-slate-900/50 border-blue-500/20"
      )}>
        <div className="mb-3">
          <h3 className={clsx("text-center", isOn ? "text-slate-900" : "text-white")}>
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, i) => (
            <div 
              key={i} 
              className={clsx(
                "text-center text-xs w-8 h-8 flex items-center justify-center",
                isOn ? "text-slate-500" : "text-slate-400"
              )}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const labsOnDay = day ? getLabsOnDate(day) : [];
            const hasLabs = labsOnDay.length > 0;
            
            return (
              <div 
                key={i} 
                className="relative"
                onMouseEnter={() => day && setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {day && (
                  <>
                    {day === currentDay ? (
                      <div className="relative">
                        {/* Today's glow */}
                        <div 
                          className="absolute inset-0 rounded-lg blur-md opacity-60"
                          style={{
                            background: currentBg.particle.replace('0.2', '0.8'),
                          }}
                        />
                        <div 
                          className="relative text-center text-xs w-8 h-8 flex items-center justify-center rounded-lg text-white transition-all duration-300"
                          style={{
                            background: currentBg.particle.replace('0.2', '1'),
                          }}
                        >
                          {day}
                          {hasLabs && (
                            <div 
                              className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div 
                        className={clsx(
                          "relative text-center text-xs w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200",
                          isOn 
                            ? "text-slate-700 hover:bg-slate-200" 
                            : "text-slate-300 hover:bg-white/10"
                        )}
                      >
                        {day}
                        {hasLabs && (
                          <div 
                            className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full"
                            style={{
                              background: currentBg.particle.replace('0.2', '1'),
                            }}
                          />
                        )}
                      </div>
                    )}

                    {/* Tooltip on hover */}
                    {hoveredDay === day && hasLabs && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 whitespace-nowrap">
                        <div 
                          className={clsx(
                            "px-3 py-2 rounded-lg shadow-xl border backdrop-blur-sm",
                            isOn ? "bg-white border-slate-200" : "bg-slate-800/95 border-slate-700"
                          )}
                          style={{
                            boxShadow: `0 0 20px ${currentBg.particle.replace('0.2', '0.3')}`,
                          }}
                        >
                          <div className="space-y-1">
                            {labsOnDay.map((labOnDay, idx) => (
                              <div key={idx} className="text-xs">
                                <div className={clsx(
                                  isOn ? "text-slate-900" : "text-white"
                                )}>
                                  {labOnDay.lab.name || 'Labor'}
                                </div>
                                <div className={clsx(
                                  "text-xs",
                                  isOn ? "text-slate-600" : "text-slate-400"
                                )}>
                                  {labOnDay.lab.location || 'Kein Raum'} · Sem. {labOnDay.semester}
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Arrow */}
                          <div 
                            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                            style={{
                              borderLeft: '4px solid transparent',
                              borderRight: '4px solid transparent',
                              borderTop: `4px solid ${isOn ? '#fff' : 'rgb(30, 41, 59)'}`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ isOn, setIsOn }: { isOn: boolean; setIsOn: (value: boolean) => void }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 shadow-lg">
      <Switch 
        id="theme-switch" 
        checked={isOn} 
        onCheckedChange={setIsOn}
      />
    </div>
  );
}
interface StreamParticle {
  id: number;
  x: number;
  y: number;
  age: number;
}

export default function App() {
  const [isOn, setIsOn] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme | undefined>(undefined);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [streamParticles, setStreamParticles] = useState<StreamParticle[]>([]);
  
  // User State - In Produktion: aus Datenbank oder Context
  const [isOwner, setIsOwner] = useState(true); // Simuliert: aktueller User ist der Kontoinhaber
  const currentUserId = 'user_123'; // Mock: In der Realität aus Auth-System
  
  // Project Data State
  const [projectData, setProjectData] = useState<ProjectData>({
    projectId: 'proj_' + Date.now(), // Unique ID für Datenbank
    professor: 'Prof. Dr. Schmidt',
    tasks: [
      { id: '1', title: 'Projektplanung und Konzept', completed: true },
      { id: '2', title: 'Schaltungsentwurf', completed: true },
      { id: '3', title: 'Simulation und Berechnung', completed: false },
      { id: '4', title: 'Prototyp-Entwicklung', completed: false },
      { id: '5', title: 'Dokumentation', completed: false },
    ],
    participants: [],
    ownerId: 'user_123', // Same as currentUserId - user ist Owner
  });
  const [projectsVisible, setProjectsVisible] = useState(true);

  // Study Milestones State
  const [studyMilestones, setStudyMilestones] = useState<StudyMilestone[]>([
    { id: '1', title: 'Grundstudium (1.-2. Semester)', completed: true },
    { id: '2', title: 'Hauptstudium (3.-4. Semester)', completed: true },
    { id: '3', title: 'Projektarbeit', completed: false },
    { id: '4', title: 'Praxissemester', completed: false },
    { id: '5', title: 'Vertiefungsstudium', completed: false },
    { id: '6', title: 'Bachelor-Thesis', completed: false },
  ]);
  const [studyVisible, setStudyVisible] = useState(true);

  const handleMilestoneToggle = (milestoneId: string) => {
    setStudyMilestones(milestones =>
      milestones.map(milestone =>
        milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone
      )
    );
  };

  // Semester Progress State
  const [semesterData, setSemesterData] = useState<SemesterData[]>([
    { 
      semester: 1, 
      labs: [
        { 
          id: '1', 
          name: 'Physik-Labor', 
          location: 'Gebäude A, Raum 101', 
          semester: 1,
          preparation: 'Grundlagen wiederholen',
          startDate: '2025-10-06', // Monday
          frequency: 'weekly'
        }
      ], 
      preparation: 'Grundlagen der Elektrotechnik wiederholen' 
    },
    { 
      semester: 2, 
      labs: [
        { 
          id: '2', 
          name: 'Elektronik-Labor', 
          location: 'Gebäude A, Raum 203', 
          semester: 2,
          preparation: 'Schaltpläne vorbereiten',
          startDate: '2025-10-08', // Wednesday
          frequency: 'biweekly'
        }
      ], 
      preparation: 'Schaltungsanalyse vorbereiten' 
    },
    { semester: 3, labs: [], preparation: '' },
    { semester: 4, labs: [], preparation: '' },
    { semester: 5, labs: [], preparation: '' },
    { semester: 6, labs: [], preparation: '' },
  ]);
  const [semesterVisible, setSemesterVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new particle at cursor position
      const newParticle: StreamParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        age: 0,
      };
      
      setStreamParticles(prev => [...prev, newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate and clean up particles
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamParticles(prev => {
        // Age all particles and remove old ones
        return prev
          .map(p => ({ ...p, age: p.age + 1 }))
          .filter(p => p.age < 30); // Keep particles for ~30 frames
      });
    }, 50); // Update every 50ms

    return () => clearInterval(interval);
  }, []);

  // Beispiel-Profil (später aus Datenbank)
  const studentProfile: StudentProfile = {
    // Automatisch aus Datenbank
    name: 'Max Mustermann',
    email: 'max.mustermann@hochschule.de',
    university: 'Hochschule Karlsruhe',
    studyProgram: 'Elektro- und Informationstechnik',
    level: 3, // Level 1-6 → bestimmt die Farbe (1=Blau, 2=Grün, 3=Orange, 4=Lila, 5=Rot, 6=Gold)
    
    // Vom Studenten wählbar
    specialization: 'Elektrotechnik',
    motivationImageUrl: 'https://images.unsplash.com/photo-1744262056245-70eefd885e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RpdmF0aW9uJTIwaW5zcGlyYXRpb24lMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYxMTYxMjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Leidenschaftlicher Student der Elektrotechnik mit Fokus auf erneuerbare Energien und intelligente Stromnetze. Fasziniert von der Kraft der Elektrizität und ihrer Rolle in der nachhaltigen Zukunft.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
  };

  const backgroundColors: Record<ColorTheme, { via: string; particle: string; grid: string }> = {
    blue: { via: 'rgb(23, 37, 84)', particle: 'rgba(96, 165, 250, 0.2)', grid: 'rgba(59, 130, 246, 0.03)' },
    orange: { via: 'rgb(67, 20, 7)', particle: 'rgba(251, 146, 60, 0.2)', grid: 'rgba(249, 115, 22, 0.03)' },
    green: { via: 'rgb(6, 46, 37)', particle: 'rgba(74, 222, 128, 0.2)', grid: 'rgba(34, 197, 94, 0.03)' },
    red: { via: 'rgb(69, 10, 10)', particle: 'rgba(248, 113, 113, 0.2)', grid: 'rgba(239, 68, 68, 0.03)' },
    purple: { via: 'rgb(46, 16, 101)', particle: 'rgba(192, 132, 252, 0.2)', grid: 'rgba(168, 85, 247, 0.03)' },
    gold: { via: 'rgb(66, 53, 3)', particle: 'rgba(250, 204, 21, 0.2)', grid: 'rgba(234, 179, 8, 0.03)' },
  };

  // Bestimme die aktuelle Farbe basierend auf colorTheme oder Level
  const levelColors: ColorTheme[] = ['blue', 'green', 'orange', 'purple', 'red', 'gold'];
  const effectiveColorTheme = colorTheme || levelColors[studentProfile.level - 1];
  const currentBg = backgroundColors[effectiveColorTheme];

  return (
    
    <div 
      className="min-h-screen relative transition-colors duration-700"
      style={{
        background: isOn 
          ? `linear-gradient(to bottom, rgb(248, 250, 252), ${currentBg.via.replace('rgb', 'rgba').replace(')', ', 0.1)')}, rgb(241, 245, 249))`
          : `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      {/* Metallic Background Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: isOn 
            ? 'radial-gradient(circle at 30% 50%, rgba(200, 200, 220, 0.4), transparent 60%), radial-gradient(circle at 70% 50%, rgba(180, 180, 200, 0.3), transparent 60%)'
            : 'radial-gradient(circle at 30% 50%, rgba(100, 110, 130, 0.15), transparent 50%), radial-gradient(circle at 70% 50%, rgba(80, 90, 110, 0.12), transparent 50%)',
          backgroundSize: '200% 200%',
          animation: 'metallicShift 20s ease-in-out infinite',
        }}
      />

      {/* Cursor Glow Effect - Balanced */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-200"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentBg.particle.replace('0.2', '0.18')}, transparent 40%)`,
        }}
      />

      {/* Electric Stream Following Cursor */}
      {streamParticles.map((particle) => {
        const opacity = Math.max(0, 1 - particle.age / 30);
        const size = 2 + (particle.age / 15); // Grow slightly
        const blur = particle.age / 10;
        
        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: particle.x - size / 2,
              top: particle.y - size / 2,
              width: size,
              height: size,
              opacity,
            }}
          >
            {/* Main particle */}
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: currentBg.particle.replace('0.2', '1'),
                boxShadow: `0 0 ${8 + blur * 2}px ${currentBg.particle.replace('0.2', '0.8')}, 0 0 ${16 + blur * 4}px ${currentBg.particle.replace('0.2', '0.4')}`,
                filter: `blur(${blur * 0.5}px)`,
              }}
            />
            
            {/* Electric arc effect */}
            {particle.age < 10 && particle.age % 3 === 0 && (
              <div 
                className="absolute top-0 left-1/2 w-0.5 rounded-full"
                style={{
                  height: `${Math.random() * 8 + 4}px`,
                  background: `linear-gradient(to bottom, ${currentBg.particle.replace('0.2', '0.9')}, transparent)`,
                  transform: `translateX(-50%) rotate(${Math.random() * 360}deg)`,
                  transformOrigin: 'top',
                  boxShadow: `0 0 4px ${currentBg.particle.replace('0.2', '0.8')}`,
                }}
              />
            )}
          </div>
        );
      })}

      {/* Subtle background grid */}
      <div 
        className="absolute inset-0 bg-[size:50px_50px]"
        style={{
          backgroundImage: `linear-gradient(${currentBg.grid} 1px, transparent 1px), linear-gradient(90deg, ${currentBg.grid} 1px, transparent 1px)`,
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full transition-colors duration-700"
            style={{
              backgroundColor: currentBg.particle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Profile Section */}
      <div className="relative flex items-center justify-center p-4 min-h-screen">
        <div className="relative z-10 w-full">
          <ProfileCard profile={studentProfile} colorTheme={colorTheme} />
        </div>
        
        {/* Color Picker - für Demo/Vorschau */}
        <ColorPicker 
          selectedColor={effectiveColorTheme} 
          onColorChange={setColorTheme} 
        />
      </div>

      {/* Content Section */}
      <div className="relative p-8 min-h-screen">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Text, Motivation Image and Projects */}
            <div className="space-y-6">
              <h2 className={clsx("mb-4", isOn ? "text-slate-900" : "text-white")}>Weitere Inhalte</h2>
              
              <p className={clsx("mb-8", isOn ? "text-slate-600" : "text-slate-300")}>
                Hier kannst du weiter designen...
              </p>

              {/* Motivation Image - nur anzeigen wenn vorhanden */}
              {studentProfile.motivationImageUrl && (
                <div className="relative overflow-hidden rounded-xl border border-blue-500/20 group shadow-lg">
                  {/* Glow effect */}
                  <div 
                    className="absolute -inset-1 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(45deg, ${currentBg.particle.replace('0.2', '0.6')}, transparent, ${currentBg.particle.replace('0.2', '0.6')})`,
                    }}
                  />
                  
                  <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-xl overflow-hidden">
                    <ImageWithFallback 
                      src={studentProfile.motivationImageUrl}
                      alt="Motivationsbild"
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Electric overlay effect on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundImage: `linear-gradient(to top, ${currentBg.particle.replace('0.2', '0.3')}, transparent, transparent)`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Project Section - nur anzeigen wenn sichtbar ODER User ist Owner/Participant */}
              {(projectsVisible || projectData.ownerId === currentUserId || projectData.participants.some((p: { id: string }) => p.id === currentUserId)) && (
                <ProjectSection 
                  colorTheme={effectiveColorTheme}
                  projectData={projectData}
                  onProjectUpdate={setProjectData}
                  currentUserId={currentUserId}
                  isVisible={projectsVisible}
                  onVisibilityToggle={() => setProjectsVisible(!projectsVisible)}
                />
              )}
            </div>

            {/* Right Side: Calendar and Study Checklist */}
            <div className="space-y-6 flex flex-col">
              <div className="flex items-end justify-end">
                <MiniCalendar currentBg={currentBg} isOn={isOn} semesterData={semesterData} />
              </div>

              {/* Study Checklist - nur anzeigen wenn sichtbar ODER User ist Owner */}
              {(studyVisible || isOwner) && (
                <StudyChecklist 
                  colorTheme={effectiveColorTheme}
                  milestones={studyMilestones}
                  onMilestoneToggle={handleMilestoneToggle}
                  isOwner={isOwner}
                  isVisible={studyVisible}
                  onVisibilityToggle={() => setStudyVisible(!studyVisible)}
                />
              )}

              {/* Semester Progress - nur anzeigen wenn sichtbar ODER User ist Owner */}
              {(semesterVisible || isOwner) && (
                <SemesterProgress 
                  colorTheme={effectiveColorTheme}
                  semesterData={semesterData}
                  onSemesterUpdate={setSemesterData}
                  isOwner={isOwner}
                  isVisible={semesterVisible}
                  onVisibilityToggle={() => setSemesterVisible(!semesterVisible)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Theme Toggle Switch - Fixed Bottom Right */}
      {/*<ToggleSwitch isOn={isOn} setIsOn={setIsOn} />*/}

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
        }
        
        @keyframes metallicShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}

