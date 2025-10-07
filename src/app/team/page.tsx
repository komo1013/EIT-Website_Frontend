"use client";
import NavBar from "@/components/navbar";
import { Card, CardHeader, CardBody, CardFooter, Image, Button} from "@heroui/react";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Dennis Breunig",
      role: "1. Vorsitz",
      mail: "vorsitz@eit-hka.de",
    },
    {
      name: "Felix Espert",
      role: "2. Vorsitz",
      mail: "vorsitz@eit-hka.de",
    },
    {
      name: "Loreen Voigt",
      role: "1. Finanzer",
      mail: "finanzen@eit-hka.de",
    },
    {
      name: "Paul Hermann",
      role: "2. Finanzer",
      mail: "finanzen@eit-hka.de",
    },
    {
      name: "Rishabh Venugopal",
      role: "IT Admin",
      mail: "it@eit-hka.de",
    },
    {
      name: "Mohamed Kondi",
      role: "IT Admin",
      mail: "it@eit-hka.de",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 pt-[80px]">
        {teamMembers.map((member) => (
          <Card className="h-80" key={member.name}>
            <CardHeader className="absolute z-10 top-1 flex-col items-start!">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {member.name}
              </p>
              <h4 className="text-white font-medium text-large">
                {member.role}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://heroui.com/images/card-example-4.jpeg"
            />
            <CardFooter className="absolute bg-background/30 bottom-0 border-t-1 border-primary/50 z-10 justify-between backdrop-blur-md">
              <div>
                <p className="text-foreground text-tiny">Available soon.</p>
                <p className="text-foreground text-tiny">Get notified.</p>
              </div>
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                Notify Me
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
