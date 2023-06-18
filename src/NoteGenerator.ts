import { renderToString } from 'react-dom/server';
import { iYaml } from './interface/Yaml';
import { Yaml } from './templates/Yaml';

class NoteGenerator {
  app: any;
  yaml: string;
  title: string;
  content: string;
  fileName: string;

  constructor(app: any, data: iYaml) {
    this.app = app;

    let yaml = renderToString(Yaml({ data }));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  getHelloWorld() {
    return 'Hello, World!';
  }

  async createNote(title: string, content: string) {
    
    this.title = title;
    this.content = content;
    this.setFileName(this.title);
    this.prepareContent();
    await this.createNoteInVault();
  }

  async createNoteInVault() {
    const newFile: any = await this.app.vault.create(this.fileName, this.content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

  setFileName(title: string) {
    const timestamp = Date.now();
    // Sanitize title to remove spaces and special characters
    title = title.replace(/[^a-zA-Z0-9]/g, '_');
    this.fileName = `${title}_${timestamp}.md`;
  }

  getFileName() {
    return this.fileName;
  }

  prepareContent(): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.content}`;
  }

}

export { NoteGenerator };
