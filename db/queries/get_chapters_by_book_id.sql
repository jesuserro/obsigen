-- Consulta para obtener el número de capítulos de Juan, su título (primer título) y rango de versos
SELECT 
    ch.chapter_number AS chapter_number,
    MIN(ch.title) AS chapter_title, -- Tomar el primer título del capítulo
    MIN(pe.verse_range_start) AS verse_start, 
    MAX(pe.verse_range_end) AS verse_end
FROM 
    chapters ch
    INNER JOIN pericopes pe ON ch.id = pe.chapter_id
    INNER JOIN sections s ON ch.section_id = s.id
    INNER JOIN parts p ON s.part_id = p.id
WHERE 
    p.book_id = 50  -- ID del libro de San Juan (book_id = 50)
GROUP BY 
    ch.chapter_number
ORDER BY 
    ch.chapter_number;
