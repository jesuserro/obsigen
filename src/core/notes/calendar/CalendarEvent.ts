import { App, ButtonComponent, DropdownComponent, Modal, Notice, TextAreaComponent, TextComponent } from "obsidian";
import { CalendarIcon, iconMap } from "./CalendarIcon";

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
  private titleField: TextComponent;
  private descriptionTextarea: TextAreaComponent;
  private yearDropdown: DropdownComponent;
  private monthDropdown: DropdownComponent;
  private dayDropdown: DropdownComponent;
  private iconDropdown: DropdownComponent;
  private hourDropdown: DropdownComponent;
  private minuteDropdown: DropdownComponent;
  
  constructor(app: App, year:number, month:number, day:number) {
    super(app);
    
    this.year = year;
    this.month = month;
    this.day = day;

    this.createForm();
  }
  
  onOpen(): void {
    this.titleEl.setText("Nuevo Evento");

    this.resetValues();

  }
  
  onClose(): void {
    if (!this.submitted) {
      new Notice("Cancelled prompt");
      return;
    }
  }

  resetValues() {
    this.title = "";
    this.url = "";
    this.description = "";
    this.startDate = "";
    this.endDate = "";
    this.selectedIcon = "default-icon"; // Restablece el valor del icono

    this.titleField.setValue(this.title);
    this.descriptionTextarea.setValue(this.description);
    this.iconDropdown.setValue(this.selectedIcon);
  }
  
  createForm(): void {
    const div = this.contentEl.createDiv("form-container");
  
    // Title label and textfield
    const titleDiv = div.createDiv("form-element");
    const titleLabel = titleDiv.createEl("label", { cls: "form-label" });
    titleLabel.setText("Title");
    this.titleField = new TextComponent(titleDiv);
    this.titleField.inputEl.addClass("form-input");
    this.titleField.setPlaceholder("Type title here");
    this.titleField.setValue(this.title);
    this.titleField.onChange((value) => (this.title = value));
  
    // Fieldset for year, month, and day dropdowns
    const dateFieldset = div.createEl("fieldset", { cls: "date-fieldset" });
  
    // Create Dropdown for selecting the year
    const yearDiv = dateFieldset.createDiv("form-element");
    this.yearDropdown = new DropdownComponent(yearDiv);
  
    // Create Dropdown for selecting the month
    const monthDiv = dateFieldset.createDiv("form-element");
    this.monthDropdown = new DropdownComponent(monthDiv);
  
    // Create Dropdown for selecting the day
    const dayDiv = dateFieldset.createDiv("form-element");
    this.dayDropdown = new DropdownComponent(dayDiv);

    const hourDiv = dateFieldset.createDiv("form-element");
    this.hourDropdown = new DropdownComponent(hourDiv);

    const minuteDiv = dateFieldset.createDiv("form-element");
    this.minuteDropdown = new DropdownComponent(minuteDiv);
  
    this.initializeDropdowns();
  
    // Icon Selector label and dropdown
    const iconDiv = div.createDiv("form-element");
    const iconLabel = iconDiv.createEl("label", { cls: "form-label" });
    iconLabel.setText("Icon");
    this.iconDropdown = new DropdownComponent(iconDiv);

    // Carga los iconos desde CalendarIcon y añádelos al DropdownComponent
    const calendarIcon = new CalendarIcon();
    // const iconMap = CalendarIcon.getIcon(); // Asume que tienes un método getIconMap en CalendarIcon

    // Agrega los iconos al DropdownComponent
    for (const iconName in iconMap) {
      this.iconDropdown.addOption(iconName, iconName);
    }

    this.iconDropdown.setValue(this.selectedIcon);
    this.iconDropdown.onChange((value) => (this.selectedIcon = value));
  
    // Description label and textarea
    const descriptionDiv = div.createDiv("form-element");
    const descriptionLabel = descriptionDiv.createEl("label", { cls: "form-label" });
    descriptionLabel.setText("Description");
    this.descriptionTextarea = new TextAreaComponent(descriptionDiv);
    this.descriptionTextarea.inputEl.addClass("form-input");
    this.descriptionTextarea.setPlaceholder("Type description here");
    this.descriptionTextarea.setValue(this.description);
    this.descriptionTextarea.onChange((value) => (this.description = value));
  
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
    for (let i = 1974; i <= 2050; i++) {
      this.yearDropdown.addOption(i.toString(), i.toString());
    }
    for (let i = 1; i <= 12; i++) {
      this.monthDropdown.addOption(i.toString(), i.toString());
    }
    for (let i = 1; i <= 31; i++) {
      this.dayDropdown.addOption(i.toString(), i.toString());
    }
    for (let i = 0; i <= 24; i++) {
      this.hourDropdown.addOption(i.toString(), i.toString());
    }
    for (let i = 0; i <= 60; i += 5) {
      this.minuteDropdown.addOption(i.toString(), i.toString());
    }

    // Establece los valores iniciales de los DropdownComponent
    this.yearDropdown.setValue(this.year.toString());
    this.monthDropdown.setValue(this.month.toString());
    this.dayDropdown.setValue(this.day.toString());
    
    this.initializeTimeDropdowns();
  }

  private initializeTimeDropdowns() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / 5) * 5; // Round down to the nearest 5 minutes
  
    this.hourDropdown.setValue(currentHour.toString());
    this.minuteDropdown.setValue(currentMinute.toString());
  }
  
  private resolveAndClose(evt: Event) {
    this.submitted = true;
    evt.preventDefault();

    // Formatea startDate en el formato "YYYY-MM-DD"
    const selectedYear = this.yearDropdown.getValue();
    const selectedMonth = this.monthDropdown.getValue();
    const selectedDay = this.dayDropdown.getValue();
    const selectedHour = this.hourDropdown.getValue();
    const selectedMinute = this.minuteDropdown.getValue();

    // Format the time as HH:MM
    const selectedTime = `${selectedHour.padStart(2, '0')}:${selectedMinute.padStart(2, '0')}`;
    
    this.startDate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')} ${selectedTime}`;

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
