import {useState} from 'react'
import PromptGenerator from "./PromptGenerator.tsx"
import type {ApiResponseType} from "../types/apiResponseType.ts"
import * as React from "react"
import ImageGenerator from "./ImageGenerator.tsx"
import {useApi} from '../hooks/useApi'

function Admin() {
    const { apiCall } = useApi()

    const [prompt, setPrompt] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<ApiResponseType>({
        result: undefined,
        title: undefined,
        explanation: undefined,
        hint: undefined
    })

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault()

        if (prompt.length < 5) return

        setLoading(true)

        try {
            const response = await apiCall('open-api/generate-content', {
                method: 'POST',
                body: JSON.stringify({ prompt })
            })

            setResponse(prev => ({
                ...prev,
                result: response.match(/Prompt:\s*(.*?)\s*Title/)?.[1],
                title: response.match(/Title:\s*(.*?)\s*Hint/)?.[1],
                hint: response.match(/Hint:\s*(.*?)\s*Explanation/)?.[1],
                explanation: response.match(/Explanation:\s*(.*)/)?.[1]
            }))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-3/5 border border-purple-500 rounded p-5 my-10">
                <PromptGenerator prompt={prompt} setPrompt={setPrompt} loading={loading} response={response}
                                 onPromptSubmit={handleSubmit}/>
                <ImageGenerator prompt={response.result}/>
            </div>
        </>
    )
}

export default Admin
