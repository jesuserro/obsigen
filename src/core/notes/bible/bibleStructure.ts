interface Event {
    // Define aquí las propiedades de un evento, por ejemplo:
    title: string;
    date?: string; // Puedes añadir más propiedades según necesites
  }
  
  interface BookStructure {
    chapters: number;
    events: { [chapter: number]: Event[] }; // Mapea capítulos a una lista de eventos
  }
  
  export const bibleStructure: { [book: string]: BookStructure } = {
    "San Marcos": {
      chapters: 16, // Número de capítulos en San Marcos
      events: {
        // Ejemplo de eventos para el capítulo 1 de San Marcos
        1: [
          { title: "Evento en el capítulo 1 de San Marcos" }
        ],
      },
    },
    "San Juan": {
      chapters: 21, // Número de capítulos en San Juan
      events: {
        // Ejemplo de eventos para el capítulo 1 de San Juan
        1: [
          { title: "Evento en el capítulo 1" },
          { title: "Otro evento en el capítulo 1" }
        ],
        // Puedes añadir más capítulos y eventos aquí
      },
    }
  };
  