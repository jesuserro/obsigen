import * as ReactDOMServer from 'react-dom/server';


import { App, TFile } from 'obsidian';
import { YamlTemplate } from './templates/YamlTemplate.jsx';

export class NoteGenerator {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  async createNote(data) {
    const timestamp = Date.now();
    const newFileName = `Note_${timestamp}.md`;


    // Render the YamlTemplate component to a string
    const yamlContent = ReactDOMServer.renderToStaticMarkup(
      YamlTemplate({ data })
    );
    // const yamlContent2 = yaml.safeLoad(yamlContent);
    

    const templateContent = `# ${data.title}\n`;

    // Combine the YAML content and template content
    const fileData = `\n${yamlContent}\n${templateContent}`;

    const newFile: TFile = await this.app.vault.create(newFileName, fileData);

    this.app.workspace.openLinkText(newFile.path, '', false);
  }
}
