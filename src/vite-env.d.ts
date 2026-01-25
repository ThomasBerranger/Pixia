declare const __APP_VERSION__: string;

declare module '*.css';

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_DICE_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
