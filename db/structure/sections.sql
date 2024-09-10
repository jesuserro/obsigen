-- Insertar sections para el libro de Juan (book_id = 50) y sus respectivas parts

-- Sections para la Parte 1: PRÓLOGO
INSERT INTO sections (part_id, name, description) VALUES
(1, 'Prólogo', 'Prólogo del Evangelio según San Juan (Jn 1:1-18)');

-- Sections para la Parte 2: PRIMERA PARTE: LA MANIFESTACIÓN DE JESÚS COMO EL MESÍAS, MEDIANTE SUS SIGNOS Y PALABRAS
INSERT INTO sections (part_id, name, description) VALUES
(2, 'I. INTRODUCCIÓN', 'Introducción: Testimonio del Bautista y Vocación de los primeros discípulos (Jn 1:19-51)'),
(2, 'II. JESÚS, PORTADOR DE LA SALVACIÓN: PRIMERAS MANIFESTACIONES DE FE', 'Primeras manifestaciones de fe a través de los signos de Jesús (Jn 2:1-4:54)'),
(2, 'III. JESÚS MANIFIESTA SU DIVINIDAD', 'Jesús revela su divinidad mediante señales (Jn 5:1-47)'),
(2, 'IV. JESÚS ES EL PAN DE VIDA', 'Jesús se revela como el Pan de Vida en su discurso y actos (Jn 6:1-71)'),
(2, 'V. JESÚS, ENVIADO DEL PADRE, LUZ DEL MUNDO Y BUEN PASTOR', 'Jesús se declara Luz del Mundo y el Buen Pastor (Jn 7:1-10:21)'),
(2, 'VI. JESÚS Y EL PADRE', 'Jesús revela su unidad con el Padre (Jn 10:22-42)'),
(2, 'VII. JESÚS ES LA RESURRECCIÓN Y LA VIDA', 'Jesús demuestra ser la Resurrección y la Vida (Jn 11:1-57)'),
(2, 'VIII. JESÚS, ACLAMADO REY MESIÁNICO', 'Jesús es aclamado como Rey Mesiánico en su entrada a Jerusalén (Jn 12:1-50)');

-- Sections para la Parte 3: SEGUNDA PARTE: MANIFESTACIÓN DE JESÚS COMO EL MESÍAS, HIJO DE DIOS, EN SU PASIÓN, MUERTE Y RESURRECCIÓN
INSERT INTO sections (part_id, name, description) VALUES
(3, 'IX. LA ÚLTIMA CENA', 'Descripción de los eventos de la Última Cena (Jn 13:1-17:26)'),
(3, 'X. PASIÓN Y MUERTE DE JESÚS', 'Narración de la pasión y muerte de Jesús (Jn 18:1-19:42)'),
(3, 'XI. APARICIONES DE JESÚS RESUCITADO', 'Relatos de las apariciones de Jesús resucitado (Jn 20:1-21:25)');
