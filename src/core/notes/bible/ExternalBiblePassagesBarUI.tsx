import React from 'react';
import { CalendarIcon } from './../calendar/CalendarIcon';
import { BiblePassage, generatePassageLink } from './ExternalBiblePassagesBar';

interface Props {
    externalPassages: BiblePassage[];
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
                        {CalendarIcon.getIcon('arrow_right', 15)}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ExternalBiblePassagesBar;
