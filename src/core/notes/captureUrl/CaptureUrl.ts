import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from './../../shared/interface/iYaml';
import { Yaml } from './../../shared/templates/Yaml';

import { CaptureUrlSubheader } from './CaptureUrlSubheader';

export class CaptureUrl extends NoteGenerator {

  app: App;
  yaml: string;
  title: string;
  subheader: string;
  content: string;
  fileName: string;
  callout: string;
  
  constructor(app: App) {
    super(app);
  }

  getCurrentDateTime() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${this.getCurrentDate()}${hour}${minute}`;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  setYaml(url: string): void {
    url = `"${url}"`;
    const link = `"[[${this.getCurrentDate()}]]"`;
    const data = {
      ...DATA_YAML_DEFAULT,
      title: this.title,
      links: [...DATA_YAML_DEFAULT.links, link], 
      urls: [...DATA_YAML_DEFAULT.urls, url], 
    };
    let yaml = renderToString(Yaml({ data }));
    yaml = yaml.replace(/&quot;/g, '"');
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, url: string) {
    this.title = this.getTitle(title);
    this.setYaml(url);
    this.subheader = new CaptureUrlSubheader('').getContent();
    this.fileName = this.getFilename(this.title);
    this.callout = this.getCallout();
    this.setContent(url);
    await super.createNote(this.fileName, this.content, `000 Inbox/Captures`);
  }

  setContent(url: string): void {
    this.content = `${this.yaml}\n# ${this.title}\n${this.getContent(url)}\n\n`;
  }

  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    return `${this.getCurrentDateTime()} ${title}`;
  }

  getContent(url: string) {  
    
    url = this.filterParamsFromUrl(url);
    const twitterRegexp = new RegExp('https?:\\/\\/(?:mobile\\.)?twitter\\.com\\/.*');
    const youtubeRegexp = new RegExp('https?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/.*|youtu\\.be\\/.*|.*\\.youtube\\.com\\/.*shorts)');

    if (twitterRegexp.test(url) || youtubeRegexp.test(url)) {
      return `![${this.title}](${url})`;
    }
    return `[${this.title}](${url})`;
  }

  filterParamsFromUrl(url: string): string {
    let sanitizedURL = url;
    const tParamRegexp = new RegExp('t=\\d+'); // t=1234567890 is valid
    if (!tParamRegexp.test(url)) {
      sanitizedURL = sanitizedURL.split("?")[0];
    }
    return sanitizedURL.trim();
  }

  getCallout() {  
    return `%%\n[[${this.getCurrentDate()}]]\n%%`;
  }
}








