import PrimeraCorintios from "./books/1Corintios";
import Apocalipsis from "./books/Apocalipsis";
import Cantares from "./books/CantarDeLosCantares";
import Daniel from "./books/Daniel";
import Exodo from "./books/Exodo";
import Ezequiel from "./books/Ezequiel";
import Genesis from "./books/Genesis";
import HechosDeLosApostoles from "./books/HechosDeLosApostoles";
import Isaias from "./books/Isaias";
import Job from "./books/Job";
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
    Génesis: Genesis,
    Éxodo: Exodo,
    Job: Job,
	Salmos: Salmos,
    "Cantar de los Cantares": Cantares,
    Sabiduria: Sabiduria,
    "Isaías": Isaias,
    Ezequiel: Ezequiel,
    Daniel: Daniel,
	"San Mateo": SanMateo,
	"San Marcos": SanMarcos,
	"San Lucas": SanLucas,
	"San Juan": SanJuan,
    "Hechos de los Apóstoles": HechosDeLosApostoles,
    "1 Corintios": PrimeraCorintios,
	Santiago: Santiago,
    Apocalipsis: Apocalipsis,
};
