
export interface TeamData {
    firstname: string;
    lastname: string;
    role_name: string;
    role_email: string;
}

export async function fetchTeamData(): Promise<TeamData[]> {
    const API_url = process.env.NEXT_PUBLIC_TEAMS_API_KEY;

    if (!API_url) {
        throw new Error("NEXT_PUBLIC_TEAMS_API_KEY is not defined");
    }
    const response = await fetch(API_url);
    
    const data = await response.json();
    
    return data;
}

export function sortbyrole(teamData: TeamData[]): TeamData[] {
    const rolessorted = [
        'Vorsitzender',
        'Finanzer',
        'Schriftführer',
        'Fachschafts-Mutti',
        'IT',
        'Techniker',
        'Pizza und Eis dream Team',
        'Getränke Wart',
        'O-Phasen team',
        'Event Team',
        'Social Media',
    ]
    return [...teamData].sort((a, b) => {
        const roleA = rolessorted.indexOf(a.role_name);
        const roleB = rolessorted.indexOf(b.role_name);
        return roleA - roleB;
    });
}

// Daten nach Rolle gruppieren
export function groupByRolle(teamData: TeamData[]): Record<string, TeamData[]> {
  return teamData.reduce((groups, member) => {
    const rolle = member.role_name;
    if (!groups[rolle]) {
      groups[rolle] = [];
    }
    groups[rolle].push(member);
    return groups;
  }, {} as Record<string, TeamData[]>);
}