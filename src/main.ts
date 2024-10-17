import { Editor, MarkdownView, Plugin } from "obsidian";
import { MenuPrincipal } from "src/adapters/Obsidian/MenuPrincipal";
import { SampleModal } from "src/adapters/Obsidian/SampleModal";
import SampleSettingTab from "src/adapters/Obsidian/SampleSettingTab";
import {
    CALENDAR_VIEW_TYPE,
    CalendarView,
} from "src/core/notes/calendar/CalendarView";
import { MyPluginSettings } from "src/core/shared/interface/MyPluginSettings";

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
	goodreads_user: "",
	goodreads_apikey: "",
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	private view: CalendarView;

	async onload() {
		console.log("Loading Obsigen plugin");

		this.registerView(CALENDAR_VIEW_TYPE, (leaf) => new CalendarView(leaf));

		await this.loadSettings();

		const ribbonIconEl = this.addRibbonIcon(
			"church",
			"Obsigen",
			(evt: MouseEvent) => {
				const menu = new MenuPrincipal(this.app);
				menu.showAtMouseEvent(evt);
			}
		);
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");

		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new SampleModal(this.app).open();
			},
		});

		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});

		this.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: (checking: boolean) => {
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						new SampleModal(this.app).open();
					}
					return true;
				}
			},
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			console.log("click", evt);
		});

		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);

		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(CALENDAR_VIEW_TYPE);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onLayoutReady(): void {
		if (this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).length > 0) {
			return;
		}

		const rightLeaf = this.app.workspace.getRightLeaf(false);

		if (rightLeaf === null) {
			console.error("Unable to get right leaf.");
			return;
		}

		rightLeaf.setViewState({
			type: CALENDAR_VIEW_TYPE,
            active: true,  // Marcamos la vista como activa.
		});

		// Aseguramos que el leaf se revele para el usuario.
        this.app.workspace.revealLeaf(rightLeaf);
        this.view = rightLeaf.view as CalendarView;
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(CALENDAR_VIEW_TYPE);

		const rightLeaf = this.app.workspace.getRightLeaf(false);

		if (rightLeaf === null) {
			console.error("Unable to get right leaf.");
			return;
		}

		await rightLeaf.setViewState({
			type: CALENDAR_VIEW_TYPE,
			active: true,
		});

		const leaf = this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).first();
		if (leaf && leaf.view instanceof CalendarView) {
			await this.app.workspace.revealLeaf(leaf);
		} else {
			console.error("Unable to get calendar view leaf.");
			return;
		}
	}
}
