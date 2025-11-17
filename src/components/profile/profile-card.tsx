export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

export interface StudentProfile {
  name: string;
  email: string;
  university: string;
  studyProgram: string;
  level: number;
  specialization?: string;
  motivationImageUrl?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

interface ProfileCardProps {
  profile: StudentProfile;
  colorTheme?: ColorTheme;
}

export function ProfileCard({ profile, colorTheme }: ProfileCardProps) {
  return (
    <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
      <p className="text-lg mb-4">{profile.studyProgram}</p>
      <p className="text-sm opacity-80">{profile.university}</p>
      {profile.bio && <p className="mt-4">{profile.bio}</p>}
      <div className="mt-4 flex gap-4">
        {profile.linkedinUrl && (
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            LinkedIn
          </a>
        )}
        {profile.githubUrl && (
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
