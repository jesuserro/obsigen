import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { iYaml } from './interface/Yaml';
import { Yaml } from './templates/Yaml';

class NoteGenerator {
  app: any;

  constructor(app: any) {
    this.app = app;
  }

  getHelloWorld() {
    return 'Hello, World!';
  }

  async createNote(data: iYaml) {
    const yamlContent = renderToString(Yaml({ data }));
    const sanitizedYamlContent = yamlContent.replace(/<!-- -->/g, '');
    const templateContent = `# ${data.title}\nAa`;
    const content = `${sanitizedYamlContent}\n${templateContent}`;

    await this.createNoteInVault(content);
  }

  async createNoteFromYamlFile(data: iYaml) {
    // Read the template file
    const template = fs.readFileSync('./templates/template.yaml', 'utf8');

    // Replace the placeholders with actual values
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

  // Make another function to create the file from a YAML file
  async createNoteInVault(content: string) {
    const timestamp = Date.now();
    const newFileName = `Note_${timestamp}.md`;

    const newFile: any = await this.app.vault.create(newFileName, content);
    this.app.workspace.openLinkText(newFile.path, '', false);
  }

}

export { NoteGenerator };
