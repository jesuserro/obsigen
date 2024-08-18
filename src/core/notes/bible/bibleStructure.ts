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
    chapterCount: number; // Número total de capítulos del libro
    chapters: { [chapter: number]: ChapterInfo };
  }
  
  export const bibleStructure: { [book: string]: BookStructure } = {
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
          events: [
            { title: "Milagro del agua convertida en vino" },
          ],
        },
        // Añade más capítulos aquí
      },
    },
    "San Marcos": {
      chapterCount: 16, // Número total de capítulos en San Marcos
      chapters: {
        1: {
          title: "Preparación del ministerio de Jesús",
          verseCount: 45,
          events: [
            { title: "Jesús bautizado por Juan" },
          ],
        },
        2: {
          title: "Jesús sana a un paralítico",
          verseCount: 28,
          events: [
            { title: "Sanación del paralítico" },
          ],
        },
        // Añade más capítulos aquí
      },
    },
  };
  