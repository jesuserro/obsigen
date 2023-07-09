export class DailySubheader {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return `%%\n[[Erro Iribarren Jesús|mismemorias]], [[Notas Diarias]]\n%%`;
  }
}


