import { App } from 'obsidian';


export class NoteGenerator {
  app: App;
  title: string;
  content: string;
  fileName: string;

  constructor(app: App) {
    this.app = app;
  }

  getHelloWorld() {
    return 'Hello, World!';
  }

  async createNote(title: string, content: string) {
    
    this.title = title;
    this.content = content;
    this.setFileName(title);
    await this.createNoteInVault();
  }

  async createNoteInVault() {
    const newFile: any = await this.app.vault.create(this.fileName, this.content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

  setFileName(name: string) {
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
    this.fileName = `${sanitizedName}.md`;
  }
  
  getFileName() {
    return this.fileName;
  }

}
