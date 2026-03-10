"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import Construction from "@/components/construction";
import AnimatedList from "@/components/AnimatedList";
import FadeContent from "@/components/FadeContent";

const fertig = true;

// Item-Daten mit Details für den Info-Block
const itemsData = {
  'GitHub Education': {
    title: 'GitHub Education',
    beschreibung: 'Kostenloser Zugang zu GitHub Pro, JetBrains IDEs, und vielen weiteren Developer-Tools.',
    preis: 'Kostenlos',
    link: 'https://education.github.com/pack',
    kategorie: 'Rabatte',
    Availabledirectlyonwebsite : true
  },
  'Spotify': {
    title: 'Spotify Premium',
    beschreibung: 'Musik-Streaming ohne Werbung mit Offline-Modus.',
    preis: '5,99€/Monat',
    link: 'https://www.spotify.com/de/student/',
    kategorie: 'Unterhaltung',
    Availabledirectlyonwebsite : true
  },
  'Youtube': {
    title: 'YouTube Premium',
    beschreibung: 'Werbefreies YouTube und YouTube Music inklusive.',
    preis: '7,49€/Monat',
    link: 'https://www.youtube.com/premium/student',
    kategorie: 'Unterhaltung',
    Availabledirectlyonwebsite : true
  },
  'Amazon Prime Video': {
    title: 'Amazon Prime Student',
    beschreibung: '6 Monate kostenlos testen, danach halber Preis für Prime mit Video, Music und Versand.',
    preis: '4,49€/Monat nach Probezeit',
    link: 'https://www.amazon.de/prime/student',
    kategorie: 'Unterhaltung',
    Availabledirectlyonwebsite : false,
    Availability: 'Erfordert eine Ganz normale Anmeldung bei Amazon und dann beim Profil unter Prime Managment sich verifizieren zu lassen '
  },
  'Adobe Creative Cloud': {
    title: 'Adobe Creative Cloud',
    beschreibung: 'Photoshop, Illustrator, Premiere Pro und alle Adobe Apps mit 65% Rabatt.',
    preis: '~19,50€/Monat (für Creative Cloud Pro)',
    link: 'https://www.adobe.com/de/creativecloud/plans.html',
    kategorie: 'Kreativität',
    Availabledirectlyonwebsite : true
  },
  'Microsoft 365': {
    title: 'Microsoft 365 Education',
    beschreibung: 'Word, PowerPoint, Excel und Teams kostenlos für Studierende zum Download und nicht nur die web apps.',
    preis: ' Kostet 4,39€',
    link: 'https://bildung365.de/index.htm?entityID=https%3A%2F%2Fbildung365.de%2Fshibboleth&return=https%3A%2F%2Fbildung365.de%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dss%253Amem%253A201d7a26f93ae384b1d1aee7d9489f036f7f651fd62dbd5aae570cb6ef7fd7ac',
    kategorie: 'Produktivität'
  },
  'Günstigere Kranken Versicherungen': {
    title: 'Studenten Krankenversicherung',
    beschreibung: 'Vergünstigte Krankenversicherungstarife speziell für Studierende. GIbt es bei vielen Anbietern ',
    preis: 'Variiert je nach Anbieter',
    link: '#',
    kategorie: 'Versicherung'
  },
  'Studitickets für Öffentliche Verkehrs mittel': {
    title: 'Semesterticket / Deutschlandticket',
    beschreibung: 'Günstiger ÖPNV mit vergünstigtem Deutschlandticket und der Studikarte die nachts als fahr Ticket dienen kann.',
    preis: 'Variiert nach Bundesland',
    link: '#',
    kategorie: 'Mobilität'
  },
  'Bafög - Finanzielle Unterstützung für Studenten': {
    title: 'BAföG',
    beschreibung: 'Staatliche Förderung für Studierende. Bei BAföG-Bezug auch GEZ-Befreiung möglich!',
    preis: 'Bis zu 934€/Monat',
    link: 'https://www.bafög.de/bafoeg/de/das-bafoeg-alle-infos-auf-einen-blick/_documents/bafoeg-fuer-schuelerinnen-und-schueler.html',
    kategorie: 'Finanzen'
  },
  'Unidays': {
    title: 'Unidays',
    beschreibung: 'Plattform für Studentenrabatte bei vielen bekannten Marken.',
    preis: 'Kostenlose Anmeldung',
    link: 'https://www.myunidays.com/DE/de-DE',
    kategorie: 'Rabatte',
    Availabledirectlyonwebsite : true
  },
  'Studentbeans App': {
    title: 'Student Beans',
    beschreibung: 'App mit exklusiven Studentenrabatten bei verschiedenen Shops.',
    preis: 'Kostenlose App',
    link: 'https://www.studentbeans.com/de',
    kategorie: 'Rabatte',
    Availabledirectlyonwebsite : true
  },
  'Apple Music': {
    title: 'Apple Music Student',
    beschreibung: 'Apple Music Abo zum vergünstigten Studentenpreis.',
    preis: '5,99€/Monat',
    link: 'https://www.apple.com/de/apple-music/#plans',
    kategorie: 'Unterhaltung',
    Availabledirectlyonwebsite : true
  },
  'Onscape': {
    title: 'Onscape',
    beschreibung: 'Kreatives Tool für Studierende. (CAD-system)',
    preis: 'sehr Günstig für individuelle Lizenzen',
    link: 'https://www.onshape.com/de/pricing',
    kategorie: 'Kreativität',
    Availabledirectlyonwebsite : true
  },
  'Günstige flüge Flaya': {
    title: 'Flyla - Studentenflüge',
    beschreibung: 'Günstige Flüge speziell für Studierende unter 27 Jahren.',
    preis: 'Vergünstigte Preise',
    link: 'https://www.flyla.de/',
    kategorie: 'Reisen',
    Availabledirectlyonwebsite : true
  },
  'canva Pro': {
    title: 'Canva Pro for Education',
    beschreibung: 'Professionelles Design-Tool mit allen Pro-Features für Studierende.',
    preis: 'Kostenlos',
    link: 'https://www.canva.com/education/',
    kategorie: 'Kreativität',
    Availabledirectlyonwebsite : true
  },
  'Overleaf': {
    title: 'Overleaf',
    beschreibung: 'Online LaTeX-Editor für wissenschaftliche Arbeiten.',
    preis: 'Es Gibt ein Gratis Abo mit allen wichtigen Funktionen',
    link: 'https://www.overleaf.com/user/subscription/plans',
    kategorie: 'Produktivität',
    Availabledirectlyonwebsite : true
  },
  'Notion': {
    title: 'Notion Plus',
    beschreibung: 'All-in-One Workspace für Notizen, Projekte und Dokumentation.',
    preis: 'Kostenlos mit Uni-Mail',
    link: '#',
    kategorie: 'Produktivität',
    Availabledirectlyonwebsite : false,
    Availability: 'Notion bietet keinen direkten Studentenrabatt mehr an, Aber über Github edducation kann man ein zugriff zuden Education vorteile von Notion.'
  },
  'Windows S': {
    title: 'Windows & Microsoft Tools',
    beschreibung: 'Kostenlose Windows-Lizenzen und Entwickler-Tools über Azure Dev Tools.',
    preis: 'Kostenlos',
    link: 'https://azure.microsoft.com/de-de/free/students/',
    kategorie: 'Entwicklung',
    Availabledirectlyonwebsite : true
  },
  'Figma Education': {
    title: 'Figma Professional (Education)',
    beschreibung: 'Der Industrie-Standard für UI/UX Design - komplett kostenlos für Studenten.',
    preis: 'Kostenlos (spart ~15€/Monat)',
    link: 'https://www.figma.com/education/',
    kategorie: 'Design',
    Availabledirectlyonwebsite : true,
  },
  '1Password': {
    title: '1Password',
    beschreibung: 'Einer der besten Passwortmanager - über GitHub Student Pack kostenlos.',
    preis: '1 Jahr kostenlos',
    link: '#',
    kategorie: 'Produktivität',
    Availabledirectlyonwebsite : false,
    Availability: '1Password bietet keinen direkten Studentenrabatt mehr an, aber über den GitHub Student Pack kann man einen kostenlosen Zugang zu den Education-Vorteilen erhalten.'
  },
};
// Alle einzigartigen Kategorien extrahieren
const alleKategorien = [...new Set(Object.values(itemsData).map(item => item.kategorie))];

const items = Object.keys(itemsData);



export default function App() {
  const { currentBg } = useThemeContext();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedKategorie, setSelectedKategorie] = useState(null); // null = alle anzeigen
  const filteredItems = selectedKategorie 
    ? items.filter(itemName => itemsData[itemName].kategorie === selectedKategorie)
    : items;
  // Funktion die beim Anklicken eines Items aufgerufen wird
  const handleItemSelect = (itemName) => {
    const itemInfo = itemsData[itemName];
    setSelectedItem(itemInfo);
  };

  if (!fertig) {
    return (
      <div>
        <Construction />
      </div>
    );
  }
  return (
    <div className="min-h-screen" 
    style={{ 
      background: `linear-gradient(to bottom, ${currentBg.darker}, ${currentBg.via}, ${currentBg.dark})`,
      }}>
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-[80px]">
        <h1 className="text-4xl font-bold mb-6 text-white">Vorteile für Studenten</h1>
        <div className="flex flex-wrap gap-2 mb-6 justify-center max-w-4xl px-4">
         <button
           onClick={() => setSelectedKategorie(null)}
           className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
             selectedKategorie === null 
               ? 'bg-white text-gray-900' 
               : 'bg-white/20 text-white hover:bg-white/30'
           }`}
          >
           Alle
          </button>
          {alleKategorien.map((kategorie) => (
            <button
              key={kategorie}
              onClick={() => setSelectedKategorie(kategorie)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedKategorie === kategorie 
                  ? 'bg-white text-gray-900' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {kategorie}
            </button>
          ))}
         </div>
        
        {/* Container für Liste und Info-Block nebeneinander */}
        <div className="flex flex-row gap-8 items-start justify-center w-full max-w-6xl px-4">
          
          {/* Linke Seite: AnimatedList */}
          <FadeContent blur={true} duration={1000} delay={0.2}>
            <AnimatedList 
              items={filteredItems} 
              key='vorteile-studenten-list'
              width='400px'
              height='1000px'
              showGradients={false}
              onItemSelect={handleItemSelect}
              sorted = {true}
            />
          </FadeContent>

          {/* Rechte Seite: Info-Block */}
          <FadeContent blur={true} duration={500} delay={0}>
            <div 
              className="w-[400px] min-h-[300px] rounded-xl p-6 backdrop-blur-md transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {selectedItem ? (
                <div className="text-white">
                  {/* Kategorie Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    {selectedItem.kategorie}
                  </span>
                  
                  {/* Titel */}
                  <h2 className="text-2xl font-bold mb-3">{selectedItem.title}</h2>
                  
                  {/* Beschreibung */}
                  <p className="text-gray-200 mb-4 leading-relaxed">
                    {selectedItem.beschreibung}
                  </p>
                  
                  {/* Preis */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400">Preis:</span>
                    <span className="font-semibold text-green-400">{selectedItem.preis}</span>
                  </div>
                  
                  {/* Link Button */}
                  {selectedItem.link !== '#' && (
                    <a 
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                      }}
                    >
                      Zur Website →
                    </a>
                  )}
                  {/* Verfügbarkeitsinfo für Items ohne direkten Rabatt */}
                  {!selectedItem.Availabledirectlyonwebsite && (
                    <p className="text-sm text-yellow-400 mt-4">
                      Hinweis: {selectedItem.Availability}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[250px] text-center">
                  <span className="text-5xl mb-4">👈</span>
                  <p className="text-gray-300 text-lg">
                    Wähle einen Vorteil aus der Liste, um mehr Infos zu sehen
                  </p>
                </div>
              )}
            </div>
          </FadeContent>
        </div>
        
        <h5>wenn du noch weitere Coole Websiten kennst die Studenten wie uns aus helfen kannst du gerne Unsere ITler Kontaktieren um die Liste zu ergänzen </h5>
      </div>
    </div>
  );
}
