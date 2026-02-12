interface ImagePreviewProps {
    imageUrl: string;
}

function ImagePreview({ imageUrl }: ImagePreviewProps) {
    return (
        <div>
            <img
                src={imageUrl}
                alt="Ton Pixia généré"
                className="w-full max-h-80 object-contain"
            />
        </div>
    );
}

export default ImagePreview;
