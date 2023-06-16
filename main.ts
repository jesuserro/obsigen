import { Editor, MarkdownView, Plugin } from 'obsidian';
import { MenuPrincipal } from 'src/MenuPrincipal';
import { SampleModal } from 'src/SampleModal';
import SampleSettingTab from 'src/SampleSettingTab';
import { MyPluginSettings } from 'src/interface/MyPluginSettings';
import { iYaml } from 'src/interface/Yaml';

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

const DATA: iYaml = {
	aliases: ['alias1', 'alias2'],
	title: 'Note Title',
	date: new Date(),
	creation: new Date(),
	updated: new Date(),
	url: 'https://example.com/note',
	author: 'Paco López',
	people: 'Jane Smithers',
	parent: ['parent1', 'parent2'],
	tags: ['tag1', 'tag2'],
	locations: ['location1', 'location2'],
	rating: 7,
	emotion: 8,
};


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		const ribbonIconEl = this.addRibbonIcon('church', 'Generador de Notass', (evt: MouseEvent) => {
			const menu = new MenuPrincipal(this.app, DATA);
      menu.showAtMouseEvent(evt);
		});
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

