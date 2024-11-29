import { BookStructure } from "../BibleViewStructure";

const Cantares: BookStructure = {
	chapters: {
		1: {
			title: "El anhelo de amor",
			pericopes: []
		},
		2: {
			title: "El amado y la amada disfrutan del amor",
			pericopes: [{
                title: "Canto Segundo - Celebración del amor - La Primavera",	
                verseRange: [8, 17],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-11-29 18.54.10 - Spring landscape inspired by the Song of Songs 2_8-17.webp",
                        altText: "DALL·E 2024-11-29 18.54.10 - Spring landscape inspired by the Song of Songs 2_8-17",
                    },
                ],
            }]
		},
		3: {
			title: "La búsqueda del amado y su llegada",
			pericopes: []
		},
		4: {
			title: "El amor del esposo por su esposa",
			pericopes: []
		},
		5: {
			title: "El sueño de la esposa y su búsqueda del amado",
			pericopes: []
		},
		6: {
			title: "El amado y la belleza de la esposa",
			pericopes: []
		},
		7: {
			title: "El amor y el deleite entre el amado y la amada",
			pericopes: []
		},
		8: {
			title: "El poder del amor",
			pericopes: [{
                title: "Epílogo",	
                verseRange: [6, 7],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-11-29 17.51.16 - Epilogue of the Song of Songs (Ct 8_6-7) Perpetuity of love.webp",
                        altText: "",
                    },
                ],
            }]
		},
	},
};

export default Cantares;
