import React from 'react';
import { BiblePassage } from './ExternalBiblePassagesBar';

interface Props {
    externalPassages: BiblePassage[];
}

export function generatePassageLink(passage: BiblePassage): string {
    const fileName = `${passage.book} ${passage.chapter}`; // Crear el nombre del archivo de capítulo, como 'Ezequiel 37'
    return `obsidian://open?file=${encodeURIComponent(fileName)}`; // Generar el enlace directo al archivo del capítulo
}

const ExternalBiblePassagesBar: React.FC<Props> = ({ externalPassages }) => {
    if (!externalPassages || externalPassages.length === 0) {
        return null;
    }

    return (
        <div className="related-passages-container">
            {externalPassages.map((passage, index) => (
                <a
                    key={index}
                    href={generatePassageLink(passage)} // Usar el nuevo formato de enlace
                    title={`Ver ${passage.book} ${passage.chapter}`} // Tooltip para el pasaje externo
                    className="related-icon"
                >
                    <div className="arrow-icon">
                        {/* Aquí va el icono de la flecha */}
                        🡆
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ExternalBiblePassagesBar;
