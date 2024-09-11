export interface Note {
    title: string;
    path: string;
    verse_start?: number;
    verse_end?: number;
    icon?: React.ReactNode;
    book?: string;
    chapter?: number;
    verse_range_start?: number;
    verse_range_end?: number;
}

export interface Pericope {
    title: string;
    verse_start: number;
    verse_end: number;
    chapter_number: number;
    notes?: Note[];
    images?: BibleImage[];
}

export interface Chapter {
    chapter_number: number;
    title: string;
    pericopes?: Pericope[];
}

export interface Book {
    id: number;
    name: string;
    chapters?: Chapter[];
}

export interface BibleImage {
    type: 'local' | 'url'; // 'local' for images stored in the vault, 'url' for online images
    path: string; // Path to the file in the vault or URL of the image
    altText?: string; // Alternative text for the image, useful for accessibility
}