import { BookStructure } from "../BibleViewStructure";

const PrimeraTimoteo: BookStructure = {
	chapters: {
		1: {
			title: "Advertencias contra falsas doctrinas",
			pericopes: []
		},
		2: {
			title: "Instrucciones sobre la oración y el comportamiento",
			pericopes: []
		},
		3: {
			title: "Requisitos para obispos y diáconos",
			pericopes: []
		},
		4: {
			title: "El buen siervo de Cristo",
			pericopes: []
		},
		5: {
			title: "Instrucciones sobre viudas, ancianos y esclavos",
			pericopes: [{
                title: "Comportamiento con los fieles",
                verseRange: [1, 2],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-03 19.42.00 - 1 Timothy 5_1-2 - Charla dulce de Timoteo.webp",
                        altText: "DALL·E 2024-12-03 19.42.00 - 1 Timothy 5:1-2 - Charla dulce de Timoteo",
                    },
                ],
            }]
		},
		6: {
			title: "La verdadera piedad y advertencias a los ricos",
			pericopes: []
		},
	},
};

export default PrimeraTimoteo;
