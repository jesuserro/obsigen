import { ButtonComponent, Modal, Notice, TextAreaComponent, TextComponent } from "obsidian";
import "./captureUrlModal.module.css";

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
    const div = this.contentEl.createDiv();
    div.addClass("modalContainer");
  
    // Title label and textfield
    const titleDiv = div.createDiv();
    titleDiv.addClass("formField");
    const titleLabel = titleDiv.createEl("label");
    titleLabel.setText("Title");
    const titleField = new TextComponent(titleDiv);
    titleField.inputEl.addClass("templater-prompt-input");
    titleField.setPlaceholder("Type title here");
    titleField.setValue(this.title);
    titleField.onChange((value) => (this.title = value));
  
    // URL label and textarea
    const urlDiv = div.createDiv();
    urlDiv.addClass("formField");
    const urlLabel = urlDiv.createEl("label");
    urlLabel.setText("URL");
    const urlTextarea = new TextAreaComponent(urlDiv);
    urlTextarea.inputEl.addClass("templater-prompt-input");
    urlTextarea.setPlaceholder("Type URL here");
    urlTextarea.setValue(this.url);
    urlTextarea.onChange((value) => (this.url = value));
  
    const buttonDiv = this.contentEl.createDiv();
    buttonDiv.addClass("submitButton");
    const submitButton = new ButtonComponent(buttonDiv);
    submitButton.buttonEl.addClass("mod-cta");
    submitButton.setButtonText("Submit").onClick((evt: Event) => {
      this.resolveAndClose(evt);
    });
  }
  

  private resolveAndClose(evt: Event) {
    this.submitted = true;
    evt.preventDefault();

    const title = this.title.trim();
    const url = this.url.trim();

    if (title === "") {
      new Notice("Please enter a non-empty title.");
      return;
    }

    if (url === "") {
      new Notice("Please enter a non-empty URL.");
      return;
    }

    // Validation 1: Check if the value is a valid URL
    if (!this.isURL(url)) {
      new Notice("Please enter a valid URL.");
      return;
    }

    // Validation 2: Check if the title contains numbers
    if (this.hasNumbers(title)) {
      new Notice("Numbers are not permitted in the title.");
      return;
    }

    // Validation 3: Check if the title contains only special characters
    if (this.isSpecialCharsOnly(title)) {
      new Notice("Special characters are not allowed in the title.");
      return;
    }

    // Validation passed, resolve the values
    this.resolve({ title, url });
    this.close();
  }

  private isURL(value: string): boolean {
    // Regular expression to match URLs
    const urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return urlRegex.test(value);
  }

  private hasNumbers(value: string): boolean {
    // Regular expression to match strings with only numbers
    const numbersOnlyRegex = /^\d+$/;
    return numbersOnlyRegex.test(value);
  }

  private isSpecialCharsOnly(value: string): boolean {
    // Regular expression to match strings with only special characters
    const specialCharsRegex = /^[\W_]+$/;
    return specialCharsRegex.test(value);
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
