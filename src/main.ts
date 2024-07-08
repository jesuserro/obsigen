import { Editor, MarkdownView, Plugin } from 'obsidian';
import { MenuPrincipal } from 'src/adapters/Obsidian/MenuPrincipal';
import { SampleModal } from 'src/adapters/Obsidian/SampleModal';
import SampleSettingTab from 'src/adapters/Obsidian/SampleSettingTab';
import { CALENDAR_VIEW_TYPE, CalendarView } from 'src/core/notes/calendar/CalendarView';
import { MyPluginSettings } from 'src/core/shared/interface/MyPluginSettings';

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
    goodreads_user: '',
    goodreads_apikey: ''
}


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	private view: CalendarView;

	async onload() {

		console.log('Loading Obsigen plugin');

		this.registerView(CALENDAR_VIEW_TYPE, (leaf) => new CalendarView(leaf));
		
		await this.loadSettings();

		const ribbonIconEl = this.addRibbonIcon('church', 'Obsigen', (evt: MouseEvent) => {
			const menu = new MenuPrincipal(this.app);
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
		// this.app.workspace.detachLeavesOfType(CALENDAR_VIEW_TYPE);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
        });
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
    
        const leaf = this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE)[0];
        if (leaf === null) {
            console.error("Unable to find calendar view leaf.");
            return;
        }
        
        this.app.workspace.revealLeaf(leaf);
    }

}

