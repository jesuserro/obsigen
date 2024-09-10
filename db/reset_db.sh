#!/bin/bash

# Nombre del archivo de la base de datos real
REAL_DB_PATH="/mnt/c/Users/jesus/db/Biblia.db"

# Nombre del enlace simbólico en el proyecto
SYMLINK_DB="Biblia.db"

# Directorio donde se encuentran los scripts SQL
SQL_DIR="."

# Eliminar el enlace simbólico si ya existe
if [ -L "$SYMLINK_DB" ]; then
  echo "Eliminando el enlace simbólico existente: $SYMLINK_DB"
  rm "$SYMLINK_DB"
fi

# Crear un nuevo enlace simbólico hacia el archivo de base de datos real
echo "Creando un nuevo enlace simbólico: $SYMLINK_DB -> $REAL_DB_PATH"
ln -s "$REAL_DB_PATH" "$SYMLINK_DB"

# Eliminar la base de datos real si existe
if [ -f "$REAL_DB_PATH" ]; then
  echo "No se pudo eliminar la base de datos real existente: $REAL_DB_PATH. Asegúrate de tener permisos."
fi

# Crear una nueva base de datos
echo "Creando nueva base de datos: $SYMLINK_DB"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/schema.sql"

# Ejecutar los scripts SQL en el orden adecuado
echo "Ejecutando scripts SQL..."
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/collections.sql"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/books.sql"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/parts.sql"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/sections.sql"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/chapters.sql"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/pericopes.sql"
sqlite3 "$SYMLINK_DB" < "$SQL_DIR/images.sql"

echo "Base de datos recreada con éxito."
