import { App, TFile } from 'obsidian';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Yaml } from './templates/Yaml';


export class NoteGenerator {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  async createNote(data) {
    const timestamp = Date.now();
    const newFileName = `Note_${timestamp}.md`;

    const yamlContent = renderToStaticMarkup(
      createElement(Yaml, { data })
    );
    
    const templateContent = `# ${data.title}\nAa`;

    const fileData = `${yamlContent}\n${templateContent}`;

    const newFile: TFile = await this.app.vault.create(newFileName, fileData);

    this.app.workspace.openLinkText(newFile.path, '', false);
  }
}
