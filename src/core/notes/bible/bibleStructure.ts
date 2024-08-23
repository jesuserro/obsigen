export interface Note {
    title: string;
    date?: string;
    verseStart?: number;  // Añade esta línea para definir verseStart
    verseEnd?: number;    // Si también estás utilizando verseEnd, mantenla aquí
}


interface Pericope {
    title: string;
    verseRange: [number, number]; // Rango de versículos, e.g., [1, 18]
    notes: Note[]; // Cambiado de events a notes
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
                        title: "Prólogo",
                        verseRange: [1, 18],
                        notes: []
                    },
                    {
                        title: "Testimonio de Juan el Bautista",
                        verseRange: [19, 28],
                        notes: []
                    },
                    {
                        title: "El Cordero de Dios",
                        verseRange: [29, 34],
                        notes: []
                    },
                    {
                        title: "Los primeros discípulos",
                        verseRange: [35, 42],
                        notes: []
                    },
                    {
                        title: "Jesús llama a Felipe y a Natanael",
                        verseRange: [43, 51],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús purifica el templo",
                        verseRange: [13, 22],
                        notes: []
                    },
                    {
                        title: "Jesús conoce a todos los hombres",
                        verseRange: [23, 25],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "El testimonio de Juan el Bautista",
                        verseRange: [22, 36],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "La conversión de los samaritanos",
                        verseRange: [27, 42],
                        notes: []
                    },
                    {
                        title: "Jesús sana al hijo de un funcionario",
                        verseRange: [43, 54],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús habla de su autoridad",
                        verseRange: [16, 30],
                        notes: []
                    },
                    {
                        title: "Testimonios acerca de Jesús",
                        verseRange: [31, 47],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús camina sobre el agua",
                        verseRange: [16, 21],
                        notes: []
                    },
                    {
                        title: "Jesús, el pan de vida",
                        verseRange: [22, 59],
                        notes: []
                    },
                    {
                        title: "Muchos discípulos abandonan a Jesús",
                        verseRange: [60, 71],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús enseña en la fiesta",
                        verseRange: [14, 24],
                        notes: []
                    },
                    {
                        title: "¿Es Jesús el Cristo?",
                        verseRange: [25, 36],
                        notes: []
                    },
                    {
                        title: "El último día de la fiesta",
                        verseRange: [37, 53],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús, la luz del mundo",
                        verseRange: [12, 20],
                        notes: []
                    },
                    {
                        title: "Jesús predice su partida",
                        verseRange: [21, 30],
                        notes: []
                    },
                    {
                        title: "La verdad os hará libres",
                        verseRange: [31, 47],
                        notes: []
                    },
                    {
                        title: "Jesús y Abraham",
                        verseRange: [48, 59],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "El ciego es interrogado por los fariseos",
                        verseRange: [13, 34],
                        notes: []
                    },
                    {
                        title: "El ciego cree en Jesús",
                        verseRange: [35, 41],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús y las obras de su Padre",
                        verseRange: [22, 42],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús, la resurrección y la vida",
                        verseRange: [17, 27],
                        notes: []
                    },
                    {
                        title: "Jesús llora ante la tumba de Lázaro",
                        verseRange: [28, 37],
                        notes: [
                           
                        ]
                    },
                    {
                        title: "Jesús resucita a Lázaro",
                        verseRange: [38, 44],
                        notes: [
                           
                        ]
                    },
                    {
                        title: "La conspiración para matar a Jesús",
                        verseRange: [45, 57],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "La entrada triunfal en Jerusalén",
                        verseRange: [12, 19],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús predice su muerte",
                        verseRange: [20, 36],
                        notes: []
                    },
                    {
                        title: "La incredulidad de la gente",
                        verseRange: [37, 43],
                        notes: []
                    },
                    {
                        title: "Jesús habla del juicio final",
                        verseRange: [44, 50],
                        notes: []
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
                        notes: [
                           
                        ]
                    },
                    {
                        title: "Predicción de la traición de Judas",
                        verseRange: [18, 30],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "El nuevo mandamiento",
                        verseRange: [31, 38],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús promete el Espíritu Santo",
                        verseRange: [15, 31],
                        notes: []
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
                        notes: [
                           
                        ]
                    },
                    {
                        title: "El odio del mundo",
                        verseRange: [18, 27],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús habla de su regreso",
                        verseRange: [16, 33],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús ora por sus discípulos",
                        verseRange: [6, 19],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús ora por todos los creyentes",
                        verseRange: [20, 26],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús ante el sumo sacerdote",
                        verseRange: [12, 27],
                        notes: []
                    },
                    {
                        title: "Jesús ante Pilato",
                        verseRange: [28, 40],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús es crucificado",
                        verseRange: [17, 30],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "La muerte de Jesús",
                        verseRange: [31, 37],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "El entierro de Jesús",
                        verseRange: [38, 42],
                        notes: []
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
                        notes: []
                    },
                    {
                        title: "Jesús se aparece a María Magdalena",
                        verseRange: [11, 18],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús se aparece a sus discípulos",
                        verseRange: [19, 23],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús se aparece a Tomás",
                        verseRange: [24, 29],
                        notes: []
                    },
                    {
                        title: "El propósito de este evangelio",
                        verseRange: [30, 31],
                        notes: []
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
                        notes: [
                            
                        ]
                    },
                    {
                        title: "Jesús y Pedro",
                        verseRange: [15, 19],
                        notes: [
                            
                        ]
                    },
                    {
                        title: "El futuro de Pedro y Juan",
                        verseRange: [20, 25],
                        notes: []
                    }
                ]
            }
        }
    }
};
