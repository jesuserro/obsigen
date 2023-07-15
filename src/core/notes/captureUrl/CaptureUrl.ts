import { App } from 'obsidian';
import { NoteGenerator } from '../NoteGenerator';

import { renderToString } from 'react-dom/server';
import { DATA_YAML_DEFAULT } from '../../shared/interface/iYaml';
import { CaptureUrlYaml } from './CaptureUrlYaml';

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

  setYaml(): void {
    const data = { ...DATA_YAML_DEFAULT, title: this.title };
    let yaml = renderToString(CaptureUrlYaml({data}));
    this.yaml = yaml.replace(/<!-- -->/g, '');
  }

  async createNote(title: string, url: string) {
    this.title = this.getTitle(title);
    this.setYaml();
    this.subheader = new CaptureUrlSubheader('').getContent();
    this.fileName = this.getFilename(this.title);
    this.callout = this.getCallout();
    this.setContent(url);
    await super.createNote(this.fileName, this.content, `000 Inbox/Captures`);
  }

  setContent(url: string): void {
    this.content = `${this.yaml}\n${this.callout}\n# ${this.title}\n${this.subheader}\n\n${this.getContent(url)}`;
  }

  getTitle(title: string) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return `${title}`;
  }

  getFilename(title: string) {
    return `${this.getCurrentDateTime()} ${title}`;
  }

  getContent(url: string) {  
    
    const twitterRegexp = new RegExp('https?:\\/\\/(?:mobile\\.)?twitter\\.com\\/.*');
    const youtubeRegexp = new RegExp('https?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/.*|youtu\\.be\\/.*|.*\\.youtube\\.com\\/.*shorts)');

    if (twitterRegexp.test(url) || youtubeRegexp.test(url)) {
      url = this.removeParamsFromUrl(url);
    }
    return `[${this.title}](${url})`;
  }

  removeParamsFromUrl(url: string): string {

    let sanitizedURL = url.split("?")[0];
  
    if (url.includes('?t=')) {
      sanitizedURL = url;
    }
      
    return sanitizedURL.trim();
  }
  

  getCallout() {  
    return `%%\n[[${this.getCurrentDate()}]]\n%%`;
  }
}








