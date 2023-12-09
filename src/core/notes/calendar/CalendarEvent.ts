import { App, ButtonComponent, DropdownComponent, Modal, Notice, SearchComponent, TextAreaComponent, TextComponent, TFile } from "obsidian";
import React from "react";
import ReactDOM from "react-dom/client";
import { Momento } from "./../../notes/momento/Momento";
import { iconMap } from "./CalendarIcon";
import { CalendarIconPicker } from "./CalendarIconPicker";

export interface FormValues {
  title: string;
  urls: string;
  description: string;
  startDate: Date;
  endDate: string;
  selectedIcon: string;
  locations: string;
}

export class CalendarEvent extends Modal {
  private resolve!: (value: FormValues) => void;
  private reject!: (reason?: TemplaterError) => void;
  private submitted = false;
  
  private year:number;
  private month:number;
  private day:number;
  private title: string;
  private urls: string;
  private description: string;
  private startDate: string;
  private endDate: string;
  private selectedIcon: string;
  private locations: string;

  // Nuevos campos de selección para año, mes y día
  private titleField: TextComponent;
  private descriptionTextarea: TextAreaComponent;
  private yearDropdown: DropdownComponent;
  private monthDropdown: DropdownComponent;
  private dayDropdown: DropdownComponent;
  private iconDropdown: JSX.Element;
  private hourDropdown: DropdownComponent;
  private minuteDropdown: DropdownComponent;
  private locationField: SearchComponent;
  private urlField: TextComponent;
  
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
    this.urls = "";
    this.description = "";
    this.startDate = "";
    this.endDate = "";
    this.selectedIcon = "default-icon"; 
    this.locations = ""; 

    this.titleField.setValue(this.title);
    this.descriptionTextarea.setValue(this.description);
    // this.iconDropdown.setValue(this.selectedIcon);
    this.locationField.setValue(this.locations);
    this.urlField.setValue(this.urls);
  }
  
  createForm(): void {
    const div = this.contentEl.createDiv("form-container");
  
    // Title label and textfield
    const titleDiv = div.createDiv("form-element");
    const titleLabel = titleDiv.createEl("label", { cls: "form-label" });
    titleLabel.setText("Title");
    this.titleField = new TextComponent(titleDiv);
    this.titleField.inputEl.addClass("form-input");
    this.titleField.setPlaceholder("title");
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
    const iconDiv = div.createDiv();
    const iconLabel = iconDiv.createEl("label", { cls: "form-label" });
    iconLabel.setText("Icon");
    this.iconDropdown = React.createElement(CalendarIconPicker, { 
      selectedIcon: 'default-icon',
      onChange: ((value) => (this.selectedIcon = value)),
      icons: iconMap
    });
    const root = ReactDOM.createRoot(iconDiv);
    root.render(this.iconDropdown);
  
    // Location label and textfield
    const locationDiv = div.createDiv("form-element");
    const locationLabel = locationDiv.createEl("label", { cls: "form-label" });
    locationLabel.setText("Location");
    this.locationField = new SearchComponent(locationDiv);
    this.locationField.inputEl.addClass("form-input");
    this.locationField.setPlaceholder("location");
    this.locationField.setValue(this.locations);
    // this.locationField.onChange((value) => (this.locations = value));
    // Search vault files for locations
    this.locationField.onChange(async (value) => {

      if(value.length < 3){
        return;
      }

      const matchingFiles = this.searchFiles(value);

      const matchingTitles = matchingFiles.map((file) => file.path);
    
      // console.log('Matching Files:', matchingTitles);
    });

    // url label and textfield
    const urlDiv = div.createDiv("form-element");
    const urlLabel = urlDiv.createEl("label", { cls: "form-label" });
    urlLabel.setText("Urls");
    this.urlField = new TextComponent(urlDiv);
    this.urlField.inputEl.addClass("form-input");
    this.urlField.setPlaceholder("urls");
    this.urlField.setValue(this.urls);
    this.urlField.onChange((value) => (this.urls = value));

    // Description label and textarea
    const descriptionDiv = div.createDiv("form-element");
    const descriptionLabel = descriptionDiv.createEl("label", { cls: "form-label" });
    descriptionLabel.setText("Description");
    this.descriptionTextarea = new TextAreaComponent(descriptionDiv);
    this.descriptionTextarea.inputEl.addClass("form-input");
    this.descriptionTextarea.setPlaceholder("description");
    this.descriptionTextarea.setValue(this.description);
    this.descriptionTextarea.onChange((value) => (this.description = value));

    // Submit button aligned to the right horizontally
    const buttonDiv = div.createDiv("form-button-container");
    const submitButton = new ButtonComponent(buttonDiv);
    submitButton.buttonEl.addClass("form-submit-button");
    submitButton.setButtonText("Submit").onClick((evt: Event) => {
      this.onSubmit(evt);
    });
  }

  // Método para buscar archivos en el vault
  private searchFiles(query: string): TFile[] {
    const { vault } = this.app;
    
    // Obtener todos los archivos Markdown en el vault
    const allFiles = vault.getMarkdownFiles();

    // Filtrar los archivos que coinciden con la consulta
    const matchingFiles = allFiles.filter((file) =>
      file.basename.toLowerCase().includes(query.toLowerCase())
    );

    return matchingFiles;
  }   

  private initializeDropdowns() {
    // Configura los DropdownComponent para año, mes y día
    for (let i = 1897; i <= 2030; i++) {
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

  getFormValues(): { title: string; urls: string, description: string, startDate: string, endDate: string, selectedIcon: string, locations: string } {
    return { 
      title: this.title, 
      urls: this.urls, 
      description: this.description, 
      startDate: this.startDate, 
      endDate: this.endDate, 
      selectedIcon: this.selectedIcon, 
      locations: this.locations 
    };
  }

  // Agrega un método para manejar la acción cuando se presiona el botón "Submit"
  private onSubmit(evt: Event) {
    this.submitted = true;
    evt.preventDefault();

    // Recoge los valores del formulario
    const selectedYear = this.yearDropdown.getValue();
    const selectedMonth = this.monthDropdown.getValue().padStart(2, '0');
    const selectedDay = this.dayDropdown.getValue().padStart(2, '0');
    const selectedHour = this.hourDropdown.getValue().padStart(2, '0');
    const selectedMinute = this.minuteDropdown.getValue().padStart(2, '0');

    const selectedTime = `${selectedHour}:${selectedMinute}:00`;
    
    const strDate = `${selectedYear}-${selectedMonth}-${selectedDay} ${selectedTime}`;
    const startDate = new Date(strDate);

    this.locations = this.locationField.getValue();
    this.urls = this.urlField.getValue();

    const formValues: FormValues = {
      title: this.title.trim(),
      urls: this.urls.trim(),
      description: this.description.trim(),
      startDate: startDate,
      endDate: this.endDate.trim(),
      selectedIcon: this.selectedIcon,
      locations: this.locations.trim()
    };

    // Validar los valores del formulario aquí, si es necesario
    const validationError = this.validateForm(formValues);
    if (validationError) {
      new Notice(validationError);
      this.submitted = false;
      this.close();
      return;
    }

    // Validation passed, resolve the values
    this.resolve(formValues);

    const path = `100 Calendar/${selectedYear}/${selectedMonth}/${selectedDay}`;

    // title: string, content: string, startDate?: string, icon?: string, description?: string, locations?: string, url:string = ''
    new Momento(this.app).createNote(
      path,
      formValues.title, 
      formValues.description, 
      formValues.startDate, 
      formValues.selectedIcon, 
      "description",
      formValues.locations,
      formValues.urls
    );

    // Cerrar el modal
    this.close();
  }
}

class TemplaterError extends Error {
  constructor(msg: string, public console_msg?: string) {
    super(msg);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
