import {
    App,
    ButtonComponent,
    DropdownComponent,
    Modal,
    Notice,
    TextAreaComponent,
    TextComponent,
    TFile,
} from "obsidian";
import React from "react";
import ReactDOM from "react-dom/client";
import { Momento } from "./../../notes/momento/Momento";
import { iconData } from "./CalendarIcon";
import { CalendarIconPicker } from "./CalendarIconPicker";
import { NoteSelector } from "./NoteSelector";

export interface FormValues {
    title: string;
    urls: string;
    description: string;
    date: Date;
    endDate: Date;
    selectedIcon: string;
    locations: string;
    type: string;
    tags: string;
}

export class CalendarEvent extends Modal {
    private resolve!: (value: FormValues) => void;
    private reject!: (reason?: TemplaterError) => void;
    private submitted = false;

    private yearField!: TextComponent;
    private endYearField!: TextComponent;
    private eraField!: DropdownComponent;
    private endEraField!: DropdownComponent;
    private monthDropdown!: DropdownComponent;
    private dayDropdown!: DropdownComponent;
    private hourDropdown!: DropdownComponent;
    private minuteDropdown!: DropdownComponent;
    private endMonthDropdown!: DropdownComponent;
    private endDayDropdown!: DropdownComponent;
    private endHourDropdown!: DropdownComponent;
    private endMinuteDropdown!: DropdownComponent;
    private iconDropdown!: JSX.Element;
    private locationDropdown!: JSX.Element;

    private titleField!: TextComponent;
    private descriptionTextarea!: TextAreaComponent;
    private urlField!: TextComponent;
    private typeField!: DropdownComponent;
    private tagsField!: TextComponent;

    private selectedIcon = "default-icon";
    private selectedLocation = "";

    private files: TFile[];

    constructor(app: App, private initialDate: Date) {
        super(app);
        this.files = app.vault.getFiles();
        this.createForm();
    }

    onOpen(): void {
        this.titleEl.setText("Nuevo Evento");
        this.resetValues();
    }

    onClose(): void {
        if (!this.submitted) {
            new Notice("Cancelled prompt");
        }
    }

    private resetValues() {
        this.titleField.setValue("");
        this.descriptionTextarea.setValue("");
        this.urlField.setValue("");
        this.typeField.setValue("Moment");
        this.tagsField.setValue("");
    }

    private createForm(): void {
        const form = this.contentEl.createDiv("form-element");

        this.createFormElement(form, "Title", (div) => {
            this.titleField = new TextComponent(div);
            this.titleField.inputEl.addClass("form-input");
            this.titleField.setPlaceholder("title");
        });

        const dateFieldset = form.createEl("fieldset", { cls: "date-fieldset" });
        this.createDateFields(dateFieldset);

        const endDateFieldset = form.createEl("fieldset", { cls: "date-fieldset" });
        this.createEndDateFields(endDateFieldset);

        this.createFormElement(form, "Type", (div) => {
            this.typeField = new DropdownComponent(div);
            ["Moment", "Capture", "Person", "Content Map"].forEach(option =>
                this.typeField.addOption(option, option)
            );
        });

        const iconContainer = form.createDiv("icon-picker-container");
        this.iconDropdown = this.createReactComponent(iconContainer, CalendarIconPicker, {
            selectedIcon: this.selectedIcon,
            onChange: (value: string) => (this.selectedIcon = value),
            icons: Object.assign({}, ...Object.values(iconData)),
        });

        const locationContainer = form.createDiv("note-selector-container");
        this.locationDropdown = this.createReactComponent(locationContainer, NoteSelector, {
            selectedNote: this.selectedLocation,
            onChange: (value: string) => (this.selectedLocation = value),
            notes: this.files.filter((file) => file.path.includes("300 Geo/")),
            caption: "Location",
        });

        this.createFormElement(form, "Urls", (div) => {
            this.urlField = new TextComponent(div);
            this.urlField.inputEl.addClass("form-input");
            this.urlField.setPlaceholder("url1, url2");
        });

        this.createFormElement(form, "Description", (div) => {
            this.descriptionTextarea = new TextAreaComponent(div);
            this.descriptionTextarea.inputEl.addClass("form-input");
            this.descriptionTextarea.setPlaceholder("description");
        });

        this.createFormElement(form, "Tags", (div) => {
            this.tagsField = new TextComponent(div);
            this.tagsField.inputEl.addClass("form-input");
            this.tagsField.setPlaceholder("tag1, tag2");
        });

        const buttonDiv = form.createDiv("form-button-container");
        const submitButton = new ButtonComponent(buttonDiv);
        submitButton.buttonEl.addClass("form-submit-button");
        submitButton.setButtonText("Submit").onClick((evt: Event) => {
            this.onSubmit(evt);
        });
    }

    private createFormElement(parent: HTMLElement, labelText: string, createComponent: (div: HTMLDivElement) => void) {
        const div = parent.createDiv("form-element");
        const label = div.createEl("label", { cls: "form-label" });
        label.setText(labelText);
        createComponent(div);
    }

    private createDateFields(parent: HTMLElement) {
        const dateContainer = parent.createDiv({ cls: 'date-time-container' });
        const datePart = dateContainer.createDiv({ cls: 'date-part' });
        const timePart = dateContainer.createDiv({ cls: 'time-part' });
    
        this.createFormElement(datePart, "Year", (div) => {
            this.eraField = new DropdownComponent(div);
            this.eraField.addOption("DC", "DC");
            this.eraField.addOption("AC", "AC");
            this.eraField.setValue("DC");
    
            this.yearField = new TextComponent(div);
            this.yearField.inputEl.addClass("form-input");
            this.yearField.inputEl.addClass("form-year-input");
            this.yearField.setPlaceholder("e.g., 0100 for 100 AC, 0005 for 5 DC");
            this.yearField.setValue(this.formatYear(this.initialDate.getFullYear()));
    
            // Añadir listener para sincronizar la fecha final
            this.yearField.onChange(() => this.syncEndDate());
            this.eraField.onChange(() => this.syncEndDate());
        });
    
        this.monthDropdown = this.createDropdown(datePart, "Month", 1, 12);
        this.monthDropdown.onChange(() => this.syncEndDate());
    
        this.dayDropdown = this.createDropdown(datePart, "Day", 1, 31);
        this.dayDropdown.onChange(() => this.syncEndDate());
    
        this.hourDropdown = this.createDropdown(timePart, "Hour", 0, 23);
        this.hourDropdown.onChange(() => this.syncEndDate());
    
        this.minuteDropdown = this.createDropdown(timePart, "Minute", 0, 55, 5);
        this.minuteDropdown.onChange(() => this.syncEndDate());
    
        this.setDefaultDateTime(this.initialDate, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
    }

    private createEndDateFields(parent: HTMLElement) {
        const dateContainer = parent.createDiv({ cls: 'date-time-container' });
        const datePart = dateContainer.createDiv({ cls: 'date-part' });
        const timePart = dateContainer.createDiv({ cls: 'time-part' });
    
        this.createFormElement(datePart, "End Year", (div) => {
            this.endEraField = new DropdownComponent(div);
            this.endEraField.addOption("DC", "DC");
            this.endEraField.addOption("AC", "AC");
            this.endEraField.setValue("DC");
    
            this.endYearField = new TextComponent(div);
            this.endYearField.inputEl.addClass("form-input");
            this.endYearField.inputEl.addClass("form-year-input");
            this.endYearField.setPlaceholder("e.g., 0100 for 100 AC, 0005 for 5 DC");
            this.endYearField.setValue(this.formatYear(this.initialDate.getFullYear()));
        });
    
        this.endMonthDropdown = this.createDropdown(datePart, "End Month", 1, 12);
        this.endDayDropdown = this.createDropdown(datePart, "End Day", 1, 31);
        this.endHourDropdown = this.createDropdown(timePart, "End Hour", 0, 23);
        this.endMinuteDropdown = this.createDropdown(timePart, "End Minute", 0, 55, 5);
    
        this.setDefaultDateTime(this.initialDate, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);
    }
    
    private createDropdown(parent: HTMLElement, label: string, start: number, end: number, step: number = 1) {
        const div = parent.createDiv("form-element");
        const dropdown = new DropdownComponent(div);
        for (let i = start; i <= end; i += step) {
            dropdown.addOption(i.toString().padStart(2, "0"), i.toString().padStart(2, "0"));
        }
        return dropdown;
    }

    private setDefaultDateTime(date: Date, monthDropdown: DropdownComponent, dayDropdown: DropdownComponent, hourDropdown: DropdownComponent, minuteDropdown: DropdownComponent) {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        let roundedMinutes = Math.ceil(currentMinutes / 5) * 5;
    
        monthDropdown.setValue((date.getMonth() + 1).toString().padStart(2, "0"));
        dayDropdown.setValue(date.getDate().toString().padStart(2, "0"));
        hourDropdown.setValue(now.getHours().toString().padStart(2, "0"));
    
        // Verificamos si el valor redondeado está fuera de los 60 minutos, y ajustamos en consecuencia
        if (roundedMinutes >= 60) {
            roundedMinutes = 0;
        }
        minuteDropdown.setValue(roundedMinutes.toString().padStart(2, "0"));
    }

    private getDateFromFields(yearField: TextComponent, eraField: DropdownComponent, monthDropdown: DropdownComponent, dayDropdown: DropdownComponent, hourDropdown: DropdownComponent, minuteDropdown: DropdownComponent): Date {
        let yearValue = parseInt(yearField.getValue().trim());
        const isBC = eraField.getValue() === "AC";
        if (isBC) {
            yearValue = -yearValue;
        }
    
        const month = parseInt(monthDropdown.getValue().padStart(2, "0")) - 1; // Los meses van de 0 a 11
        const day = parseInt(dayDropdown.getValue().padStart(2, "0"));
        const hour = parseInt(hourDropdown.getValue().padStart(2, "0"));
        const minute = parseInt(minuteDropdown.getValue().padStart(2, "0"));
    
        // Asegurar que los valores son válidos antes de crear la fecha
        if (isNaN(yearValue) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
            throw new Error("Invalid date component values");
        }
    
        // Crear la fecha usando la hora y la zona horaria tal como se selecciona en el formulario
        const date = new Date(yearValue, month, day, hour, minute, 0);
    
        return date;
    }

    private createReactComponent(parent: HTMLElement, component: React.FC<any>, props: any) {
        const div = parent.createDiv();
        const element = React.createElement(component, props);
        const root = ReactDOM.createRoot(div);
        root.render(element);
        return element;
    }

    private formatYear(year: number): string {
        return year.toString().padStart(4, "0");
    }

    openModal(): Promise<FormValues> {
        return new Promise<FormValues>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.open();
        });
    }

    private onSubmit(evt: Event) {
        evt.preventDefault();
        this.submitted = true;

        const formValues = this.getFormValues();
        const validationError = this.validateForm(formValues);
        if (validationError) {
            new Notice(validationError);
            this.submitted = false;
            this.close();
            return;
        }

        this.resolve(formValues);

        new Momento(formValues.date, formValues.endDate).createNote(
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

        this.close();
    }

    private getFormValues(): FormValues {
        const date = this.getDateFromFields(this.yearField, this.eraField, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
        const endDate = this.getDateFromFields(this.endYearField, this.endEraField, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);

        return {
            title: this.titleField.getValue().trim(),
            urls: this.urlField.getValue().trim(),
            description: this.descriptionTextarea.getValue().trim(),
            date,
            endDate,
            selectedIcon: this.selectedIcon,
            locations: this.selectedLocation ? `[[${this.selectedLocation}]]` : "",
            type: this.typeField.getValue().trim(),
            tags: this.tagsField.getValue().trim(),
        };
    }

    private validateForm(values: FormValues): string | null {
        if (values.date > values.endDate) {
            return "La fecha de inicio debe ser anterior a la fecha de fin.";
        }
        return null;
    }

    private syncEndDate() {
        const startDate = this.getDateFromFields(this.yearField, this.eraField, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
        const endDate = this.getDateFromFields(this.endYearField, this.endEraField, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);
    
        // Si la fecha final es anterior a la fecha inicial, ajustar la fecha final para que coincida con la fecha inicial
        if (endDate < startDate) {
            this.endYearField.setValue(this.yearField.getValue());
            this.endEraField.setValue(this.eraField.getValue());
            this.endMonthDropdown.setValue(this.monthDropdown.getValue());
            this.endDayDropdown.setValue(this.dayDropdown.getValue());
            this.endHourDropdown.setValue(this.hourDropdown.getValue());
            this.endMinuteDropdown.setValue(this.minuteDropdown.getValue());
        }
    }    
}

class TemplaterError extends Error {
    constructor(msg: string, public console_msg?: string) {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
