jest.mock("obsidian", () => ({
	TFile: class TFile {
		path: string;

		constructor(path: string) {
			this.path = path;
		}
	},
}));

import { TFile } from "obsidian";
import { openVaultNote } from "./openVaultNote";

describe("openVaultNote", () => {
	test("opens a vault note in a normal active leaf and waits for navigation", async () => {
		let finishNavigation: () => void = () => undefined;
		const navigation = new Promise<void>((resolve) => {
			finishNavigation = resolve;
		});
		const openLinkText = jest.fn().mockReturnValue(navigation);
		const app = { workspace: { openLinkText } } as any;
		const file = Object.create(TFile.prototype) as TFile;
		Object.assign(file, { path: "Notes/example.md" });

		let settled = false;
		const result = openVaultNote(app, file, "Current note.md").then(() => {
			settled = true;
		});

		expect(openLinkText).toHaveBeenCalledWith(
			"Notes/example.md",
			"Current note.md",
			false,
			{ active: true }
		);
		await Promise.resolve();
		expect(settled).toBe(false);

		finishNavigation();
		await result;
		expect(settled).toBe(true);
	});

	test("does not navigate or throw when the file does not exist", async () => {
		const openLinkText = jest.fn();
		const app = { workspace: { openLinkText } } as any;
		const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);

		await expect(
			openVaultNote(app, null, "", "Notes/missing.md")
		).resolves.toBeUndefined();

		expect(openLinkText).not.toHaveBeenCalled();
		expect(warn).toHaveBeenCalledWith(
			"[Obsigen] Note not found: Notes/missing.md"
		);
		warn.mockRestore();
	});
});
