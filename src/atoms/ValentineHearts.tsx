import Snowfall from 'react-snowfall';
import { useEffect, useState } from 'react';

// Créer une image cœur SVG avec une couleur
const createHeartImage = (color: string): HTMLImageElement => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `;

    const img = document.createElement('img');
    img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    return img;
};

function ValentineHearts() {
    const [hearts, setHearts] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const colors = ['#ff006e', '#ff85a1', '#e63946', '#ff4d6d', '#ffb3c1'];
        const images = colors.map((color) => createHeartImage(color));

        Promise.all(
            images.map(
                (img) =>
                    new Promise((resolve) => {
                        img.onload = resolve;
                    })
            )
        ).then(() => setHearts(images));
    }, []);

    if (hearts.length === 0) return null;

    return (
        <Snowfall
            images={hearts}
            radius={[8, 15]}
            snowflakeCount={20}
            speed={[0.5, 1.5]}
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 0,
            }}
        />
    );
}

export default ValentineHearts;
