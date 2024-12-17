import { App, FileView, TFile } from "obsidian";
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
	const notes: Note[] = [];

	if (book === "Salmos") {
		// Filtrar el archivo correspondiente al capítulo especificado
		const chapterFile = files.find((file) =>
			file.basename.includes(`Sal ${chapterNumber},`)
		);
		if (chapterFile) {
			const noteData = await getNoteData(app, chapterFile.path);
			if (noteData.path) {
				const coordinates =
					noteData.locations && noteData.locations.length > 0
						? await getLocationCoordinates(
								app,
								noteData.locations[0]
						  )
						: null;

				notes.push({
					...noteData,
					verseRange: noteData.verseRange || [0, 0], // Usar el verseRange calculado
					pericopeTitle: noteData.verse_title,
					title: noteData.verse_title,
					alt: noteData.alt,
					coordinates,
				} as Note);
			}
		}
	} else {
		for (const file of files) {
			const noteData = await getNoteData(app, file.path);
			if (noteData.path) {
				const coordinates =
					noteData.locations && noteData.locations.length > 0
						? await getLocationCoordinates(
								app,
								noteData.locations[0]
						  )
						: null;

				notes.push({
					...noteData,
					verseRange: noteData.verseRange || [0, 0], // Usar el verseRange calculado
					pericopeTitle: noteData.verse_title,
					title: noteData.verse_title,
					alt: noteData.alt,
					coordinates,
				} as Note);
			}
		}
	}
	return notes;
}

export function openNote(
	app: App,
	book: string,
	chapterNumber: string,
	verseRange: [number, number]
) {
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
		console.log(
			`openNote: No se encontró ninguna nota con el rango de versículos ${verseRangeString} en ${folderPath}`
		);
		return;
	}

	const openLeaves = app.workspace.getLeavesOfType("markdown");
	const openFilePaths = openLeaves
		.map((leaf) =>
			leaf.view instanceof FileView ? leaf.view.file?.path : null
		)
		.filter((path) => path !== null);

	if (openFilePaths.includes(noteFile.path)) {
		const leaf = openLeaves.find(
			(leaf) =>
				leaf.view instanceof FileView &&
				leaf.view.file?.path === noteFile.path
		);
		if (leaf) {
			app.workspace.setActiveLeaf(leaf);
		}
	} else {
		app.workspace.openLinkText(noteFile.path, "", true);
	}
}

export function openLocationNote(app: App, location: string) {
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
			`openLocationNote: No se encontró ninguna nota con el nombre ${sanitizedLocation}`
		);
		return;
	}

	const noteFile = files[0];
	const openLeaves = app.workspace.getLeavesOfType("markdown");
	const openFilePaths = openLeaves
		.map((leaf) =>
			leaf.view instanceof FileView ? leaf.view.file?.path : null
		)
		.filter((path) => path !== null);

	if (openFilePaths.includes(noteFile.path)) {
		const leaf = openLeaves.find(
			(leaf) =>
				leaf.view instanceof FileView &&
				leaf.view.file?.path === noteFile.path
		);
		if (leaf) {
			app.workspace.setActiveLeaf(leaf);
		}
	} else {
		app.workspace.openLinkText(noteFile.path, "", true);
	}
}

export async function fetchChapterNotes(
	app: App
): Promise<{ [key: string]: Note[] }> {
	const notes: { [key: string]: Note[] } = {};
	for (const [book, data] of Object.entries(bibleStructure)) {
		for (const chapterNumber of Object.keys(data.chapters)) {
			notes[`${book}-${chapterNumber}`] = await getChapterNotes(
				app,
				book,
				chapterNumber
			);
		}
	}
	return notes;
}
