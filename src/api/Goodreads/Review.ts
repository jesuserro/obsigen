import * as fs from 'fs';
import fetch from 'node-fetch';

// Definir las credenciales de la API de Goodreads
const GOODREADS_USER: string = '40291334';
const GOODREADS_API_KEY: string = 'DkLO3yfzNSM1JLOIJFXL3A';
export module Goodreads {
    // Clase para representar la información de una review
    export class Review {
        title: string;
        authors: Author[];
        description: string;

        constructor(title: string, authors: Author[], description: string) {
            this.title = title;
            this.authors = authors;
            this.description = description;
        }

        // Método para obtener la información de un libro desde la API de Goodreads
        static async obtenerInfoLibro(idLibro: string): Promise<Review | null> {
            const url: string = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER}?key=${GOODREADS_API_KEY}&shelf=read`;
            const urlBook: string = `https://www.goodreads.com/book/show/${idLibro}.json?key=${GOODREADS_API_KEY}`;

            try {
                const respuesta = await fetch(url);
                if (respuesta.ok) {
                    const datosLibro = await respuesta.json();
                    return new Review(
                        datosLibro.title,
                        datosLibro.authors.map((author: any) => new Author(author.name)),
                        datosLibro.description
                    );
                } else {
                    console.error(`Error al obtener la información del libro: ${respuesta.status}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error de red al obtener la información del libro: ${error}`);
                return null;
            }
        }

        // Método para generar un archivo .md con la información de un libro
        async generarMdLibro(idLibro: string): Promise<void> {
            const libro = await Review.obtenerInfoLibro(idLibro);
            if (libro) {
                try {
                    const contenidoMd: string = `# ${libro.title}\n\nAutor: ${libro.authors[0].name}\n\nDescripción: ${libro.description}\n\n`;
                    fs.writeFileSync(`${idLibro}.md`, contenidoMd);
                    console.log(`Se ha generado el archivo ${idLibro}.md exitosamente.`);
                } catch (error) {
                    console.error(`Error al escribir el archivo ${idLibro}.md: ${error}`);
                }
            } else {
                console.error('No se pudo obtener la información del libro.');
            }
        }
    }
}

