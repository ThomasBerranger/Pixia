import type {ApiResponseType} from "../types/apiResponseType.ts"
import * as React from "react"

function PromptGenerator({prompt, setPrompt, loading, response, onPromptSubmit}: {
    prompt: string,
    setPrompt: (value: string) => void,
    loading: boolean,
    response: ApiResponseType,
    onPromptSubmit: (e?: React.FormEvent) => Promise<void>
}) {
    return <>
        <h1 className={'font-semibold'}>Création de contenu</h1>

        <form className="flex gap-2 mt-4" onSubmit={onPromptSubmit}>
            <textarea className={'w-full rounded px-1'} placeholder={"Génère une image ..."}
                      rows={3}
                      value={prompt} onChange={(e) => setPrompt(e.target.value)}/>

            <button disabled={loading}
                    className={'btn border border-black p-0.5 rounded'}>
                {loading ? 'Génération...' : 'Générer'}
            </button>
        </form>

        <p className={'mt-2'}>Prompt :</p>
        <p className={'w-full bg-white p-1 text-gray-500'}>{response.result ?? '/'}</p>

        <p className={'mt-2'}>Titre :</p>
        <p className={'w-full bg-white p-1 text-gray-500'}>{response.title ?? '/'}</p>

        <p className={'mt-2'}>Indice :</p>
        <p className={'w-full bg-white p-1 text-gray-500'}>{response.hint ?? '/'}</p>

        <p className={'mt-2'}>Explication :</p>
        <p className={'w-full bg-white p-1 text-gray-500'}>{response.explanation ?? '/'}</p>
    </>
}

export default PromptGenerator
