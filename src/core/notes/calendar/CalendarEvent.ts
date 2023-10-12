import { ButtonComponent, DropdownComponent, Modal, Notice, TextAreaComponent, TextComponent } from "obsidian";


export class CalendarEvent extends Modal {
  private resolve!: (value: FormValues) => void;
  private reject!: (reason?: TemplaterError) => void;
  private submitted = false;
  
  private title: string;
  private url: string;
  private description: string;
  private startDate: string;
  private endDate: string;
  private selectedIcon: string;
  
  constructor(private promptText: string) {
    super(app);
    this.title = "";
    this.url = "";
    this.description = "";
    this.startDate = "";
    this.endDate = "";
    this.selectedIcon = "default-icon"; // Default icon value
  }
  
  onOpen(): void {
    this.titleEl.setText(this.promptText);
    this.createForm();
  }
  
  onClose(): void {
    if (!this.submitted) {
      new Notice("Cancelled prompt");
      return;
    }
  }
  
  createForm(): void {
    const div = this.contentEl.createDiv("form-container");
    
    // Title label and textfield
    const titleDiv = div.createDiv("form-element");
    const titleLabel = titleDiv.createEl("label", { cls: "form-label" });
    titleLabel.setText("Title");
    const titleField = new TextComponent(titleDiv);
    titleField.inputEl.addClass("form-input");
    titleField.setPlaceholder("Type title here");
    titleField.setValue(this.title);
    titleField.onChange((value) => (this.title = value));
    
    // URL label and textarea (similar to the existing form)
    // ... (add URL field)
    
    // Description label and textarea
    const descriptionDiv = div.createDiv("form-element");
    const descriptionLabel = descriptionDiv.createEl("label", { cls: "form-label" });
    descriptionLabel.setText("Description");
    const descriptionTextarea = new TextAreaComponent(descriptionDiv);
    descriptionTextarea.inputEl.addClass("form-input");
    descriptionTextarea.setPlaceholder("Type description here");
    descriptionTextarea.setValue(this.description);
    descriptionTextarea.onChange((value) => (this.description = value));
    
    // Start Date label and textfield (you can use a date picker component if available)
    // ... (add start date field)
    
    // End Date label and textfield (you can use a date picker component if available)
    // ... (add end date field)
    
    // Icon Selector label and dropdown (you can use an icon picker component if available)
    const iconDiv = div.createDiv("form-element");
    const iconLabel = iconDiv.createEl("label", { cls: "form-label" });
    iconLabel.setText("Icon");
    const iconDropdown = new DropdownComponent(iconDiv);
    iconDropdown.addOption("default-icon", "Default Icon"); // Replace with actual icon options
    // iconDropdown.inputEl.addClass("form-input");
    iconDropdown.setValue(this.selectedIcon);
    iconDropdown.onChange((value) => (this.selectedIcon = value));
    
    const buttonDiv = this.contentEl.createDiv("form-button-container");
    const submitButton = new ButtonComponent(buttonDiv);
    submitButton.buttonEl.addClass("form-submit-button");
    submitButton.setButtonText("Submit").onClick((evt: Event) => {
      this.resolveAndClose(evt);
    });
  }
  
  private resolveAndClose(evt: Event) {
    this.submitted = true;
    evt.preventDefault();
    
    const formValues: FormValues = {
      title: this.title.trim(),
      url: this.url.trim(),
      description: this.description.trim(),
      startDate: this.startDate.trim(),
      endDate: this.endDate.trim(),
      selectedIcon: this.selectedIcon,
    };
    
    const validationError = this.validateForm(formValues);
    if (validationError) {
      new Notice(validationError);
      return;
    }
    
    // Validation passed, resolve the values
    this.resolve(formValues);
    this.close();
  }
  
  private validateForm(formValues: FormValues): string | null {
    // Implement your validation logic here for the new fields
    // Example: Check if the start date is before the end date, validate URL, etc.
    // Return a validation error message if there's an issue.
    // Return null if validation passes.
    // You can also reuse the existing validation functions if applicable.
    return null;
  }
  
  openModal(): Promise<FormValues> {
    return new Promise<FormValues>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.open();
    });
  }

  getFormValues(): { title: string; url: string, description: string, startDate: string, endDate: string, selectedIcon: string } {
    return { title: this.title, url: this.url, description: this.description, startDate: this.startDate, endDate: this.endDate, selectedIcon: this.selectedIcon };
  }
}

interface FormValues {
  title: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
  selectedIcon: string;
}

class TemplaterError extends Error {
  constructor(msg: string, public console_msg?: string) {
    super(msg);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
