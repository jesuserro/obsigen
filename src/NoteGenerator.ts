import { App, TFile } from 'obsidian';

export class NoteGenerator {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  async createEmptyNote() {
    
    const timestamp = Date.now();
    const newFileName = `Note_${timestamp}.md`;
    const fileData = `# ${newFileName}\n\nThis is a new empty note created by the Note Generator plugin.`;
    const newFile: TFile = await this.app.vault.create(newFileName, fileData); // Await the result

    this.app.workspace.openLinkText(newFile.path, '', false);
  }
}
