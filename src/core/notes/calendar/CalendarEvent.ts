import { ButtonComponent, DropdownComponent, Modal, Notice, TextAreaComponent, TextComponent } from "obsidian";


export class CalendarEvent extends Modal {
  private resolve!: (value: FormValues) => void;
  private reject!: (reason?: TemplaterError) => void;
  private submitted = false;
  
  private year:number;
  private month:number;
  private day:number;
  private title: string;
  private url: string;
  private description: string;
  private startDate: string;
  private endDate: string;
  private selectedIcon: string;

  // Nuevos campos de selección para año, mes y día
  private yearDropdown: DropdownComponent;
  private monthDropdown: DropdownComponent;
  private dayDropdown: DropdownComponent;
  
  constructor(year:number, month:number, day:number) {
    super(app);
    this.title = "";
    this.url = "";
    this.description = "";
    this.startDate = "";
    this.endDate = "";
    this.selectedIcon = "default-icon"; // Default icon value
    this.title = "Nuevo evento";
    
    this.year = year;
    this.month = month;
    this.day = day;
  }
  
  onOpen(): void {
    this.titleEl.setText(this.title);
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
  
    // Fieldset for year, month, and day dropdowns
    const dateFieldset = div.createEl("fieldset", { cls: "date-fieldset" });
    const dateLegend = dateFieldset.createEl("legend", { cls: "form-legend" });
    dateLegend.setText("Date");
  
    // Create Dropdown for selecting the year
    const yearDiv = dateFieldset.createDiv("form-element");
    const yearLabel = yearDiv.createEl("label", { cls: "form-label" });
    yearLabel.setText("Year");
    this.yearDropdown = new DropdownComponent(yearDiv);
  
    // Create Dropdown for selecting the month
    const monthDiv = dateFieldset.createDiv("form-element");
    const monthLabel = monthDiv.createEl("label", { cls: "form-label" });
    monthLabel.setText("Month");
    this.monthDropdown = new DropdownComponent(monthDiv);
  
    // Create Dropdown for selecting the day
    const dayDiv = dateFieldset.createDiv("form-element");
    const dayLabel = dayDiv.createEl("label", { cls: "form-label" });
    dayLabel.setText("Day");
    this.dayDropdown = new DropdownComponent(dayDiv);
  
    this.initializeDropdowns();
  
    // Icon Selector label and dropdown
    const iconDiv = div.createDiv("form-element");
    const iconLabel = iconDiv.createEl("label", { cls: "form-label" });
    iconLabel.setText("Icon");
    const iconDropdown = new DropdownComponent(iconDiv);
    iconDropdown.addOption("default-icon", "Default Icon"); // Replace with actual icon options
    iconDropdown.setValue(this.selectedIcon);
    iconDropdown.onChange((value) => (this.selectedIcon = value));
  
    // Description label and textarea
    const descriptionDiv = div.createDiv("form-element");
    const descriptionLabel = descriptionDiv.createEl("label", { cls: "form-label" });
    descriptionLabel.setText("Description");
    const descriptionTextarea = new TextAreaComponent(descriptionDiv);
    descriptionTextarea.inputEl.addClass("form-input");
    descriptionTextarea.setPlaceholder("Type description here");
    descriptionTextarea.setValue(this.description);
    descriptionTextarea.onChange((value) => (this.description = value));
  
    // Submit button aligned to the right horizontally
    const buttonDiv = div.createDiv("form-button-container");
    const submitButton = new ButtonComponent(buttonDiv);
    submitButton.buttonEl.addClass("form-submit-button");
    submitButton.setButtonText("Submit").onClick((evt: Event) => {
      this.resolveAndClose(evt);
    });
  }  

  private initializeDropdowns() {
    // Configura los DropdownComponent para año, mes y día
    const currentYear = new Date().getFullYear();
    for (let i = 1974; i <= 2050; i++) {
      this.yearDropdown.addOption(i.toString(), i.toString());
    }
    for (let i = 1; i <= 12; i++) {
      this.monthDropdown.addOption(i.toString(), i.toString());
    }
    for (let i = 1; i <= 31; i++) {
      this.dayDropdown.addOption(i.toString(), i.toString());
    }

    // Establece los valores iniciales de los DropdownComponent
    this.yearDropdown.setValue(this.year.toString());
    this.monthDropdown.setValue(this.month.toString());
    this.dayDropdown.setValue(this.day.toString());
  }
  
  private resolveAndClose(evt: Event) {
    this.submitted = true;
    evt.preventDefault();

    // Formatea startDate en el formato "YYYY-MM-DD"
    const selectedYear = this.yearDropdown.getValue();
    const selectedMonth = this.monthDropdown.getValue();
    const selectedDay = this.dayDropdown.getValue();

    this.startDate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;

    const formValues: FormValues = {
      title: this.title.trim(),
      url: this.url.trim(),
      description: this.description.trim(),
      startDate: this.startDate,
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
