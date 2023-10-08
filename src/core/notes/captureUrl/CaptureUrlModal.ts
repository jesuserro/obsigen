import { ButtonComponent, Modal, Notice, TextAreaComponent, TextComponent } from "obsidian";

class TemplaterError extends Error {
  constructor(msg: string, public console_msg?: string) {
    super(msg);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class CaptureUrlModal extends Modal {
  private resolve!: (value: { title: string; url: string }) => void;
  private reject!: (reason?: TemplaterError) => void;
  private submitted = false;
  private title: string;
  private url: string;

  constructor(private prompt_text: string, private default_title: string, private default_url: string) {
    super(app);
    this.title = this.default_title ?? "";
    this.url = this.default_url ?? "";
  }

  onOpen(): void {
    this.titleEl.setText(this.prompt_text);
    this.createForm();
  }

  onClose(): void {
    if (!this.submitted) {
      new Notice("Cancelled prompt");
      return;
    }
  }

  createForm(): void {
    const div = this.contentEl.createDiv("form-container"); // Clase de contenedor
  
    // Title label and textfield
    const titleDiv = div.createDiv("form-element");
    const titleLabel = titleDiv.createEl("label", { cls: "form-label" }); // Clase de etiqueta
    titleLabel.setText("Title");
    const titleField = new TextComponent(titleDiv);
    titleField.inputEl.addClass("form-input"); // Clase de entrada
    titleField.setPlaceholder("Type title here");
    titleField.setValue(this.title);
    titleField.onChange((value) => (this.title = value));
  
    // URL label and textarea
    const urlDiv = div.createDiv("form-element");
    const urlLabel = urlDiv.createEl("label", { cls: "form-label" }); // Clase de etiqueta
    urlLabel.setText("URL");
    const urlTextarea = new TextAreaComponent(urlDiv);
    urlTextarea.inputEl.addClass("form-input"); // Clase de entrada
    urlTextarea.setPlaceholder("Type URL here");
    urlTextarea.setValue(this.url);
    urlTextarea.onChange((value) => (this.url = value));
  
    const buttonDiv = this.contentEl.createDiv("form-button-container");
    const submitButton = new ButtonComponent(buttonDiv);
    submitButton.buttonEl.addClass("form-submit-button"); // Clase de botón
    submitButton.setButtonText("Submit").onClick((evt: Event) => {
      this.resolveAndClose(evt);
    });
  }
  

  private resolveAndClose(evt: Event) {
    this.submitted = true;
    evt.preventDefault();

    const title = this.title.trim();
    const url = this.url.trim();

    const validationError = this.validateForm(title, url);
    if (validationError) {
      new Notice(validationError);
      return;
    }

    // Validation passed, resolve the values
    this.resolve({ title, url });
    this.close();
  }

  private validateForm(title: string, url: string): string | null {
    if (title === "") {
      return "Please enter a non-empty title.";
    }

    if (url === "") {
      return "Please enter a non-empty URL.";
    }

    // Validation 1: Check if the value is a valid URL
    const urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    if (!urlRegex.test(url)) {
      return "Please enter a valid URL.";
    }

    // Validation 2: Check if the title contains numbers
    const numbersOnlyRegex = /^\d+$/;
    if (numbersOnlyRegex.test(title)) {
      return "Numbers are not permitted in the title.";
    }

    // Validation 3: Check if the title contains only special characters
    const specialCharsRegex = /^[\W_]+$/;
    if (specialCharsRegex.test(title)) {
      return "Special characters are not allowed in the title.";
    }

    return null; // No validation errors
  }

  openModal(): Promise<{ title: string; url: string }> {
    return new Promise<{ title: string; url: string }>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.open();
    });
  }

  getFormValues(): { title: string; url: string } {
    return { title: this.title, url: this.url };
  }
}
