-- Reset the chapters table and the auto-increment counter
DELETE FROM chapters;
DELETE FROM sqlite_sequence WHERE name='chapters';

-- Inserts para la tabla chapters (San Juan)
INSERT INTO chapters (book_id, chapter_number, title) VALUES
(50, 1, 'El Verbo se hizo carne'),
(50, 2, 'Las bodas de Caná'),
(50, 3, 'Jesús y Nicodemo'),
(50, 4, 'La mujer samaritana'),
(50, 5, 'Jesús sana en el día de reposo'),
(50, 6, 'Jesús alimenta a los cinco mil'),
(50, 7, 'Jesús en la fiesta de los tabernáculos'),
(50, 8, 'La mujer adúltera y la luz del mundo'),
(50, 9, 'Jesús sana a un ciego de nacimiento'),
(50, 10, 'El buen pastor'),
(50, 11, 'La resurrección de Lázaro'),
(50, 12, 'Jesús ungido en Betania'),
(50, 13, 'La última cena'),
(50, 14, 'Jesús, el camino, la verdad y la vida'),
(50, 15, 'La vid verdadera'),
(50, 16, 'El Espíritu Santo y la obra del Consolador'),
(50, 17, 'La oración sacerdotal de Jesús'),
(50, 18, 'La traición y arresto de Jesús'),
(50, 19, 'La crucifixión y muerte de Jesús'),
(50, 20, 'La resurrección de Jesús'),
(50, 21, 'Jesús se aparece en el mar de Tiberíades');
