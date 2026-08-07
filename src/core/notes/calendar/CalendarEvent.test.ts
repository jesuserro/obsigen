const mockNotice = jest.fn();
const mockCreateNote = jest.fn();
const mockMomento = jest.fn().mockImplementation(() => ({
  createNote: mockCreateNote,
}));

jest.mock('obsidian', () => ({
  ButtonComponent: class {},
  DropdownComponent: class {},
  Modal: class {},
  Notice: mockNotice,
  TextAreaComponent: class {},
  TextComponent: class {},
  TFile: class {},
}));

jest.mock('./../../notes/momento/Momento', () => ({
  Momento: mockMomento,
}));

jest.mock('./CalendarIcon', () => ({ iconData: {} }));
jest.mock('./CalendarIconPicker', () => ({ CalendarIconPicker: () => null }));
jest.mock('./NoteSelector', () => ({ NoteSelector: () => null }));

import { CalendarEvent, FormValues } from './CalendarEvent';

function deferred<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

function field(value: string) {
  return {
    getValue: jest.fn().mockReturnValue(value),
    setValue: jest.fn(),
  };
}

function createBareEvent(): CalendarEvent {
  const event = Object.create(CalendarEvent.prototype) as CalendarEvent;
  Object.assign(event as any, {
    app: {},
    close: jest.fn(),
    open: jest.fn(),
    submitted: false,
  });
  return event;
}

function dateFromFields({
  year,
  era = 'DC',
  month = '01',
  day = '01',
  hour = '00',
  minute = '00',
}: {
  year: string;
  era?: 'AC' | 'DC';
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
}): Date {
  const event = createBareEvent();

  return (event as any).getDateFromFields(
    field(year),
    field(era),
    field(month),
    field(day),
    field(hour),
    field(minute),
  );
}

function createFormValues(): FormValues {
  const date = new Date(2024, 1, 29, 12, 30, 0);

  return {
    title: 'Sample event',
    urls: '',
    description: 'Description',
    date,
    endDate: new Date(date.getTime()),
    selectedIcon: 'default-icon',
    locations: '',
    type: 'Moment',
    tags: 'calendar',
  };
}

function prepareSubmission(event: CalendarEvent, values = createFormValues()) {
  (event as any).getFormValues = jest.fn().mockReturnValue(values);
  (event as any).validateForm = jest.fn().mockReturnValue(null);
  return values;
}

describe('CalendarEvent correctness', () => {
  beforeEach(() => {
    mockNotice.mockClear();
    mockCreateNote.mockReset();
    mockMomento.mockClear();
  });

  describe('date construction', () => {
    test('preserves a valid modern leap-day date and time', () => {
      const date = dateFromFields({
        year: '2024',
        month: '02',
        day: '29',
        hour: '12',
        minute: '30',
      });

      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(29);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(30);
    });

    test('preserves DC year 100', () => {
      const date = dateFromFields({ year: '0100' });

      expect(date.getFullYear()).toBe(100);
    });

    test.each([
      ['0001', 1],
      ['0005', 5],
      ['0099', 99],
    ])('preserves DC year %s as year %i', (year, expectedYear) => {
      const date = dateFromFields({ year });

      expect(date.getFullYear()).toBe(expectedYear);
    });

    test('preserves the current AC representation as a negative year', () => {
      const date = dateFromFields({ year: '0005', era: 'AC' });

      expect(date.getFullYear()).toBe(-5);
    });

    test.each([
      ['2023-02-29', { year: '2023', month: '02', day: '29' }],
      ['2024-04-31', { year: '2024', month: '04', day: '31' }],
    ])('rejects the impossible date %s', (_label, input) => {
      expect(() => dateFromFields(input)).toThrow();
    });

    test.each(['DC', 'AC'] as const)('rejects year zero in era %s', (era) => {
      expect(() => dateFromFields({ year: '0000', era })).toThrow();
    });
  });

  describe('cancellation', () => {
    test('emits the existing cancellation Notice', () => {
      const event = createBareEvent();
      event.openModal();

      event.onClose();

      expect(mockNotice).toHaveBeenCalledWith('Cancelled prompt');
    });

    test('settles the modal operation when closed without submit', async () => {
      const event = createBareEvent();
      const operation = event.openModal();

      event.onClose();

      await expect(operation).resolves.toBeNull();
    });
  });

  describe('submission', () => {
    test('waits for createNote before completing the modal operation', async () => {
      const event = createBareEvent();
      const values = prepareSubmission(event);
      const noteCreation = deferred();
      mockCreateNote.mockReturnValue(noteCreation.promise);
      const operation = event.openModal();
      let completed = false;
      operation.then(() => { completed = true; });

      const submission = (event as any).onSubmit({ preventDefault: jest.fn() });
      await Promise.resolve();

      expect(completed).toBe(false);

      noteCreation.resolve();
      await submission;

      expect(mockMomento).toHaveBeenCalledWith(values.date, values.endDate);
      expect(mockCreateNote).toHaveBeenCalledTimes(1);
      await expect(operation).resolves.toBe(values);
      expect((event as any).close).toHaveBeenCalledTimes(1);
    });

    test('does not report success when createNote rejects', async () => {
      const event = createBareEvent();
      const error = new Error('note creation failed');
      prepareSubmission(event);
      const noteCreation = deferred();
      mockCreateNote.mockReturnValue(noteCreation.promise);
      const operation = event.openModal();

      const submission = (event as any).onSubmit({ preventDefault: jest.fn() });
      noteCreation.reject(error);

      await expect(operation).rejects.toBe(error);
      await submission;
      expect((event as any).close).toHaveBeenCalledTimes(1);

      event.onClose();
      expect(mockNotice).not.toHaveBeenCalledWith('Cancelled prompt');
    });

    test('validation failure emits Notice, clears submitted and closes', async () => {
      const event = createBareEvent();
      const values = prepareSubmission(event);
      (event as any).validateForm.mockReturnValue('Invalid date range');
      const operation = event.openModal();

      await (event as any).onSubmit({ preventDefault: jest.fn() });
      event.onClose();

      expect((event as any).getFormValues).toHaveBeenCalledTimes(1);
      expect((event as any).validateForm).toHaveBeenCalledWith(values);
      expect(mockNotice).toHaveBeenCalledWith('Invalid date range');
      expect((event as any).submitted).toBe(false);
      expect((event as any).close).toHaveBeenCalledTimes(1);
      expect(mockCreateNote).not.toHaveBeenCalled();
      await expect(operation).resolves.toBeNull();
    });

    test('field parsing errors emit Notice and settle as cancellation', async () => {
      const event = createBareEvent();
      (event as any).getFormValues = jest.fn().mockImplementation(() => {
        throw new Error('Invalid date component values');
      });
      const operation = event.openModal();

      await (event as any).onSubmit({ preventDefault: jest.fn() });
      event.onClose();

      expect(mockNotice).toHaveBeenCalledWith('Invalid date component values');
      expect((event as any).submitted).toBe(false);
      expect((event as any).close).toHaveBeenCalledTimes(1);
      await expect(operation).resolves.toBeNull();
    });
  });

  describe('interactive date synchronization', () => {
    test('temporarily invalid dates do not escape from syncEndDate', () => {
      const event = createBareEvent();
      const endYearField = field('2024');
      Object.assign(event as any, {
        yearField: field('2024'),
        eraField: field('DC'),
        monthDropdown: field('02'),
        dayDropdown: field('31'),
        hourDropdown: field('12'),
        minuteDropdown: field('30'),
        endYearField,
        endEraField: field('DC'),
        endMonthDropdown: field('02'),
        endDayDropdown: field('29'),
        endHourDropdown: field('12'),
        endMinuteDropdown: field('30'),
      });

      expect(() => (event as any).syncEndDate()).not.toThrow();
      expect(endYearField.setValue).not.toHaveBeenCalled();
    });
  });
});
