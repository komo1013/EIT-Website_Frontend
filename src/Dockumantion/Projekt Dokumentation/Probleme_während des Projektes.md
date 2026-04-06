# Mögliche Probleme die BeimProgrammieren Aufgetaucht sind

### Von Figma das Design rüber zu funktionellen code für Profil Page

### Studenten Login Authentifizierung

### Authentik vs Alter Login

### Fehlende Enviroment Variable
Bei der OCid.config dynamischer Fehler Weil der Server nicht auf die URL direkt zugreifen kann.
Lösung: Statisches Lesen der Variable bevor der Server gebaut wird mit 

```
authority: process.env.NEXT_PUBLIC_AUTHENTIK_URL!,
```
Hier Kommt es auch nicht zu einem Typescript fehler weil ich mit dem "!". Sage die Variable existiert wirklich und ist nicht wirklich ein undefined String.
