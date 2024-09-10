-- Reset the books table and the auto-increment counter
DELETE FROM books;
DELETE FROM sqlite_sequence WHERE name='books';

-- Inserts para la tabla books con los nuevos campos (description_of_jesus y commentary)
-- Pentateuco (collection_id = 1)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(1, 'Génesis', 'Gn', 50, 'La semilla de la mujer', 'Representa el inicio de la salvación'),
(1, 'Éxodo', 'Ex', 40, 'El Cordero Pascual', 'Simboliza sacrificio y redención'),
(1, 'Levítico', 'Lv', 27, 'Nuestro Sumo Sacerdote', 'Intercesor entre Dios y el hombre'),
(1, 'Números', 'Nm', 36, 'La columna de nube de día y de fuego de noche', 'Guía y protección'),
(1, 'Deuteronomio', 'Dt', 34, 'El profeta como Moisés', 'Portavoz de Dios');

-- Libros Históricos (collection_id = 2)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(2, 'Josué', 'Jos', 24, 'El capitán de nuestra salvación', 'Líder en la conquista espiritual'),
(2, 'Jueces', 'Jc', 21, 'Nuestro juez y legislador', 'Autoridad y ley'),
(2, 'Rut', 'Rt', 4, 'Nuestro pariente redentor', 'Rescate y protección familiar'),
(2, '1 Samuel', '1 S', 31, 'Nuestro profeta de confianza', 'Portador de la palabra de Dios'),
(2, '2 Samuel', '2 S', 24, 'Nuestro profeta de confianza', 'Portador de la palabra de Dios'),
(2, '1 Reyes', '1 R', 22, 'Nuestro Rey reinante', 'Autoridad suprema'),
(2, '2 Reyes', '2 R', 25, 'Nuestro Rey reinante', 'Autoridad suprema'),
(2, '1 Crónicas', '1 Cro', 29, 'Nuestro linaje prometido', 'Representa la línea real que culmina en Cristo, el Rey eterno'),
(2, '2 Crónicas', '2 Cro', 36, 'El templo y la gloria de Dios', 'Refleja la presencia de Dios y su gloria manifestada en Cristo'),
(2, 'Esdras', 'Esd', 10, 'Reconstruye los muros rotos de la vida humana', 'Restaurador'),
(2, 'Nehemías', 'Ne', 13, 'Reconstruye los muros rotos de la vida humana', 'Restaurador');

-- Novelas Bíblicas (collection_id = 3)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(3, 'Tobías', 'Tb', 14, 'Nuestro protector en la familia', 'Guía y cuidado divino'),
(3, 'Judit', 'Jdt', 16, 'Nuestro defensor valiente', 'Protección en la adversidad'),
(3, 'Ester', 'Est', 10, 'Nuestro Mardoqueo', 'Defensor y protector'),
(3, '1 Macabeos', '1 M', 16, 'Nuestro líder en la batalla', 'Fuerza en la lucha espiritual'),
(3, '2 Macabeos', '2 M', 15, 'El testigo de la resurrección', 'Esperanza en la vida eterna');

-- Libros Sapienciales y Poéticos (collection_id = 4)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(4, 'Job', 'Jb', 42, 'Nuestro Redentor viviente', 'Sostén en el sufrimiento'),
(4, 'Salmos', 'Sal', 150, 'Nuestro Pastor', 'Cuidado y dirección'),
(4, 'Proverbios', 'Pr', 31, 'Nuestra sabiduría', 'Fuente de verdad y conocimiento'),
(4, 'Eclesiastés', 'Qo', 12, 'El verdadero sentido de la vida', 'Cristo es quien da sentido y propósito a la vida bajo el sol'),
(4, 'Cantar de los Cantares', 'Ct', 8, 'Nuestro novio amoroso', 'Amor y compromiso'),
(4, 'Sabiduría', 'Sb', 19, 'La sabiduría de Dios encarnada', 'Fuente de sabiduría divina'),
(4, 'Sirácida (Eclesiástico)', 'Si', 51, 'El maestro divino', 'Guía para la vida justa');

-- Profetas Mayores (collection_id = 5)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(5, 'Isaías', 'Is', 66, 'El Príncipe de Paz', 'Fuente de paz'),
(5, 'Jeremías', 'Jr', 52, 'Nuestra rama justa', 'Justicia renovada'),
(5, 'Lamentaciones', 'Lm', 5, 'Nuestro profeta llorón', 'Dolor compartido'),
(5, 'Baruc', 'Ba', 6, 'El siervo de la justicia', 'Justicia y redención'),
(5, 'Ezequiel', 'Ez', 48, 'El hombre de la cara maravillosa', 'Presencia divina en tiempos difíciles'),
(5, 'Daniel', 'Dn', 14, 'El Cuarto Hombre en el horno ardiente', 'Protector en la adversidad');

-- Profetas Menores (collection_id = 6)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(6, 'Oseas', 'Os', 14, 'El esposo fiel', 'Amor incondicional'),
(6, 'Joel', 'Jl', 3, 'El bautizador con el Espíritu Santo y fuego', 'Renovación espiritual'),
(6, 'Amós', 'Am', 9, 'El restaurador de la justicia', 'Muestra a Cristo como el juez justo que corrige la injusticia y restaura la equidad'),
(6, 'Abdías', 'Ab', 1, 'Poderoso para salvar', 'Redención segura'),
(6, 'Jonás', 'Jon', 4, 'Nuestro gran misionero extranjero', 'Misión y propósito'),
(6, 'Miqueas', 'Mi', 7, 'Mensajero de pies hermosos', 'Proclamación de buenas noticias y la belleza del mensaje'),
(6, 'Nahúm', 'Na', 3, 'El vengador de Dios', 'Justicia divina'),
(6, 'Habacuc', 'Ha', 3, 'El evangelista de Dios', 'Llamado al arrepentimiento'),
(6, 'Sofonías', 'So', 3, 'Nuestro Salvador', 'Salvación ofrecida'),
(6, 'Ageo', 'Ag', 2, 'El restaurador de la herencia perdida de Dios', 'Recuperación de lo perdido'),
(6, 'Zacarías', 'Za', 14, 'La fuente abierta en la casa de David para pecado e impureza', 'Purificación y perdón'),
(6, 'Malaquías', 'Ml', 4, 'El sol de justicia que surge con sanidad en sus alas', 'Renovación y curación');

-- Evangelios (collection_id = 7)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(7, 'Mateo', 'Mt', 28, 'El rey de los judíos', 'Identidad como mesías'),
(7, 'Marcos', 'Mc', 16, 'El siervo', 'Servicio y sacrificio'),
(7, 'Lucas', 'Lc', 24, 'El Hijo del Hombre, sintiendo lo que tú sientes', 'Empatía y humanidad'),
(7, 'Juan', 'Jn', 21, 'El Hijo de Dios', 'Divinidad clara');

-- Historia de la Iglesia (collection_id = 8)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(8, 'Hechos de los Apóstoles', 'Hch', 28, 'El salvador del mundo', 'Expansión global del evangelio');

-- Epístolas Paulinas (collection_id = 9)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(9, 'Romanos', 'Rm', 16, 'La justicia de Dios', 'Justificación por la fe'),
(9, '1 Corintios', '1 Co', 16, 'La roca que nos sigue', 'Fundamento firme'),
(9, '2 Corintios', '2 Co', 13, 'El triunfante que da victoria', 'Triunfo sobre las pruebas'),
(9, 'Gálatas', 'Ga', 6, 'Tu libertad, te ha liberado', 'Libertad en Cristo'),
(9, 'Efesios', 'Ef', 6, 'La cabeza de la iglesia', 'Liderazgo espiritual'),
(9, 'Filipenses', 'Flp', 4, 'Tu alegría', 'Fuente de gozo'),
(9, 'Colosenses', 'Col', 4, 'Tu completitud', 'Plenitud en Cristo'),
(9, '1 Tesalonicenses', '1 Ts', 5, 'Tu esperanza', 'Promesa y anticipación'),
(9, '2 Tesalonicenses', '2 Ts', 3, 'Tu esperanza', 'Promesa y anticipación'),
(9, '1 Timoteo', '1 Tm', 6, 'Tu fe', 'Cimiento de la creencia'),
(9, '2 Timoteo', '2 Tm', 4, 'Tu estabilidad', 'Consistencia en la fe'),
(9, 'Tito', 'Tt', 3, 'La verdad', 'Doctrina y enseñanza'),
(9, 'Filemón', 'Flm', 1, 'Tu benefactor', 'Generosidad demostrada'),
(9, 'Hebreos', 'Hb', 13, 'Tu perfección', 'Culminación de la fe');

-- Cartas Católicas (collection_id = 10)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(10, 'Santiago', 'St', 5, 'El poder detrás de tu fe', 'Empoderamiento en la práctica'),
(10, '1 Pedro', '1 P', 5, 'Tu ejemplo', 'Modelo a seguir'),
(10, '2 Pedro', '2 P', 3, 'Tu pureza', 'Llamado a la santidad'),
(10, '1 Juan', '1 Jn', 5, 'Tu vida', 'Vida eterna en él'),
(10, '2 Juan', '2 Jn', 1, 'Tu patrón', 'Ejemplo a imitar'),
(10, '3 Juan', '3 Jn', 1, 'Tu motivación', 'Inspiración para actuar'),
(10, 'Judas', 'Jds', 1, 'La fundación de tu fe', 'Base sólida de creencias');

-- Apocalipsis (Profecía) (collection_id = 11)
INSERT INTO books (collection_id, name, abbreviation, chapter_count, description_of_jesus, commentary) VALUES
(11, 'Apocalipsis', 'Ap', 22, 'Tu rey venidero', 'Esperanza futura');

