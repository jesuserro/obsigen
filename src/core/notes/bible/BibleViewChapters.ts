import { App, TFile } from "obsidian";
import { openVaultNote } from "../../../adapters/Obsidian/openVaultNote";
import { BibleImage, bibleStructure } from "./BibleViewStructure";

const IMAGE_FOLDER = "050 Anexos";

export interface Note extends BibleImage {
	verseRange: [number, number];
	pericopeTitle: string;
	title: string;
	date?: string;
	path: string;
	alt: string;
	rating?: number;
	verse_title?: string;
	verse_passage?: string;
	locations?: string[];
	coordinates?: [number, number];
	cover: string;
}

async function getNoteData(app: App, filePath: string): Promise<Partial<Note>> {
	const noteFile = app.vault.getAbstractFileByPath(filePath) as TFile;
	if (!noteFile) {
		console.log(`getNoteData: No se encontró ninguna nota en ${filePath}`);
		return {};
	}

	const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
	if (!yaml) {
		return {};
	}

	// Extraer verseRange desde verse_passage
	let verseRange: [number, number] = [0, 0];
	if (yaml.verse_passage) {
		const match = yaml.verse_passage.match(/(\d+)-(\d+)/);
		if (match) {
			verseRange = [parseInt(match[1], 10), parseInt(match[2], 10)];
		}
	}

    // If verseRange is not found or is "0-0", try to extract it from the file name for example "Sal 1,1-18.md" (for Book "Salmos") or "St 1, 2-12 Valor del sufrimiento.md" (for the rest of the books)
    if (verseRange[0] === 0 && verseRange[1] === 0) {
        const verseRangeMatch = noteFile.basename.match(/(\d+),\s?(\d+)-(\d+)/);
        if (verseRangeMatch) {
            verseRange = [parseInt(verseRangeMatch[2], 10), parseInt(verseRangeMatch[3], 10)];
        }
    }

	return {
		rating: yaml.rating || null,
		verse_title: yaml.verse_title || "",
		verse_passage: yaml.verse_passage || "",
		locations: yaml.locations || [],
		path: noteFile.path,
		alt: yaml.cover ? yaml.cover : "",
		date: yaml.date || "",
		cover: yaml.cover ? app.vault.adapter.getResourcePath(yaml.cover) : "",
		verseRange: verseRange,
	};
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
	const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
	if (!yaml || !yaml.location) {
		return null;
	}

	return yaml.location;
}

interface PendingLocation {
	location: string;
	note: Note;
}

async function buildChapterNotes(
	app: App,
	chapterFiles: TFile[],
	pendingLocations?: PendingLocation[]
): Promise<Note[]> {
	const notes: Note[] = [];

	for (const file of chapterFiles) {
		const noteData = await getNoteData(app, file.path);
		if (!noteData.path) {
			continue;
		}

		const location = noteData.locations?.[0];
		const coordinates =
			location && !pendingLocations
				? await getLocationCoordinates(app, location)
				: null;
		const note = {
			...noteData,
			verseRange: noteData.verseRange || [0, 0],
			pericopeTitle: noteData.verse_title,
			title: noteData.verse_title,
			alt: noteData.alt,
			coordinates,
		} as Note;

		notes.push(note);
		if (location && pendingLocations) {
			pendingLocations.push({ location, note });
		}
	}

	notes.sort((a, b) => a.verseRange[0] - b.verseRange[0]);
	return notes;
}

function buildBibleIndex(files: TFile[]): Map<string, TFile[]> {
	const index = new Map<string, TFile[]>();
	const validChapters = new Map<string, Set<string>>(
		Object.entries(bibleStructure).map(([book, data]) => [
			book,
			new Set(Object.keys(data.chapters)),
		])
	);

	for (const file of files) {
		const [rootFolder, book, chapterFolder] = file.path.split("/");
		const bookChapters = validChapters.get(book);
		if (rootFolder !== "333 Biblia" || !bookChapters) {
			continue;
		}

		if (book === "Salmos") {
			const psalmMatch = file.basename.match(/Sal (\d+),/);
			const chapterNumber = psalmMatch?.[1];
			if (!chapterNumber || !bookChapters.has(chapterNumber)) {
				continue;
			}

			const key = `${book}-${chapterNumber}`;
			if (!index.has(key)) {
				index.set(key, [file]);
			}
			continue;
		}

		if (!chapterFolder || !bookChapters.has(chapterFolder)) {
			continue;
		}

		const key = `${book}-${chapterFolder}`;
		const chapterFiles = index.get(key);
		if (chapterFiles) {
			chapterFiles.push(file);
		} else {
			index.set(key, [file]);
		}
	}

	return index;
}

function parseLocation(location: string): {
	mainLocation: string;
	alias?: string;
} {
	const sanitizedLocation = location.replace(/\[\[|\]\]/g, "");
	const [mainLocation, alias] = sanitizedLocation.split("|");
	return { mainLocation, alias };
}

async function resolveLocationsInBatch(
	app: App,
	files: TFile[],
	pendingLocations: PendingLocation[]
): Promise<void> {
	if (pendingLocations.length === 0) {
		return;
	}

	const unresolved = new Map(
		pendingLocations.map(({ location }) => [location, parseLocation(location)])
	);
	const matches = new Map<string, TFile>();

	for (const file of files) {
		for (const [location, query] of unresolved) {
			if (
				file.basename.includes(query.mainLocation) ||
				(query.alias && file.basename.includes(query.alias))
			) {
				matches.set(location, file);
				unresolved.delete(location);
			}
		}

		if (unresolved.size === 0) {
			break;
		}
	}

	const coordinatesByLocation = new Map<
		string,
		[number, number] | null
	>();
	for (const location of new Set(
		pendingLocations.map((pending) => pending.location)
	)) {
		const noteFile = matches.get(location);
		if (!noteFile) {
			console.log(
				`getLocationCoordinates: No se encontró ninguna nota con el nombre ${location.replace(
					/\[\[|\]\]/g,
					""
				)}`
			);
			coordinatesByLocation.set(location, null);
			continue;
		}

		const yaml = app.metadataCache.getFileCache(noteFile)?.frontmatter;
		coordinatesByLocation.set(location, yaml?.location || null);
	}

	for (const pending of pendingLocations) {
		const coordinates = coordinatesByLocation.get(pending.location);
		if (coordinates) {
			pending.note.coordinates = coordinates;
		}
	}
}

export async function getChapterNotes(
	app: App,
	book: string,
	chapterNumber: string
): Promise<Note[]> {
	const folderPath =
		book === "Salmos"
			? `333 Biblia/${book}/`
			: `333 Biblia/${book}/${chapterNumber}/`;
	const files = app.vault
		.getFiles()
		.filter((file) => file.path.startsWith(folderPath));

	if (book === "Salmos") {
		// Filtrar el archivo correspondiente al capítulo especificado
		const chapterFile = files.find((file) =>
			file.basename.includes(`Sal ${chapterNumber},`)
		);
		return buildChapterNotes(app, chapterFile ? [chapterFile] : []);
	}

	return buildChapterNotes(app, files);
}

export async function openNote(
	app: App,
	book: string,
	chapterNumber: string,
	verseRange: [number, number]
): Promise<void> {
	const folderPath =
		book === "Salmos"
			? `333 Biblia/${book}/`
			: `333 Biblia/${book}/${chapterNumber}/`;
	const files = app.vault
		.getFiles()
		.filter((file) => file.path.startsWith(folderPath));

	const verseRangeString = `${verseRange[0]}-${verseRange[1]}`;
	const chapterString = `${chapterNumber}`;
	const noteFile = files.find(
		(file) =>
			file.basename.includes(verseRangeString) &&
			file.basename.includes(chapterString)
	);

	if (!noteFile) {
		await openVaultNote(
			app,
			null,
			"",
			`${folderPath} (verses ${verseRangeString})`
		);
		return;
	}

	await openVaultNote(app, noteFile);
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
	await openVaultNote(app, noteFile);
}

export async function fetchChapterNotes(
	app: App
): Promise<{ [key: string]: Note[] }> {
	const files = app.vault.getFiles();
	const bibleIndex = buildBibleIndex(files);
	const pendingLocations: PendingLocation[] = [];
	const notes: { [key: string]: Note[] } = {};
	for (const [book, data] of Object.entries(bibleStructure)) {
		for (const chapterNumber of Object.keys(data.chapters)) {
			const key = `${book}-${chapterNumber}`;
			notes[key] = await buildChapterNotes(
				app,
				bibleIndex.get(key) || [],
				pendingLocations
			);
		}
	}

	await resolveLocationsInBatch(app, files, pendingLocations);
	return notes;
}
