# Pixia — Frontend React

## Projet
Pixia est un jeu web quotidien où les joueurs devinent 2 films à partir d'une image générée par IA. Front React hébergé sur Vercel, API Symfony sur Railway.

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
