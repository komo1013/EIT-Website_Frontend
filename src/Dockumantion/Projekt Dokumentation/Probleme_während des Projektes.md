# Mögliche Probleme die BeimProgrammieren Aufgetaucht sind

### Von Figma das Design rüber zu funktionellen code für Profil Page

### Studenten Login Authentifizierung

### Authentik vs Alter Login
der Umstieg auf Authentik vom Alten Login Flow hat sich teilweise als Schwierig erwiesen da es von der Struktur andere Formen dateien und variabeln aufgefordert haben. 
Noch dazu musste Man die Alten Login flow im Projekt ändern damit sich das alles nicht durch Mischt ohne das irgend was funktioniert.
### Fehlende Enviroment Variable
Bei der OCid.config dynamischer Fehler Weil der Server nicht auf die URL direkt zugreifen kann.
Lösung: Statisches Lesen der Variable bevor der Server gebaut wird mit 

```
authority: process.env.NEXT_PUBLIC_AUTHENTIK_URL!,
```
Hier Kommt es auch nicht zu einem Typescript fehler weil ich mit dem "!". Sage die Variable existiert wirklich und ist nicht wirklich ein undefined String.
