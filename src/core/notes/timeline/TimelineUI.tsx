import { App } from 'obsidian';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Note, fetchChapterImages, openNoteByPath } from './Timeline';

interface TimelineViewProps {
    app: App;
}

const TimelineView: React.FC<TimelineViewProps> = ({ app }) => {
    const [chapterImages, setChapterImages] = useState<{ [key: string]: Note[] }>({});

    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchChapterImages(app);
            setChapterImages(images);
        };
        fetchImages();
    }, [app]);

    return (
        <div className="timeline-view">
            <VerticalTimeline layout="1-column-left">
                {Object.entries(chapterImages).map(([key, images]) => (
                    images.map((image, index) => (
                        <VerticalTimelineElement
                            key={index}
                            date={image.date ? new Date(image.date).toLocaleDateString() : 'Unknown date'}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<FaMapMarkerAlt />}
                            contentStyle={{ background: '#1e1e1e', color: '#e0e0e0' }}
                            contentArrowStyle={{ borderRight: '7px solid  #1e1e1e' }}
                        >
                            <div className="timeline-element-content">
                                <div className="timeline-image-container">
                                    <img src={image.path} alt={image.alt} className="timeline-image" />
                                </div>
                                <div className="timeline-text-container">
                                    <h3 className="vertical-timeline-element-title">
                                        <a href="#" onClick={(e) => { e.preventDefault(); openNoteByPath(app, image.notePath); }}>
                                            {image.title}
                                        </a>
                                    </h3>
                                    <h4 className="vertical-timeline-element-subtitle">{image.pericopeTitle}</h4>
                                    <p>{image.versePassage}</p>
                                    {image.locations && image.locations.length > 0 && image.coordinates && (
                                        <div className="map-overlay">
                                            <a href={`obsidian://mapview?do=open&centerLat=${image.coordinates[0]}&centerLng=${image.coordinates[1]}&chosenMapSource=0&linkColor=red&mapZoom=13&name=Default&query=&showLinks=true&fitBounds=true&showName=true&showPins=true&pinColor=red`} target="_blank" title={image.locations ? image.locations[0].replace(/\[\[|\]\]/g, '') : ''}>
                                                <FaMapMarkerAlt /> {/* Usamos el icono de marcador */}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </VerticalTimelineElement>
                    ))
                ))}
            </VerticalTimeline>
        </div>
    );
};

export default TimelineView;