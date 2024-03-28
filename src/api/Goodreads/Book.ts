// Book.ts

// Definición de la clase Book dentro de un módulo llamado "Libreria"
export module Goodreads {
    export class Book {
        private title: string;
        private authors: string[];
        private description: string;

        constructor(title: string, authors: string[], description: string) {
            this.title = title;
            this.authors = authors;
            this.description = description;
        }

        // Método para obtener el título del libro
        getTitle(): string {
            return this.title;
        }

        // Método para obtener los autores del libro
        getAuthors(): string[] {
            return this.authors;
        }

        // Método para obtener la descripción del libro
        getDescription(): string {
            return this.description;
        }
    }
}
