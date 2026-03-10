"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import Construction from "@/components/construction";
import AnimatedList from "@/components/AnimatedList";
import FadeContent from "@/components/FadeContent";
const fertig = true;
const items = ['item 1', 'spotify', 'Youtube'];
export default function App() {
  const { currentBg } = useThemeContext();

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
      //backgroundColor: currentBg 
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
