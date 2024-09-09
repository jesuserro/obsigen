
-- Eliminar tablas existentes si ya existen
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS book_authors;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS verses;
DROP TABLE IF EXISTS pericopes;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS sections;

-- Crear tabla de secciones (sections)
CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único de la sección
    name TEXT NOT NULL,                    -- Nombre de la sección (Ej: Pentateuco, Libros Históricos)
    description TEXT                       -- Descripción de la sección (opcional)
);

-- Crear tabla de libros (books)
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único de cada libro
    section_id INTEGER,                    -- Relación con la tabla sections
    name TEXT NOT NULL,                    -- Nombre del libro (Ej: Génesis, Éxodo)
    abbreviation TEXT,                     -- Abreviatura del libro (Ej: Gn, Ex)
    chapter_count INTEGER,                 -- Número de capítulos del libro
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL  -- Clave foránea para sections
);

-- Crear tabla de capítulos (chapters)
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único del capítulo
    book_id INTEGER NOT NULL,              -- Relación con la tabla books
    chapter_number INTEGER NOT NULL,       -- Número del capítulo
    title TEXT,                            -- Título del capítulo (opcional)
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE -- Clave foránea para libros
);

-- Crear tabla de perícopas (pericopes)
CREATE TABLE IF NOT EXISTS pericopes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único de la perícopa
    chapter_id INTEGER NOT NULL,           -- Relación con la tabla chapters
    title TEXT,                            -- Título de la perícopa
    verse_range_start INTEGER NOT NULL,    -- Versículo de inicio
    verse_range_end INTEGER NOT NULL,      -- Versículo de fin
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE -- Clave foránea para capítulos
);

-- Crear tabla de versículos (verses)
CREATE TABLE IF NOT EXISTS verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único del versículo
    chapter_id INTEGER NOT NULL,           -- Relación con la tabla chapters
    verse_number INTEGER NOT NULL,         -- Número del versículo
    content TEXT NOT NULL,                 -- Texto del versículo
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE -- Clave foránea para capítulos
);

-- Crear tabla de autores (authors)
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único del autor
    name TEXT NOT NULL                     -- Nombre del autor
);

-- Crear tabla de relación entre libros y autores (book_authors)
CREATE TABLE IF NOT EXISTS book_authors (
    book_id INTEGER NOT NULL,              -- ID del libro (relacionado con la tabla books)
    author_id INTEGER NOT NULL,            -- ID del autor (relacionado con la tabla authors)
    PRIMARY KEY (book_id, author_id),      -- Clave primaria compuesta (un libro puede tener varios autores)
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,   -- Clave foránea para libros
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE -- Clave foránea para autores
);

-- Crear tabla unificada de imágenes (images)
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificador único de la imagen
    context_id INTEGER NOT NULL,           -- ID del libro, pericopa, versículo o autor
    context_type TEXT NOT NULL CHECK(context_type IN ('book', 'pericope', 'verse', 'author')),  -- Tipo de entidad a la que se asocia
    type TEXT NOT NULL CHECK(type IN ('local', 'url')),  -- Tipo de imagen (local o url)
    path TEXT NOT NULL,                    -- Ruta del archivo o URL de la imagen
    alt_text TEXT,                         -- Texto alternativo (opcional)
    FOREIGN KEY (context_id) REFERENCES books(id) ON DELETE CASCADE  -- La clave foránea se ajustará a la entidad
);

-- Crear índices para mejorar el rendimiento en consultas
CREATE INDEX idx_pericopes_chapter ON pericopes(chapter_id);
CREATE INDEX idx_verses_chapter ON verses(chapter_id);
CREATE INDEX idx_images_context ON images(context_id, context_type);
