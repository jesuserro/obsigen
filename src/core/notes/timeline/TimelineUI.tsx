import { App } from 'obsidian';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { fetchChapterImages } from '../bible/BibleViewChapters';
import { ChapterImage } from './Timeline';

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
                            date={`${image.date}]}`}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<FaMapMarkerAlt />}
                        >
                            <h3 className="vertical-timeline-element-title">{image.title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{image.pericopeTitle}</h4>
                            <p>{image.versePassage}</p>
                        </VerticalTimelineElement>
                    ))
                ))}
            </VerticalTimeline>
        </div>
    );
};

export default TimelineView;