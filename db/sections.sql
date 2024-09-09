-- Reset the images table and the auto-increment counter
DELETE FROM sections;
DELETE FROM sqlite_sequence WHERE name='sections';

-- Inserts para la tabla sections
INSERT INTO sections (name, description) VALUES
('Pentateuco', 'Los cinco primeros libros de la Biblia, también conocidos como la Ley de Moisés'),
('Libros Históricos', 'Relatos históricos sobre la formación y desarrollo de Israel'),
('Novelas Bíblicas', 'Libros que cuentan historias religiosas con enseñanzas morales'),
('Libros Sapienciales y Poéticos', 'Textos que contienen sabiduría y poesía'),
('Profetas Mayores', 'Libros proféticos más extensos en contenido'),
('Profetas Menores', 'Libros de profetas más cortos en extensión'),
('Evangelios', 'Los cuatro Evangelios que relatan la vida y obra de Jesús'),
('Historia de la Iglesia', 'Relatos sobre los primeros años del cristianismo'),
('Epístolas Paulinas', 'Cartas escritas por el apóstol Pablo a las primeras iglesias'),
('Cartas Católicas', 'Cartas dirigidas a toda la comunidad cristiana'),
('Apocalipsis (Profecía)', 'El libro de la revelación final y profecía');
