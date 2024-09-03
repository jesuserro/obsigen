export interface BibleImage {
    type: 'local' | 'url'; // 'local' para imágenes guardadas en el vault, 'url' para imágenes online
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
    "San Juan": {
        chapters: {
            1: {
                title: "El Verbo se hizo carne",
                pericopes: [
                    {
                        title: "Prólogo",
                        verseRange: [1, 18],
                        images: [
                            { type: 'url', path: 'https://alfayomega.es/wp-content/uploads/2023/12/20231225_36549.jpg', altText: 'Descripción de la imagen 2' }
                        ]
                    },
                    {
                        title: "Testimonio de Juan el Bautista",
                        verseRange: [19, 28]
                    },
                    {
                        title: "El Cordero de Dios",
                        verseRange: [29, 34]
                    },
                    {
                        title: "Los primeros discípulos",
                        verseRange: [35, 42]
                    },
                    {
                        title: "Jesús llama a Felipe y a Natanael",
                        verseRange: [43, 51]
                    }
                ]
            },
            2: {
                title: "Las bodas de Caná",
                pericopes: [
                    {
                        title: "El primer milagro de Jesús en Caná",
                        verseRange: [1, 12]
                    },
                    {
                        title: "Jesús purifica el templo",
                        verseRange: [13, 22]
                    },
                    {
                        title: "Jesús conoce a todos los hombres",
                        verseRange: [23, 25]
                    }
                ]
            },
            3: {
                title: "Jesús y Nicodemo",
                pericopes: [
                    {
                        title: "Jesús enseña a Nicodemo",
                        verseRange: [1, 21]
                    },
                    {
                        title: "El testimonio de Juan el Bautista",
                        verseRange: [22, 36]
                    }
                ]
            },
            4: {
                title: "La mujer samaritana",
                pericopes: [
                    {
                        title: "Jesús y la mujer samaritana",
                        verseRange: [1, 26]
                    },
                    {
                        title: "La conversión de los samaritanos",
                        verseRange: [27, 42]
                    },
                    {
                        title: "Jesús sana al hijo de un funcionario",
                        verseRange: [43, 54]
                    }
                ]
            },
            5: {
                title: "Jesús sana en el día de reposo",
                pericopes: [
                    {
                        title: "Jesús sana al paralítico en Betesda",
                        verseRange: [1, 15]
                    },
                    {
                        title: "Jesús habla de su autoridad",
                        verseRange: [16, 30]
                    },
                    {
                        title: "Testimonios acerca de Jesús",
                        verseRange: [31, 47]
                    }
                ]
            },
            6: {
                title: "Jesús alimenta a los cinco mil",
                pericopes: [
                    {
                        title: "Jesús alimenta a los cinco mil",
                        verseRange: [1, 15]
                    },
                    {
                        title: "Jesús camina sobre el agua",
                        verseRange: [16, 21]
                    },
                    {
                        title: "Las multitudes buscan a Jesús",
                        verseRange: [22, 26]
                    },
                    {
                        title: "Jesús, el pan de vida",
                        verseRange: [27, 59]
                    },
                    {
                        title: "Muchos discípulos abandonan a Jesús",
                        verseRange: [60, 71]
                    }
                ]
            },
            7: {
                title: "Jesús en la fiesta de los tabernáculos",
                pericopes: [
                    {
                        title: "Jesús va a la fiesta en secreto",
                        verseRange: [1, 13]
                    },
                    {
                        title: "Jesús enseña en la fiesta",
                        verseRange: [14, 24]
                    },
                    {
                        title: "¿Es Jesús el Cristo?",
                        verseRange: [25, 36]
                    },
                    {
                        title: "El último día de la fiesta",
                        verseRange: [37, 53]
                    }
                ]
            },
            8: {
                title: "La mujer adúltera y la luz del mundo",
                pericopes: [
                    {
                        title: "Jesús y la mujer adúltera",
                        verseRange: [1, 11]
                    },
                    {
                        title: "Jesús, la luz del mundo",
                        verseRange: [12, 20]
                    },
                    {
                        title: "Jesús predice su partida",
                        verseRange: [21, 30]
                    },
                    {
                        title: "La verdad os hará libres",
                        verseRange: [31, 47]
                    },
                    {
                        title: "Jesús y Abraham",
                        verseRange: [48, 59]
                    }
                ]
            },
            9: {
                title: "Jesús sana a un ciego de nacimiento",
                pericopes: [
                    {
                        title: "Jesús sana a un ciego de nacimiento",
                        verseRange: [1, 12]
                    },
                    {
                        title: "El ciego es interrogado por los fariseos",
                        verseRange: [13, 34]
                    },
                    {
                        title: "El ciego cree en Jesús",
                        verseRange: [35, 41]
                    }
                ]
            },
            10: {
                title: "El buen pastor",
                pericopes: [
                    {
                        title: "Jesús, el buen pastor",
                        verseRange: [1, 21]
                    },
                    {
                        title: "Jesús y las obras de su Padre",
                        verseRange: [22, 42]
                    }
                ]
            },
            11: {
                title: "La resurrección de Lázaro",
                pericopes: [
                    {
                        title: "La muerte de Lázaro",
                        verseRange: [1, 16]
                    },
                    {
                        title: "Jesús, la resurrección y la vida",
                        verseRange: [17, 27]
                    },
                    {
                        title: "Jesús llora ante la tumba de Lázaro",
                        verseRange: [28, 37]
                    },
                    {
                        title: "Jesús resucita a Lázaro",
                        verseRange: [38, 44]
                    },
                    {
                        title: "La conspiración para matar a Jesús",
                        verseRange: [45, 57]
                    }
                ]
            },
            12: {
                title: "Jesús ungido en Betania",
                pericopes: [
                    {
                        title: "Jesús ungido en Betania",
                        verseRange: [1, 11]
                    },
                    {
                        title: "La entrada triunfal en Jerusalén",
                        verseRange: [12, 19]
                    },
                    {
                        title: "Jesús predice su muerte",
                        verseRange: [20, 36]
                    },
                    {
                        title: "La incredulidad de la gente",
                        verseRange: [37, 43]
                    },
                    {
                        title: "Jesús habla del juicio final",
                        verseRange: [44, 50]
                    }
                ]
            },
            13: {
                title: "La última cena",
                pericopes: [
                    {
                        title: "Jesús lava los pies a sus discípulos",
                        verseRange: [1, 17]
                    },
                    {
                        title: "Predicción de la traición de Judas",
                        verseRange: [18, 30]
                    },
                    {
                        title: "El nuevo mandamiento",
                        verseRange: [31, 38]
                    }
                ]
            },
            14: {
                title: "Jesús, el camino, la verdad y la vida",
                pericopes: [
                    {
                        title: "Jesús promete un lugar en el cielo",
                        verseRange: [1, 14]
                    },
                    {
                        title: "Jesús promete el Espíritu Santo",
                        verseRange: [15, 31]
                    }
                ]
            },
            15: {
                title: "La vid verdadera",
                pericopes: [
                    {
                        title: "Jesús, la vid verdadera",
                        verseRange: [1, 17]
                    },
                    {
                        title: "El odio del mundo",
                        verseRange: [18, 27]
                    }
                ]
            },
            16: {
                title: "El Espíritu Santo y la obra del Consolador",
                pericopes: [
                    {
                        title: "Jesús habla del Espíritu Santo",
                        verseRange: [1, 15]
                    },
                    {
                        title: "Jesús habla de su regreso",
                        verseRange: [16, 33]
                    }
                ]
            },
            17: {
                title: "La oración sacerdotal de Jesús",
                pericopes: [
                    {
                        title: "Jesús ora por sí mismo",
                        verseRange: [1, 5]
                    },
                    {
                        title: "Jesús ora por sus discípulos",
                        verseRange: [6, 19]
                    },
                    {
                        title: "Jesús ora por todos los creyentes",
                        verseRange: [20, 26]
                    }
                ]
            },
            18: {
                title: "La traición y arresto de Jesús",
                pericopes: [
                    {
                        title: "Jesús es arrestado",
                        verseRange: [1, 11]
                    },
                    {
                        title: "Jesús ante el sumo sacerdote",
                        verseRange: [12, 27]
                    },
                    {
                        title: "Jesús ante Pilato",
                        verseRange: [28, 40]
                    }
                ]
            },
            19: {
                title: "La crucifixión y muerte de Jesús",
                pericopes: [
                    {
                        title: "Jesús es flagelado y condenado",
                        verseRange: [1, 16]
                    },
                    {
                        title: "Jesús es crucificado",
                        verseRange: [17, 30]
                    },
                    {
                        title: "La muerte de Jesús",
                        verseRange: [31, 37]
                    },
                    {
                        title: "El entierro de Jesús",
                        verseRange: [38, 42]
                    }
                ]
            },
            20: {
                title: "La resurrección de Jesús",
                pericopes: [
                    {
                        title: "La tumba vacía",
                        verseRange: [1, 10]
                    },
                    {
                        title: "Jesús se aparece a María Magdalena",
                        verseRange: [11, 18]
                    },
                    {
                        title: "Jesús se aparece a sus discípulos",
                        verseRange: [19, 23]
                    },
                    {
                        title: "Jesús se aparece a Tomás",
                        verseRange: [24, 29]
                    },
                    {
                        title: "El propósito de este evangelio",
                        verseRange: [30, 31]
                    }
                ]
            },
            21: {
                title: "Jesús se aparece en el mar de Tiberíades",
                pericopes: [
                    {
                        title: "Jesús se aparece en el mar de Tiberíades",
                        verseRange: [1, 14]
                    },
                    {
                        title: "Jesús y Pedro",
                        verseRange: [15, 19]
                    },
                    {
                        title: "El futuro de Pedro y Juan",
                        verseRange: [20, 25]
                    }
                ]
            }
        }
    }
};
