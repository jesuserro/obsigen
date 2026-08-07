import {
  fetchChapterNotes,
  getChapterNotes,
  openLocationNote,
  openNote,
} from "./BibleViewChapters";
import { bibleStructure } from "./BibleViewStructure";
import { openVaultNote } from "../../../adapters/Obsidian/openVaultNote";

jest.mock("../../../adapters/Obsidian/openVaultNote", () => ({
  openVaultNote: jest.fn().mockResolvedValue(undefined),
}));

interface FixtureFile {
  path: string;
  basename: string;
}

const TOTAL_BOOKS = Object.keys(bibleStructure).length;
const TOTAL_CHAPTERS = Object.values(bibleStructure).reduce(
  (total, book) => total + Object.keys(book.chapters).length,
  0,
);

const mockOpenVaultNote = jest.mocked(openVaultNote);

type LocationMode = "none" | "single" | "multiple";

function createBibleFixture(locationMode: LocationMode = "none") {
  const files: FixtureFile[] = [
    {
      path: "333 Biblia/San Juan/1/Jn 1, 10-15 La Palabra se hizo carne.md",
      basename: "Jn 1, 10-15 La Palabra se hizo carne",
    },
    {
      path: "333 Biblia/San Juan/1/Jn 1, 1-5 En el principio.md",
      basename: "Jn 1, 1-5 En el principio",
    },
    {
      path: "333 Biblia/San Juan/1/Jn 1, 6-9 Testimonio de Juan.md",
      basename: "Jn 1, 6-9 Testimonio de Juan",
    },
    {
      path: "333 Biblia/Salmos/Sal 1,1-6 Los dos caminos.md",
      basename: "Sal 1,1-6 Los dos caminos",
    },
    {
      path: "300 Lugares/Atlas Roma histórico.md",
      basename: "Atlas Roma histórico",
    },
    {
      path: "300 Lugares/Roma.md",
      basename: "Roma",
    },
    {
      path: "300 Lugares/Mapa Jerusalén antiguo.md",
      basename: "Mapa Jerusalén antiguo",
    },
    {
      path: "300 Lugares/Comarca de Nazaret.md",
      basename: "Comarca de Nazaret",
    },
    {
      path: "999 Fuera de la Biblia/Nota sin relación.md",
      basename: "Nota sin relación",
    },
  ];

  const frontmatterByPath = new Map<string, Record<string, unknown>>([
    [
      files[0].path,
      {
        verse_passage: "Jn 1, 10-15",
        verse_title: "La Palabra se hizo carne",
        rating: 5,
        cover: "covers/incarnation.jpg",
        locations: locationMode === "multiple" ? ["[[Roma]]"] : [],
      },
    ],
    [
      files[1].path,
      {
        verse_passage: "Jn 1, 1-5",
        verse_title: "En el principio",
        rating: 4,
        locations: locationMode === "multiple" ? ["[[Nazaret]]"] : [],
      },
    ],
    [
      files[2].path,
      {
        verse_passage: "Jn 1, 6-9",
        verse_title: "Testimonio de Juan",
        rating: 3,
        cover: "covers/testimony.jpg",
        locations:
          locationMode === "single" || locationMode === "multiple"
            ? ["[[lugar-inexistente|Jerusalén]]"]
            : [],
      },
    ],
    [
      files[3].path,
      {
        verse_title: "Los dos caminos",
        rating: 5,
      },
    ],
    [files[4].path, { location: [41.9, 12.5] }],
    [files[5].path, { location: [0, 0] }],
    [files[6].path, { location: [31.778, 35.235] }],
    [files[7].path, { location: [32.7, 35.3] }],
    [files[8].path, {}],
  ]);

  const originalIterator = files[Symbol.iterator].bind(files);
  const iteratorSpy = jest
    .spyOn(files, Symbol.iterator)
    .mockImplementation(() => originalIterator());
  const originalFilter = files.filter.bind(files);
  const filterSpy = jest
    .spyOn(files, "filter")
    .mockImplementation(
      ((callback: Parameters<typeof files.filter>[0], thisArg?: unknown) =>
        originalFilter(callback, thisArg)) as typeof files.filter,
    );

  const getFiles = jest.fn(() => files);
  const getAbstractFileByPath = jest.fn((path: string) =>
    files.find((file) => file.path === path),
  );
  const getFileCache = jest.fn((file: FixtureFile) => ({
    frontmatter: frontmatterByPath.get(file.path),
  }));
  const getResourcePath = jest.fn((path: string) => `resource:${path}`);

  const app = {
    vault: {
      getFiles,
      getAbstractFileByPath,
      adapter: { getResourcePath },
    },
    metadataCache: { getFileCache },
  } as never;

  return {
    app,
    files,
    filterSpy,
    frontmatterByPath,
    getAbstractFileByPath,
    getFileCache,
    getFiles,
    getResourcePath,
    iteratorSpy,
  };
}

describe("BibleViewChapters characterization", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("records the complete Bible structure traversed by hydration", () => {
    expect(TOTAL_BOOKS).toBe(46);
    expect(TOTAL_CHAPTERS).toBe(1088);
    expect(Object.keys(bibleStructure["San Juan"].chapters)).toHaveLength(21);
    expect(Object.keys(bibleStructure.Salmos.chapters)).toHaveLength(150);
  });

  it("maps and sorts a regular chapter while ignoring unrelated files", async () => {
    const fixture = createBibleFixture("single");

    const notes = await getChapterNotes(fixture.app, "San Juan", "1");

    expect(notes.map((note) => note.verseRange)).toEqual([
      [1, 5],
      [6, 9],
      [10, 15],
    ]);
    expect(notes[1]).toEqual(expect.objectContaining({
      path: "333 Biblia/San Juan/1/Jn 1, 6-9 Testimonio de Juan.md",
      verseRange: [6, 9],
      title: "Testimonio de Juan",
      rating: 3,
      verse_title: "Testimonio de Juan",
      cover: "resource:covers/testimony.jpg",
      locations: ["[[lugar-inexistente|Jerusalén]]"],
      coordinates: [31.778, 35.235],
    }));
    expect(fixture.getFiles).toHaveBeenCalledTimes(2);
    expect(fixture.filterSpy).toHaveBeenCalledTimes(2);
    expect(fixture.getAbstractFileByPath).toHaveBeenCalledTimes(3);
    expect(fixture.getFileCache).toHaveBeenCalledTimes(4);
  });

  it("uses the Psalm filename fallback and the flat Salmos folder", async () => {
    const fixture = createBibleFixture();

    const notes = await getChapterNotes(fixture.app, "Salmos", "1");

    expect(notes).toEqual([
      expect.objectContaining({
        path: "333 Biblia/Salmos/Sal 1,1-6 Los dos caminos.md",
        verseRange: [1, 6],
        title: "Los dos caminos",
        rating: 5,
        verse_title: "Los dos caminos",
        cover: "",
        locations: [],
        coordinates: null,
      }),
    ]);
    expect(fixture.getFiles).toHaveBeenCalledTimes(1);
    expect(fixture.filterSpy).toHaveBeenCalledTimes(1);
  });

  it("returns an empty array for a chapter without matching notes", async () => {
    const fixture = createBibleFixture();

    await expect(getChapterNotes(fixture.app, "San Juan", "2")).resolves.toEqual(
      [],
    );
    expect(fixture.getFiles).toHaveBeenCalledTimes(1);
    expect(fixture.filterSpy).toHaveBeenCalledTimes(1);
    expect(fixture.getFileCache).not.toHaveBeenCalled();
  });

  it("returns one keyed array for every chapter in BibleViewStructure", async () => {
    const fixture = createBibleFixture();

    const result = await fetchChapterNotes(fixture.app);

    expect(Object.keys(result)).toHaveLength(TOTAL_CHAPTERS);
    expect(result["San Juan-1"]).toHaveLength(3);
    expect(result["San Juan-2"]).toEqual([]);
    expect(result["Salmos-1"]).toHaveLength(1);
  });

  describe("current full hydration cost", () => {
    it("uses one snapshot traversal when no note has locations", async () => {
      const fixture = createBibleFixture();

      await fetchChapterNotes(fixture.app);

      expect(fixture.getFiles).toHaveBeenCalledTimes(1);
      expect(fixture.filterSpy).not.toHaveBeenCalled();
      expect(fixture.iteratorSpy).toHaveBeenCalledTimes(1);
      expect(fixture.getAbstractFileByPath).toHaveBeenCalledTimes(4);
      expect(fixture.getFileCache).toHaveBeenCalledTimes(4);
    });

    it("resolves one location with one additional bounded traversal", async () => {
      const fixture = createBibleFixture("single");

      await fetchChapterNotes(fixture.app);

      expect(fixture.getFiles).toHaveBeenCalledTimes(1);
      expect(fixture.filterSpy).not.toHaveBeenCalled();
      expect(fixture.iteratorSpy).toHaveBeenCalledTimes(2);
      expect(fixture.getAbstractFileByPath).toHaveBeenCalledTimes(4);
      expect(fixture.getFileCache).toHaveBeenCalledTimes(5);
    });
  });

  describe("hydration performance contracts", () => {
    it("takes one vault snapshot per full hydration", async () => {
      const fixture = createBibleFixture("single");

      await fetchChapterNotes(fixture.app);

      expect(fixture.getFiles).toHaveBeenCalledTimes(1);
    });

    it("uses at most two full-vault traversals per full hydration", async () => {
      const fixture = createBibleFixture("single");

      await fetchChapterNotes(fixture.app);

      const fullVaultTraversals =
        fixture.filterSpy.mock.calls.length +
        fixture.iteratorSpy.mock.calls.length;
      expect(fullVaultTraversals).toBeLessThanOrEqual(2);
    });

    it("resolves three distinct locations without additional snapshots or traversals", async () => {
      const fixture = createBibleFixture("multiple");

      const result = await fetchChapterNotes(fixture.app);

      expect(fixture.getFiles).toHaveBeenCalledTimes(1);
      expect(fixture.filterSpy).not.toHaveBeenCalled();
      expect(fixture.iteratorSpy).toHaveBeenCalledTimes(2);
      expect(result["San Juan-1"].map((note) => note.coordinates)).toEqual([
        [32.7, 35.3],
        [31.778, 35.235],
        [41.9, 12.5],
      ]);
      expect(fixture.getAbstractFileByPath).toHaveBeenCalledTimes(4);
      expect(fixture.getFileCache).toHaveBeenCalledTimes(7);
    });

    it("takes a fresh snapshot on each invocation", async () => {
      const fixture = createBibleFixture();
      const addedFile: FixtureFile = {
        path: "333 Biblia/San Juan/2/Jn 2, 1-5 Las bodas de Caná.md",
        basename: "Jn 2, 1-5 Las bodas de Caná",
      };
      const secondSnapshot = [...fixture.files, addedFile];
      fixture.frontmatterByPath.set(addedFile.path, {
        verse_passage: "Jn 2, 1-5",
        verse_title: "Las bodas de Caná",
        rating: 5,
      });
      fixture.getFiles
        .mockReturnValueOnce(fixture.files as never)
        .mockReturnValueOnce(secondSnapshot as never);
      fixture.getAbstractFileByPath.mockImplementation((path: string) =>
        secondSnapshot.find((file) => file.path === path),
      );

      const firstResult = await fetchChapterNotes(fixture.app);
      const secondResult = await fetchChapterNotes(fixture.app);

      expect(fixture.getFiles).toHaveBeenCalledTimes(2);
      expect(firstResult["San Juan-2"]).toEqual([]);
      expect(secondResult["San Juan-2"]).toEqual([
        expect.objectContaining({
          path: addedFile.path,
          verseRange: [1, 5],
          title: "Las bodas de Caná",
        }),
      ]);
    });
  });

  describe("transient Bible index regressions", () => {
    it("keeps notes nested below a regular chapter folder", async () => {
      const fixture = createBibleFixture();
      const nestedFile: FixtureFile = {
        path: "333 Biblia/San Juan/2/comentarios/Jn 2, 6-8 Nota anidada.md",
        basename: "Jn 2, 6-8 Nota anidada",
      };
      fixture.files.push(nestedFile);
      fixture.frontmatterByPath.set(nestedFile.path, {
        verse_passage: "Jn 2, 6-8",
        verse_title: "Nota anidada",
      });

      const result = await fetchChapterNotes(fixture.app);

      expect(result["San Juan-2"]).toEqual([
        expect.objectContaining({ path: nestedFile.path }),
      ]);
    });

    it("keeps the first matching Psalm in snapshot order", async () => {
      const fixture = createBibleFixture();
      const duplicatePsalm: FixtureFile = {
        path: "333 Biblia/Salmos/duplicados/Sal 1,7-9 Otro candidato.md",
        basename: "Sal 1,7-9 Otro candidato",
      };
      fixture.files.push(duplicatePsalm);
      fixture.frontmatterByPath.set(duplicatePsalm.path, {
        verse_title: "Otro candidato",
      });

      const result = await fetchChapterNotes(fixture.app);

      expect(result["Salmos-1"]).toEqual([
        expect.objectContaining({
          path: "333 Biblia/Salmos/Sal 1,1-6 Los dos caminos.md",
        }),
      ]);
    });
  });

  describe("interactive note opening", () => {
    it("rescans the vault before opening a verse note", async () => {
      const fixture = createBibleFixture();

      await openNote(fixture.app, "San Juan", "1", [1, 5]);

      expect(fixture.getFiles).toHaveBeenCalledTimes(1);
      expect(fixture.filterSpy).toHaveBeenCalledTimes(1);
      expect(mockOpenVaultNote).toHaveBeenCalledWith(
        fixture.app,
        expect.objectContaining({
          path: "333 Biblia/San Juan/1/Jn 1, 1-5 En el principio.md",
        }),
      );
    });

    it("rescans the vault and supports alias substring matching for locations", async () => {
      const fixture = createBibleFixture();

      await openLocationNote(
        fixture.app,
        "[[lugar-inexistente|Jerusalén]]",
      );

      expect(fixture.getFiles).toHaveBeenCalledTimes(1);
      expect(fixture.filterSpy).toHaveBeenCalledTimes(1);
      expect(mockOpenVaultNote).toHaveBeenCalledWith(
        fixture.app,
        expect.objectContaining({
          path: "300 Lugares/Mapa Jerusalén antiguo.md",
        }),
      );
    });
  });
});
