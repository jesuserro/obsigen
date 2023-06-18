import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { NoteGenerator } from './NoteGenerator';
import { iYaml } from './interface/Yaml';
import { Yaml } from './templates/Yaml';

class Aniversario extends NoteGenerator {
  app: any;

  constructor(app: any) {
    super(app);
    // this.app = app;
  }

  getHelloWorld() {
    return 'Hello, World!';
  }

  async createNote(data: iYaml) {
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/<!-- -->/g, '');
    const title = `# ${data.title}\nAa`;
    const content = `${yaml}\n${title}`;

    await this.createNoteInVault(content);
  }

  async createNoteFromYamlFile(data: iYaml) {
    
    const template = fs.readFileSync('./templates/template.yaml', 'utf8');

    let content = template
      .replace('{{title}}', data.title)
      .replace('{{aliases}}', data.aliases.join(', '))
      .replace('{{date}}', data.date.toISOString())
      .replace('{{creation}}', data.creation.toISOString())
      .replace('{{updated}}', data.updated.toISOString())
      .replace('{{url}}', data.url)
      .replace('{{author}}', data.author)
      .replace('{{people}}', data.people)
      .replace('{{parent}}', data.parent.join(', '))
      .replace('{{tags}}', data.tags.join(', '))
      .replace('{{locations}}', data.locations.join(', '))
      .replace('{{rating}}', data.rating.toString())
      .replace('{{emotion}}', data.emotion.toString());

      await this.createNoteInVault(content);
  }

  async createNoteInVault(content: string) {
    const timestamp = Date.now();
    const newFileName = `Note_${timestamp}.md`;

    const newFile: any = await this.app.vault.create(newFileName, content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

}

export { NoteGenerator };
