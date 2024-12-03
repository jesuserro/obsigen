import { BookStructure } from "../BibleViewStructure";

const Santiago: BookStructure = {
    chapters: {
        1: {
            title: "Pruebas, sabiduría y fe verdadera",
            pericopes: []
        },
        2: {
            title: "Fe y obras, y el trato sin favoritismos",
            pericopes: [{
                title: "La fe sin obras está muerta",
                verseRange: [14, 19],
                images: [
                    {
                        type: "local",
                        path: "DALL·E 2024-12-03 16.50.30 - James 2_14-19 - Fe y obras.webp",
                        altText:"DALL·E 2024-12-03 16.50.30 - James 2_14-19 - Fe y obras",
                    },
                ],
            }]
        },
        3: {
            title: "El poder de la lengua y la sabiduría divina",
            pericopes: []
        },
        4: {
            title: "La soberbia, la humildad y el juicio hacia los demás",
            pericopes: []
        },
        5: {
            title: "Advertencias a los ricos y la paciencia en el sufrimiento",
            pericopes: []
        }
    }

};

export default Santiago;
