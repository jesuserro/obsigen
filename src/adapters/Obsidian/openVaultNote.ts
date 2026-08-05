import { App, TAbstractFile, TFile } from "obsidian";

export async function openVaultNote(
	app: App,
	file: TAbstractFile | null | undefined,
	sourcePath = "",
	requestedPath?: string
): Promise<void> {
	if (!(file instanceof TFile)) {
		console.warn(
			`[Obsigen] Note not found: ${requestedPath ?? file?.path ?? "unknown"}`
		);
		return;
	}

	await app.workspace.openLinkText(file.path, sourcePath, false, {
		active: true,
	});
}
