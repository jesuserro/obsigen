export interface BibleImage {
	type: "local" | "url"; // 'local' para imágenes guardadas en el vault, 'url' para imágenes online
	path: string; // Ruta del archivo en el vault o URL de la imagen
	altText?: string; // Texto alternativo para la imagen, útil para accesibilidad
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

interface BookStructure {
	chapters: { [chapter: number]: ChapterInfo };
}

export const bibleStructure: { [book: string]: BookStructure } = {
	"San Mateo": {
		chapters: {
			1: {
				title: "Genealogía de Jesús y su nacimiento",
				pericopes: [],
			},
			2: {
				title: "La visita de los magos y la huida a Egipto",
				pericopes: [],
			},
			3: {
				title: "El ministerio de Juan el Bautista y el bautismo de Jesús",
				pericopes: [],
			},
			4: {
				title: "Jesús es tentado y comienza su ministerio en Galilea",
				pericopes: [],
			},
			5: {
				title: "El Sermón del Monte: Las Bienaventuranzas",
				pericopes: [],
			},
			6: {
				title: "El Sermón del Monte: La oración y las riquezas",
				pericopes: [],
			},
			7: {
				title: "El Sermón del Monte: Juicios, oraciones y fundamentos",
				pericopes: [],
			},
			8: {
				title: "Milagros de Jesús: sanidades y calmar la tormenta",
				pericopes: [],
			},
			9: {
				title: "Jesús llama a Mateo y realiza más milagros",
				pericopes: [],
			},
			10: {
				title: "Jesús envía a los doce apóstoles",
				pericopes: [],
			},
			11: {
				title: "Jesús habla de Juan el Bautista y denuncia las ciudades incrédulas",
				pericopes: [],
			},
			12: {
				title: "Jesús y las controversias sobre el sábado",
				pericopes: [],
			},
			13: {
				title: "Parábolas del reino de los cielos",
				pericopes: [],
			},
			14: {
				title: "Decapitación de Juan el Bautista y Jesús alimenta a los cinco mil",
				pericopes: [],
			},
			15: {
				title: "Jesús y las tradiciones humanas, sanidad de la hija de una mujer cananea",
				pericopes: [],
			},
			16: {
				title: "La confesión de Pedro y la predicción de la muerte de Jesús",
				pericopes: [],
			},
			17: {
				title: "La Transfiguración y más enseñanzas de Jesús",
				pericopes: [],
			},
			18: {
				title: "Instrucciones sobre el Reino y el perdón",
				pericopes: [],
			},
			19: {
				title: "Jesús enseña sobre el matrimonio y la riqueza",
				pericopes: [],
			},
			20: {
				title: "Parábolas y enseñanzas sobre el servicio y el liderazgo",
				pericopes: [],
			},
			21: {
				title: "Entrada triunfal en Jerusalén y purificación del templo",
				pericopes: [],
			},
			22: {
				title: "Parábolas y controversias con los líderes religiosos",
				pericopes: [],
			},
			23: {
				title: "Jesús denuncia a los fariseos y maestros de la ley",
				pericopes: [],
			},
			24: {
				title: "Jesús profetiza sobre el fin de los tiempos",
				pericopes: [],
			},
			25: {
				title: "Parábolas sobre el juicio final",
				pericopes: [],
			},
			26: {
				title: "La Pasión: Última Cena y arresto de Jesús",
				pericopes: [],
			},
			27: {
				title: "Juicio, crucifixión y muerte de Jesús",
				pericopes: [],
			},
			28: {
				title: "La resurrección y la gran comisión",
				pericopes: [],
			},
		},
	},
	"San Marcos": {
		chapters: {
			1: {
				title: "Introducción al ministerio de Jesús: Juan el Bautista, el bautismo y las primeras curaciones",
				pericopes: [
					{
						title: "Juan el Bautista prepara el camino",
						verseRange: [1, 8],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/8/8e/John_the_Baptist_Preaching.jpg",
								altText: "Juan el Bautista predicando",
							},
						],
					},
					{
						title: "El bautismo de Jesús",
						verseRange: [9, 11],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Baptism_of_Jesus.jpg",
								altText: "Bautismo de Jesús",
							},
						],
					},
					{
						title: "Jesús es tentado en el desierto",
						verseRange: [12, 13],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Temptation_of_Christ.jpg",
								altText: "Tentación de Jesús",
							},
						],
					},
					{
						title: "Jesús comienza su ministerio en Galilea",
						verseRange: [14, 20],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Jesus_in_Galilee.jpg",
								altText: "Jesús en Galilea",
							},
						],
					},
					{
						title: "Jesús llama a sus primeros discípulos",
						verseRange: [16, 20],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Calling_of_the_First_Disciples.jpg",
								altText:
									"Llamamiento de los primeros discípulos",
							},
						],
					},
					{
						title: "Jesús expulsa a un espíritu inmundo",
						verseRange: [21, 28],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Exorcism_of_the_Gerasene_demoniac.jpg",
								altText: "Jesús expulsa a un espíritu inmundo",
							},
						],
					},
					{
						title: "Jesús sana a la suegra de Simón",
						verseRange: [29, 31],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Healing_of_Peter%27s_Mother-in-Law.jpg",
								altText: "Jesús sana a la suegra de Simón",
							},
						],
					},
					{
						title: "Jesús sana a muchos enfermos",
						verseRange: [32, 34],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing_the_Sick.jpg",
								altText: "Jesús sana a muchos enfermos",
							},
						],
					},
					{
						title: "Jesús se retira a orar",
						verseRange: [35, 39],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Christ_in_the_Wilderness.jpg",
								altText: "Jesús se retira a orar",
							},
						],
					},
					{
						title: "Jesús sana a un leproso",
						verseRange: [40, 45],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing_of_the_Leper.jpg",
								altText: "Jesús sana a un leproso",
							},
						],
					},
				],
			},
			2: {
				title: "Jesús sana al paralítico y su autoridad para perdonar pecados",
				pericopes: [
					{
						title: "Jesús sana a un paralítico",
						verseRange: [1, 12],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/2/25/Healing_of_the_Paralytic.jpg",
								altText: "Jesús sana a un paralítico",
							},
						],
					},
					{
						title: "Jesús llama a Leví",
						verseRange: [13, 17],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Calling_of_Levi.jpg",
								altText: "Jesús llama a Leví",
							},
						],
					},
					{
						title: "Jesús y los ayunos",
						verseRange: [18, 22],
					},
					{
						title: "Jesús es Señor del sábado",
						verseRange: [23, 28],
					},
				],
			},
			3: {
				title: "Llamamiento de los Doce Apóstoles y controversias con los fariseos",
				pericopes: [
					{
						title: "Jesús sana a un hombre con una mano seca",
						verseRange: [1, 6],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing",
								altText:
									"Jesús sana a un hombre con una mano seca",
							},
						],
					},
					{
						title: "Jesús sana a muchos",
						verseRange: [7, 12],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing_the_Sick.jpg",
								altText: "Jesús sana a muchos enfermos",
							},
						],
					},
					{
						title: "Jesús elige a los doce apóstoles",
						verseRange: [13, 19],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Calling_of_the_Twelve_Apostles.jpg",
								altText: "Jesús elige a los doce apóstoles",
							},
						],
					},
					{
						title: "Jesús y Belcebú",
						verseRange: [20, 30],
					},
					{
						title: "La verdadera familia de Jesús",
						verseRange: [31, 35],
					},
				],
			},
			4: {
				title: "Parábolas del reino de Dios (incluye la parábola del sembrador)",
				pericopes: [
					{
						title: "Parábola del sembrador",
						verseRange: [1, 20],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Parable_of_the_Sower.jpg",
								altText: "Parábola del sembrador",
							},
						],
					},
					{
						title: "Parábola de la lámpara",
						verseRange: [21, 25],
					},
					{
						title: "Parábola de la semilla que crece",
						verseRange: [26, 29],
					},
					{
						title: "Parábola del grano de mostaza",
						verseRange: [30, 34],
					},
					{
						title: "Jesús calma la tormenta",
						verseRange: [35, 41],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Calm_of_the_Storm.jpg",
								altText: "Jesús calma la tormenta",
							},
						],
					},
				],
			},
			5: {
				title: "Milagros: el endemoniado gadareno, la hija de Jairo y la mujer con flujo de sangre",
				pericopes: [
					{
						title: "Jesús sana a un endemoniado",
						verseRange: [1, 20],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Exorcism_of_the_Gerasene_demoniac.jpg",
								altText: "Jesús sana a un endemoniado",
							},
						],
					},
					{
						title: "Jesús sana a una mujer y resucita a una niña",
						verseRange: [21, 43],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing",
								altText:
									"Jesús sana a una mujer y resucita a una niña",
							},
						],
					},
				],
			},
			6: {
				title: "Rechazo en Nazaret, misión de los Doce y la multiplicación de los panes y peces",
				pericopes: [
					{
						title: "Jesús es rechazado en Nazaret",
						verseRange: [1, 6],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Rejection_of_Jesus_at_Nazareth.jpg",
								altText: "Jesús es rechazado en Nazaret",
							},
						],
					},
					{
						title: "Jesús envía a los doce",
						verseRange: [7, 13],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Sending_of_the_Twelve_Apostles.jpg",
								altText: "Jesús envía a los doce",
							},
						],
					},
					{
						title: "La muerte de Juan el Bautista",
						verseRange: [14, 29],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/",
								altText: "La muerte de Juan el Bautista",
							},
						],
					},
					{
						title: "Jesús alimenta a cinco mil",
						verseRange: [30, 44],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Feeding_of_the_5000.jpg",
								altText: "Jesús alimenta a cinco mil",
							},
						],
					},
					{
						title: "Jesús camina sobre el agua",
						verseRange: [45, 52],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Walking_on_Water.jpg",
								altText: "Jesús camina sobre el agua",
							},
						],
					},
					{
						title: "Jesús sana a los enfermos en Genesaret",
						verseRange: [53, 56],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing_the_Sick.jpg",
								altText:
									"Jesús sana a los enfermos en Genesaret",
							},
						],
					},
				],
			},
			7: {
				title: "Controversia sobre las tradiciones y curaciones en territorio gentil",
				pericopes: [
					{
						title: "La tradición de los ancianos",
						verseRange: [1, 13],
					},
					{
						title: "Lo que contamina al hombre",
						verseRange: [14, 23],
					},
					{
						title: "La fe de la mujer sirofenicia",
						verseRange: [24, 30],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Syro-Ph",
								altText: "La fe de la mujer sirofenicia",
							},
						],
					},
					{
						title: "Jesús sana a un sordo y mudo",
						verseRange: [31, 37],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Healing_the_Deaf_and_Dumb.jpg",
								altText: "Jesús sana a un sordo y mudo",
							},
						],
					},
				],
			},
			8: {
				title: "Segunda multiplicación de panes y confesión de Pedro sobre Jesús como el Cristo",
				pericopes: [],
			},
			9: {
				title: "Transfiguración, exorcismo y enseñanzas sobre el Reino de Dios",
				pericopes: [],
			},
			10: {
				title: "Enseñanzas sobre el divorcio, el joven rico y la petición de los hijos de Zebedeo",
				pericopes: [],
			},
			11: {
				title: "Entrada triunfal en Jerusalén, purificación del templo y la higuera estéril",
				pericopes: [],
			},
			12: {
				title: "Parábola de los viñadores malvados, preguntas de los fariseos y el gran mandamiento",
				pericopes: [],
			},
			13: {
				title: "Profecía sobre la destrucción del templo y señales del fin de los tiempos",
				pericopes: [],
			},
			14: {
				title: "La Pasión: Última Cena, oración en Getsemaní y arresto de Jesús",
				pericopes: [],
			},
			15: {
				title: "Juicio de Jesús ante Pilato, crucifixión y sepultura",
				pericopes: [],
			},
			16: {
				title: "Resurrección de Jesús y misión de los discípulos",
				pericopes: [],
			},
		},
	},
	"San Lucas": {
		chapters: {
			1: {
				title: "El anuncio del nacimiento de Juan el Bautista y de Jesús",
				pericopes: [],
			},
			2: {
				title: "El nacimiento de Jesús y su presentación en el templo",
				pericopes: [],
			},
			3: {
				title: "El ministerio de Juan el Bautista y el bautismo de Jesús",
				pericopes: [],
			},
			4: {
				title: "La tentación de Jesús y el comienzo de su ministerio",
				pericopes: [],
			},
			5: {
				title: "El llamamiento de los primeros discípulos y milagros",
				pericopes: [],
			},
			6: {
				title: "El Sermón del Llano: amor y misericordia",
				pericopes: [],
			},
			7: {
				title: "Milagros y la fe del centurión",
				pericopes: [],
			},
			8: {
				title: "Parábolas del reino y el poder de Jesús sobre la naturaleza y los demonios",
				pericopes: [],
			},
			9: {
				title: "La confesión de Pedro y la Transfiguración",
				pericopes: [],
			},
			10: {
				title: "La misión de los setenta y la parábola del buen samaritano",
				pericopes: [],
			},
			11: {
				title: "La oración y los conflictos con los fariseos",
				pericopes: [],
			},
			12: {
				title: "Enseñanzas sobre la vigilancia y el Reino",
				pericopes: [],
			},
			13: {
				title: "Advertencias, parábolas y milagros",
				pericopes: [],
			},
			14: {
				title: "Parábolas sobre la humildad y el costo del discipulado",
				pericopes: [],
			},
			15: {
				title: "Parábolas de la oveja perdida, la moneda perdida y el hijo pródigo",
				pericopes: [],
			},
			16: {
				title: "Parábola del administrador astuto y del rico y Lázaro",
				pericopes: [],
			},
			17: {
				title: "Enseñanzas sobre la fe y el Reino de Dios",
				pericopes: [],
			},
			18: {
				title: "Parábolas sobre la oración y el encuentro con el joven rico",
				pericopes: [],
			},
			19: {
				title: "Entrada triunfal en Jerusalén y la parábola de las minas",
				pericopes: [],
			},
			20: {
				title: "Conflictos con los líderes religiosos",
				pericopes: [],
			},
			21: {
				title: "Discurso escatológico sobre la destrucción del templo y el fin",
				pericopes: [],
			},
			22: {
				title: "Última Cena, arresto y juicio de Jesús",
				pericopes: [],
			},
			23: {
				title: "La crucifixión, muerte y sepultura de Jesús",
				pericopes: [],
			},
			24: {
				title: "La resurrección y la aparición a los discípulos en el camino a Emaús",
				pericopes: [],
			},
		},
	},
	"San Juan": {
		chapters: {
			1: {
				title: "El Verbo se hizo carne",
				pericopes: [
					{
						title: "Prólogo",
						verseRange: [1, 18],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Carl_Heinrich_Bloch_-_The_Annunciation.jpg",
								altText:
									"La Anunciación de Carl Heinrich Bloch representando el Prólogo",
							},
						],
					},
					{
						title: "Testimonio de Juan el Bautista",
						verseRange: [19, 28],
					},
					{
						title: "El Cordero de Dios",
						verseRange: [29, 34],
					},
					{
						title: "Los primeros discípulos",
						verseRange: [35, 42],
					},
					{
						title: "Jesús llama a Felipe y a Natanael",
						verseRange: [43, 51],
						images: [
							{
								type: "url",
								path: "https://achristianpilgrim.wordpress.com/wp-content/uploads/2010/08/filipus-mengajak-nataniel-untuk-bertemu-dengan-yesus.jpg",
								altText: "Jesús llama a Felipe y a Natanael",
							},
						],
					},
				],
			},
			2: {
				title: "Las bodas de Caná",
				pericopes: [
					{
						title: "El primer milagro de Jesús en Caná",
						verseRange: [1, 12],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/CarlBloch_weddingatCana.jpg/640px-CarlBloch_weddingatCana.jpg",
								altText:
									"Las bodas de Caná por Carl Heinrich Bloch",
							},
						],
					},
					{
						title: "Jesús purifica el templo",
						verseRange: [13, 22],
						images: [
							{
								type: "url",
								path: "https://m.media-amazon.com/images/I/71V4-AFAivL._AC_UF894,1000_QL80_.jpg",
								altText: "Jesús purifica el templo",
							},
						],
					},
					{
						title: "Jesús conoce a todos los hombres",
						verseRange: [23, 25],
					},
				],
			},
			3: {
				title: "Jesús y Nicodemo",
				pericopes: [
					{
						title: "Jesús enseña a Nicodemo",
						verseRange: [1, 21],
					},
					{
						title: "El testimonio de Juan el Bautista",
						verseRange: [22, 36],
					},
				],
			},
			4: {
				title: "La mujer samaritana",
				pericopes: [
					{
						title: "Jesús y la mujer samaritana",
						verseRange: [1, 26],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Carl_Heinrich_Bloch_-_Woman_at_the_Well.jpg/800px-Carl_Heinrich_Bloch_-_Woman_at_the_Well.jpg",
								altText: "Jesús y la mujer samaritana",
							},
						],
					},
					{
						title: "La conversión de los samaritanos",
						verseRange: [27, 42],
					},
					{
						title: "Jesús sana al hijo de un funcionario",
						verseRange: [43, 54],
					},
				],
			},
			5: {
				title: "Jesús sana en el día de reposo",
				pericopes: [
					{
						title: "Jesús sana al paralítico en Betesda",
						verseRange: [1, 15],
					},
					{
						title: "Jesús habla de su autoridad",
						verseRange: [16, 30],
					},
					{
						title: "Testimonios acerca de Jesús",
						verseRange: [31, 47],
					},
				],
			},
			6: {
				title: "Jesús alimenta a los cinco mil",
				pericopes: [
					{
						title: "Jesús alimenta a los cinco mil",
						verseRange: [1, 15],
					},
					{
						title: "Jesús camina sobre el agua",
						verseRange: [16, 21],
					},
					{
						title: "Las multitudes buscan a Jesús",
						verseRange: [22, 26],
					},
					{
						title: "Jesús, el pan de vida",
						verseRange: [27, 59],
					},
					{
						title: "Muchos discípulos abandonan a Jesús",
						verseRange: [60, 71],
					},
				],
			},
			7: {
				title: "Jesús en la fiesta de los tabernáculos",
				pericopes: [
					{
						title: "Jesús va a la fiesta en secreto",
						verseRange: [1, 13],
					},
					{
						title: "Jesús enseña en la fiesta",
						verseRange: [14, 24],
					},
					{
						title: "¿Es Jesús el Cristo?",
						verseRange: [25, 36],
					},
					{
						title: "El último día de la fiesta",
						verseRange: [37, 53],
					},
				],
			},
			8: {
				title: "La mujer adúltera y la luz del mundo",
				pericopes: [
					{
						title: "Jesús y la mujer adúltera",
						verseRange: [1, 11],
						images: [
							{
								type: "url",
								path: "https://i.redd.it/kwbz58h5k9rb1.jpg",
								altText: "Jesús y la mujer adúltera",
							},
						],
					},
					{
						title: "Jesús, la luz del mundo",
						verseRange: [12, 20],
					},
					{
						title: "Jesús predice su partida",
						verseRange: [21, 30],
					},
					{
						title: "La verdad os hará libres",
						verseRange: [31, 47],
					},
					{
						title: "Jesús y Abraham",
						verseRange: [48, 59],
					},
				],
			},
			9: {
				title: "Jesús sana a un ciego de nacimiento",
				pericopes: [
					{
						title: "Jesús sana a un ciego de nacimiento",
						verseRange: [1, 12],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/2/25/Healing_of_the_Blind_Man_by_Jesus_Christ.jpg",
								altText: "Jesús sana a un ciego de nacimiento",
							},
						],
					},
					{
						title: "El ciego es interrogado por los fariseos",
						verseRange: [13, 34],
					},
					{
						title: "El ciego cree en Jesús",
						verseRange: [35, 41],
					},
				],
			},
			10: {
				title: "El buen pastor",
				pericopes: [
					{
						title: "Jesús, el buen pastor",
						verseRange: [1, 21],
					},
					{
						title: "Jesús y las obras de su Padre",
						verseRange: [22, 42],
					},
				],
			},
			11: {
				title: "La resurrección de Lázaro",
				pericopes: [
					{
						title: "La muerte de Lázaro",
						verseRange: [1, 16],
					},
					{
						title: "Jesús, la resurrección y la vida",
						verseRange: [17, 27],
					},
					{
						title: "Jesús llora ante la tumba de Lázaro",
						verseRange: [28, 37],
					},
					{
						title: "Jesús resucita a Lázaro",
						verseRange: [38, 44],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/6/6d/RaisingofLazarusBloch.jpg",
								altText: "Jesús resucita a Lázaro",
							},
						],
					},
					{
						title: "La conspiración para matar a Jesús",
						verseRange: [45, 57],
					},
				],
			},
			12: {
				title: "Jesús ungido en Betania",
				pericopes: [
					{
						title: "Jesús ungido en Betania",
						verseRange: [1, 11],
					},
					{
						title: "La entrada triunfal en Jerusalén",
						verseRange: [12, 19],
					},
					{
						title: "Jesús predice su muerte",
						verseRange: [20, 36],
					},
					{
						title: "La incredulidad de la gente",
						verseRange: [37, 43],
					},
					{
						title: "Jesús habla del juicio final",
						verseRange: [44, 50],
					},
				],
			},
			13: {
				title: "La última cena",
				pericopes: [
					{
						title: "Jesús lava los pies a sus discípulos",
						verseRange: [1, 17],
					},
					{
						title: "Predicción de la traición de Judas",
						verseRange: [18, 30],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/The-Last-Supper-large.jpg/390px-The-Last-Supper-large.jpg",
								altText: "La última cena, traición de Judas",
							},
						],
					},
					{
						title: "El nuevo mandamiento",
						verseRange: [31, 38],
					},
				],
			},
			14: {
				title: "Jesús, el camino, la verdad y la vida",
				pericopes: [
					{
						title: "Jesús promete un lugar en el cielo",
						verseRange: [1, 14],
					},
					{
						title: "Jesús promete el Espíritu Santo",
						verseRange: [15, 31],
					},
				],
			},
			15: {
				title: "La vid verdadera",
				pericopes: [
					{
						title: "Jesús, la vid verdadera",
						verseRange: [1, 17],
					},
					{
						title: "El odio del mundo",
						verseRange: [18, 27],
					},
				],
			},
			16: {
				title: "El Espíritu Santo y la obra del Consolador",
				pericopes: [
					{
						title: "Jesús habla del Espíritu Santo",
						verseRange: [1, 15],
					},
					{
						title: "Jesús habla de su regreso",
						verseRange: [16, 33],
					},
				],
			},
			17: {
				title: "La oración sacerdotal de Jesús",
				pericopes: [
					{
						title: "Jesús ora por sí mismo",
						verseRange: [1, 5],
					},
					{
						title: "Jesús ora por sus discípulos",
						verseRange: [6, 19],
					},
					{
						title: "Jesús ora por todos los creyentes",
						verseRange: [20, 26],
					},
				],
			},
			18: {
				title: "La traición y arresto de Jesús",
				pericopes: [
					{
						title: "Jesús es arrestado",
						verseRange: [1, 11],
						images: [
							{
								type: "url",
								path: "https://api.brushwiz.com/images/paintings/t/The_Guards_Falling_Backwards_by_James_Jacques_Joseph_Tissot_F62.jpg",
								altText:
									"Jesús es arrestado, obra de James J. Tissot",
							},
						],
					},
					{
						title: "Jesús ante el sumo sacerdote",
						verseRange: [12, 27],
					},
					{
						title: "Jesús ante Pilato",
						verseRange: [28, 40],
					},
				],
			},
			19: {
				title: "La crucifixión y muerte de Jesús",
				pericopes: [
					{
						title: "Jesús es flagelado y condenado",
						verseRange: [1, 16],
					},
					{
						title: "Jesús es crucificado",
						verseRange: [17, 30],
					},
					{
						title: "La muerte de Jesús",
						verseRange: [31, 37],
						images: [
							{
								type: "url",
								path: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Christ_at_the_Cross_-_Cristo_en_la_Cruz.jpg/197px-Christ_at_the_Cross_-_Cristo_en_la_Cruz.jpg",
								altText: "Cristo muere en la cruz",
							},
						],
					},
					{
						title: "El entierro de Jesús",
						verseRange: [38, 42],
						images: [
							{
								type: "url",
								path: "https://w0.peakpx.com/wallpaper/151/716/HD-wallpaper-the-burial-of-christ-art-bloch-old-master-beautiful-illustration-artwork-jesus-christ-painting-wide-screen-portrait-carl-heinrich-bloch-burial.jpg",
								altText:
									"El entierro de Cristo por Carl Heinrich Bloch",
							},
						],
					},
				],
			},
			20: {
				title: "La resurrección de Jesús",
				pericopes: [
					{
						title: "La tumba vacía",
						verseRange: [1, 10],
					},
					{
						title: "Jesús se aparece a María Magdalena",
						verseRange: [11, 18],
					},
					{
						title: "Jesús se aparece a sus discípulos",
						verseRange: [19, 23],
					},
					{
						title: "Jesús se aparece a Tomás",
						verseRange: [24, 29],
					},
					{
						title: "El propósito de este evangelio",
						verseRange: [30, 31],
					},
				],
			},
			21: {
				title: "Jesús se aparece en el mar de Tiberíades",
				pericopes: [
					{
						title: "Jesús se aparece en el mar de Tiberíades",
						verseRange: [1, 14],
					},
					{
						title: "Jesús y Pedro",
						verseRange: [15, 19],
					},
					{
						title: "El futuro de Pedro y Juan",
						verseRange: [20, 25],
					},
				],
			},
		},
	},
};
