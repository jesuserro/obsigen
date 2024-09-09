-- Inserts para la tabla books

-- Pentateuco (section_id = 1)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(1, 'Génesis', 'Gn', 50),
(1, 'Éxodo', 'Ex', 40),
(1, 'Levítico', 'Lv', 27),
(1, 'Números', 'Nm', 36),
(1, 'Deuteronomio', 'Dt', 34);

-- Libros Históricos (section_id = 2)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(2, 'Josué', 'Jos', 24),
(2, 'Jueces', 'Jc', 21),
(2, 'Rut', 'Rt', 4),
(2, '1 Samuel', '1 S', 31),
(2, '2 Samuel', '2 S', 24),
(2, '1 Reyes', '1 R', 22),
(2, '2 Reyes', '2 R', 25),
(2, '1 Crónicas', '1 Cro', 29),
(2, '2 Crónicas', '2 Cro', 36),
(2, 'Esdras', 'Esd', 10),
(2, 'Nehemías', 'Ne', 13);

-- Novelas Bíblicas (section_id = 3)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(3, 'Tobías', 'Tb', 14),
(3, 'Judit', 'Jdt', 16),
(3, 'Ester', 'Est', 10),
(3, '1 Macabeos', '1 M', 16),
(3, '2 Macabeos', '2 M', 15);

-- Libros Sapienciales y Poéticos (section_id = 4)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(4, 'Job', 'Jb', 42),
(4, 'Salmos', 'Sal', 150),
(4, 'Proverbios', 'Pr', 31),
(4, 'Eclesiastés', 'Qo', 12),
(4, 'Cantar de los Cantares', 'Ct', 8),
(4, 'Sabiduría', 'Sb', 19),
(4, 'Sirácida (Eclesiástico)', 'Si', 51);

-- Profetas Mayores (section_id = 5)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(5, 'Isaías', 'Is', 66),
(5, 'Jeremías', 'Jr', 52),
(5, 'Lamentaciones', 'Lm', 5),
(5, 'Baruc', 'Ba', 6),
(5, 'Ezequiel', 'Ez', 48),
(5, 'Daniel', 'Dn', 14);

-- Profetas Menores (section_id = 6)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(6, 'Oseas', 'Os', 14),
(6, 'Joel', 'Jl', 3),
(6, 'Amós', 'Am', 9),
(6, 'Abdías', 'Ab', 1),
(6, 'Jonás', 'Jon', 4),
(6, 'Miqueas', 'Mi', 7),
(6, 'Nahúm', 'Na', 3),
(6, 'Habacuc', 'Ha', 3),
(6, 'Sofonías', 'So', 3),
(6, 'Ageo', 'Ag', 2),
(6, 'Zacarías', 'Za', 14),
(6, 'Malaquías', 'Ml', 4);

-- Evangelios (section_id = 7)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(7, 'Mateo', 'Mt', 28),
(7, 'Marcos', 'Mc', 16),
(7, 'Lucas', 'Lc', 24),
(7, 'Juan', 'Jn', 21);

-- Historia de la Iglesia (section_id = 8)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(8, 'Hechos de los Apóstoles', 'Hch', 28);

-- Epístolas Paulinas (section_id = 9)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(9, 'Romanos', 'Rm', 16),
(9, '1 Corintios', '1 Co', 16),
(9, '2 Corintios', '2 Co', 13),
(9, 'Gálatas', 'Ga', 6),
(9, 'Efesios', 'Ef', 6),
(9, 'Filipenses', 'Flp', 4),
(9, 'Colosenses', 'Col', 4),
(9, '1 Tesalonicenses', '1 Ts', 5),
(9, '2 Tesalonicenses', '2 Ts', 3),
(9, '1 Timoteo', '1 Tm', 6),
(9, '2 Timoteo', '2 Tm', 4),
(9, 'Tito', 'Tt', 3),
(9, 'Filemón', 'Flm', 1),
(9, 'Hebreos', 'Hb', 13);

-- Cartas Católicas (section_id = 10)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(10, 'Santiago', 'St', 5),
(10, '1 Pedro', '1 P', 5),
(10, '2 Pedro', '2 P', 3),
(10, '1 Juan', '1 Jn', 5),
(10, '2 Juan', '2 Jn', 1),
(10, '3 Juan', '3 Jn', 1),
(10, 'Judas', 'Jds', 1);

-- Apocalipsis (Profecía) (section_id = 11)
INSERT INTO books (section_id, name, abbreviation, chapter_count) VALUES
(11, 'Apocalipsis', 'Ap', 22);
