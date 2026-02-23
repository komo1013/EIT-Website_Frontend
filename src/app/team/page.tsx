"use client";
import NavBar from "@/components/navbar";
import Construction from "@/components/construction";
import Footer from "@/components/footer";
import { useThemeContext } from "@/contexts/ThemeContext";

const fertig = true; // ist eine Variable die vermeidet die nicht fertige Website zu zeigen

export default function Team() {
      const { currentBg } = useThemeContext();
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
    </div>
  </div>
  );
}
