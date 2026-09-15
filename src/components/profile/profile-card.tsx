export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

export interface StudentProfile {
  name: string;
  email: string;
  university: string;
  studyProgram: string;
  level: number;
  specialization?: string;
  specializationIcon?: string;
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
  const accentStyles: Record<ColorTheme, string> = {
    blue: 'border-blue-400/30 bg-blue-500/10 text-blue-100',
    orange: 'border-orange-400/30 bg-orange-500/10 text-orange-100',
    green: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100',
    red: 'border-red-400/30 bg-red-500/10 text-red-100',
    purple: 'border-violet-400/30 bg-violet-500/10 text-violet-100',
    gold: 'border-yellow-400/30 bg-yellow-500/10 text-yellow-100',
  };

  const accent = accentStyles[colorTheme ?? 'blue'];

  return (
    <div className="mx-auto w-[620px] rounded-xl border border-white/20 bg-white/10 p-8 backdrop-blur-md sm:items-center">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">{profile.name}</h1>
          <p className="text-lg text-slate-200">{profile.studyProgram}</p>
        </div>

        {profile.specializationIcon && (
          <div className={`flex h-25 w-25 items-center justify-center rounded-2xl border ${accent}`}>
            <img
              src={profile.specializationIcon}
              alt={profile.specialization || 'Vertiefungsbild'}
              className="h-20 w-20 object-contain"
            />
          </div>
        )}
      </div>

      {profile.specialization && (
        <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${accent}`}>
          {profile.specializationIcon && (
            <img
              src={profile.specializationIcon}
              alt=""
              className="h-4 w-4 object-contain"
            />
          )}
          <span>{profile.specialization}</span>
        </div>
      )}

      <p className="text-sm opacity-80 text-slate-300">{profile.university}</p>
      {profile.bio && <p className="mt-4 text-slate-200">{profile.bio}</p>}

      <div className="mt-4 flex gap-4">
        {profile.linkedinUrl && (
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            <img src="/images/Amter_Icons/linkdin.svg" alt="LinkedIn" className="h-4 w-4" />
          </a>
        )}
        {profile.githubUrl && (
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            <img src="/images/Amter_Icons/github.svg" alt="GitHub" className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
