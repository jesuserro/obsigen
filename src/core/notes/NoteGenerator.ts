import { App, Notice } from 'obsidian';


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

    const path = `${folder}${separator}${this.fileName}`;
    let fileRef = this.app.vault.getAbstractFileByPath(path);
    let msg = `Abriendo ${this.fileName}`;
    if (!fileRef) {
      fileRef = await this.app.vault.create(path, this.content);
      msg = `Creando ${this.fileName}`;
    }
    new Notice(msg);
    this.app.workspace.openLinkText(fileRef.path, '', false);
  }

  setFileName(fileName: string) {
    this.fileName = `${fileName}.md`;
  }

}
