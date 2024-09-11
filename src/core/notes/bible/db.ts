import Database from 'better-sqlite3';
import { BibleImage, Book, Chapter, Note, Pericope } from './types';

const db = new Database('./db/Biblia.db');

export function getBooks(): Book[] {
    const stmt = db.prepare('SELECT * FROM books');
    return stmt.all() as Book[];
}

export function getChapters(bookId: number): Chapter[] {
    const stmt = db.prepare(`
        SELECT 
            ch.chapter_number AS chapter_number,
            MIN(ch.title) AS chapter_title,
            MIN(pe.verse_range_start) AS verse_start, 
            MAX(pe.verse_range_end) AS verse_end
        FROM 
            chapters ch
            INNER JOIN pericopes pe ON ch.id = pe.chapter_id
            INNER JOIN sections s ON ch.section_id = s.id
            INNER JOIN parts p ON s.part_id = p.id
        WHERE 
            p.book_id = ?
        GROUP BY 
            ch.chapter_number
        ORDER BY 
            ch.chapter_number;
    `);
    return stmt.all(bookId) as Chapter[];
}

export function getPericopes(bookId: number): Pericope[] {
    const stmt = db.prepare(`
        SELECT 
            pe.title AS pericope_title,
            pe.verse_range_start AS verse_start,
            pe.verse_range_end AS verse_end,
            ch.title AS chapter_title,
            ch.chapter_number AS chapter_number,
            s.name AS section_name,
            p.name AS part_name  
        FROM 
            books b 
            INNER JOIN parts p ON b.id = p.book_id
            INNER JOIN sections s ON p.id = s.part_id
            INNER JOIN chapters ch ON s.id = ch.section_id
            LEFT JOIN pericopes pe ON ch.id = pe.chapter_id
        WHERE 
            b.id = ?
        ORDER BY 
            p.id, s.id, ch.chapter_number, pe.verse_range_start;
    `);
    return stmt.all(bookId) as Pericope[];
}

export function getNotes(book: string, chapterNumber: number): Note[] {
    const stmt = db.prepare(`
        SELECT n.title, n.path, n.verse_start, n.verse_end, n.icon, np.book, np.chapter, np.verse_range_start, np.verse_range_end
        FROM notes n
        JOIN note_passages np ON n.id = np.note_id
        WHERE np.book = ? AND np.chapter = ?
    `);
    return stmt.all(book, chapterNumber) as Note[];
}

export function getImages(contextId: number, contextType: string): BibleImage[] {
    const stmt = db.prepare(`
        SELECT 
            id,
            context_id,
            context_type,
            type,
            path,
            alt_text
        FROM 
            images
        WHERE 
            context_id = ? AND context_type = ?;
    `);
    return stmt.all(contextId, contextType) as BibleImage[];
}