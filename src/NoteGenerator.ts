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
    // const yamlContent2 = yaml.dump(yamlContent);
    
    // const yamlData = {
    //   title: 'My Note',
    //   aliases: ['alias1', 'alias2'],
    //   date: new Date().toISOString(),
    // };
    // const yamlContent2 = yaml.dump(yamlData, { indent: 2 });


    const templateContent = `# ${data.title}\nAa`;

    // Combine the YAML content and template content
    const fileData = `${yamlContent}\n${templateContent}`;

    const newFile: TFile = await this.app.vault.create(newFileName, fileData);

    this.app.workspace.openLinkText(newFile.path, '', false);
  }
}
