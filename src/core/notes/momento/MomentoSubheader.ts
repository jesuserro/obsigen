export class Subheader {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    const currentDate = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    return `📅 ${currentDate}\n📍\n👥\n🔗\n🏷️\n📝\n🗂️\n📎\n🟢`;
  }
}