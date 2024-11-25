import { BookStructure } from "../BibleViewStructure";

const Daniel: BookStructure = {
	chapters: {
		1: {
			title: "La vida de Daniel y sus amigos en Babilonia",
			pericopes: []
		},
		2: {
			title: "El sueño de Nabucodonosor y la estatua",
			pericopes: []
		},
		3: {
			title: "Los tres jóvenes en el horno de fuego",
			pericopes: []
		},
		4: {
			title: "El sueño de Nabucodonosor y su humillación",
			pericopes: []
		},
		5: {
			title: "La escritura en la pared y la caída de Babilonia",
			pericopes: []
		},
		6: {
			title: "Daniel en el foso de los leones",
			pericopes: []
		},
		7: {
			title: "La visión de los cuatro bestias",
			pericopes: [{
                title: "La visión de los cuatro bestias y del Hijo del Hombre",
                verseRange: [1, 14],
                images: [
                    {
                        type: "local",
                        path: "202411231900 Daniel 7 - Visión de las 4 bestias y del Hijo del Hombre.webp",
                        altText: "La visión de los cuatro bestias y del Hijo del Hombre",
                    },
                ],
            },]
		},
		8: {
			title: "La visión del carnero y el macho cabrío",
			pericopes: []
		},
		9: {
			title: "La oración de Daniel y la profecía de las setenta semanas",
			pericopes: []
		},
		10: {
			title: "La visión del hombre vestido de lino",
			pericopes: []
		},
		11: {
			title: "Profecía de los reinos del norte y del sur",
			pericopes: []
		},
		12: {
			title: "La profecía del tiempo del fin",
			pericopes: []
		},
	},
};

export default Daniel;
