import { App, TFile } from "obsidian";
import { openVaultNote } from "../../../adapters/Obsidian/openVaultNote";

const IMAGE_FOLDER = "050 Anexos";

export interface Note {
	verseRange: [number, number];
	pericopeTitle: string;
	title: string;
	alt: string;
	rating?: number;
	verseTitle?: string;
	versePassage?: string;
	locations?: string[];
	coordinates?: [number, number];
	historicalDate?: string;
	path: string; // Path de la imagen
	notePath: string; // Path de la nota
}

async function getLocationCoordinates(
	app: App,
	location: string
): Promise<[number, number] | null> {
	const sanitizedLocation = location.replace(/\[\[|\]\]/g, "");
	const [mainLocation, alias] = sanitizedLocation.split("|");

	const files = app.vault
		.getFiles()
		.filter(
			(file) =>
				file.basename.includes(mainLocation) ||
				(alias && file.basename.includes(alias))
		);

	if (files.length === 0) {
		console.log(
			`getLocationCoordinates: No se encontró ninguna nota con el nombre ${sanitizedLocation}`
		);
		return null;
	}

	const noteFile = files[0];
	if (!(noteFile instanceof TFile)) {
		return null;
	}

	const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
	if (!yaml || !yaml.location) {
		return null;
	}

	return yaml.location;
}

async function getNoteData(app: App, filePath: string): Promise<Partial<Note>> {
	const noteFile = app.vault.getAbstractFileByPath(filePath);
	if (!(noteFile instanceof TFile)) {
		console.log(`getNoteData: No se encontró ninguna nota en ${filePath}`);
		return {};
	}

	const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
	if (!yaml) {
		return {};
	}

	return {
		rating: yaml.rating || null,
		verseTitle: yaml.verse_title || "",
		versePassage: yaml.verse_passage || "",
		locations: yaml.locations || [],
		path: yaml.cover ? app.vault.adapter.getResourcePath(yaml.cover) : "",
		alt: yaml.cover ? yaml.cover : "",
		historicalDate:
			typeof yaml.historical_date === "string"
				? yaml.historical_date
				: yaml.historical_date == null || yaml.historical_date === ""
				? ""
				: "invalid-historical-date",
		title: yaml.title || "",
		pericopeTitle: yaml.pericope_title || "",
		verseRange: yaml.verse_range || [0, 0],
		notePath: filePath,
	};
}

type ParsedTimelineDate =
	| {
			kind: "valid";
			signedYear: number;
			year: number;
			month: number;
			day: number;
			era: "AC" | "DC";
	  }
	| { kind: "missing" }
	| { kind: "invalid" };

const TIMELINE_DATE_PATTERN = /^(-?)(\d{4,})-(\d{2})-(\d{2})$/;

function parseTimelineDate(dateString: string): ParsedTimelineDate {
	if (!dateString) {
		return { kind: "missing" };
	}

	const match = TIMELINE_DATE_PATTERN.exec(dateString);
	if (!match) {
		return { kind: "invalid" };
	}

	const [, sign, yearPart, monthPart, dayPart] = match;
	const year = Number(yearPart);
	const month = Number(monthPart);
	const day = Number(dayPart);

	if (year === 0 || month < 1 || month > 12 || day < 1 || day > 31) {
		return { kind: "invalid" };
	}

	const era = sign === "-" ? "AC" : "DC";
	return {
		kind: "valid",
		signedYear: era === "AC" ? -year : year,
		year,
		month,
		day,
		era,
	};
}

export function formatDate(dateString: string): string {
	const date = parseTimelineDate(dateString);
	if (date.kind === "missing") {
		return "Unknown date";
	}
	if (date.kind === "invalid") {
		return "Invalid date";
	}

	return `${String(date.day).padStart(2, "0")}/${String(date.month).padStart(
		2,
		"0"
	)}/${date.year} ${date.era}`;
}

function sortNotesByDate(notes: Note[]): Note[] {
	return notes.sort((a, b) => {
		const dateA = parseTimelineDate(a.historicalDate || "");
		const dateB = parseTimelineDate(b.historicalDate || "");

		if (dateA.kind === "valid" && dateB.kind === "valid") {
			return (
				dateA.signedYear - dateB.signedYear ||
				dateA.month - dateB.month ||
				dateA.day - dateB.day
			);
		}
		if (dateA.kind === "valid") {
			return -1;
		}
		if (dateB.kind === "valid") {
			return 1;
		}
		return 0;
	});
}

export async function fetchChapterImages(
	app: App
): Promise<{ [key: string]: Note[] }> {
	const images: { [key: string]: Note[] } = {};
	const files = app.vault
		.getFiles()
		.filter((file) => file.path.startsWith("333 Biblia"));

	for (const file of files) {
		const noteData = await getNoteData(app, file.path);
		if (noteData.path) {
			const key = file.path.split("/").slice(0, -1).join("/");
			if (!images[key]) {
				images[key] = [];
			}
			const coordinates =
				noteData.locations && noteData.locations.length > 0
					? await getLocationCoordinates(app, noteData.locations[0])
					: null;

			images[key].push({
				...noteData,
				coordinates,
				locations:
					noteData.locations?.map((location) =>
						location.replace(/\[\[|\]\]/g, "")
					) || [],
			} as Note);
		}
	}

	// Ordenar las notas por fecha
	Object.keys(images).forEach((key) => {
		images[key] = sortNotesByDate(images[key]);
	});

	return images;
}

export async function openNote(app: App, filePath: string): Promise<void> {
	const noteFile = app.vault.getAbstractFileByPath(filePath);
	await openVaultNote(app, noteFile, "", filePath);
}

export async function openLocationNote(
	app: App,
	location: string
): Promise<void> {
	const sanitizedLocation = location.replace(/\[\[|\]\]/g, "");
	const [mainLocation, alias] = sanitizedLocation.split("|");

	const files = app.vault
		.getFiles()
		.filter(
			(file) =>
				file.basename.includes(mainLocation) ||
				(alias && file.basename.includes(alias))
		);

	if (files.length === 0) {
		await openVaultNote(app, null, "", sanitizedLocation);
		return;
	}

	const noteFile = files[0];
	await openVaultNote(app, noteFile, "", sanitizedLocation);
}

export async function openNoteByPath(
	app: App,
	filePath: string
): Promise<void> {
	const noteFile = app.vault.getAbstractFileByPath(filePath);
	await openVaultNote(app, noteFile, "", filePath);
}
