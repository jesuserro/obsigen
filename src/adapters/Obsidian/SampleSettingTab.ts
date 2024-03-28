
import { App, PluginSettingTab, Setting } from 'obsidian';
import MyPlugin from '../../main';

export default class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin); 
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my Note Generator plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				})
            );
		new Setting(containerEl)
			.setName('Goodreads User')
			.setDesc('Goodreads User')
			.addText(text => text
				.setPlaceholder('Enter your Goodreads User')
				.setValue(this.plugin.settings.goodreads_user)
				.onChange(async (value) => {
					console.log('Goodreads User: ' + value);
					this.plugin.settings.goodreads_user = value;
					await this.plugin.saveSettings();
				})
            );
		new Setting(containerEl)
			.setName('Goodreads Api Key')
			.setDesc('Goodreads Api Key')
			.addText(text => text
				.setPlaceholder('Enter your Goodreads APIKEY')
				.setValue(this.plugin.settings.goodreads_apikey)
				.onChange(async (value) => {
					console.log('Goodreads Api Key: ' + value);
					this.plugin.settings.goodreads_apikey = value;
					await this.plugin.saveSettings();
				})
            );
	}
}