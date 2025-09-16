import {useState} from 'react'
import PromptGenerator from "./PromptGenerator.tsx"
import type {ApiResponse} from "../types/apiResponse.ts"
import * as React from "react"
import ImageGenerator from "./ImageGenerator.tsx"
// import OpenAI from 'openai'

// const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true
// })

function Admin() {
    const [loading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<ApiResponse>({
        result: undefined,
        title: undefined,
        explanation: undefined,
        hint: undefined
    })

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault()

        if (!prompt) return

        setLoading(true)

        try {
            // const response = await openai.chat.completions.create({
            //     model: "gpt-3.5-turbo",
            //     messages: [{role: "user", content: `
            //     Tu vas recevoir une demande de génération de prompt destiné à la génération d'une image.
            //     Il est possible que la demande ne soit pas précise alors ce sera à toi de choisir les sources de l'image.
            //     Je souhaite que tu génères le prompt parfait pour la création de cette image car les sources de cette dernière devront être devinées.
            //     Dans ton prompt n'hésite pas à mentionner le nom des sources et des personnages ainsi que des éléments liés aux sources.
            //     L'indice généré ne devra pas mentionner le nom des personnage ainsi que les titres des sources.
            //     Ta réponse sera devra respectée ce format :
            //     "Prompt: le prompt généré avec un maximum de détailles sur ce qui est visible afin que la demande soit respectée
            //     Title: les noms simplifiées des sources, ex: Batman et Titanic
            //     Hint: un indice destiné au joueur s'il ne devine pas les sources
            //     Explanation: une explication de ce qui est visible sur l'image à partir du prompt"
            //     Voici la demande :
            //     ${prompt}`}],
            // })

            const response = {
                'choices': {
                    0: {
                        'message': {
                            'content':
                                'Prompt: Imaginez une scène où Batman est debout sur la proue du Titanic, les bras écartés, tandis que le Joker glisse derrière lui, sourire sadique aux lèvres. Les deux univers se rencontrent dans un mélange inattendu de mystère et de tragédie.\n' +
                                '\n' +
                                'Title: Batman + Titanic \n' +
                                '\n' +
                                'Hint: L\'un de ces films met en scène un justicier masqué combattant le crime à Gotham City, tandis que l\'autre raconte l\'histoire de l\'amour tragique entre Jack et Rose à bord du navire Titanic.' +
                                '\n' +
                                'Explanation: Le prompt généré propose une image surréaliste où les personnages de Batman et du Joker, issus de l\'univers sombre de Gotham City, se retrouvent dans l\'univers tragique du Titanic. Cette fusion des deux mondes crée une atmosphère unique et inattendue.'
                        }
                    }
                }
            };

            setResponse(prev => ({
                ...prev,
                result: response.choices[0].message.content?.match(/Prompt:\s*(.*?)\s*Title/)?.[1],
                title: response.choices[0].message.content?.match(/Title:\s*(.*?)\s*Hint/)?.[1],
                hint: response.choices[0].message.content?.match(/Hint:\s*(.*?)\s*Explanation/)?.[1],
                explanation: response.choices[0].message.content?.match(/Explanation:\s*(.*)/)?.[1]
            }))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }


        setLoading(false)
    }

    return (
        <>
            <div className="w-3/5 border border-purple-500 rounded p-5 my-10">
                <PromptGenerator response={response} loading={loading} onPromptSubmit={handleSubmit}/>
                <ImageGenerator prompt={response.result}/>
            </div>
        </>
    )
}

export default Admin
