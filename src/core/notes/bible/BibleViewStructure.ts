import Sabiduria from "./books/Sabiduría";
import Salmos from "./books/Salmos";
import SanJuan from "./books/SanJuan";
import SanLucas from "./books/SanLucas";
import SanMarcos from "./books/SanMarcos";
import SanMateo from "./books/SanMateo";
import Santiago from "./books/Santiago";
export interface BibleImage {
	path: string;
	altText?: string;
    type?: "local" | "url"; // Asegúrate de que esta propiedad exista  
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
	Salmos: Salmos,
    Sabiduria: Sabiduria,
	"San Mateo": SanMateo,
	"San Marcos": SanMarcos,
	"San Lucas": SanLucas,
	"San Juan": SanJuan,
	Santiago: Santiago,
};
