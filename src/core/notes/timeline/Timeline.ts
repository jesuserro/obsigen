import { App } from 'obsidian';
import { fetchChapterImages } from '../bible/BibleViewChapters';
import { BibleImage } from '../bible/BibleViewStructure';

export interface ChapterImage extends BibleImage {
    verseRange: [number, number];
    pericopeTitle: string;
    title: string;
    alt: string;
    rating?: number;
    verseTitle?: string;
    versePassage?: string;
    locations?: string[];
    coordinates?: [number, number];
    date?: string; 
}

export async function getTimelineData(app: App): Promise<{ [key: string]: ChapterImage[] }> {
    return await fetchChapterImages(app);
}