import { App } from 'obsidian';


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

  async createNote(fileName: string, content: string) {
    this.content = content;
    this.setFileName(fileName);
    await this.createNoteInVault();
  }

  async createNoteInVault() {
    const newFile: any = await this.app.vault.create(this.fileName, this.content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

  setFileName(fileName: string) {
    this.fileName = `${fileName}.md`;
  }

}
