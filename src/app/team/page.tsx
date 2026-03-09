"use client";
import React from "react";
import NavBar from "@/components/navbar";
import Construction from "@/components/construction";
import Footer from "@/components/footer";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import Folder from "@/components/Folder";

const fertig = true; // ist eine Variable die vermeidet die nicht fertige Website zu zeigen
const sizeoffolder = 2.5; // Größe der Folder, kann je nach Bedarf angepasst werden

interface PaperData {
  id: number;
  title: string;
  description?: string;

  // weitere Felder je nach Bedarf
}


export default function Team() {
      const { currentBg } = useThemeContext();
      const [paperData, setPaperData] = useState<PaperData[]>([]);
      useEffect(() => {
    // Daten von der API abrufen
    fetch('/api/dein-endpoint')
      .then(res => res.json())
      .then(data => setPaperData(data));
  }, []);
  // Die JSON-Daten in React-Elemente für die Papers umwandeln
  const paperItems = paperData.map(paper => (
    <div key={paper.id} className="p-2 text-xs">
      <h4 className="font-bold">{paper.title}</h4>
      <p>{paper.description}</p>
    </div>
  ));
  if (!fertig) {
      return (
      <div>
        <Construction />
      </div>
    );
  }
  return (
  <div 
    className="min-h-screen transition-colors duration-700"
    style={{
      background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
    }}
    >
    <NavBar />
    <div className="flex flex-col items-center justify-center h-full w-full pt-[60px]">
      <h1 className="text-4xl font-bold text-center font-montserrat font-extralight justify-center dark:text-white text-black place-self-center py-10">
        Fachschaftler und deren zuständigen Bereiche
      </h1>
      <div className="center grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-85 p-55">
      
      <Folder size={sizeoffolder} color="#288732" className="custom-folder" label= "Vorsitzender"
      icon={<img src= "/images/Amter_Icons/Vorstand.svg" alt="Vorstand Icon" className="w-6 h-6"/>}
      items={[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Vorsitzender</h4>
        <h5 className= "font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Der Vorsitzender ist das Leitungsgremium der Fachschaft. 
          Er koordiniert die Aktivitäten der Fachschaft, vertritt die Interessen der Studierenden 
          gegenüber der Universität und organisiert die Sitzungen.</p>
      </div>,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Vorsitzender</h4>
        <h5 className ="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Vertritt die Fachschaft nach außen</p>
        <p>- Verwaltet die Fachschaft </p>
        <p>- Organisiert und führt die Sitzungen </p>
        <p>- Ist für die Erstellung und Verwaltung von Zugängen für Räume zuständig</p>
      </div>
    ]}
       />

       <Folder size={sizeoffolder} color="#d72305" className="custom-folder" label= "Finanzer"
       icon={<img src= "/images/Amter_Icons/Finanzer.svg" alt="Finanzen Icon" className="w-6 h-6"/>}
      items={[ 
      <div key="1" className="p-2 text-xs">
        <h4 className="font-bold">Finanzer</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Die Finanzer kümmern sich um die finanzielle Verwaltung der Fachschaft, 
           die Abrechnung von Ausgaben und verwaltungen der Kassen bei Veranstaltungen.</p>
      </div>,
      <div key="2" className="p-2 text-xs">
        <h4 className="font-bold">Finanzer</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Führt die Finanzlisten</p>
        <p>- Bezahlt ausstehende Rechnungen der Fachschaft</p>
        <p>- Ist für die Verwaltung der Schlüssel (Metallschrank- und Safe-Schlüssel) zuständig</p>
        <p>- Ist für die Verwaltung des Safes und alles was sich dadrin befindliche zuständig</p>
      </div>
    
    ]}
      />

      <Folder size={sizeoffolder} color="#1b05ab" className="custom-folder " label= "Schriftführer"
      icon={<img src= "/images/Amter_Icons/Schriftführer.svg" alt="Schriftführer Icon" className="w-6 h-6"/>}
      items={[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Schriftführer</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Die Schriftführer kümmern sich um die Dokumentation der Sitzungen in der Fachschaft, 
          sowie die Erstellung von Protokollen und anderen relevanten Dokumenten.</p>
      </div> ,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Schriftführer</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Gibt die Anwesenheitsliste während der Fachschaftssitzung aus und heftet diese danach ab </p>
        <p>- hängt das aktuelle Protokoll im Glasschaukasten auf und archiviert alte Protokolle</p>
        <p>- Druckt bei Abstimmungen über Budget genug Protokoll aus, um diese an Haushaltsanträge anzuhängen</p>
        <p>- Allgemeine Organisation des Schaukastens/schwarzes Brett (aussortieren aller Aushänge, etc.)</p>
      </div> 
    ]}
      />
      
      <Folder size={sizeoffolder} color="#d606a9" className="custom-folder" label= "Fachschafts-Mutti"
      icon={<img src= "/images/Amter_Icons/Fachschafts-Mutti.svg" alt="Fachschafts-Mutti Icon" className="w-6 h-6"/>}
      items ={[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Fachschafts-Mutti</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Die Fachschafts-Mutti kümmert sich um die Organisation und Die Sauberkeit im Fachsaftsraum.
          Sie sorgt dafür, dass der Raum ordentlich und einladend bleibt, damit sich alle Studierenden wohl fühlen.
        </p>
      </div>,
      <div key ="2" className="p-2 text-xs">
        <h4 className="font-bold">Fachschafts-Mutti</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>Ist für die Sauberkeit und Ordnung in der Fachschaft zuständig</p>
        <p>Behält den Überblick über den Bestand von Putzzeug (z.B. Putzlappen, Spülmittel, Spülmaschinentabs, usw.)</p>
        <p>Verwaltet das Fachschafts-Lager und führt die Lagerliste</p>
        <p>Ist für Leihanträge und das Ausleihen von Fachschaftszeug (welches über gewerbliche Gelder gekauft wurde) zuständig</p>
      </div>
    ]}
      />

      <Folder size={sizeoffolder} color="#e09615" className="custom-folder" label= "IT" 
      icon={<img src= "/images/Amter_Icons/IT.svg" alt="IT Icon" className="w-6 h-6"/>}
      items={[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">IT-Team</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Das IT-Team kümmert sich um die technische Infrastruktur der Fachschaft, 
          wie z.B. die Website, E-Mail-Verteiler und andere digitale Tools.</p>
      </div> ,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">IT-Team</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>-Führt die Fachschaftscloud </p>
        <p>-Verwaltet die Zugriffsrechte auf die Cloudordner</p>
        <p>-Sortiert die Sachen aus dem Upload Ordner</p>
        <p>-Verteilt die Rollen für die Zugriffe auf die einzelnen Ordner</p>
        <p>-Ist Ansprechpartner für alles Rund um die Cloud</p>
        <p>-Verwaltet die Website</p>
      </div>
    ]}
      />
      
      <Folder size={sizeoffolder} color="#796ccd" className="custom-folder" label= "Techniker" 
      icon={<img src= "/images/Amter_Icons/Techniker.svg" alt="Techniker Icon" className="w-6 h-6"/>}
      items={[ 
      <div key ="1"className="p-2 text-xs">
      <h4 className="font-bold">Techniker</h4>
      <p>Das Techniker-Team kümmert sich um die technischen Geräte und Ausrüstung der Fachschaft, 
        wie z.B. die Projektoren, Lautsprecher und andere technische Geräte.</p>
    </div> ,
     <div key="2" className="p-2 text-xs">
        <h4 className="font-bold">Techniker</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Stellt sicher, dass alle Geräte funktionsfähig sind</p>
        <p>- Kümmert sich um die technische Unterstützung bei Veranstaltungen</p>
        <p>Kümmert sich um die Technik der Fachschaft </p>
        <p>Behält den Überblick über den Bestand der Technik in der Fachschaft </p>
        <p>Ist Ansprechpartner bei Problemen mit der Technik (z.B. mit der Musikanlage)</p>
        <p>Drucker + Verbrauchsmaterial</p>
     </div>
    ]}
      />

      <Folder size={sizeoffolder} color="#52b52e" className="custom-folder" label= "Pizza und Eis dream Team"
      icon={<img src= "/images/Amter_Icons/zza und Eis dream Team.svg" alt="Pizza und Eis Icon" className="w-6 h-6"/>}
      items= {[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Pizza und Eis dream Team</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Das Pizza und Eis dream Team kümmert sich um die Bestellung von Pizza und Eis, 
          und sind die hauptverantwortlichen für das Glück und wohlbefinden der Fachschaftler.</p>
        </div> ,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Pizza und Eis dream Team</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Kümmert sich um die Bestellung und den Verkauf von Pizza und Eis</p>
        <p>- Organisiert die Verteilung der Pizza und Eis an die Studierenden</p>
        <p>- kan ggf. das Pfand aus dem PfandKarton abgeben und das Altglas entsorgen</p>
      </div>
        ]}
      />

      <Folder size={sizeoffolder} color="#1fe5de" className="custom-folder" label= "Getränke Wart"
      icon={<img src= "/images/Amter_Icons/Getränke Wart.svg" alt="Getränke Wart Icon" className="w-6 h-6"/>}
      items={[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Getränke Wart</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Der Getränke Wart kümmert sich um die Bestellung und Verwaltung der Getränke in der Fachschaft,
          damit bei Veranstaltungen und in der Fachschaft immer ausreichend Getränke zur Verfügung stehen.</p>
      </div> ,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Getränke Wart</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Kümmert sich um die Bestellung und Verwaltung der Getränke in der Fachschaft</p>
        <p>- Stellt sicher, dass immer ausreichend Getränke zur Verfügung stehen</p>
        <p>- Organisiert die Getränkeverteilung bei Veranstaltungen</p>
      
      </div>
      ]}
      />

      <Folder size={sizeoffolder} color="#e5d41f" className="custom-folder" label= "O-Phasen team"
      icon={<img src= "/images/Amter_Icons/O-Phasen team.svg" alt="O-Phasen Icon" className="w-6 h-6"/>}
      items ={[ 
      <div key ="1" className="p-2 text-xs">
        <h4 className="font-bold">O-Phasen Team</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Das O-Phasen Team organisiert die O-phasen für die neuen Studierenden, 
          um ihnen den Einstieg ins Studium zu erleichtern und sie mit der Fachschaft vertraut zu machen.</p>
      </div> ,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">O-Phasen Team</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Organisiert die O-Phasen für die neuen Studierenden</p>
        <p>- Plant Aktivitäten und Veranstaltungen für die O-Phasen</p>
        <p>- Koordiniert die O-Phasen mit anderen Teams und der Universität</p>
      </div>
    ]}
      />

      <Folder size={sizeoffolder} color="#5865f2" className="custom-folder" label= "Event team"
      icon={<img src= "/images/Amter_Icons/Event team.svg" alt="Event Icon" className="w-6 h-6"/>}
      items = {[ 
      <div key = "1" className ="p-2 text-xs">
        <h4 className="font-bold">Events-Team</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Das Events-Team organisiert Veranstaltungen und Aktivitäten für die Studierenden, 
          wie z.B. Partys und andere soziale Events wie das Mario Kart Turnier.</p>
      </div> ,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Events-Team</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Organisiert Veranstaltungen und Aktivitäten für die Studierenden</p>
        <p>- Plant Veranstaltungen und meldet diese ggf. an</p>
        <p>-Besorgt das nötige Zeug für die geplanten Veranstaltungen (nach Absprache mit den Finanzer-n/-innen)</p>
        <p>-Sucht Helfer für die geplanten Veranstaltungen</p>

      </div>
    ]}
      />
      
      <Folder size={sizeoffolder} color="#8f0cbb" className="custom-folder" label= "Social Media"
      icon={<img src= "/images/Amter_Icons/Social Media.svg" alt="Social Media Icon" className="w-6 h-6"/>}
      items={[ 
      <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Social Media</h4>
        <p>Das Social Media-Team kümmert sich um die Online-Präsenz der Fachschaft, 
          wie z.B. die Facebook- und Instagram-Kanäle.</p>
      </div>,
      <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Social Media</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Pflegt die Online-Präsenz der Fachschaft</p>
        <p>- Führt die Fachschaftscloud</p>
        <p>- Sortiert die Sachen aus dem Upload Ordner</p>
        <p>- Verteilt die Rollen für die Zugriffe auf die einzelnen Ordner</p>
        <p>- Ist Ansprechpartner für alles Rund um die Cloud</p>
        <p>- Verwaltet die Website</p>
      </div>
     ]}
      />

      <Folder size={sizeoffolder} color="#473e82" className="custom-folder" label= "Firmenbeauftragter"
      icon={<img className="change-my-color" src= "/images/Amter_Icons/Firmenbeauftragter.svg" alt="Firmenbeauftragter Icon" className="w-6 h-6"/>}
      items={[ <div key = "1" className="p-2 text-xs">
        <h4 className="font-bold">Firmenbeauftragter</h4>
        <h5 className="font-bold text-black dark:text-Green">Beschreibung</h5>
        <p>Der Firmenbeauftragte ist für die Pflege der Beziehungen zwischen der Fachschaft und den Unternehmen zuständig, 
          die Praktika, Abschlussarbeiten oder andere Kooperationen mit der Fachschaft anbieten.</p>
      </div> ,
        <div key = "2" className="p-2 text-xs">
        <h4 className="font-bold">Firmenbeauftragter</h4>
        <h5 className="font-bold text-black dark:text-black">Aufgaben</h5>
        <p>- Stellt Kontakt zu Firmen her</p>
        <p>- Organisiert Exkursionen</p>
        <p>- Kümmert sich um die Beschaffung von O-Phasen „Goodies“</p>
        <p>- Praxissemester Berichte verwalten</p>
        </div>
      ]}
      />
      
      </div>
      <h2 className="text-2xl font-bold text-center font-montserrat font-extralight justify-center dark:text-white text-black place-self-center py-10">
        Wenn du Interesse hast, in einem der Teams mitzuarbeiten, dann melde dich gerne bei uns über unsere Social Media Kanäle oder per Mail an denn Vorstand!
        Was du auch machen kannst ist bei Interresse an der Fachschaft kannst du gerne zu Unsreren Fachscahafts Sitzungen kommen, die immer Mittwochs um 11:30 in Raum 307 stattfinden!
      </h2>
    </div>
  </div>
  );
}
