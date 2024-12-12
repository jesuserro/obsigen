import { BookStructure } from "../BibleViewStructure";

const PrimeraJuan: BookStructure = {
	chapters: {
		1: {
			title: "El mensaje de vida",
			pericopes: []
		},
		2: {
			title: "La obediencia a Cristo y el amor fraternal",
			pericopes: []
		},
		3: {
			title: "Los hijos de Dios y el amor verdadero",
			pericopes: []
		},
		4: {
			title: "Dios es amor y la caridad fraterna",
			pericopes: [{
                title: "Dios es amor - Dios nos amó primero por nuestros pecados",
                verseRange: [7, 21],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-03 13.52.15 - 1 John 4_10 - God's love and the crucifixion of Christ.webp",
                        altText: "DALL·E 2024-12-03 13.52.15 - 1 John 4_10 - God's love and the crucifixion of Christ",
                    },
                ],
            }]
		},
		5: {
			title: "La fe en el Hijo de Dios",
			pericopes: []
		},
	},
};

export default PrimeraJuan;
