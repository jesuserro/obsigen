import { App, ButtonComponent, DropdownComponent, Modal, Notice, TextAreaComponent, TextComponent, TFile } from "obsidian";
import React from "react";
import ReactDOM from "react-dom/client";
import { Momento } from "./../../notes/momento/Momento";
import { iconMap } from "./CalendarIcon";
import { CalendarIconPicker } from "./CalendarIconPicker";
import { NoteSelector } from "./NoteSelector";

export interface FormValues {
  title: string;
  urls: string;
  description: string;
  date: Date;
  endDate: string;
  selectedIcon: string;
  locations: string;
  type: string,
  tags: string
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
  private date: string;
  private endDate: string;
  private selectedIcon: string;
  private selectedLocation: string;
  private type: string;
  private tags: string;
  private files: TFile[];

  // Nuevos campos de selección para año, mes y día
  private titleField: TextComponent;
  private descriptionTextarea: TextAreaComponent;
  private yearDropdown: DropdownComponent;
  private monthDropdown: DropdownComponent;
  private dayDropdown: DropdownComponent;
  private iconDropdown: JSX.Element;
  private locationDropdown: JSX.Element;
  private hourDropdown: DropdownComponent;
  private minuteDropdown: DropdownComponent;
  private urlField: TextComponent;
  private typeField: DropdownComponent;
  private tagsField: TextComponent;
  
  constructor(app: App, date: Date) {
    super(app);

    this.files = app.vault.getFiles();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.type = "Moment";
    this.tags = "";

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
    this.date = "";
    this.endDate = "";
    this.selectedIcon = "default-icon";  
    this.selectedLocation = ""; 
    this.type = "Moment"; 
    this.tags = ""; 

    this.titleField.setValue(this.title);
    this.descriptionTextarea.setValue(this.description);
    this.urlField.setValue(this.urls);
    this.typeField.setValue(this.type);
  }
  
  createForm(): void {
    
    const form = this.contentEl.createDiv("form-element");
    
    const titleLabel = form.createEl("label", { cls: "form-label" });
    titleLabel.setText("Title");
    this.titleField = new TextComponent(form);
    this.titleField.inputEl.addClass("form-input");
    this.titleField.setPlaceholder("title");
    this.titleField.setValue(this.title);
    this.titleField.onChange((value) => (this.title = value));
  
    // Fieldset for year, month, and day dropdowns
    const dateFieldset = form.createEl("fieldset", { cls: "date-fieldset" });
  
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

    // Type label and textfield
    const typeDiv = form.createDiv("form-element");
    const typeLabel = typeDiv.createEl("label", { cls: "form-label" });
    typeLabel.setText("Type");
    this.typeField = new DropdownComponent(typeDiv);
    this.typeField.addOption("Moment", "Moment");
    this.typeField.addOption("Capture", "Capture");
    this.typeField.addOption("Person", "Person");
    this.typeField.addOption("Content Map", "Content Map");
    this.typeField.onChange((value) => (this.type = value));
    this.typeField.setValue(this.type);
  
    // Icon Selector
    const iconDiv = form.createDiv();
    this.iconDropdown = React.createElement(CalendarIconPicker, { 
      selectedIcon: 'default-icon',
      onChange: ((value) => (this.selectedIcon = value)),
      icons: iconMap
    });
    const root = ReactDOM.createRoot(iconDiv);
    root.render(this.iconDropdown);
    
    // Location Selector 
    const locationDiv = form.createDiv();
    this.locationDropdown = React.createElement(NoteSelector, { 
      selectedNote: '',
      onChange: ((value) => (this.selectedLocation = value)),
      notes: this.files.filter((file) => file.path.includes("300 Geo/")),
      caption: "Location"
    });
    const root2 = ReactDOM.createRoot(locationDiv);
    root2.render(this.locationDropdown);

    // url label and textfield
    const urlDiv = form.createDiv("form-element");
    const urlLabel = urlDiv.createEl("label", { cls: "form-label" });
    urlLabel.setText("Urls");
    this.urlField = new TextComponent(urlDiv);
    this.urlField.inputEl.addClass("form-input");
    this.urlField.setPlaceholder("url1, url2");
    this.urlField.setValue(this.urls);
    this.urlField.onChange((value) => (this.urls = value));

    // Description label and textarea
    const descriptionDiv = form.createDiv("form-element");
    const descriptionLabel = descriptionDiv.createEl("label", { cls: "form-label" });
    descriptionLabel.setText("Description");
    this.descriptionTextarea = new TextAreaComponent(descriptionDiv);
    this.descriptionTextarea.inputEl.addClass("form-input");
    this.descriptionTextarea.setPlaceholder("description");
    this.descriptionTextarea.setValue(this.description);
    this.descriptionTextarea.onChange((value) => (this.description = value));

    // Tags
    const tagsDiv = form.createDiv("form-element");
    const tagsLabel = tagsDiv.createEl("label", { cls: "form-label" });
    tagsLabel.setText("Tags");
    this.tagsField = new TextComponent(tagsDiv);
    this.tagsField.inputEl.addClass("form-input");
    this.tagsField.setPlaceholder("tag1, tag2");
    this.tagsField.setValue(this.tags);
    this.tagsField.onChange((value) => (this.tags = value));

    // Submit button aligned to the right horizontally
    const buttonDiv = form.createDiv("form-button-container");
    const submitButton = new ButtonComponent(buttonDiv);
    submitButton.buttonEl.addClass("form-submit-button");
    submitButton.setButtonText("Submit").onClick((evt: Event) => {
      this.onSubmit(evt);
    });
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

  getFormValues(): { title: string; urls: string, description: string, date: string, endDate: string, selectedIcon: string, locations: string, type: string, tags: string } {
    return { 
      title: this.title, 
      urls: this.urls, 
      description: this.description, 
      date: this.date, 
      endDate: this.endDate, 
      selectedIcon: this.selectedIcon, 
      locations: this.selectedLocation,
      type: this.type,
      tags: this.tags 
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
    const date = new Date(strDate);

    this.urls = "";
    if(this.urlField.getValue() !== "" && this.urlField.getValue() !== undefined){
      this.urls = `"${this.urlField.getValue()}"`;
    }
    
    const formValues: FormValues = {
      title: this.title.trim(),
      description: this.description.trim(),
      date: date,
      endDate: this.endDate.trim(),
      selectedIcon: this.selectedIcon,
      urls: this.urls.trim(),
      locations: this.selectedLocation ? `[[${this.selectedLocation}]]` : "",
      type: this.type.trim(),
      tags: this.tags.trim()
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

    new Momento(date).createNote(
      formValues.type,
      this.app,
      formValues.title, 
      formValues.description,  
      formValues.selectedIcon, 
      "description",
      formValues.locations,
      formValues.urls,
      formValues.tags
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
