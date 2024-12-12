import { App } from 'obsidian';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { ChapterImage, fetchChapterImages } from './Timeline';

interface Props {
    app: App;
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    selectedBook: string;
    setSelectedBook: (book: string) => void;
}

const TimelineView: React.FC<Props> = ({ app, bookRefs, selectedBook, setSelectedBook }) => {
    const [chapterImages, setChapterImages] = useState<{ [key: string]: ChapterImage[] }>({});

    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchChapterImages(app);
            setChapterImages(images);
        };
        fetchImages();
    }, [app]);

    return (
        <div className="timeline-view">
            <VerticalTimeline>
                {Object.entries(chapterImages).map(([key, images]) => (
                    images.map((image, index) => (
                        <VerticalTimelineElement
                            key={index}
                            date={image.date ? new Date(image.date).toLocaleDateString() : 'Unknown date'}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<FaMapMarkerAlt />}
                        >
                            <div className="timeline-element-content">
                                <img src={image.path} alt={image.alt} className="timeline-image" />
                                <h3 className="vertical-timeline-element-title">{image.title}</h3>
                                <h4 className="vertical-timeline-element-subtitle">{image.pericopeTitle}</h4>
                                <p>{image.versePassage}</p>
                                {image.locations && image.locations.length > 0 && image.coordinates && (
                                    <div className="map-overlay">
                                        <a href={`obsidian://mapview?do=open&centerLat=${image.coordinates[0]}&centerLng=${image.coordinates[1]}&chosenMapSource=0&linkColor=red&mapZoom=13&name=Default&query=&showLinks=true&fitBounds=true&showName=true&showPins=true&pinColor=red`} target="_blank" title={image.locations[0].replace(/\[\[|\]\]/g, '')}>
                                            <FaMapMarkerAlt /> {image.locations[0].replace(/\[\[|\]\]/g, '')}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </VerticalTimelineElement>
                    ))
                ))}
            </VerticalTimeline>
        </div>
    );
};

export default TimelineView;