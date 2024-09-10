-- Reset the chapters table and the auto-increment counter
DELETE FROM chapters;
DELETE FROM sqlite_sequence WHERE name='chapters';

-- Inserts para la tabla chapters (San Juan), con section_id
INSERT INTO chapters (section_id, chapter_number, title) VALUES
-- Capítulos para el Prólogo (section_id = 1)
(1, 1, 'El Verbo se hizo carne'),

-- Capítulos para la Introducción (section_id = 2)
(2, 1, 'Testimonio del Bautista'),
(2, 1, 'Vocación de los primeros discípulos'),

-- Capítulos para Jesús, portador de la salvación (section_id = 3)
(3, 2, 'Las bodas de Caná'),
(3, 2, 'Purificación del templo'),
(3, 3, 'Jesús y Nicodemo'),
(3, 3, 'Nuevo testimonio del Bautista'),
(3, 4, 'La mujer samaritana'),
(3, 4, 'Curación del hijo de un funcionario'),

-- Capítulos para Jesús manifiesta su divinidad (section_id = 4)
(4, 5, 'Jesús sana en el día de reposo'),
(4, 5, 'Jesús actúa con el poder de Dios'),

-- Capítulos para Jesús es el pan de vida (section_id = 5)
(5, 6, 'Jesús alimenta a los cinco mil'),
(5, 6, 'Jesús camina sobre las aguas'),
(5, 6, 'Jesús es el pan de vida'),
(5, 6, 'Reacción de los discípulos'),

-- Capítulos para Jesús, enviado del Padre (section_id = 6)
(6, 7, 'Jesús en la fiesta de los tabernáculos'),
(6, 8, 'La mujer adúltera y la luz del mundo'),
(6, 9, 'Jesús sana a un ciego de nacimiento'),
(6, 10, 'El buen pastor'),

-- Capítulos para Jesús y el Padre (section_id = 7)
(7, 10, 'Jesús revela su unidad con el Padre'),

-- Capítulos para Jesús es la resurrección y la vida (section_id = 8)
(8, 11, 'La resurrección de Lázaro'),

-- Capítulos para Jesús, aclamado Rey Mesiánico (section_id = 9)
(9, 12, 'Jesús ungido en Betania'),

-- Capítulos para la Última Cena (section_id = 10)
(10, 13, 'La última cena'),
(10, 14, 'Jesús, el camino, la verdad y la vida'),
(10, 15, 'La vid verdadera'),
(10, 16, 'El Espíritu Santo y la obra del Consolador'),
(10, 17, 'La oración sacerdotal de Jesús'),

-- Capítulos para Pasión y Muerte de Jesús (section_id = 11)
(11, 18, 'La traición y arresto de Jesús'),
(11, 19, 'La crucifixión y muerte de Jesús'),

-- Capítulos para Apariciones de Jesús resucitado (section_id = 12)
(12, 20, 'La resurrección de Jesús'),
(12, 21, 'Jesús se aparece en el mar de Tiberíades');
