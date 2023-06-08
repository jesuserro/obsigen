
class NoteGenerator {

    // define types for the class properties
    promptDate;
    title;
    date;
    creation;
    url;
    parent;
    fileName;
    path;
    pathToFile;
    links;

    constructor(promptDate) {

        this.promptDate = moment(promptDate, "YYYY-MM-DD");
        if (!this.promptDate.isValid()) {
            new Notice("Invalid date format!", 5000);
            return;
        }

        this.fileName = this.promptDate.format("YYYYMMDD");
        this.title = this.promptDate.format("dddd, DD MMMM YYYY");
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
        this.parent = this.promptDate.format("MMDD");
        this.date = this.promptDate.format("YYYY-MM-DD HH:mm");
        this.path = `100 Calendar/Daily/${this.promptDate.format("YYYY")}`;
        this.pathToFile = `${this.path}/${this.fileName}`;
        this.url = "";
        this.creation = tp.file.creation_date('YYYY-MM-DD HH:mm');
        this.links = `[[${tp.date.now("YYYYMMDD")}]]`;
    }

  async getTpl(tplName) {
    try {
        const tplFile = tp.file.find_tfile(tplName);
        const tplContent = await app.vault.read(tplFile);

        const replacements = {
            '{{title}}': this.title,
            '{{date}}': this.date,
            '{{creation}}': tplName === 'YAML2' ? this.creation : this.title,
            '{{updated}}': tp.file.last_modified_date('YYYY-MM-DD HH:mm'),
            '{{url}}': this.url,
            '{{parent}}': this.parent,
            '{{links}}': this.links
        };

        let tpl = tplContent;
        Object.entries(replacements).forEach(([placeholder, replacement]) => {
            tpl = tpl.replace(new RegExp(placeholder, 'g'), replacement);
        });

        return tpl.replace(/^[ \t]+/gm, '');
    } catch (error) {
        new Notice(`Failed to read ${tplName} template file`, 5000);
        return '';
    }
}

  async generateNote() {
    await tp.file.rename(this.fileName);
    //await tp.file.move(this.pathToFile);

    const yaml = await this.getTpl('YAML2');
    const subheader = await this.getTpl('Subheader2');
    let content = `${yaml}# ${this.title}\n${subheader}`;
		return content;

  }
}

// export { NoteGenerator };
// module.exports = { NoteGenerator };
module.exports = NoteGenerator;
// NoteGenerator; 