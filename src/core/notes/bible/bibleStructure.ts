interface Event {
	title: string;
	date?: string;
}

interface ChapterInfo {
	title: string;
	verseCount: number;
	events: Event[];
}

interface BookStructure {
	chapterCount: number;
	chapters: { [chapter: number]: ChapterInfo };
}

export const bibleStructure: { [book: string]: BookStructure } = {
	"San Marcos": {
		chapterCount: 16, // Número total de capítulos en San Marcos
		chapters: {
			1: {
				title: "Preparación del ministerio de Jesús",
				verseCount: 45,
				events: [{ title: "Jesús bautizado por Juan" }],
			},
			2: {
				title: "Jesús sana a un paralítico",
				verseCount: 28,
				events: [{ title: "Sanación del paralítico" }],
			},
			3: {
				title: "Llamamiento de los doce apóstoles",
				verseCount: 35,
				events: [{ title: "Elección de los doce" }],
			},
			4: {
				title: "Parábolas de Jesús",
				verseCount: 41,
				events: [{ title: "Parábola del sembrador" }],
			},
			5: {
				title: "Jesús expulsa demonios y sana enfermos",
				verseCount: 43,
				events: [{ title: "Expulsión de demonios en Gadara" }],
			},
			6: {
				title: "Jesús envía a los doce",
				verseCount: 56,
				events: [{ title: "Muerte de Juan el Bautista" }],
			},
			7: {
				title: "Jesús y la tradición de los fariseos",
				verseCount: 37,
				events: [
					{ title: "Sanación de la hija de la mujer sirofenicia" },
				],
			},
			8: {
				title: "Jesús alimenta a los cuatro mil",
				verseCount: 38,
				events: [{ title: "Confesión de Pedro" }],
			},
			9: {
				title: "La transfiguración",
				verseCount: 50,
				events: [{ title: "Transfiguración de Jesús" }],
			},
			10: {
				title: "Jesús enseña sobre el divorcio y las riquezas",
				verseCount: 52,
				events: [{ title: "Encuentro con el joven rico" }],
			},
			11: {
				title: "Entrada triunfal en Jerusalén",
				verseCount: 33,
				events: [{ title: "Purificación del templo" }],
			},
			12: {
				title: "Las enseñanzas en el templo",
				verseCount: 44,
				events: [{ title: "La parábola de los labradores malvados" }],
			},
			13: {
				title: "Discursos proféticos de Jesús",
				verseCount: 37,
				events: [{ title: "Predicciones del fin de los tiempos" }],
			},
			14: {
				title: "La Pasión de Jesús comienza",
				verseCount: 72,
				events: [
					{ title: "Última Cena" },
					{ title: "Oración en Getsemaní" },
				],
			},
			15: {
				title: "Crucifixión y muerte de Jesús",
				verseCount: 47,
				events: [
					{ title: "Crucifixión de Jesús" },
					{ title: "Muerte de Jesús" },
				],
			},
			16: {
				title: "Resurrección de Jesús",
				verseCount: 20,
				events: [
					{ title: "Resurrección y aparición a los discípulos" },
				],
			},
		},
	},
	"San Juan": {
		chapterCount: 21, // Número total de capítulos en San Juan
		chapters: {
			1: {
				title: "El Verbo se hizo carne",
				verseCount: 51,
				events: [
					{ title: "Nacimiento de Juan el Bautista" },
					{ title: "Bautismo de Jesús" },
				],
			},
			2: {
				title: "Las bodas de Caná",
				verseCount: 25,
				events: [{ title: "Milagro del agua convertida en vino" }],
			},
			3: {
				title: "Jesús y Nicodemo",
				verseCount: 36,
				events: [
					{ title: "Discurso sobre el nuevo nacimiento" },
					{ title: "Jesús habla de la salvación" },
				],
			},
			4: {
				title: "La mujer samaritana",
				verseCount: 54,
				events: [
					{ title: "Encuentro de Jesús con la mujer samaritana" },
					{ title: "Jesús sana al hijo de un funcionario" },
				],
			},
			5: {
				title: "Jesús sana en el día de reposo",
				verseCount: 47,
				events: [
					{ title: "Sanación en la piscina de Betesda" },
					{ title: "Jesús enseña sobre su autoridad" },
				],
			},
			6: {
				title: "Jesús alimenta a los cinco mil",
				verseCount: 71,
				events: [
					{ title: "Milagro de la alimentación de los cinco mil" },
					{ title: "Jesús camina sobre el agua" },
				],
			},
			7: {
				title: "Jesús en la fiesta de los tabernáculos",
				verseCount: 53,
				events: [{ title: "Jesús enseña en la fiesta" }],
			},
			8: {
				title: "La mujer adúltera y la luz del mundo",
				verseCount: 59,
				events: [
					{ title: "Jesús y la mujer adúltera" },
					{ title: "Jesús declara ser la luz del mundo" },
				],
			},
			9: {
				title: "Jesús sana a un ciego de nacimiento",
				verseCount: 41,
				events: [{ title: "Milagro de la sanación del ciego" }],
			},
			10: {
				title: "El buen pastor",
				verseCount: 42,
				events: [{ title: "Jesús se presenta como el buen pastor" }],
			},
			11: {
				title: "La resurrección de Lázaro",
				verseCount: 57,
				events: [{ title: "Resurrección de Lázaro" }],
			},
			12: {
				title: "Jesús ungido en Betania",
				verseCount: 50,
				events: [
					{ title: "Unción de Jesús en Betania" },
					{ title: "Entrada triunfal en Jerusalén" },
				],
			},
			13: {
				title: "La última cena",
				verseCount: 38,
				events: [
					{ title: "Jesús lava los pies a sus discípulos" },
					{ title: "Predicción de la traición de Judas" },
				],
			},
			14: {
				title: "Jesús, el camino, la verdad y la vida",
				verseCount: 31,
				events: [
					{ title: "Discurso de Jesús sobre el camino al Padre" },
				],
			},
			15: {
				title: "La vid verdadera",
				verseCount: 27,
				events: [
					{ title: "Jesús enseña sobre la vid y los sarmientos" },
				],
			},
			16: {
				title: "El Espíritu Santo y la obra del Consolador",
				verseCount: 33,
				events: [{ title: "Jesús promete el Espíritu Santo" }],
			},
			17: {
				title: "La oración sacerdotal de Jesús",
				verseCount: 26,
				events: [{ title: "Jesús ora por sus discípulos" }],
			},
			18: {
				title: "La traición y arresto de Jesús",
				verseCount: 40,
				events: [
					{ title: "Arresto de Jesús en Getsemaní" },
					{ title: "Negación de Pedro" },
				],
			},
			19: {
				title: "La crucifixión y muerte de Jesús",
				verseCount: 42,
				events: [
					{ title: "Jesús es crucificado" },
					{ title: "Muerte de Jesús" },
				],
			},
			20: {
				title: "La resurrección de Jesús",
				verseCount: 31,
				events: [
					{ title: "Jesús resucita y se aparece a María Magdalena" },
					{ title: "Jesús se aparece a los discípulos" },
				],
			},
			21: {
				title: "Jesús se aparece en el mar de Tiberíades",
				verseCount: 25,
				events: [
					{ title: "Jesús se aparece a los discípulos en el mar" },
					{ title: "Rehabilitación de Pedro" },
				],
			},
		},
	},
};
