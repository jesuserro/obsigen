import { BookStructure } from "../BibleViewStructure";

const Jonas: BookStructure = {
	chapters: {
		1: {
			title: "Jonás huye del llamado de Dios",
			pericopes: []
		},
		2: {
			title: "La oración de Jonás desde el pez",
			pericopes: [{
                title: "La oración de Jonás desde el pez",
                verseRange: [1, 11],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-03 13.02.47 - Jon 2 1-11 - Jonah praying inside the belly of a giant fish.webp",
                        altText: "DALL·E 2024-12-03 13.02.47 - Jon 2 1-11 - Jonah praying inside the belly of a giant fish",
                    },
                ],
            }]
		},
		3: {
			title: "Jonás predica en Nínive",
			pericopes: []
		},
		4: {
			title: "La misericordia de Dios y la queja de Jonás",
			pericopes: []
		},
	},
};

export default Jonas;
