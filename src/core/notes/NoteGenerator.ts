import { App, Notice } from 'obsidian';

export class NoteGenerator {
  app: App;

  fileName: string;
  content: string;
  path: string;

  constructor(app: App) {
    this.app = app;
  }

  async createNote(fileName: string, content: string, path: string) {
    this.content = content;
    this.path = path;
    this.setFileName(fileName);
    await this.createNoteInVault(path);
  }

  async createNoteInVault(path?: string) {
    let separator = '/';
    if (!path) {
      path = '';
      separator = '';
    }

    // check if folder exists and create it if not
    if (!this.app.vault.getAbstractFileByPath(path)) {
      await this.app.vault.createFolder(path);
    }

    const pathToFile = `${path}${separator}${this.fileName}`;
    let fileRef = this.app.vault.getAbstractFileByPath(pathToFile);
    let msg = `Abriendo ${this.fileName}`;
    if (!fileRef) {
      fileRef = await this.app.vault.create(pathToFile, this.content);
      msg = `Creando ${this.fileName}`;
    }

    new Notice(msg);
    this.app.workspace.openLinkText(fileRef.path, '', false);

    // Reload the Calendar View leaf
    // const leaf = this.app.workspace.getRightLeaf(true);
    // this.app.workspace.revealLeaf(leaf);

    // this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).forEach((leaf) => {
      // if (leaf.view instanceof CalendarView) {
        // Access your view instance.
        // leaf.view.load();
      // }
    // });

    // const leaf = this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).first();
    // leaf.view.load();
    // this.app.workspace.trigger('calendar:refresh');

    // Listen to file changes so we can update markers accordingly
    // this.app.vault.on('delete', (file) => {
    //     new Notice(`File ${file.path} deleted`);
    // });

    // this.app.metadataCache.on('changed', (file) => {
    //     new Notice(`File ${file.path} changed`);
    // });

    // this.app.workspace.trigger('calendar:refresh');
  }

  setFileName(fileName: string) {
    this.fileName = `${fileName}.md`;
  }

}
