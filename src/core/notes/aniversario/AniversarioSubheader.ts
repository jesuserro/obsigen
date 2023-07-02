export class AniversarioSubheader {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return `%%\n[[aniversarios]], [[Erro Iribarren Jesús|mismemorias]]\n%%`;
  }
}


