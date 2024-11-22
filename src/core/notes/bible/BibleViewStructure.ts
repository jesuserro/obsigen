import Sabiduria from "./books/Sabiduría";
import SanJuan from "./books/SanJuan";
import SanLucas from "./books/SanLucas";
import SanMarcos from "./books/SanMarcos";
import SanMateo from "./books/SanMateo";
import Santiago from "./books/Santiago";
export interface BibleImage {
	type: "local" | "url"; // 'local' para imágenes guardadas en el vault, 'url' para imágenes online
	path: string; // Ruta del archivo en el vault o URL de la imagen
	altText?: string; // Texto alternativo para la imagen, útil para accesibilidad
}

interface Pericope {
	title: string;
	verseRange: [number, number]; // Rango de versículos, e.g., [1, 18]
	images?: BibleImage[]; // Array de imágenes asociadas a la perícopa
}

interface ChapterInfo {
	title: string;
	pericopes: Pericope[];
}

export interface BookStructure {
	chapters: { [chapter: number]: ChapterInfo };
}

export const bibleStructure: { [book: string]: BookStructure } = {
	"Sabiduria": Sabiduria,
	"San Mateo": SanMateo,
	"San Marcos": SanMarcos,
	"San Lucas": SanLucas,
	"San Juan": SanJuan,
	"Santiago": Santiago,
};
