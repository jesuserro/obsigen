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
import { iconData } from "./CalendarIcon"; // Cambiado iconMap a iconData
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

    private year: number;
    private month: number;
    private day: number;
    private type = "Moment";
    private tags = "";
    private selectedIcon = "default-icon";
    private selectedLocation = "";

    private files: TFile[];

    private titleField!: TextComponent;
    private descriptionTextarea!: TextAreaComponent;
    private yearDropdown!: DropdownComponent;
    private monthDropdown!: DropdownComponent;
    private dayDropdown!: DropdownComponent;
    private hourDropdown!: DropdownComponent;
    private minuteDropdown!: DropdownComponent;
    private endYearDropdown!: DropdownComponent;
    private endMonthDropdown!: DropdownComponent;
    private endDayDropdown!: DropdownComponent;
    private endHourDropdown!: DropdownComponent;
    private endMinuteDropdown!: DropdownComponent;
    private iconDropdown!: JSX.Element;
    private locationDropdown!: JSX.Element;
    private urlField!: TextComponent;
    private typeField!: DropdownComponent;
    private tagsField!: TextComponent;

    constructor(app: App, private initialDate: Date) {
        super(app);
        this.files = app.vault.getFiles();
        this.year = initialDate.getFullYear();
        this.month = initialDate.getMonth() + 1;
        this.day = initialDate.getDate();
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
        this.typeField.setValue(this.type);
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
        this.createDateDropdowns(dateFieldset);

        const endDateFieldset = form.createEl("fieldset", { cls: "date-fieldset" });
        this.createEndDateDropdowns(endDateFieldset);

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
            icons: Object.assign({}, ...Object.values(iconData)), // Combina todos los grupos de iconos en un solo objeto
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

    private createDateDropdowns(parent: HTMLElement) {
        this.yearDropdown = this.createDropdown(parent, "Year", 1897, 2030);
        this.monthDropdown = this.createDropdown(parent, "Month", 1, 12);
        this.dayDropdown = this.createDropdown(parent, "Day", 1, 31);
        this.hourDropdown = this.createDropdown(parent, "Hour", 0, 23);
        this.minuteDropdown = this.createDropdown(parent, "Minute", 0, 55, 5);
        this.setDefaultDateTime(this.initialDate, this.yearDropdown, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
        this.addDropdownChangeEvents(this.yearDropdown, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
    }
    
    private createEndDateDropdowns(parent: HTMLElement) {
        this.endYearDropdown = this.createDropdown(parent, "End Year", 1897, 2030);
        this.endMonthDropdown = this.createDropdown(parent, "End Month", 1, 12);
        this.endDayDropdown = this.createDropdown(parent, "End Day", 1, 31);
        this.endHourDropdown = this.createDropdown(parent, "End Hour", 0, 23);
        this.endMinuteDropdown = this.createDropdown(parent, "End Minute", 0, 55, 5);
        this.setDefaultDateTime(this.initialDate, this.endYearDropdown, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);
        this.addDropdownChangeEvents(this.endYearDropdown, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);
    }

    private createDropdown(parent: HTMLElement, label: string, start: number, end: number, step: number = 1) {
        const div = parent.createDiv("form-element");
        const dropdown = new DropdownComponent(div);
        for (let i = start; i <= end; i += step) {
            dropdown.addOption(i.toString().padStart(2, "0"), i.toString().padStart(2, "0"));
        }
        return dropdown;
    }

    private setDefaultDateTime(date: Date, yearDropdown: DropdownComponent, monthDropdown: DropdownComponent, dayDropdown: DropdownComponent, hourDropdown: DropdownComponent, minuteDropdown: DropdownComponent) {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const roundedMinutes = Math.ceil(currentMinutes / 5) * 5;
    
        yearDropdown.setValue(date.getFullYear().toString());
        monthDropdown.setValue((date.getMonth() + 1).toString().padStart(2, "0"));
        dayDropdown.setValue(date.getDate().toString().padStart(2, "0"));
        hourDropdown.setValue(now.getHours().toString().padStart(2, "0"));
        minuteDropdown.setValue(roundedMinutes.toString().padStart(2, "0"));
    }

    private addDropdownChangeEvents(...dropdowns: DropdownComponent[]) {
        dropdowns.forEach(dropdown => {
            dropdown.onChange(() => {
                this.syncEndDate();
            });
        });
    }

    private createReactComponent(parent: HTMLElement, component: React.FC<any>, props: any) {
        const div = parent.createDiv();
        const element = React.createElement(component, props);
        const root = ReactDOM.createRoot(div);
        root.render(element);
        return element;
    }

    private validateForm(values: FormValues): string | null {
        if (values.date > values.endDate) {
            return "La fecha de inicio debe ser anterior a la fecha de fin.";
        }
        return null;
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
        const date = this.getDate(this.yearDropdown, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
        const endDate = this.getDate(this.endYearDropdown, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);

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

    private getDate(yearDropdown: DropdownComponent, monthDropdown: DropdownComponent, dayDropdown: DropdownComponent, hourDropdown: DropdownComponent, minuteDropdown: DropdownComponent): Date {
        const year = yearDropdown.getValue();
        const month = monthDropdown.getValue().padStart(2, "0");
        const day = dayDropdown.getValue().padStart(2, "0");
        const hour = hourDropdown.getValue().padStart(2, "0");
        const minute = minuteDropdown.getValue().padStart(2, "0");
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    }

    private syncEndDate() {
        const startDate = this.getDate(this.yearDropdown, this.monthDropdown, this.dayDropdown, this.hourDropdown, this.minuteDropdown);
        const endDate = this.getDate(this.endYearDropdown, this.endMonthDropdown, this.endDayDropdown, this.endHourDropdown, this.endMinuteDropdown);

        if (endDate < startDate) {
            this.endYearDropdown.setValue(this.yearDropdown.getValue());
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
