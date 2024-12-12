import { BookStructure } from "../BibleViewStructure";

const Efesios: BookStructure = {
	chapters: {
		1: {
			title: "Bendiciones espirituales en Cristo",
			pericopes: []
		},
		2: {
			title: "La salvación por gracia mediante la fe",
			pericopes: []
		},
		3: {
			title: "El ministerio de Pablo a los gentiles",
			pericopes: []
		},
		4: {
			title: "La unidad en el cuerpo de Cristo",
			pericopes: [{
                title: "Fundamentos de la unidad - La vocación cristiana",
                verseRange: [1, 10],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-05 18.35.16 - Ephesians 4_7-10 - Unidad y vocación cristiana.webp",
                        altText: "DALL·E 2024-12-05 18.35.16 - Ephesians 4:7-10 - Unidad y vocación cristiana",
                    },
                ],
            },]
		},
		5: {
			title: "El llamado a una vida de amor",
			pericopes: [{
                title: "El matrimonio: Sacramento de la unión entre Cristo y la Iglesia",
                verseRange: [21, 33],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-05 19.03.51 - Marriage as described in Ephesians 5_21-33.webp",
                        altText: "DALE 2024-12-05 19.03.51 - Marriage as described in Ephesians 5:21-33",
                    },
                ],
            }]
		},
		6: {
			title: "La armadura de Dios",
			pericopes: [{
                title: "La Armadura Divina Contra las Tinieblas más Allá de lo Humano",
                verseRange: [10, 20],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-05 17.59.50 - Ephesians 6_10-20 - Armadura espiritual.webp",
                        altText: "DALL·E 2024-12-05 17.59.50 - Ephesians 6:10-20 - Armadura espiritual",
                    },
                ],
            },]
		},
	},
};

export default Efesios;
