import React from 'react';
import { CalendarIcon } from './../calendar/CalendarIcon';
import { BiblePassage } from './ExternalBiblePassagesBar';

interface Props {
    externalPassages: BiblePassage[];
}

const ExternalBiblePassagesBar: React.FC<Props> = ({ externalPassages }) => {
    if (externalPassages.length === 0) return null;

    return (
        <div className="external-passages-bar-container">
            {externalPassages.map((passage, index) => (
                <a
                    key={index}
                    href={`obsidian://open?file=${encodeURIComponent(passage.book)}#${passage.chapter}`}
                    title={`Ver ${passage.book} ${passage.chapter}`} // Tooltip gestionado por Obsidian
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
