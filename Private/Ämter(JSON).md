der Weg durch Terminal
rishabh@spectre-fedora:~$ ssh Komo1013@85.215.227.46

info:
* jq ist nur damit der output schön aussieht, idk ob windows das hat. Aber egal du bekommst ein JSON zurück
* .../public/team ist ohne testing, aka mit echten Daten

rishabh@spectre-fedora:~$ curl https://api.eit-hka.de/public/team?testing=true | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2370  100  2370    0     0  24026      0 --:--:-- --:--:-- --:--:-- 23939
{
  "Career Contacts": {
    "members": [
      {
        "firstname": "C-3P0",
        "lastname": ""
      }
    ],
    "role_description": "Manages industry contacts and career events",
    "role_email": "career@eit-hka.de"
  },
  "Event Team": {
    "members": [
      {
        "firstname": "Sydney",
        "lastname": "Sweeny"
      },
      {
        "firstname": "Ana",
        "lastname": "de Armas"
      }
    ],
    "role_description": "Organises Fachschaft events and social gatherings",
    "role_email": "events@eit-hka.de"
  },
  "Finanzer": {
    "members": [
      {
        "firstname": "Rick",
        "lastname": "Astley"
      }
    ],
    "role_description": "Responsible for the Fachschaft budget and finances",
    "role_email": "finanzen@eit-hka.de"
  },
  "Getränkewart": {
    "members": [
      {
        "firstname": "Felix",
        "lastname": "Alberto"
      }
    ],
    "role_description": "Manages the Fachschaft drink supply",
    "role_email": "getränke@eit-hka.de"
  },
  "IT": {
    "members": [
      {
        "firstname": "Tom",
        "lastname": "Bäumle"
      },
      {
        "firstname": "Rishabh",
        "lastname": "Venugopal"
      },
      {
        "firstname": "Mohamed",
        "lastname": "Kordi"
      }
    ],
    "role_description": "Responsible for the IT of the Fachschaft EIT",
    "role_email": "it@eit-hka.de"
  },
  "O-Phase": {
    "members": [
      {
        "firstname": "Snoop",
        "lastname": "Dogg"
      }
    ],
    "role_description": "Organises and runs the orientation week for new students",
    "role_email": "ophase@eit-hka.de"
  },
  "Pizza und Eis": {
    "members": [],
    "role_description": "Organises the semester pizza and ice cream events",
    "role_email": "pizza@eit-hka.de"
  },
  "Protokollant": {
    "members": [
      {
        "firstname": "Taylor",
        "lastname": "Swift"
      }
    ],
    "role_description": "Records the minutes of Fachschaft meetings",
    "role_email": "protokoll@eit-hka.de"
  },
  "Raumbeauftragter": {
    "members": [
      {
        "firstname": "Lightning",
        "lastname": "Mqueen"
      }
    ],
    "role_description": "Responsible for Fachschaft room management and keys",
    "role_email": "raum@eit-hka.de"
  },
  "Shotbeauftragter": {
    "members": [
      {
        "firstname": "Megan",
        "lastname": "Fox"
      }
    ],
    "role_description": "Manages the shot supply for Fachschaft parties",
    "role_email": "shotz@eit-hka.de"
  },
  "Social Media": {
    "members": [
      {
        "firstname": "Padme",
        "lastname": "Amadala"
      }
    ],
    "role_description": "Manages the Fachschaft social media channels",
    "role_email": "social@eit-hka.de"
  },
  "Technik": {
    "members": [
      {
        "firstname": "Luke",
        "lastname": "Skywalker"
      }
    ],
    "role_description": "Handles technical equipment for events",
    "role_email": "technik@eit-hka.de"
  },
  "Vorsitz": {
    "members": [
      {
        "firstname": "Max",
        "lastname": "Verstappen"
      },
      {
        "firstname": "Darth",
        "lastname": "Vader"
      }
    ],
    "role_description": "Chairs the Fachschaft and represents students externally",
    "role_email": "vorstand@eit-hka.de"
  }
}