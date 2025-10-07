"use client";
import NavBar from "@/components/navbar";
import Image from "next/image";

export default function Info() {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="flex flex-col pt-[60px] h-full w-full ">
        <div className="flex flex-col items-center">
          <div className="relative w-full h-100">
            <Image
              src="/images/E_PIC3172.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="inset-0 w-5/6 top-1/3 left-1/2 -translate-y-[150px] bg-white/50 backdrop-blur-md dark:bg-background/50 rounded-xl mb-[-75px]">
            <h1 className="text-4xl font-bold text-center font-montserrat font-extralight justify-center dark:text-white text-black place-self-center py-10">
              Was ist die Fachschaft?
            </h1>
            <p className="text-md text-center font-montserrat font-light dark:text-white text-black px-10 pb-10">
              Die Fachschaft, das bist <b>DU</b> , das seid <b>IHR</b> da
              draußen, jeder einzelne, der sich dazu entschlossen hat, hier an
              der Hochschule Karlsruhe Elektro- und Informationstechnik zu
              studieren.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center h-full">
          <div className="relative w-full h-100">
            <Image
              src="/images/DSC_9020.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          <div className="inset-0 w-5/6 top-1/3 left-1/2 -translate-y-[150px] bg-white/50 backdrop-blur-md dark:bg-background/50 rounded-xl mb-[-75px]">
            <h1 className="text-4xl font-bold text-center font-montserrat font-extralight justify-center dark:text-white text-black place-self-center py-10">
              Was machen wir?
            </h1>
            <p className="text-md text-center font-montserrat font-light dark:text-white text-black px-10">
              Das Aufgabenspektrum ist groß, so unterstützen wir beim Lernen auf
              Prüfungen, in dem sie dich mit Lernmaterial wie Altklausuren
              versorgen. Wir helfen euch aus und zeigen euch mögliche Wege, wenn
              ihr im Studium einmal nicht weiter wisst. Unser Ziel ist es, die
              bestmöglichsten Bedingungen für ein angenehmes Studieren zu
              schaffen.
              <br />
              <br />
              Zum angenehmen Studieren gehört aber nicht nur die trockene
              Theorie, sondern auch das gemütliche Beisammensein. So sorgt die
              Fachschaft, dass ihr euren Spaß habt, indem wir tolle Grill- oder
              Frühstück-Events, Partys oder Ausflüge für alle Studierenden
              veranstalten. Darunter fällt auch das bekannteste und zu gleich
              wichtigste Event für alle Studierende, nämlich die O-Phase der
              Erstis.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center h-full">
          <div className="relative w-full h-100">
            <Image
              src="/images/E_PIC3185-2.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          <div className="inset-0 w-5/6 top-1/3 left-1/2 -translate-y-[150px] bg-white/50 backdrop-blur-md dark:bg-background/50 rounded-xl">
            <h1 className="text-4xl font-bold text-center font-montserrat font-extralight justify-center dark:text-white text-black place-self-center py-10">
              Wie kann ich mitmachen?
            </h1>
            <p className="text-md text-center font-montserrat font-light dark:text-white text-black px-10">
              Du darfst jederzeit bei uns vorbeischauen (M 305). Jeden Mittwoch
              ist der dritte Block (11:30 Uhr - 13:00 Uhr) extra für uns und
              unsere Untertanen freigehalten. In diesem Block finden unsere
              eigenen Fachschaftssitzungen statt. Möchtest du zudem bestens über
              deinen Studiengang informiert sein und schon früher wissen wann es
              welche Neuerungen oder interessante Events gibt, dann lohnt es
              sich an den Fachschaftssitzungen teilzunehmen. Hier hast du auch
              die Möglichkeit deine eigene Meinung kund zu tun, ohne ein Amt
              oder Funktion übernommen zu haben.
              <br />
              <br />
              Wenn du noch mehr machen möchtest, dann kannst du auch gerne ein
              Amt übernehmen. Hierbei gibt es viele verschiedene Möglichkeiten,
              wie z.B. Event-Team (Planung von unseren Events), Getränkewart
              (Zuständig für Getränke),...
              <br />
              Manche Ämter können sogar als S-Fach angerechnet werden!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
