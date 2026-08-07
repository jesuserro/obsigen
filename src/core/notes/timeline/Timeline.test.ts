jest.mock("obsidian", () => ({
	TFile: class TFile {
		path: string;
		basename: string;

		constructor(path: string) {
			this.path = path;
			this.basename = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
		}
	},
}));

import { App, TFile } from "obsidian";
import {
	fetchChapterImages,
	formatDate,
	openNoteByPath,
} from "./Timeline";

afterEach(() => {
	jest.restoreAllMocks();
});

type Frontmatter = Record<string, unknown>;

interface TimelineHarness {
	app: App;
	getFiles: jest.Mock;
	getAbstractFileByPath: jest.Mock;
	getResourcePath: jest.Mock;
	getFileCache: jest.Mock;
}

interface HistoricalNoteShape {
	historicalDate?: string;
	date?: unknown;
}

function makeFile(path: string): TFile {
	const file = Object.create(TFile.prototype) as TFile;
	Object.assign(file, {
		path,
		basename: path.split("/").pop()?.replace(/\.md$/, "") ?? "",
	});
	return file;
}

function makeHarness(
	entries: Array<{ file: TFile; frontmatter?: Frontmatter }>
): TimelineHarness {
	const frontmatterByPath = new Map(
		entries.map(({ file, frontmatter }) => [file.path, frontmatter])
	);
	const files = entries.map(({ file }) => file);
	const getFiles = jest.fn(() => files);
	const getAbstractFileByPath = jest.fn((path: string) =>
		files.find((file) => file.path === path) ?? null
	);
	const getResourcePath = jest.fn((cover: string) => `resource://${cover}`);
	const getFileCache = jest.fn((file: TFile) => {
		const frontmatter = frontmatterByPath.get(file.path);
		return frontmatter === undefined ? null : { frontmatter };
	});

	return {
		app: {
			vault: {
				getFiles,
				getAbstractFileByPath,
				adapter: { getResourcePath },
			},
			metadataCache: { getFileCache },
			workspace: { openLinkText: jest.fn() },
		} as unknown as App,
		getFiles,
		getAbstractFileByPath,
		getResourcePath,
		getFileCache,
	};
}

function timelineEntry(
	name: string,
	historicalDate?: string,
	overrides: Frontmatter = {},
	directory = "333 Biblia/Genesis"
): { file: TFile; frontmatter: Frontmatter } {
	return {
		file: makeFile(`${directory}/${name}.md`),
		frontmatter: {
			cover: `050 Anexos/${name}.jpg`,
			historical_date: historicalDate,
			title: name,
			...overrides,
		},
	};
}

async function sortedTitles(
	entries: Array<{ file: TFile; frontmatter?: Frontmatter }>
): Promise<string[]> {
	const images = await fetchChapterImages(makeHarness(entries).app);
	return Object.values(images).flat().map((note) => note.title);
}

function timelineLabel(note: { historicalDate?: string }): string {
	return note.historicalDate
		? formatDate(note.historicalDate)
		: "Unknown date";
}

describe("Timeline dedicated historical source contract", () => {
	test("ignores a technical date when historical_date is missing", async () => {
		const harness = makeHarness([
			timelineEntry("Technical date only", undefined, {
				date: "2024-11-26T12:14",
			}),
		]);

		const images = await fetchChapterImages(harness.app);
		const note = images["333 Biblia/Genesis"][0] as unknown as HistoricalNoteShape;

		expect(note.historicalDate).toBe("");
		expect(note).not.toHaveProperty("date");
		expect(timelineLabel(note)).toBe("Unknown date");
	});

	test("does not fall back to a valid historical-looking legacy date", async () => {
		const harness = makeHarness([
			timelineEntry("Legacy date only", undefined, {
				date: "-0006-12-25",
			}),
		]);

		const images = await fetchChapterImages(harness.app);
		const note = images["333 Biblia/Genesis"][0] as unknown as HistoricalNoteShape;

		expect(note.historicalDate).toBe("");
		expect(timelineLabel(note)).toBe("Unknown date");
	});

	test.each([
		["2024-11-26T12:14", "-2066-01-01", "01/01/2066 AC"],
		["2025-01-01T09:00", "0001-01-01", "01/01/1 DC"],
		["2026-08-07", "-0006-12-25", "25/12/6 AC"],
	])(
		"ignores technical date %s and uses historical_date %s",
		async (technicalDate, historicalDate, expectedLabel) => {
			const harness = makeHarness([
				timelineEntry("Dedicated history", historicalDate, {
					date: technicalDate,
				}),
			]);

			const images = await fetchChapterImages(harness.app);
			const note = images["333 Biblia/Genesis"][0] as unknown as HistoricalNoteShape;

			expect(note.historicalDate).toBe(historicalDate);
			expect(note).not.toHaveProperty("date");
			expect(timelineLabel(note)).toBe(expectedLabel);
		}
	);

	test.each([2066, ["-2066-01-01"], { year: 2066 }])(
		"treats non-string historical_date %p as invalid",
		async (historicalDate) => {
			const harness = makeHarness([
				timelineEntry("Non-string history", undefined, {
					historical_date: historicalDate,
					date: "-0006-12-25",
				}),
			]);

			const images = await fetchChapterImages(harness.app);
			const note = images["333 Biblia/Genesis"][0] as unknown as HistoricalNoteShape;

			expect(note.historicalDate).toBeTruthy();
			expect(timelineLabel(note)).toBe("Invalid date");
		}
	);
});

describe("Timeline historical date characterization", () => {
	test("sorts dates within BC from the distant past toward the era boundary", async () => {
		const titles = await sortedTitles([
			timelineEntry("1 BC", "-0001-01-01"),
			timelineEntry("10 BC", "-0010-01-01"),
			timelineEntry("5 BC", "-0005-01-01"),
		]);

		expect(titles).toEqual(["10 BC", "5 BC", "1 BC"]);
	});

	test("sorts month and day within the same BC year", async () => {
		const titles = await sortedTitles([
			timelineEntry("December", "-0005-12-31"),
			timelineEntry("June", "-0005-06-01"),
			timelineEntry("January", "-0005-01-01"),
		]);

		expect(titles).toEqual(["January", "June", "December"]);
	});

	test("sorts AD years 1, 5, 99, 100, 1000, and 2026 in ascending order", async () => {
		const titles = await sortedTitles([
			timelineEntry("2026 AD", "2026-01-01"),
			timelineEntry("100 AD", "0100-01-01"),
			timelineEntry("1 AD", "0001-01-01"),
			timelineEntry("1000 AD", "1000-01-01"),
			timelineEntry("99 AD", "0099-01-01"),
			timelineEntry("5 AD", "0005-01-01"),
		]);

		expect(titles).toEqual([
			"1 AD",
			"5 AD",
			"99 AD",
			"100 AD",
			"1000 AD",
			"2026 AD",
		]);
	});

	test("sorts notes chronologically across BC and AD", async () => {
		const titles = await sortedTitles([
			timelineEntry("2026 AD", "2026-01-01"),
			timelineEntry("1 BC", "-0001-01-01"),
			timelineEntry("100 AD", "0100-01-01"),
			timelineEntry("100 BC", "-0100-01-01"),
			timelineEntry("1 AD", "0001-01-01"),
		]);

		expect(titles).toEqual([
			"100 BC",
			"1 BC",
			"1 AD",
			"100 AD",
			"2026 AD",
		]);
	});

	test("puts 1 BC immediately before 1 AD at the era boundary", async () => {
		const titles = await sortedTitles([
			timelineEntry("1 BC", "-0001-01-01"),
			timelineEntry("1 AD", "0001-01-01"),
		]);

		expect(titles).toEqual(["1 BC", "1 AD"]);
	});

	test("does not put pre-1970 AD dates before BC dates", async () => {
		const titles = await sortedTitles([
			timelineEntry("100 BC", "-0100-01-01"),
			timelineEntry("1 BC", "-0001-01-01"),
			timelineEntry("1 AD", "0001-01-01"),
			timelineEntry("100 AD", "0100-01-01"),
		]);

		expect(titles).toEqual(["100 BC", "1 BC", "1 AD", "100 AD"]);
	});

	test("treats both spellings of year zero as invalid and keeps them at the end", async () => {
		const titles = await sortedTitles([
			timelineEntry("negative zero", "-0000-01-01"),
			timelineEntry("1 BC", "-0001-01-01"),
			timelineEntry("positive zero", "0000-01-01"),
			timelineEntry("1 AD", "0001-01-01"),
		]);

		expect(titles).toEqual([
			"1 BC",
			"1 AD",
			"negative zero",
			"positive zero",
		]);
		expect(formatDate("-0000-01-01")).toBe("Invalid date");
		expect(formatDate("0000-01-01")).toBe("Invalid date");
	});

	test("formats BC dates explicitly without technical year padding", () => {
		expect(formatDate("-0005-01-02")).toBe("02/01/5 AC");
	});

	test.each([
		["0005-01-02", "02/01/5 DC"],
		["0099-01-02", "02/01/99 DC"],
		["0100-01-02", "02/01/100 DC"],
		["2026-01-02", "02/01/2026 DC"],
	])("formats AD date %s deterministically as %s", (dateString, expected) => {
		expect(formatDate(dateString)).toBe(expected);
	});

	test("places a missing date after all valid dates without consulting the clock", async () => {
		const now = jest.spyOn(Date, "now");
		const titles = await sortedTitles([
			timelineEntry("missing", undefined),
			timelineEntry("2026 AD", "2026-01-01"),
			timelineEntry("1 BC", "-0001-01-01"),
		]);

		expect(titles).toEqual(["1 BC", "2026 AD", "missing"]);
		expect(now).not.toHaveBeenCalled();
		expect(formatDate("")).toBe("Unknown date");
	});

	test.each(["not-a-date", "2026-99-99"])(
		"puts invalid date %s after correctly sorted valid dates",
		async (invalidDate) => {
			const titles = await sortedTitles([
				timelineEntry("2026 AD", "2026-01-01"),
				timelineEntry("invalid", invalidDate),
				timelineEntry("1 AD", "0001-01-01"),
			]);

			expect(titles).toEqual(["1 AD", "2026 AD", "invalid"]);
			expect(formatDate(invalidDate)).toBe("Invalid date");
		}
	);

	test("preserves input order within the combined invalid and missing tail", async () => {
		const titles = await sortedTitles([
			timelineEntry("invalid A", "invalid-a"),
			timelineEntry("missing B", undefined),
			timelineEntry("2026 AD", "2026-01-01"),
			timelineEntry("invalid C", "2026-99-99"),
			timelineEntry("1 AD", "0001-01-01"),
		]);

		expect(titles).toEqual([
			"1 AD",
			"2026 AD",
			"invalid A",
			"missing B",
			"invalid C",
		]);
	});

	test.each([
		"2026-00-01",
		"2026-13-01",
		"2026-01-00",
		"2026-01-32",
		"2026-aa-01",
		"2026-01",
		"2026-01-02T10:30:00",
	])("rejects unsupported or structurally invalid date %s", (dateString) => {
		expect(formatDate(dateString)).toBe("Invalid date");
	});

	test("preserves snapshot order for notes with the same date", async () => {
		const titles = await sortedTitles([
			timelineEntry("first", "2026-01-01"),
			timelineEntry("second", "2026-01-01"),
		]);

		expect(titles).toEqual(["first", "second"]);
	});
});

describe("Timeline note loading characterization", () => {
	test("groups covered Bible notes by their containing directory", async () => {
		const harness = makeHarness([
			timelineEntry("Genesis one", "2026-01-01"),
			timelineEntry("Genesis two", "2026-01-02"),
			timelineEntry(
				"Exodus one",
				"2026-01-03",
				{},
				"333 Biblia/Exodus"
			),
		]);

		const images = await fetchChapterImages(harness.app);

		expect(Object.keys(images)).toEqual([
			"333 Biblia/Genesis",
			"333 Biblia/Exodus",
		]);
		expect(images["333 Biblia/Genesis"].map((note) => note.title)).toEqual([
			"Genesis one",
			"Genesis two",
		]);
		expect(images["333 Biblia/Exodus"].map((note) => note.title)).toEqual([
			"Exodus one",
		]);
	});

	test("only includes Bible notes with a cover", async () => {
		const harness = makeHarness([
			timelineEntry("included", "2026-01-01"),
			{
				file: makeFile("333 Biblia/Genesis/without cover.md"),
				frontmatter: { date: "2026-01-02", title: "without cover" },
			},
			timelineEntry(
				"outside Bible",
				"2026-01-03",
				{},
				"Projects"
			),
		]);

		const images = await fetchChapterImages(harness.app);

		expect(Object.values(images).flat().map((note) => note.title)).toEqual([
			"included",
		]);
		expect(harness.getAbstractFileByPath).toHaveBeenCalledTimes(2);
	});

	test("extracts the metadata consumed by Timeline", async () => {
		const entry = timelineEntry("metadata", "-0005-01-02", {
			date: "2024-11-26T12:14",
			rating: 4,
			verse_title: "A verse",
			verse_passage: "The passage",
			locations: [],
			title: "Visible title",
			pericope_title: "Pericope",
			verse_range: [2, 7],
			cover: "050 Anexos/custom.jpg",
		});
		const harness = makeHarness([entry]);

		const images = await fetchChapterImages(harness.app);
		const note = images["333 Biblia/Genesis"][0];

		expect(note).toEqual({
			rating: 4,
			verseTitle: "A verse",
			versePassage: "The passage",
			locations: [],
			path: "resource://050 Anexos/custom.jpg",
			alt: "050 Anexos/custom.jpg",
			historicalDate: "-0005-01-02",
			title: "Visible title",
			pericopeTitle: "Pericope",
			verseRange: [2, 7],
			notePath: "333 Biblia/Genesis/metadata.md",
			coordinates: null,
		});
	});

	test("resolves a location by substring or alias and takes the first match", async () => {
		const timelineNote = timelineEntry("located", "2026-01-01", {
			locations: ["[[Jerusalem|City of David]]"],
		});
		const aliasMatch = {
			file: makeFile("Places/Ancient City of David map.md"),
			frontmatter: { location: [31.77, 35.23] },
		};
		const mainMatch = {
			file: makeFile("Places/Jerusalem.md"),
			frontmatter: { location: [99, 99] },
		};
		const harness = makeHarness([timelineNote, aliasMatch, mainMatch]);

		const images = await fetchChapterImages(harness.app);
		const note = images["333 Biblia/Genesis"][0];

		expect(note.locations).toEqual(["Jerusalem|City of David"]);
		expect(note.coordinates).toEqual([31.77, 35.23]);
		expect(harness.getFiles).toHaveBeenCalledTimes(2);
		expect(harness.getFileCache).toHaveBeenLastCalledWith(aliasMatch.file);
	});

	test("amplifies full-vault scans once per Timeline note with a location", async () => {
		const harness = makeHarness([
			timelineEntry("plain", "2026-01-01"),
			timelineEntry("located one", "2026-01-02", {
				locations: ["[[Alpha]]"],
			}),
			timelineEntry("located two", "2026-01-03", {
				locations: ["[[Beta]]"],
			}),
			{
				file: makeFile("Places/Alpha.md"),
				frontmatter: { location: [1, 2] },
			},
			{
				file: makeFile("Places/Beta.md"),
				frontmatter: { location: [3, 4] },
			},
		]);

		await fetchChapterImages(harness.app);

		expect(harness.getFiles).toHaveBeenCalledTimes(3);
		expect(harness.getAbstractFileByPath).toHaveBeenCalledTimes(3);
		expect(harness.getFileCache).toHaveBeenCalledTimes(5);
		expect(harness.getResourcePath).toHaveBeenCalledTimes(3);
	});

	test("uses one full-vault scan and one metadata lookup per note without locations", async () => {
		const harness = makeHarness([
			timelineEntry("one", "2026-01-01"),
			timelineEntry("two", "2026-01-02"),
			timelineEntry("three", "2026-01-03"),
		]);

		await fetchChapterImages(harness.app);

		expect(harness.getFiles).toHaveBeenCalledTimes(1);
		expect(harness.getAbstractFileByPath).toHaveBeenCalledTimes(3);
		expect(harness.getFileCache).toHaveBeenCalledTimes(3);
		expect(harness.getResourcePath).toHaveBeenCalledTimes(3);
	});

	test("opens the exact note path requested by TimelineUI", async () => {
		const entry = timelineEntry("target", "2026-01-01");
		const harness = makeHarness([entry]);
		const openLinkText = (harness.app.workspace.openLinkText as jest.Mock);

		await openNoteByPath(harness.app, entry.file.path);

		expect(harness.getAbstractFileByPath).toHaveBeenCalledWith(entry.file.path);
		expect(openLinkText).toHaveBeenCalledWith(entry.file.path, "", false, {
			active: true,
		});
	});
});
