import { App } from 'obsidian';
import { renderToString } from 'react-dom/server';
import { Subheader } from './Subheader';
import { DATA_YAML_DEFAULT } from './interface/Yaml';
import { Yaml } from './templates/Yaml';

export class NoteGenerator {
  app: App;
  yaml: string;
  title: string;
  subheader: string;
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
    this.subheader = this.getSubheader();
    this.setFileName(title);
    this.setYaml();
    this.prepareContent();
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

  prepareContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.subheader}\n${this.content}`;
  }

  setYaml(): void {
    const data = { ...DATA_YAML_DEFAULT, title: this.title };
    let yaml = renderToString(Yaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  getSubheader(): string {
    const subheader = new Subheader('');
    return subheader.getContent();
  }

}
