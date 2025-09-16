import {useState} from "react";

function ImageGenerator({prompt}: { prompt: string | undefined }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')

    function handleOpenAIImage(): void {
        setLoading(true)

        setTimeout(() => {
            const response = {
                "data": [
                    {
                        "url": "https://imgs.search.brave.com/nTI72J0QlRf4qIsJwSSrEpw0OyBokWGFsrF4G6W4_7U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzI3LzU4Lzk5/LzM2MF9GXzIyNzU4/OTk5Nl9zajNlbVZt/Z2g5dkRqWFRlcjZ4/RnZCZXFEV1lTVUdn/RC5qcGc"
                    }
                ]
            };

            setImage(response.data[0].url)
            setLoading(false)
        }, 1000)
    }

    return <>
        <p className={'my-5'}>prompt = {prompt}</p>

        <button className={'w-full bg-red-100 rounded mt-5 py-1'} onClick={handleOpenAIImage}>
            {loading ? 'Génération...' : 'Utiliser ce prompt pour générer une image'}
        </button>

        {image &&
            <div className="w-full flex justify-center mt-5">
                <img src={image} alt="Test" className="max-h-28"/>
            </div>}
    </>
}

export default ImageGenerator
