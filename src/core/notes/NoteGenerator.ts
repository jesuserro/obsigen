import { App, TFile } from 'obsidian';


export class NoteGenerator {
  app: App;

  fileName: string;
  content: string;
  

  constructor(app: App) {
    this.app = app;
  }

  getHelloWorld() {
    return 'Hello, World!';
  }

  async createNote(fileName: string, content: string, folder?: string) {
    this.content = content;
    this.setFileName(fileName);
    await this.createNoteInVault(folder);
  }

  async createNoteInVault(folder?: string) {
    let separator = '/';
    if (!folder) {
      folder = '';
      separator = '';
    }
    const newFile: TFile = await this.app.vault.create(`${folder}${separator}${this.fileName}`, this.content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

  setFileName(fileName: string) {
    this.fileName = `${fileName}.md`;
  }

}
