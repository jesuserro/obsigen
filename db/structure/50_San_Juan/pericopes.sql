-- Reset the pericopes table and the auto-increment counter
DELETE FROM pericopes;
DELETE FROM sqlite_sequence WHERE name='pericopes';

-- Inserts para la tabla pericopes (San Juan), con chapter_id actualizados
INSERT INTO pericopes (chapter_id, title, verse_range_start, verse_range_end) VALUES
-- Perícopas del capítulo 1
(1, 'Prólogo', 1, 18),
(2, 'Testimonio de Juan el Bautista', 19, 28),
(2, 'El Cordero de Dios', 29, 34),
(3, 'Los primeros discípulos', 35, 42),
(3, 'Jesús llama a Felipe y a Natanael', 43, 51),

-- Perícopas del capítulo 2
(4, 'El primer milagro de Jesús en Caná', 1, 12),
(5, 'Jesús purifica el templo', 13, 22),
(5, 'Jesús conoce a todos los hombres', 23, 25),

-- Perícopas del capítulo 3
(6, 'Jesús enseña a Nicodemo', 1, 21),
(7, 'El testimonio de Juan el Bautista', 22, 36),

-- Perícopas del capítulo 4
(8, 'Jesús y la mujer samaritana', 1, 26),
(8, 'La conversión de los samaritanos', 27, 42),
(9, 'Jesús sana al hijo de un funcionario', 43, 54),

-- Perícopas del capítulo 5
(10, 'Jesús sana al paralítico en Betesda', 1, 15),
(11, 'Jesús habla de su autoridad', 16, 30),
(11, 'Testimonios acerca de Jesús', 31, 47),

-- Perícopas del capítulo 6
(12, 'Jesús alimenta a los cinco mil', 1, 15),
(13, 'Jesús camina sobre el agua', 16, 21),
(14, 'Las multitudes buscan a Jesús', 22, 26),
(14, 'Jesús, el pan de vida', 27, 59),
(15, 'Muchos discípulos abandonan a Jesús', 60, 71),

-- Perícopas del capítulo 7
(16, 'Jesús va a la fiesta en secreto', 1, 13),
(16, 'Jesús enseña en la fiesta', 14, 24),
(16, '¿Es Jesús el Cristo?', 25, 36),
(16, 'El último día de la fiesta', 37, 53),

-- Perícopas del capítulo 8
(17, 'Jesús y la mujer adúltera', 1, 11),
(17, 'Jesús, la luz del mundo', 12, 20),
(17, 'Jesús predice su partida', 21, 30),
(17, 'La verdad os hará libres', 31, 47),
(17, 'Jesús y Abraham', 48, 59),

-- Perícopas del capítulo 9
(18, 'Jesús sana a un ciego de nacimiento', 1, 12),
(18, 'El ciego es interrogado por los fariseos', 13, 34),
(18, 'El ciego cree en Jesús', 35, 41),

-- Perícopas del capítulo 10
(19, 'Jesús, el buen pastor', 1, 21),
(20, 'Jesús y las obras de su Padre', 22, 42),

-- Perícopas del capítulo 11
(21, 'La muerte de Lázaro', 1, 16),
(21, 'Jesús, la resurrección y la vida', 17, 27),
(21, 'Jesús llora ante la tumba de Lázaro', 28, 37),
(21, 'Jesús resucita a Lázaro', 38, 44),
(21, 'La conspiración para matar a Jesús', 45, 57),

-- Perícopas del capítulo 12
(22, 'Jesús ungido en Betania', 1, 11),
(22, 'La entrada triunfal en Jerusalén', 12, 19),
(22, 'Jesús predice su muerte', 20, 36),
(22, 'La incredulidad de la gente', 37, 43),
(22, 'Jesús habla del juicio final', 44, 50),

-- Perícopas del capítulo 13
(23, 'Jesús lava los pies a sus discípulos', 1, 17),
(23, 'Predicción de la traición de Judas', 18, 30),
(23, 'El nuevo mandamiento', 31, 38),

-- Perícopas del capítulo 14
(24, 'Jesús promete un lugar en el cielo', 1, 14),
(24, 'Jesús promete el Espíritu Santo', 15, 31),

-- Perícopas del capítulo 15
(25, 'Jesús, la vid verdadera', 1, 17),
(25, 'El odio del mundo', 18, 27),

-- Perícopas del capítulo 16
(26, 'Jesús habla del Espíritu Santo', 1, 15),
(26, 'Jesús habla de su regreso', 16, 33),

-- Perícopas del capítulo 17
(27, 'Jesús ora por sí mismo', 1, 5),
(27, 'Jesús ora por sus discípulos', 6, 19),
(27, 'Jesús ora por todos los creyentes', 20, 26),

-- Perícopas del capítulo 18
(28, 'Jesús es arrestado', 1, 11),
(28, 'Jesús ante el sumo sacerdote', 12, 27),
(28, 'Jesús ante Pilato', 28, 40),

-- Perícopas del capítulo 19
(29, 'Jesús es flagelado y condenado', 1, 16),
(29, 'Jesús es crucificado', 17, 30),
(29, 'La muerte de Jesús', 31, 37),
(29, 'El entierro de Jesús', 38, 42),

-- Perícopas del capítulo 20
(30, 'La tumba vacía', 1, 10),
(30, 'Jesús se aparece a María Magdalena', 11, 18),
(30, 'Jesús se aparece a sus discípulos', 19, 23),
(30, 'Jesús se aparece a Tomás', 24, 29),
(30, 'El propósito de este evangelio', 30, 31),

-- Perícopas del capítulo 21
(31, 'Jesús se aparece en el mar de Tiberíades', 1, 14),
(31, 'Jesús y Pedro', 15, 19),
(31, 'El futuro de Pedro y Juan', 20, 25);
