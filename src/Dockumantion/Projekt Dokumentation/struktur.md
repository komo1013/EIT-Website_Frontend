#  EIT-Website Projektstruktur

##  Gesamtübersicht

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js App]
        B[React Components]
        C[Contexts]
        D[UI Libraries]
    end
    
    subgraph "Backend"
        E[API Routes]
        F[Authentication]
    end
    
    subgraph "External"
        G[EIT API]
        H[Cookies/Storage]
    end
    
    A --> B
    A --> C
    B --> D
    A --> E 
    E --> F
    F --> G
    F --> H
    C --> H
    
    style A fill:#E0BE04
    style G fill:#f97316
    style C fill:#34d399
```

---

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant AuthPage
    participant APIRoute as /api/auth/login
    participant EITBackend as EIT API
    participant AuthContext
    participant Navbar
    
    User->>AuthPage: Enter credentials
    AuthPage->>APIRoute: POST login data
    APIRoute->>EITBackend: Forward to api.eit-hka.de
    EITBackend-->>APIRoute: Return cookies + token
    APIRoute-->>AuthPage: Success response
    AuthPage->>AuthContext: login(username)
    AuthContext->>Navbar: Update isLoggedIn
    Navbar-->>User: Show user menu
```

---

## 🎨 Theme System Flow

```mermaid
graph LR
    A[User selects color] --> B[ColorPicker]
    B --> C[ThemeContext.setColorTheme]
    C --> D[localStorage]
    C --> E[Update currentBg]
    E --> F[All Pages re-render]
    F --> G[New gradient applied]
    
    style A fill:#a78bfa
    style E fill:#fbbf24
    style G fill:#34d399
```

---

## 📁 Verzeichnisstruktur

```mermaid
graph TD
    ROOT[EIT-Website/]
    
    ROOT --> SRC[src/]
    ROOT --> LOGIN[login_Page/]
    ROOT --> PUBLIC[public/]
    ROOT --> CONFIG[Config Files]
    
    SRC --> APP[app/]
    SRC --> COMP[components/]
    SRC --> CTX[contexts/]
    SRC --> LIB[lib/]
    SRC --> FONTS[fonts/]
    
    APP --> PAGES[Pages]
    APP --> API[api/]
    
    PAGES --> HOME[page.tsx - Homepage]
    PAGES --> ABOUT[about/]
    PAGES --> ACCOUNTS[accounts/ - Login]
    PAGES --> PROFILE[profile/ - User Profile]
    
    API --> AUTH[auth/]
    AUTH --> LOGINAPI[login/route.ts]
    AUTH --> LOGOUTAPI[logout/route.ts]
    
    COMP --> NAVBAR[navbar.tsx]
    COMP --> FOOTER[footer.tsx]
    COMP --> ELECTRIC[ElectricBorder.jsx]
    COMP --> PROFILE_COMP[profile/]
    COMP --> UI[components/ui/]
    
    CTX --> AUTHCTX[AuthContext.tsx]
    CTX --> THEMECTX[ThemeContext.tsx]
    
    LIB --> APILIB[api.ts - API Client]
    LIB --> UTILS[utils.ts]
    
    LOGIN --> AUTHPAGE[AuthPage.tsx]
    
    PUBLIC --> IMAGES[images/]
    PUBLIC --> ICONS[checkliste.svg]
    
    CONFIG --> PKG[package.json]
    CONFIG --> NEXT[next.config.ts]
    CONFIG --> TS[tsconfig.json]
    
    style ROOT fill:#60a5fa
    style APP fill:#34d399
    style API fill:#f97316
    style CTX fill:#a78bfa
```

---

## 🔄 Component Hierarchie

```mermaid
graph TD
    LAYOUT[layout.tsx - Root]
    
    LAYOUT --> PROVIDERS[Providers]
    PROVIDERS --> THEME[ThemeProvider]
    PROVIDERS --> AUTH[AuthProvider]
    PROVIDERS --> HERO[HeroUIProvider]
    
    LAYOUT --> NAVBAR[NavBar]
    LAYOUT --> PAGE[Page Content]
    LAYOUT --> FOOTER[Footer]
    
    NAVBAR --> DROPDOWN[User Dropdown]
    DROPDOWN --> PROFILE_LINK[Profile Link]
    DROPDOWN --> LOGOUT[Logout Button]
    
    PAGE --> ACCOUNTS_PAGE[/accounts - AuthPage]
    PAGE --> PROFILE_PAGE[/profile - Profile Components]
    PAGE --> HOME_PAGE[/ - Homepage]
    
    ACCOUNTS_PAGE --> LOGIN_FORM[Login Form]
    ACCOUNTS_PAGE --> REGISTER_FORM[Register Form]
    
    PROFILE_PAGE --> PROFILE_CARD[ProfileCard]
    PROFILE_PAGE --> COLOR_PICKER[ColorPicker]
    PROFILE_PAGE --> PROJECTS[ProjectSection]
    PROFILE_PAGE --> CHECKLIST[StudyChecklist]
    PROFILE_PAGE --> SEMESTER[SemesterProgress]
    
    style LAYOUT fill:#60a5fa
    style PROVIDERS fill:#34d399
    style PAGE fill:#fbbf24
```

---

## 🔌 Context Abhängigkeiten

```mermaid
graph LR
    subgraph "Global State"
        AUTH_CTX[AuthContext]
        THEME_CTX[ThemeContext]
    end
    
    subgraph "Components using AuthContext"
        NAVBAR1[NavBar]
        PROFILE1[Profile Page]
        AUTH_PAGE[AuthPage]
    end
    
    subgraph "Components using ThemeContext"
        NAVBAR2[NavBar]
        HOME[Homepage]
        ABOUT[About Page]
        PROFILE2[Profile Page]
        COLOR[ColorPicker]
    end
    
    AUTH_CTX -.-> NAVBAR1
    AUTH_CTX -.-> PROFILE1
    AUTH_CTX -.-> AUTH_PAGE
    
    THEME_CTX -.-> NAVBAR2
    THEME_CTX -.-> HOME
    THEME_CTX -.-> ABOUT
    THEME_CTX -.-> PROFILE2
    THEME_CTX -.-> COLOR
    
    style AUTH_CTX fill:#f87171
    style THEME_CTX fill:#a78bfa
```

---

## 🚀 Data Flow - User Login

```mermaid
flowchart TD
    START([User öffnet /accounts])
    
    START --> INPUT[User gibt Credentials ein]
    INPUT --> SUBMIT[Submit Button geklickt]
    
    SUBMIT --> API_CALL{API Call}
    API_CALL --> LOADING[isLoading = true]
    
    LOADING --> NEXT_API[POST /api/auth/login]
    NEXT_API --> EIT[Forward to EIT API]
    
    EIT --> SUCCESS{Erfolgreich?}
    
    SUCCESS -->|Ja| COOKIES[Cookies gesetzt]
    SUCCESS -->|Nein| ERROR[Error Message anzeigen]
    
    COOKIES --> AUTH_UPDATE[AuthContext.login called]
    AUTH_UPDATE --> LOCAL[localStorage updated]
    AUTH_UPDATE --> REDIRECT[Router push /profile]
    
    REDIRECT --> PROFILE_PAGE[Profile Page geladen]
    PROFILE_PAGE --> CHECK{isLoggedIn?}
    CHECK -->|Ja| SHOW[Profil anzeigen]
    CHECK -->|Nein| BACK[Redirect zu /accounts]
    
    ERROR --> RETRY[User kann es nochmal versuchen]
    RETRY --> INPUT
    
    style START fill:#60a5fa
    style SUCCESS fill:#fbbf24
    style SHOW fill:#34d399
    style ERROR fill:#f87171
```

---

## 📦 Dependencies Overview

```mermaid
graph TD
    subgraph "Core"
        NEXT[Next.js 15.5.3]
        REACT[React 19]
        TS[TypeScript]
    end
    
    subgraph "Styling"
        TAILWIND[Tailwind CSS v4]
        HERO[HeroUI]
        SHADCN[shadcn/ui]
    end
    
    subgraph "State"
        CONTEXT[React Context API]
        LOCAL[localStorage]
    end
    
    subgraph "UI Libraries"
        RADIX[Radix UI]
        LUCIDE[Lucide Icons]
        FRAMER[Framer Motion]
    end
    
    NEXT --> REACT
    REACT --> TS
    REACT --> CONTEXT
    
    TAILWIND --> HERO
    HERO --> SHADCN
    SHADCN --> RADIX
    
    CONTEXT --> LOCAL
    
    style NEXT fill:#60a5fa
    style REACT fill:#34d399
    style TAILWIND fill:#a78bfa
```

---

## 🎯 Route Structure

```mermaid
graph TD
    ROOT[/]
    
    ROOT --> HOME[page.tsx - Startseite]
    ROOT --> ABOUT[/about - Über uns]
    ROOT --> ACCOUNTS[/accounts - Login/Register]
    ROOT --> PROFILE[/profile - User Profil]
    ROOT --> TEAM[/team - Team Seite]
    ROOT --> VORTEILE[/vorteile_studenten]
    
    ROOT --> API_ROUTES[API Routes]
    API_ROUTES --> LOGIN_ROUTE[POST /api/auth/login]
    API_ROUTES --> LOGOUT_ROUTE[POST /api/auth/logout]
    
    ACCOUNTS --> AUTH_PAGE[AuthPage Component]
    
    PROFILE --> PROTECTED{isLoggedIn?}
    PROTECTED -->|Ja| PROFILE_CONTENT[Profile Content]
    PROTECTED -->|Nein| REDIRECT[Redirect /accounts]
    
    style ROOT fill:#60a5fa
    style PROFILE fill:#34d399
    style API_ROUTES fill:#f97316
```

---

## 🔧 API Integration

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant NX as Next.js API Route
    participant EIT as EIT Backend
    
    Note over FE,EIT: Login Flow
    FE->>NX: POST /api/auth/login
    Note right of FE: { userid, password }
    NX->>EIT: POST api.eit-hka.de/auth/login
    EIT-->>NX: Cookies + Response
    NX-->>FE: Forward Response + Set Cookies
    
    Note over FE,EIT: Logout Flow
    FE->>NX: POST /api/auth/logout
    Note right of FE: CSRF Token from cookies
    NX->>EIT: POST api.eit-hka.de/auth/logout
    EIT-->>NX: Success
    NX->>NX: Clear all cookies
    NX-->>FE: 200 OK
```

---

## 📈 Statistiken

```mermaid
pie title Dateien nach Typ
    "UI Components (shadcn)" : 47
    "Pages/Routes" : 8
    "Core Components" : 10
    "Contexts & Utils" : 8
    "API Routes" : 2
    "Config Files" : 10
    "Assets/Images" : 15
    "Dokumentation" : 5
```

---

## 🎨 Theme System Details

```mermaid
stateDiagram-v2
    [*] --> LoadTheme: Page Load
    LoadTheme --> CheckStorage: useEffect
    CheckStorage --> DefaultBlue: No saved theme
    CheckStorage --> SavedTheme: Theme in localStorage
    
    DefaultBlue --> Mounted: Set blue theme
    SavedTheme --> Mounted: Set saved theme
    
    Mounted --> Ready: Theme loaded
    
    Ready --> UserChanges: User selects color
    UserChanges --> UpdateContext: setColorTheme()
    UpdateContext --> SaveStorage: Save to localStorage
    SaveStorage --> ReRender: Update all pages
    ReRender --> Ready: Complete
```

---

## 🛡️ Security Flow

```mermaid
flowchart TD
    REQUEST[User Request]
    
    REQUEST --> CHECK_AUTH{isLoggedIn?}
    
    CHECK_AUTH -->|Nein| PUBLIC{Public Route?}
    CHECK_AUTH -->|Ja| COOKIES{Valid Cookies?}
    
    PUBLIC -->|Ja| ALLOW[Allow Access]
    PUBLIC -->|Nein| LOGIN[Redirect /accounts]
    
    COOKIES -->|Ja| PROTECTED[Access Protected Content]
    COOKIES -->|Nein| REAUTH[Re-authenticate]
    
    REAUTH --> LOGIN
    
    PROTECTED --> ACTION{User Action}
    ACTION -->|Logout| LOGOUT_API[Call /api/auth/logout]
    LOGOUT_API --> CLEAR[Clear Cookies & State]
    CLEAR --> LOGIN
    
    style CHECK_AUTH fill:#fbbf24
    style PROTECTED fill:#34d399
    style LOGIN fill:#60a5f2
    style CLEAR fill:#f87171
```