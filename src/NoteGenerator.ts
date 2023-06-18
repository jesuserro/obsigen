import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { DATA_YAML } from './interface/Yaml';
import { Yaml } from './templates/Yaml';

class NoteGenerator {
  app: App;
  yaml: string;
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
    this.setFileName();
    this.setYaml();
    this.prepareContent();
    await this.createNoteInVault();
  }

  async createNoteInVault() {
    const newFile: any = await this.app.vault.create(this.fileName, this.content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

  setFileName() {
    const timestamp = Date.now();
    // Sanitize title to remove spaces and special characters
    const title = this.title.replace(/[^a-zA-Z0-9]/g, '_');
    this.fileName = `${title}_${timestamp}.md`;
  }

  getFileName() {
    return this.fileName;
  }

  prepareContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.content}`;
  }

  setYaml(): void {
    const data = { ...DATA_YAML, title: this.title };
    let yaml = renderToString(Yaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

}

export { NoteGenerator };
