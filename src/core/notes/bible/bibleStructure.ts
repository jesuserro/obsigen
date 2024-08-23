interface Event {
    title: string;
    date?: string;
}

interface Pericope {
    title: string;
    verseRange: [number, number]; // Rango de versículos, e.g., [1, 18]
    events: Event[];
}

interface ChapterInfo {
    title: string;
    verseCount: number;
    pericopes: Pericope[];
}

interface BookStructure {
    chapterCount: number;
    chapters: { [chapter: number]: ChapterInfo };
}

export const bibleStructure: { [book: string]: BookStructure } = {
    "San Juan": {
        chapterCount: 21,
        chapters: {
            1: {
                title: "El Verbo se hizo carne",
                verseCount: 51,
                pericopes: [
                    {
                        title: "El Verbo hecho carne",
                        verseRange: [1, 18],
                        events: [
                            { title: "Nacimiento de Juan el Bautista" },
                            { title: "Bautismo de Jesús" }
                        ]
                    },
                    {
                        title: "Testimonio de Juan el Bautista",
                        verseRange: [19, 28],
                        events: []
                    },
                    {
                        title: "El Cordero de Dios",
                        verseRange: [29, 34],
                        events: []
                    },
                    {
                        title: "Los primeros discípulos",
                        verseRange: [35, 42],
                        events: []
                    },
                    {
                        title: "Jesús llama a Felipe y a Natanael",
                        verseRange: [43, 51],
                        events: []
                    }
                ]
            },
            2: {
                title: "Las bodas de Caná",
                verseCount: 25,
                pericopes: [
                    {
                        title: "El primer milagro de Jesús en Caná",
                        verseRange: [1, 12],
                        events: [{ title: "Milagro del agua convertida en vino" }]
                    },
                    {
                        title: "Jesús purifica el templo",
                        verseRange: [13, 25],
                        events: []
                    }
                ]
            },
            3: {
                title: "Jesús y Nicodemo",
                verseCount: 36,
                pericopes: [
                    {
                        title: "Jesús enseña a Nicodemo",
                        verseRange: [1, 21],
                        events: [
                            { title: "Discurso sobre el nuevo nacimiento" },
                            { title: "Jesús habla de la salvación" }
                        ]
                    },
                    {
                        title: "El testimonio de Juan el Bautista",
                        verseRange: [22, 36],
                        events: []
                    }
                ]
            },
            4: {
                title: "La mujer samaritana",
                verseCount: 54,
                pericopes: [
                    {
                        title: "Jesús y la mujer samaritana",
                        verseRange: [1, 26],
                        events: [
                            { title: "Encuentro de Jesús con la mujer samaritana" }
                        ]
                    },
                    {
                        title: "La conversión de los samaritanos",
                        verseRange: [27, 42],
                        events: []
                    },
                    {
                        title: "Jesús sana al hijo de un funcionario",
                        verseRange: [43, 54],
                        events: []
                    }
                ]
            },
            5: {
                title: "Jesús sana en el día de reposo",
                verseCount: 47,
                pericopes: [
                    {
                        title: "Jesús sana al paralítico en Betesda",
                        verseRange: [1, 15],
                        events: [
                            { title: "Sanación en la piscina de Betesda" }
                        ]
                    },
                    {
                        title: "Jesús habla de su autoridad",
                        verseRange: [16, 30],
                        events: []
                    },
                    {
                        title: "Testimonios acerca de Jesús",
                        verseRange: [31, 47],
                        events: []
                    }
                ]
            },
            6: {
                title: "Jesús alimenta a los cinco mil",
                verseCount: 71,
                pericopes: [
                    {
                        title: "Jesús alimenta a los cinco mil",
                        verseRange: [1, 15],
                        events: [
                            { title: "Milagro de la alimentación de los cinco mil" }
                        ]
                    },
                    {
                        title: "Jesús camina sobre el agua",
                        verseRange: [16, 21],
                        events: []
                    },
                    {
                        title: "Jesús, el pan de vida",
                        verseRange: [22, 59],
                        events: []
                    },
                    {
                        title: "Muchos discípulos abandonan a Jesús",
                        verseRange: [60, 71],
                        events: []
                    }
                ]
            },
            7: {
                title: "Jesús en la fiesta de los tabernáculos",
                verseCount: 53,
                pericopes: [
                    {
                        title: "Jesús va a la fiesta en secreto",
                        verseRange: [1, 13],
                        events: []
                    },
                    {
                        title: "Jesús enseña en la fiesta",
                        verseRange: [14, 24],
                        events: []
                    },
                    {
                        title: "¿Es Jesús el Cristo?",
                        verseRange: [25, 36],
                        events: []
                    },
                    {
                        title: "El último día de la fiesta",
                        verseRange: [37, 53],
                        events: []
                    }
                ]
            },
            8: {
                title: "La mujer adúltera y la luz del mundo",
                verseCount: 59,
                pericopes: [
                    {
                        title: "Jesús y la mujer adúltera",
                        verseRange: [1, 11],
                        events: [
                            { title: "Jesús y la mujer adúltera" }
                        ]
                    },
                    {
                        title: "Jesús, la luz del mundo",
                        verseRange: [12, 20],
                        events: []
                    },
                    {
                        title: "Jesús predice su partida",
                        verseRange: [21, 30],
                        events: []
                    },
                    {
                        title: "La verdad os hará libres",
                        verseRange: [31, 47],
                        events: []
                    },
                    {
                        title: "Jesús y Abraham",
                        verseRange: [48, 59],
                        events: []
                    }
                ]
            },
            9: {
                title: "Jesús sana a un ciego de nacimiento",
                verseCount: 41,
                pericopes: [
                    {
                        title: "Jesús sana a un ciego de nacimiento",
                        verseRange: [1, 12],
                        events: [
                            { title: "Milagro de la sanación del ciego" }
                        ]
                    },
                    {
                        title: "El ciego es interrogado por los fariseos",
                        verseRange: [13, 34],
                        events: []
                    },
                    {
                        title: "El ciego cree en Jesús",
                        verseRange: [35, 41],
                        events: []
                    }
                ]
            },
            10: {
                title: "El buen pastor",
                verseCount: 42,
                pericopes: [
                    {
                        title: "Jesús, el buen pastor",
                        verseRange: [1, 21],
                        events: [
                            { title: "Jesús se presenta como el buen pastor" }
                        ]
                    },
                    {
                        title: "Jesús y las obras de su Padre",
                        verseRange: [22, 42],
                        events: []
                    }
                ]
            },
            11: {
                title: "La resurrección de Lázaro",
                verseCount: 57,
                pericopes: [
                    {
                        title: "La muerte de Lázaro",
                        verseRange: [1, 16],
                        events: []
                    },
                    {
                        title: "Jesús, la resurrección y la vida",
                        verseRange: [17, 37],
                        events: []
                    },
                    {
                        title: "Jesús resucita a Lázaro",
                        verseRange: [38, 44],
                        events: [
                            { title: "Resurrección de Lázaro" }
                        ]
                    },
                    {
                        title: "La conspiración para matar a Jesús",
                        verseRange: [45, 57],
                        events: []
                    }
                ]
            },
            12: {
                title: "Jesús ungido en Betania",
                verseCount: 50,
                pericopes: [
                    {
                        title: "Jesús ungido en Betania",
                        verseRange: [1, 11],
                        events: [
                            { title: "Unción de Jesús en Betania" }
                        ]
                    },
                    {
                        title: "La entrada triunfal en Jerusalén",
                        verseRange: [12, 19],
                        events: [
                            { title: "Entrada triunfal en Jerusalén" }
                        ]
                    },
                    {
                        title: "Jesús predice su muerte",
                        verseRange: [20, 36],
                        events: []
                    },
                    {
                        title: "La incredulidad de la gente",
                        verseRange: [37, 43],
                        events: []
                    },
                    {
                        title: "Jesús habla del juicio final",
                        verseRange: [44, 50],
                        events: []
                    }
                ]
            },
            13: {
                title: "La última cena",
                verseCount: 38,
                pericopes: [
                    {
                        title: "Jesús lava los pies a sus discípulos",
                        verseRange: [1, 17],
                        events: [
                            { title: "Jesús lava los pies a sus discípulos" }
                        ]
                    },
                    {
                        title: "Predicción de la traición de Judas",
                        verseRange: [18, 30],
                        events: [
                            { title: "Predicción de la traición de Judas" }
                        ]
                    },
                    {
                        title: "El nuevo mandamiento",
                        verseRange: [31, 38],
                        events: []
                    }
                ]
            },
            14: {
                title: "Jesús, el camino, la verdad y la vida",
                verseCount: 31,
                pericopes: [
                    {
                        title: "Jesús promete un lugar en el cielo",
                        verseRange: [1, 14],
                        events: []
                    },
                    {
                        title: "Jesús promete el Espíritu Santo",
                        verseRange: [15, 31],
                        events: []
                    }
                ]
            },
            15: {
                title: "La vid verdadera",
                verseCount: 27,
                pericopes: [
                    {
                        title: "Jesús, la vid verdadera",
                        verseRange: [1, 17],
                        events: [
                            { title: "Jesús enseña sobre la vid y los sarmientos" }
                        ]
                    },
                    {
                        title: "El odio del mundo",
                        verseRange: [18, 27],
                        events: []
                    }
                ]
            },
            16: {
                title: "El Espíritu Santo y la obra del Consolador",
                verseCount: 33,
                pericopes: [
                    {
                        title: "Jesús habla del Espíritu Santo",
                        verseRange: [1, 15],
                        events: [
                            { title: "Jesús promete el Espíritu Santo" }
                        ]
                    },
                    {
                        title: "Jesús habla de su regreso",
                        verseRange: [16, 33],
                        events: []
                    }
                ]
            },
            17: {
                title: "La oración sacerdotal de Jesús",
                verseCount: 26,
                pericopes: [
                    {
                        title: "Jesús ora por sí mismo",
                        verseRange: [1, 5],
                        events: []
                    },
                    {
                        title: "Jesús ora por sus discípulos",
                        verseRange: [6, 19],
                        events: [
                            { title: "Jesús ora por sus discípulos" }
                        ]
                    },
                    {
                        title: "Jesús ora por todos los creyentes",
                        verseRange: [20, 26],
                        events: []
                    }
                ]
            },
            18: {
                title: "La traición y arresto de Jesús",
                verseCount: 40,
                pericopes: [
                    {
                        title: "Jesús es arrestado",
                        verseRange: [1, 11],
                        events: [
                            { title: "Arresto de Jesús en Getsemaní" }
                        ]
                    },
                    {
                        title: "Jesús ante el sumo sacerdote",
                        verseRange: [12, 27],
                        events: []
                    },
                    {
                        title: "Jesús ante Pilato",
                        verseRange: [28, 40],
                        events: []
                    }
                ]
            },
            19: {
                title: "La crucifixión y muerte de Jesús",
                verseCount: 42,
                pericopes: [
                    {
                        title: "Jesús es flagelado y condenado",
                        verseRange: [1, 16],
                        events: []
                    },
                    {
                        title: "Jesús es crucificado",
                        verseRange: [17, 30],
                        events: [
                            { title: "Jesús es crucificado" }
                        ]
                    },
                    {
                        title: "La muerte de Jesús",
                        verseRange: [31, 37],
                        events: [
                            { title: "Muerte de Jesús" }
                        ]
                    },
                    {
                        title: "El entierro de Jesús",
                        verseRange: [38, 42],
                        events: []
                    }
                ]
            },
            20: {
                title: "La resurrección de Jesús",
                verseCount: 31,
                pericopes: [
                    {
                        title: "La tumba vacía",
                        verseRange: [1, 10],
                        events: []
                    },
                    {
                        title: "Jesús se aparece a María Magdalena",
                        verseRange: [11, 18],
                        events: [
                            { title: "Jesús resucita y se aparece a María Magdalena" }
                        ]
                    },
                    {
                        title: "Jesús se aparece a sus discípulos",
                        verseRange: [19, 23],
                        events: [
                            { title: "Jesús se aparece a los discípulos" }
                        ]
                    },
                    {
                        title: "Jesús se aparece a Tomás",
                        verseRange: [24, 29],
                        events: []
                    },
                    {
                        title: "El propósito de este evangelio",
                        verseRange: [30, 31],
                        events: []
                    }
                ]
            },
            21: {
                title: "Jesús se aparece en el mar de Tiberíades",
                verseCount: 25,
                pericopes: [
                    {
                        title: "Jesús se aparece en el mar de Tiberíades",
                        verseRange: [1, 14],
                        events: [
                            { title: "Jesús se aparece a los discípulos en el mar" }
                        ]
                    },
                    {
                        title: "Jesús y Pedro",
                        verseRange: [15, 19],
                        events: [
                            { title: "Rehabilitación de Pedro" }
                        ]
                    },
                    {
                        title: "El futuro de Pedro y Juan",
                        verseRange: [20, 25],
                        events: []
                    }
                ]
            }
        }
    }
};
