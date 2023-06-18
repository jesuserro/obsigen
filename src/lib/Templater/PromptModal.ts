import { ButtonComponent, Modal, Notice, Platform, TextAreaComponent, TextComponent } from "obsidian";

class TemplaterError extends Error {
  constructor(msg: string, public console_msg?: string) {
    super(msg);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class PromptModal extends Modal {
  private resolve!: (value: string) => void;
  private reject!: (reason?: TemplaterError) => void;
  private submitted = false;
  private value: string;

  constructor(
    private prompt_text: string,
    private default_value: string,
    private multi_line: boolean
  ) {
    super(app);
    this.value = this.default_value ?? "";
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
    div.addClass("templater-prompt-div");
    let textInput;
    if (this.multi_line) {
      textInput = new TextAreaComponent(div);

      const buttonDiv = this.contentEl.createDiv();
      buttonDiv.addClass("templater-button-div");
      const submitButton = new ButtonComponent(buttonDiv);
      submitButton.buttonEl.addClass("mod-cta");
      submitButton.setButtonText("Submit").onClick((evt: Event) => {
        this.resolveAndClose(evt);
      });
    } else {
      textInput = new TextComponent(div);
    }

    textInput.inputEl.addClass("templater-prompt-input");
    textInput.setPlaceholder("Type text here");
    textInput.setValue(this.value);
    textInput.onChange((value) => (this.value = value));
    textInput.inputEl.addEventListener("keydown", (evt: KeyboardEvent) =>
      this.enterCallback(evt)
    );
  }

  private enterCallback(evt: KeyboardEvent) {
    if (this.multi_line) {
      if (Platform.isDesktop) {
        if (evt.shiftKey && evt.key === "Enter") {
        } else if (evt.key === "Enter") {
          this.resolveAndClose(evt);
        }
      } else {
        if (evt.key === "Enter") {
          evt.preventDefault();
        }
      }
    } else {
      if (evt.key === "Enter") {
        this.resolveAndClose(evt);
      }
    }
  }

  private resolveAndClose(evt: Event | KeyboardEvent) {
    this.submitted = true;
    evt.preventDefault();
    if (this.value.trim() === "") {
      new Notice("Please enter a valid string.");
      return;
    }
    this.resolve(this.value);
    this.close();
  }

  openModal(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.open();
    });
  }

  getValue(): string {
    return this.value;
  }
}
