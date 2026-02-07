const HIDDEN_TEXTS = [
    'Bien essayé petit filou',
    'Pas touche, classifié',
    '404 solution not found, oups',
    "Hé !! Qu'est-ce que tu regardes ?",
    'Même pas en rêve',
    "Les spoilers c'est pas ici",
    "C'est flou hein ? Normal.",
    'Le mystère reste entier',
    'Demande gentiment au superviseur',
    'Tu croyais vraiment ?',
] as const;

export const getHiddenText = () =>
    HIDDEN_TEXTS[Math.floor(Math.random() * HIDDEN_TEXTS.length)];
