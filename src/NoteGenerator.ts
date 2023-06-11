

  import { renderToStaticMarkup } from 'react-dom/server';
import { iYaml } from './interface/Yaml';
import { Yaml } from './templates/Yaml';



class NoteGenerator {
  app: any;

  constructor(app: any) {
    this.app = app;
  }

  async createNote(data: iYaml) {
    const timestamp = Date.now();
    const newFileName = `Note_${timestamp}.md`;

    const yamlContent = renderToStaticMarkup(Yaml({ data }));

    const templateContent = `# ${data.title}\nAa`;

    const fileData = `${yamlContent}\n${templateContent}`;

    const newFile: any = await this.app.vault.create(newFileName, fileData);

    this.app.workspace.openLinkText(newFile.path, '', false);
  }

  getHelloWorld() {
    return 'Hello, World!';
  }
}

export { NoteGenerator };
