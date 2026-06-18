# CLAUDE.md — Pixia Frontend

## 1. Présentation du projet

- **Nom** : Pixia — [pixia.fun](https://pixia.fun)
- **Statut** : Production
- **Concept** : Chaque jour, une image générée par IA est publiée sur Pixia. N'importe qui peut tenter de deviner les œuvres sources (aujourd'hui : 2 films mélangés — d'autres types de contenus sont envisagés).
- **Audience** : Principalement française, 15–55 ans
- **Acquisition** : Réseaux sociaux (Instagram, Facebook, TikTok) — canal principal de rappel quotidien et d'acquisition

---

## 2. Stack technique

- React 19 + TypeScript 5.8 + Vite 7
- Tailwind CSS 3 (utility-first)
- Zustand 5 (state global)
- React Router 7
- PWA via vite-plugin-pwa
- Vitest + Testing Library
- Hébergement : Vercel

---

## 3. Concept & règles du jeu

- **Rythme** : 1 Pixia publié par jour
- **Accès** : connecté ou non connecté (la partie est jouable anonymement)

### Types de jeu (gametype)
Le super admin choisit le type à la création du game. Chaque type adapte le titre, la consigne et le placeholder côté joueur (`GAME_TYPE_CONTENT` dans `src/constants/gameTypes.ts`).

| Clé (backend) | Titre | Concept |
|---------------|-------|---------|
| `MULTIVERS` | Multivers | 2 films fusionnés en une seule image — retrouve les deux |
| `KAWAII` | Kawaii | Un personnage redessiné en version kawaii — reconnais-le |
| `POLYCHROME` | Polychrome | Un film résumé en illustration minimaliste — devine lequel |
| `CONVERGENCE` | Convergence | Plusieurs indices d'un même film réunis — devine le film |

> ⚠️ La clé backend est `MULTIVERS` (orthographe FR, sans « e »), pas `MULTIVERSE`.

### Réponse
- Nombre de tentatives : illimité
- Fuzzy match : normalisation accents, ordre des mots, tolérance typos, FR/EN
- Définition exacte d'une bonne réponse : les 2 films identifiés (ordre indifférent)
- **Partie terminée dès que la bonne réponse est trouvée — non rejouable**

### Hint
- **Réservé aux utilisateurs connectés**
- Contenu : phrase mystérieuse faisant allusion aux 2 films sans les nommer explicitement
- Impact sur les points : **environ divisé par 2**
- **1 hint max par partie**

---

## 4. Acteurs & permissions

| Rôle | Description |
|------|-------------|
| **Anonyme** | Joue au Pixia du jour, pas de hint, pas de tokens |
| **USER** | Joue + hint + tokens + création de contenu |
| **ADMIN** | Supervise et modère les Pixia soumis |
| **SUPER_ADMIN** | Bypass de certaines règles, gestion globale |
| **BOT** | Utilisateurs fictifs qui jouent automatiquement pour animer les leaderboards |
| **BANNED** | Accès révoqué |

### Héritage des rôles
- ADMIN et SUPER_ADMIN héritent de ROLE_USER
- BOT et BANNED n'héritent pas de ROLE_USER

---

## 5. Cycle de vie d'un Game

| Statut | Description |
|--------|-------------|
| **DRAFT** | Brouillon en cours de création |
| **PENDING** | Soumis, en attente de modération |
| **APPROVED** | Validé, publié ou planifié |
| **REJECTED** | Refusé |

- DRAFT → PENDING : auteur uniquement
- PENDING → APPROVED/REJECTED : admin supervisor
- Image **jamais exposée** hors statut APPROVED

---

## 6. Système de tokens

| Action | Coût |
|--------|------|
| Analyse d'idée | 300 |
| Génération d'image IA | 500 |
| Upload d'image | 200 |
| Soumission | 100 |

- Minimum **1000 tokens** requis pour lancer une création
- Tokens déduits **au moment de l'action**
- Coffre joueur : réclamable tous les 5 jours (max 180 tokens)
- Coffre admin : 995 tokens, 1x/mois

---

## 7. Système de scoring

| Difficulté | Sans hint | Avec hint |
|------------|-----------|-----------|
| SIMPLE | 10 | 5 |
| VICIEUX | 15 | 10 |
| TORDU | 25 | 15 |
| DIABOLIQUE | 50 | 25 |
| IMPOSSIBLE | 80 | 50 |

- Partie non rejouable une fois gagnée
- Points = tokens gagnés

---

## 8. Règles métier critiques

- **Images** : jamais exposées hors statut APPROVED
- **Tokens** : jamais négatifs
- **Données sensibles** : email, solution et hint — exposés uniquement si le contexte l'exige

---

## 10. Architecture frontend

### Structure des dossiers
```
src/
├── assets/          # Images, icônes et ressources statiques
├── atoms/           # Composants atomiques réutilisables (Button, Toggle...)
├── components/      # Composants métier par domaine (Game/, User/, Admin/)
├── constants/       # Constantes : ENDPOINTS, PATHS, URLS, ROLES
├── contexts/        # Context API — auth uniquement (authContext)
├── hooks/           # Custom hooks (useApi, useAlert, useGameForm...)
├── layouts/         # Composants structurels (Header, Footer, Sidebar...)
├── pages/           # Composants page — une page = une route
├── stores/          # Zustand stores
├── styles/          # CSS globaux (animations, overrides exceptionnels)
├── types/           # Interfaces TypeScript par domaine
└── utils/           # Fonctions utilitaires pures
```

### Principes fondamentaux

**Séparation des responsabilités**
- Pages : orchestration uniquement, pas de logique métier
- Composants : une responsabilité, props typées via `interface`
- Hooks : toute la logique métier et les effets de bord
- Utils : fonctions pures sans effets de bord, testables unitairement

**Atomic Design — règle stricte**
- `atoms/` : aucune dépendance vers `hooks/`, `contexts/`, `stores/` — primitifs purs
- `components/` : peuvent utiliser les hooks et le state
- Un atom ne connaît pas le domaine métier (pas de référence à `GameType`, `UserType`, etc.)

**Appels API**
- Toujours via `useApi` — jamais de `fetch` direct dans un composant
- Toujours via les constantes `ENDPOINTS` — jamais d'URL en dur
- `import.meta.env.VITE_API_URL` uniquement dans `useApi`, nulle part ailleurs
- `useApi` gère silencieusement les erreurs communes (401, 500)
- Seules les erreurs métier (422, violations) remontent au composant

**State management**
- Zustand pour le state global partagé
- `useState` pour le state local
- Context API réservé à l'auth

**Routing**
- `PATHS` : chemins relatifs pour `<Route>`
- `URLS` : URLs absolues pour `<Link>` et navigation programmatique
- Lazy loading obligatoire pour toutes les routes non critiques
- Chemin critique (chargé immédiatement) : `GameContainer`, `UserContainer`, `Leaderboard`

**Gestion des états async — pattern unifié**
- Toujours typer les états async avec `AsyncState<T>` :
  ```ts
  interface AsyncState<T> {
      data: T | null;
      loading: boolean;
      error: string | null;
  }
  ```
- Ne jamais avoir de `loading` boolean seul sans `error` associé

**Feedback utilisateur**
- Skeleton loaders pour tous les états de chargement — jamais de spinner seul qui casse le layout
- `EmptyState` atom réutilisable pour les listes vides et erreurs de fetch

---

## 12. Conventions de code

### Composants
- Functional components uniquement — déclaration `function`, pas de `const arrow`
- Export default en fin de fichier
- Un composant par fichier — nom du fichier = nom du composant
- Props toujours typées via `interface`
- `type` réservé aux unions, intersections et utilitaires (`type StepId = 1 | 2 | 3 | 4`)

### Hooks
- Préfixe `use` obligatoire
- Un hook = une responsabilité
- Les hooks qui font des appels API retournent systématiquement `AsyncState<T>`

### Typage
- TypeScript strict — pas de `any`
- `import type` pour les imports de types
- Extensions `.ts`/`.tsx` explicites dans tous les imports
- `interface` pour les props et types métier — jamais de type inline

### Nommage
- `PascalCase` : composants, interfaces, types
- `camelCase` : fonctions, variables, hooks
- `UPPER_SNAKE_CASE` : constantes (`ENDPOINTS`, `PATHS`, `ROLES`)

### Qualité
- Pas de `console.log` en production — `console.error` toléré pour le debug
- Pas de `// eslint-disable` sans justification commentée
- Pas de dépendance ajoutée sans justification
- `useEffect` sans dépendances manquantes — jamais de `eslint-disable` sur les deps

---

## 13. Design system

### Couleurs
| Token | Hex | Usage |
|-------|-----|-------|
| `retro-primary` | `#ff006e` | Actions principales, bordures fortes |
| `retro-secondary` | `#fb5607` | Accents secondaires, gradients |
| `retro-accent` | `#ffbe0b` | Highlights, shadows pixel |
| `retro-bg` | `#03045e` | Fond principal |
| `retro-surface` | `#0a0e27` | Surfaces de cartes |
| `retro-text` | `#ffffff` | Texte principal |
| `retro-muted` | `#a76eff` | Texte secondaire |
| `retro-success` | `#22c55e` | États de succès |

### Typographies
- `font-title` (`Major Mono Display`) : titres de page, éléments hero
- `font-righteous` (`Righteous`) : labels, boutons, badges, UI

### Règle fondamentale
- **Jamais de couleur hexadécimale en dur dans le JSX** — toujours les tokens Tailwind
- CSS custom autorisé uniquement dans `src/styles/` via `@apply`

### Classes composants

**Boutons**
| Classe | Usage |
|--------|-------|
| `btn-primary` | Action principale |
| `btn-pixel` | Action forte |
| `btn-neon` | Action destructive |
| `btn-ghost` | Action secondaire |
| `btn-success` | Confirmation |
| `btn-disabled` | État désactivé |

**Cartes**
| Classe | Usage |
|--------|-------|
| `card-primary` | Carte standard |
| `card-primary-hover` | Carte cliquable |
| `card-retro` | Carte neutre centrée |

**Badges**
| Classe | Usage |
|--------|-------|
| `badge-primary` | Badge principal |
| `badge-secondary` | Badge secondaire |
| `badge-accent` | Badge accent |
| `badge-accent-no-border` | Badge compact |
| `badge-muted-no-border` | Badge discret |

### Règles visuelles
- Bordures : `border-[3px]` standard
- Shadows pixel : `shadow-[4px_4px_0]`
- Mobile-first : classes mobile en premier, desktop avec `sm:`
- Animations : définies dans `src/styles/animation.css`

---

## 15. Endpoints API

### Public
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/login` | Authentification (⚠️ rate limited) |
| `POST` | `/register` | Inscription |
| `POST` | `/google-auth` | OAuth Google |
| `POST` | `/forgot-password` | Réinitialisation |
| `POST` | `/reset-password` | Nouveau mot de passe |
| `GET` | `/games/daily` | Pixia du jour |
| `GET` | `/games` | Liste des games |
| `POST` | `/games/{id}/solution` | Soumettre une réponse (⚠️ rate limited) |
| `GET` | `/users/leaderboard` | Classement global |
| `GET` | `/users/{slug}` | Profil public |

### Joueur authentifié (USER)
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/me` | Dashboard |
| `GET` | `/me/tokens` | Solde de tokens |
| `POST` | `/me/tokens/claim` | Réclamer le coffre |
| `GET` | `/me/games` | Historique par mois |
| `GET` | `/me/games-stats` | Statistiques |
| `GET` | `/me/games-generated` | Pixia créés |
| `GET` | `/games/{id}/hint` | Demander l'indice |
| `GET` | `/users/monthly-leaderboard` | Classement mensuel |
| `GET` | `/notifications` | Notifications |
| `GET` | `/notifications/has-unread` | Non lues ? |
| `PATCH` | `/users` | Modifier son profil |
| `POST` | `/contributions` | Soumettre suggestion/bug |

### Création de contenu (USER avec tokens)
| Méthode | Route | Coût | Description |
|---------|-------|------|-------------|
| `POST` | `/me/games` | 300 | Analyser une idée |
| `GET` | `/me/games/{id}` | — | Voir son game |
| `PATCH` | `/me/games/{id}` | 100 si PENDING | Modifier / soumettre |
| `POST` | `/me/games/{id}/image` | 200 | Upload d'image |
| `POST` | `/me/games/{id}/generate-image` | 500 | Générer via IA |
| `DELETE` | `/me/games/{id}/image` | — | Supprimer l'image |

### Admin (ADMIN)
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/admin/games` | Liste des games |
| `GET` | `/admin/games/taken-dates` | Dates occupées |
| `GET` | `/admin/games/{id}` | Détails |
| `PATCH` | `/admin/games/{id}` | Modifier statut, date |
| `POST` | `/admin/games/{id}/image` | Modifier l'image |
| `POST` | `/me/tokens/claim?isAdminClaim=true` | Coffre admin |

### Super Admin (SUPER_ADMIN)
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/super-admin/users` | Liste utilisateurs |
| `PATCH` | `/super-admin/users/{id}` | Modifier utilisateur |
| `POST` | `/super-admin/impersonate/{id}` | Impersonate |
| `GET` | `/super-admin/games` | Dashboard games |
| `POST` | `/super-admin/games` | Créer un game |
| `GET` | `/super-admin/contributions` | Contributions |
| `PATCH` | `/super-admin/contributions/{id}` | Modérer |

---

## 17. Stratégie de tests (Frontend)

### Setup
```bash
pnpm add -D vitest @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom jsdom
```

### Ce qu'on teste
- `utils/` : fonctions pures — fuzzy match, calcul de score, formatage dates
- `hooks/` : `useGameForm`, `useApi` (avec mock fetch)
- Composants critiques : `GameAnswer`, `TokenCounter`

### Ce qu'on ne teste pas
- Composants purement visuels sans logique
- Comportements déjà couverts par le backend

### Commandes
```bash
pnpm test --run   # mode CI non-watch
pnpm test         # mode watch local
```

---

## 19. Points à adresser (TODO)

- [ ] `console.log` résiduel dans `InstallPWA.tsx` — supprimer
- [ ] `DEBUG_MODE = false` hardcodé dans `InstallPWA.tsx` — risque de commit à `true`
- [ ] JWT dans `localStorage` — vulnérabilité XSS, envisager httpOnly cookie
- [ ] `import.meta.env.VITE_API_URL` utilisé directement dans certains composants — tout passer par `useApi`
- [ ] Pas d'`ErrorBoundary` React — les crashs inattendus ne sont pas interceptés
- [ ] Pas de refresh token — pas de renouvellement silencieux avant expiration JWT
- [ ] Vitest non installé en devDependency malgré le script `test`
- [ ] Pas d'état async unifié — implémenter `AsyncState<T>` systématiquement
- [ ] Gestion d'erreur non centralisée dans `useApi`
- [ ] Pas de skeleton loaders — remplacer les spinners génériques
- [ ] Pas d'`EmptyState` atom
- [ ] `eslint-disable` sur `useEffect` dans `Supervision.tsx` — corriger
- [ ] `pnpm audit` à ajouter dans le CI
- [ ] Pre-commit hooks — `husky` + `lint-staged`
- [ ] Auditer les classes CSS custom — supprimer les inutilisées (candidat : `btn-3d`)

---

## Réponses attendues

- Code concis, lisible, typé — respecter les patterns existants du projet
- `interface` pour tous les types et props — jamais de type inline ou de `any`
- Respecter le design system — jamais de couleur en dur, toujours les tokens Tailwind
- Proposer des optimisations (mémo, lazy loading) si pertinent, sans sur-optimiser
- Français pour les commentaires et messages utilisateur
- Pas de dépendance ajoutée sans justification explicite