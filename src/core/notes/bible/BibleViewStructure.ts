import PrimeraCorintios from "./books/1Corintios";
import PrimeraJuan from "./books/1Juan";
import PrimeraReyes from "./books/1Reyes";
import Apocalipsis from "./books/Apocalipsis";
import Cantares from "./books/CantarDeLosCantares";
import Colosenses from "./books/Colosenses";
import Daniel from "./books/Daniel";
import Deuteronomio from "./books/Deuteronomio";
import Efesios from "./books/Efesios";
import Ester from "./books/Ester";
import Exodo from "./books/Exodo";
import Ezequiel from "./books/Ezequiel";
import Filipenses from "./books/Filipenses";
import Galatas from "./books/Galatas";
import Genesis from "./books/Genesis";
import HechosDeLosApostoles from "./books/HechosDeLosApostoles";
import Isaias from "./books/Isaias";
import Jeremias from "./books/Jeremias";
import Job from "./books/Job";
import Jonas from "./books/Jonas";
import Judit from "./books/Judit";
import Levitico from "./books/Levitico";
import Numeros from "./books/Numeros";
import Romanos from "./books/Romanos";
import Ruth from "./books/Ruth";
import Sabiduria from "./books/Sabiduría";
import Salmos from "./books/Salmos";
import SanJuan from "./books/SanJuan";
import SanLucas from "./books/SanLucas";
import SanMarcos from "./books/SanMarcos";
import SanMateo from "./books/SanMateo";
import Santiago from "./books/Santiago";
import Siracida from "./books/Siracida";
import Tobias from "./books/Tobias";


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
    Levítico: Levitico,
    Números: Numeros,
    Deuteronomio: Deuteronomio,
    Job: Job,
    Rut: Ruth,
    "1 Reyes": PrimeraReyes,
    Tobías: Tobias,
    Ester: Ester,
    Judit: Judit,
	Salmos: Salmos,
    "Cantar de los Cantares": Cantares,
    Sabiduria: Sabiduria,
    Sirácida: Siracida,
    "Isaías": Isaias,
    Jeremías: Jeremias,
    Ezequiel: Ezequiel,
    Daniel: Daniel,
    Jonás: Jonas,
	"San Mateo": SanMateo,
	"San Marcos": SanMarcos,
	"San Lucas": SanLucas,
	"San Juan": SanJuan,
    "Hechos de los Apóstoles": HechosDeLosApostoles,
    Romanos: Romanos,
    Gálatas: Galatas,
    Filipenses: Filipenses,
    Colosenses: Colosenses,
    Efesios: Efesios,
    "1 Corintios": PrimeraCorintios,
	Santiago: Santiago,
    "1 Juan": PrimeraJuan,
    Apocalipsis: Apocalipsis,
};
