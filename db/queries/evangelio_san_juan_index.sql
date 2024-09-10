-- Consulta para generar el índice completo del Evangelio según San Juan
SELECT 
    c.name AS collection_name,
    b.name AS book_name,
    p.name AS part_name,
    s.name AS section_name,
    ch.chapter_number AS chapter_number,
    ch.title AS chapter_title,
    pe.title AS pericope_title,
    pe.verse_range_start AS verse_start,
    pe.verse_range_end AS verse_end
FROM 
    collections c
    INNER JOIN books b ON c.id = b.collection_id
    INNER JOIN parts p ON b.id = p.book_id
    INNER JOIN sections s ON p.id = s.part_id
    INNER JOIN chapters ch ON s.id = ch.section_id
    LEFT JOIN pericopes pe ON ch.id = pe.chapter_id
WHERE 
    b.id = 50 -- ID del libro de San Juan
ORDER BY 
    p.id, s.id, ch.chapter_number, pe.verse_range_start;
