# Pixia — Frontend React

## Projet
Pixia est un jeu web quotidien où les joueurs devinent 2 films à partir d'une image générée par IA. Front React hébergé sur Vercel, API Symfony sur Railway.

## Concept du jeu
Chaque jour, une image générée par IA représente la fusion de 2 films. Les joueurs doivent deviner les 2 titres. Chaque partie a une difficulté (SIMPLE, VICIEUX, TORDU, DIABOLIQUE, IMPOSSIBLE) qui détermine les points gagnés. Un indice est disponible mais réduit les points. Les parties sont créées par la communauté puis validées par les admins avant publication.

## Rôles et permissions

### Joueur anonyme
- Jouer aux parties quotidiennes
- Consulter le leaderboard et les profils

### Utilisateur authentifié (ROLE_USER)
- Jouer avec suivi des stats (victoires, streak, rang)
- Gagner des jetons (= points marqués en jouant)
- Créer des parties via le formulaire en 3 étapes (idée → image → envoi)
- Gérer son profil et personnaliser son avatar (DiceBear)
- Soumettre des contributions (suggestions de jeu, bugs)
- Consulter ses badges et achievements

### Admin (ROLE_ADMIN)
- Dashboard Studio : vue mensuelle des parties planifiées, en montage, sans image, par difficulté
- Gérer les parties en attente (`/admin/pending-games`) : réclamer la supervision d'une partie
- Superviser une partie (`/admin/games/:id`) : éditer solution/indice/difficulté/date/image, valider ou refuser
- Contrainte : date de publication minimum J+7 (sauf super admin)

### Super Admin (ROLE_SUPER_ADMIN)
- Tout ce que l'admin peut faire, sans restriction de date
- Gestion des utilisateurs : voir, bannir, impersonate
- Vue calendrier de toutes les parties
- Gestion des contributions (valider/refuser les suggestions et bugs)

## Cycle de vie d'une partie
1. **Création (User)** : idée analysée par l'IA → brouillon (`DRAFT`)
2. **Image (User)** : génération IA (500 jetons), upload perso (200 jetons) ou skip
3. **Soumission (User)** : envoi pour validation → `PENDING` (100 jetons)
4. **Supervision (Admin)** : un admin réclame la partie, édite si besoin, valide ou refuse → `APPROVED` / `REJECTED`
5. **Publication** : la partie apparaît automatiquement à sa date programmée

## Système de jetons
Les jetons se gagnent en jouant (autant que de points marqués). Ils se dépensent pour créer des parties :

| Étape | Coût |
|-------|------|
| Analyse de l'idée | 300 |
| Génération IA d'image | 500 |
| Upload image perso | 200 |
| Soumission | 100 |

Remboursement de 150 jetons si la notoriété des films est trop basse (< 50%). Minimum 1000 jetons requis pour lancer une création.

## Points par difficulté
| Difficulté | Points | Avec indice |
|------------|--------|-------------|
| SIMPLE | 10 | 5 |
| VICIEUX | 15 | 10 |
| TORDU | 25 | 15 |
| DIABOLIQUE | 50 | 25 |
| IMPOSSIBLE | 80 | 50 |

## Stack
- React 19 + TypeScript 5.8 + Vite 7
- Tailwind CSS 3 (utility-first, pas de CSS custom sauf exception)
- Zustand 5 (state global) — Context API uniquement pour l'auth
- React Router 7 (routing)
- PWA via vite-plugin-pwa

## Architecture & Conventions

### Structure des fichiers
```
src/
├── assets/          # Images, icônes et ressources statiques
├── atoms/           # Composants atomiques réutilisables (Toggle, Button...)
├── components/      # Composants métier organisés par domaine (Game/, User/, Admin/)
├── constants/       # Constantes (endpoints, routes, enums front)
├── contexts/        # Context API (auth uniquement)
├── hooks/           # Custom hooks (useApi, useAlert...)
├── pages/           # Composants page (une page = une route)
├── stores/          # Zustand stores
├── styles/          # Fichiers CSS globaux (animations, overrides)
├── types/           # Types TypeScript organisés par domaine
├── utils/           # Fonctions utilitaires pures
```

### Règles de code
- **Composants** : Functional components uniquement, `function` déclaration (pas de const arrow pour les composants). Export default en fin de fichier.
- **Typage** : TypeScript strict. Utiliser `interface` pour les props et types métier. Pas de `any`.
- **Hooks** : Préfixe `use`. Un hook = une responsabilité.
- **State** : Zustand pour le state global partagé. useState pour le state local. Context API réservé à l'auth.
- **API** : Toujours passer par le hook `useApi` et les constantes `ENDPOINTS`.
- **Nommage** : PascalCase composants/types, camelCase fonctions/variables, UPPER_SNAKE_CASE constantes.
- **Imports** : Types avec `import type`. Extensions `.ts`/`.tsx` explicites dans les imports.
- **Fichiers** : Un composant par fichier. Nom du fichier = nom du composant.

### Style
- Tailwind uniquement. Classes utilitaires directement dans le JSX.
- Police custom : `font-righteous` pour les titres.
- Thème : couleurs retro (`retro-accent`, etc.) définies dans tailwind.config.

### Qualité
- ESLint + Prettier configurés. Respecter la config existante.
- Pas de `console.log` en production (sauf `console.error` pour le debug).
- Pas de `// eslint-disable` sauf cas justifié avec commentaire.
- Pas de dépendance ajoutée sans justification.

### Réponses attendues
- Code concis, lisible, typé.
- Respecter les patterns existants du projet (structure, nommage, hooks).
- Proposer des optimisations si pertinent (mémo, lazy loading, etc.) mais ne pas sur-optimiser.
- Français pour les commentaires et messages utilisateur.
