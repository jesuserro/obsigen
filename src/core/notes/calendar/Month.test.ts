const mockEffects: Array<() => void | (() => void)> = [];
const mockStateSetters: jest.Mock[] = [];
const mockUseEffect = jest.fn((effect: () => void | (() => void)) => {
  mockEffects.push(effect);
});
const mockUseState = jest.fn((initialValue: unknown) => {
  const value =
    typeof initialValue === 'function'
      ? (initialValue as () => unknown)()
      : initialValue;
  const setter = jest.fn();
  mockStateSetters.push(setter);
  return [value, setter];
});

jest.mock('react', () => ({
  useEffect: mockUseEffect,
  useState: mockUseState,
}));

import {
  buildCalendarYearIndex,
  calculateNumRows,
  createCalendarYearMonths,
  createDaysGrid,
  createDaysGridFromIndex,
  getAnniversaryNote,
  getDailyNote,
  getDayNotes,
  getDayOffset,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  useCalendarYearLogic,
} from './Month';

interface FixtureFile {
  path: string;
  basename: string;
}

interface FakeAppOptions {
  files?: FixtureFile[];
  frontmatterByPath?: Map<string, Record<string, unknown>>;
}

function createFakeApp({
  files = [],
  frontmatterByPath = new Map(),
}: FakeAppOptions = {}) {
  const vaultOn = jest.fn();
  const vaultOff = jest.fn();
  const metadataOn = jest.fn();
  const metadataOff = jest.fn();
  const getMarkdownFiles = jest.fn().mockReturnValue(files);
  const getFileCache = jest.fn((file: FixtureFile) => ({
    frontmatter: frontmatterByPath.get(file.path),
  }));

  return {
    app: {
      vault: {
        getMarkdownFiles,
        on: vaultOn,
        off: vaultOff,
      },
      metadataCache: {
        getFileCache,
        on: metadataOn,
        off: metadataOff,
      },
    },
    getFileCache,
    getMarkdownFiles,
    metadataOff,
    metadataOn,
    vaultOff,
    vaultOn,
  };
}

function getGridMetrics(year: number, month: number) {
  const firstDay = getFirstDayOfMonth(year, month - 1);
  const lastDay = getLastDayOfMonth(year, month - 1);
  const numDaysInMonth = lastDay.getDate();
  const dayOffset = getDayOffset(firstDay.getDay());
  const numRows = calculateNumRows(numDaysInMonth, dayOffset);

  return {
    dayOffset,
    gridCells: numRows * 7,
    numDaysInMonth,
    numRows,
  };
}

function runEffects() {
  return mockEffects
    .map((effect) => effect())
    .filter((cleanup): cleanup is () => void => typeof cleanup === 'function');
}

function createAnnualFixture() {
  const files: FixtureFile[] = [
    {
      path: '100 Calendar/2026/08/20260815.md',
      basename: '20260815',
    },
    {
      path: '200 Events/August event.md',
      basename: 'August event',
    },
    {
      path: '200 Events/December event.md',
      basename: 'December event',
    },
    {
      path: '200 People/Aniversaries/08/0815.md',
      basename: '0815',
    },
    {
      path: '900 Unrelated/No calendar metadata.md',
      basename: 'No calendar metadata',
    },
  ];
  const frontmatterByPath = new Map<string, Record<string, unknown>>([
    [files[0].path, {}],
    [files[1].path, { date: '2026-08-15T10:00:00' }],
    [files[2].path, { date: '2026-12-25T12:00:00' }],
    [files[3].path, {}],
    [files[4].path, {}],
  ]);

  return {
    ...createFakeApp({ files, frontmatterByPath }),
    files,
    frontmatterByPath,
  };
}

function flattenGrid<T>(grid: T[][]): T[] {
  return grid.reduce((all, row) => all.concat(row), [] as T[]);
}

function comparableGrid(grid: ReturnType<typeof createDaysGrid>) {
  return grid.map((row) =>
    row.map(({ app: _app, ...cell }) => cell),
  );
}

describe('useCalendarYearLogic ownership', () => {
  beforeEach(() => {
    mockEffects.length = 0;
    mockStateSetters.length = 0;
    mockUseEffect.mockClear();
    mockUseState.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('takes one initial snapshot and derives all months in one snapshot pass', () => {
    const fixture = createAnnualFixture();
    const originalIterator = fixture.files[Symbol.iterator].bind(fixture.files);
    const iteratorSpy = jest
      .spyOn(fixture.files, Symbol.iterator)
      .mockImplementation(() => originalIterator());
    const findSpy = jest.spyOn(fixture.files, 'find');
    const filterSpy = jest.spyOn(fixture.files, 'filter');

    const result = useCalendarYearLogic(fixture.app as any, 2026);

    expect(mockUseState).toHaveBeenCalledWith(expect.any(Function));
    expect(fixture.getMarkdownFiles).toHaveBeenCalledTimes(1);
    expect(iteratorSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).not.toHaveBeenCalled();
    expect(filterSpy).not.toHaveBeenCalled();
    expect(fixture.getFileCache).toHaveBeenCalledTimes(fixture.files.length);
    expect(result.months).toHaveLength(12);
    expect(
      result.months.reduce(
        (total, month) => total + month.daysGrid.length * 7,
        0,
      ),
    ).toBe(441);
  });

  test('registers three listeners with one shared update callback', () => {
    const fixture = createFakeApp();

    useCalendarYearLogic(fixture.app as any, 2026);
    const cleanups = runEffects();

    expect(cleanups).toHaveLength(1);
    expect(fixture.vaultOn).toHaveBeenCalledTimes(2);
    expect(fixture.metadataOn).toHaveBeenCalledTimes(1);
    expect(fixture.vaultOn).toHaveBeenNthCalledWith(
      1,
      'create',
      expect.any(Function),
    );
    expect(fixture.vaultOn).toHaveBeenNthCalledWith(
      2,
      'delete',
      expect.any(Function),
    );
    expect(fixture.metadataOn).toHaveBeenCalledWith(
      'changed',
      expect.any(Function),
    );
    expect(fixture.vaultOn.mock.calls[0][1]).toBe(
      fixture.vaultOn.mock.calls[1][1],
    );
    expect(fixture.vaultOn.mock.calls[0][1]).toBe(
      fixture.metadataOn.mock.calls[0][1],
    );
  });

  test.each([
    ['create', 'vault'],
    ['delete', 'vault'],
    ['changed', 'metadata'],
  ] as const)(
    'one %s event takes one snapshot and performs one state update',
    (event, source) => {
      const fixture = createFakeApp();
      useCalendarYearLogic(fixture.app as any, 2026);
      runEffects();
      const callsBefore = fixture.getMarkdownFiles.mock.calls.length;
      const registration =
        source === 'vault'
          ? fixture.vaultOn.mock.calls.find(
              ([registeredEvent]) => registeredEvent === event,
            )
          : fixture.metadataOn.mock.calls.find(
              ([registeredEvent]) => registeredEvent === event,
            );

      registration![1]();

      expect(fixture.getMarkdownFiles.mock.calls.length - callsBefore).toBe(1);
      expect(mockStateSetters).toHaveLength(1);
      expect(mockStateSetters[0]).toHaveBeenCalledTimes(1);
    },
  );

  test('cleans up all three listeners symmetrically', () => {
    const fixture = createFakeApp();

    useCalendarYearLogic(fixture.app as any, 2026);
    const [cleanup] = runEffects();
    cleanup();

    expect(fixture.vaultOff).toHaveBeenCalledTimes(2);
    expect(fixture.metadataOff).toHaveBeenCalledTimes(1);
    fixture.vaultOn.mock.calls.forEach(([event, callback]) => {
      expect(fixture.vaultOff).toHaveBeenCalledWith(event, callback);
    });
    fixture.metadataOn.mock.calls.forEach(([event, callback]) => {
      expect(fixture.metadataOff).toHaveBeenCalledWith(event, callback);
    });
  });
});

describe('Month reference lookup semantics', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getDailyNote requires the current exact calendar path', () => {
    const files: FixtureFile[] = [
      {
        path: 'archive/100 Calendar/2026/08/20260815.md',
        basename: 'wrong prefix',
      },
      {
        path: '100 Calendar/2026/08/20260815.md.backup',
        basename: 'wrong suffix',
      },
      {
        path: '100 Calendar/2026/08/20260815.md',
        basename: '20260815',
      },
    ];

    expect(getDailyNote(15, files as any, 2026, 8)).toBe(files[2].path);
    expect(getDailyNote(16, files as any, 2026, 8)).toBe(false);
  });

  test('getAnniversaryNote preserves the Aniversaries month/day route', () => {
    const files: FixtureFile[] = [
      {
        path: '200 People/Anniversaries/08/0815.md',
        basename: 'wrong spelling',
      },
      {
        path: '200 People/Aniversaries/08/0815.md',
        basename: '0815',
      },
    ];

    expect(getAnniversaryNote(15, files as any, 8)).toBe(files[1]);
    expect(getAnniversaryNote(16, files as any, 8)).toBeUndefined();
  });

  test('getDayNotes includes only matching dated events', () => {
    const files: FixtureFile[] = [
      { path: '200 Events/matching.md', basename: 'matching' },
      { path: '200 Events/other day.md', basename: 'other day' },
      { path: '100 Calendar/2026/08/15.md', basename: '15' },
      { path: '200 People/Aniversaries/08/0815.md', basename: '0815' },
      { path: '900 Archive/20260815.md', basename: '20260815' },
      { path: '200 Events/missing date.md', basename: 'missing date' },
      { path: '200 Events/non-string date.md', basename: 'non-string date' },
    ];
    const frontmatterByPath = new Map<string, Record<string, unknown>>([
      [files[0].path, { date: '2026-08-15T10:30:00' }],
      [files[1].path, { date: '2026-08-16T10:30:00' }],
      [files[5].path, {}],
      [files[6].path, { date: new Date(2026, 7, 15) }],
    ]);
    const fixture = createFakeApp({ files, frontmatterByPath });

    expect(
      getDayNotes(
        fixture.app as any,
        fixture.app.metadataCache as any,
        files as any,
        15,
        2026,
        8,
      ),
    ).toEqual([files[0]]);
  });
});

describe('Calendar year index semantics', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('indexes a daily note only when it survives the old monthly prefilter', () => {
    const files: FixtureFile[] = [
      {
        path: '100 Calendar/2026/08/20260815.md',
        basename: '20260815',
      },
      {
        path: '100 Calendar/2026/08/20260816.md',
        basename: '20260816',
      },
      {
        path: 'archive/100 Calendar/2026/08/20260817.md',
        basename: '20260817',
      },
    ];
    const frontmatterByPath = new Map<string, Record<string, unknown>>([
      [files[0].path, {}],
      [files[1].path, { date: '2026-08-16' }],
      [files[2].path, { date: '2026-08-17' }],
    ]);
    const fixture = createFakeApp({ files, frontmatterByPath });

    const index = buildCalendarYearIndex(
      files as any,
      fixture.app.metadataCache as any,
      2026,
    );

    expect(index.dailyNoteByDate.has('2026-08-15')).toBe(false);
    expect(index.dailyNoteByDate.get('2026-08-16')).toBe(files[1].path);
    expect(index.dailyNoteByDate.has('2026-08-17')).toBe(false);
  });

  test('preserves anniversary spelling, substring matching and first match', () => {
    const files: FixtureFile[] = [
      {
        path: 'A/Aniversaries/08/0815.md extra',
        basename: 'first',
      },
      {
        path: 'B/Aniversaries/08/0815.md',
        basename: 'second',
      },
      {
        path: 'C/Anniversaries/08/0815.md',
        basename: 'wrong spelling',
      },
    ];
    const fixture = createFakeApp({ files });

    const index = buildCalendarYearIndex(
      files as any,
      fixture.app.metadataCache as any,
      2026,
    );

    expect(index.anniversaryByMonthDay.get('08-15')).toBe(files[0]);
  });

  test('preserves event exclusions, date parsing and snapshot order', () => {
    const files: FixtureFile[] = [
      { path: '200 Events/first.md', basename: 'first' },
      { path: '200 Events/second.md', basename: 'second' },
      { path: '200 Events/other day.md', basename: 'other day' },
      { path: '100 Calendar/2026/08/15.md', basename: '15' },
      { path: '200 People/Aniversaries/08/0815.md', basename: '0815' },
      { path: '900 Archive/20260815.md', basename: '20260815' },
      { path: '200 Events/missing.md', basename: 'missing' },
      { path: '200 Events/non-string.md', basename: 'non-string' },
      { path: '200 Events/non-monthly-format.md', basename: 'format' },
    ];
    const frontmatterByPath = new Map<string, Record<string, unknown>>([
      [files[0].path, { date: '2026-08-15T09:00:00' }],
      [files[1].path, { date: '2026-08-15T08:00:00' }],
      [files[2].path, { date: '2026-08-16T10:00:00' }],
      [files[3].path, { date: '2026-08-15T10:00:00' }],
      [files[4].path, { date: '2026-08-15T10:00:00' }],
      [files[5].path, { date: '2026-08-15T10:00:00' }],
      [files[6].path, {}],
      [files[7].path, { date: new Date(2026, 7, 15) }],
      [files[8].path, { date: '2026X08X15' }],
    ]);
    const fixture = createFakeApp({ files, frontmatterByPath });

    const index = buildCalendarYearIndex(
      files as any,
      fixture.app.metadataCache as any,
      2026,
    );

    expect(index.eventsByDate.get('2026-08-15')).toEqual([
      files[0],
      files[1],
    ]);
    expect(index.eventsByDate.get('2026-08-16')).toEqual([files[2]]);
    expect(fixture.getFileCache).toHaveBeenCalledTimes(files.length);
  });

  test('produces a grid functionally equivalent to the reference pipeline', () => {
    const year = 2026;
    const month = 8;
    const metrics = getGridMetrics(year, month);
    const files: FixtureFile[] = [
      {
        path: '100 Calendar/2026/08/20260815.md',
        basename: '20260815',
      },
      { path: '200 Events/August 15.md', basename: 'August 15' },
      { path: '200 Events/August 16.md', basename: 'August 16' },
      {
        path: '200 People/Aniversaries/08/0815.md',
        basename: '0815',
      },
      { path: '900 Unrelated/no date.md', basename: 'no date' },
    ];
    const frontmatterByPath = new Map<string, Record<string, unknown>>([
      [files[0].path, { date: '2026-08-15' }],
      [files[1].path, { date: '2026-08-15T10:00:00' }],
      [files[2].path, { date: '2026-08-16T10:00:00' }],
      [files[3].path, {}],
      [files[4].path, {}],
    ]);
    const fixture = createFakeApp({ files, frontmatterByPath });
    const filteredFiles = files.filter((file) => {
      const eventDate = fixture.app.metadataCache.getFileCache(file)?.frontmatter
        ?.date;
      return (
        (typeof eventDate === 'string' && eventDate.includes('2026-08')) ||
        file.path.includes('/Aniversaries/08')
      );
    });
    const referenceGrid = createDaysGrid({
      app: fixture.app as any,
      metadataCache: fixture.app.metadataCache as any,
      files: filteredFiles as any,
      ...metrics,
      year,
      month,
    });
    const index = buildCalendarYearIndex(
      files as any,
      fixture.app.metadataCache as any,
      year,
    );

    const indexedGrid = createDaysGridFromIndex({
      app: fixture.app as any,
      index,
      ...metrics,
      year,
      month,
    });

    expect(comparableGrid(indexedGrid)).toEqual(comparableGrid(referenceGrid));
  });
});

describe('Calendar grid performance characterization', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reference grid performs two finds and one filter per cell', () => {
    const year = 2026;
    const month = 8;
    const metrics = getGridMetrics(year, month);
    const files: FixtureFile[] = [
      {
        path: '100 Calendar/2026/08/20260815.md',
        basename: '20260815',
      },
      { path: '200 Events/August 15.md', basename: 'August 15' },
      { path: '200 Events/August 16.md', basename: 'August 16' },
      {
        path: '200 People/Aniversaries/08/0815.md',
        basename: '0815',
      },
      { path: '900 Unrelated/no date.md', basename: 'no date' },
    ];
    const frontmatterByPath = new Map<string, Record<string, unknown>>([
      [files[0].path, {}],
      [files[1].path, { date: '2026-08-15T10:00:00' }],
      [files[2].path, { date: '2026-08-16T10:00:00' }],
      [files[3].path, {}],
      [files[4].path, {}],
    ]);
    const fixture = createFakeApp({ files, frontmatterByPath });
    const findSpy = jest.spyOn(files, 'find');
    const filterSpy = jest.spyOn(files, 'filter');

    createDaysGrid({
      app: fixture.app as any,
      metadataCache: fixture.app.metadataCache as any,
      files: files as any,
      ...metrics,
      year,
      month,
    });

    expect(metrics.numRows).toBe(6);
    expect(metrics.gridCells).toBe(42);
    expect(findSpy).toHaveBeenCalledTimes(84);
    expect(filterSpy).toHaveBeenCalledTimes(42);
    expect(fixture.getFileCache).toHaveBeenCalledTimes(126);
  });

  test('indexed grids perform no snapshot search or metadata lookup per cell', () => {
    const year = 2026;
    const fixture = createAnnualFixture();
    const index = buildCalendarYearIndex(
      fixture.files as any,
      fixture.app.metadataCache as any,
      year,
    );
    const metadataLookupsAfterIndex = fixture.getFileCache.mock.calls.length;
    const findSpy = jest.spyOn(fixture.files, 'find');
    const filterSpy = jest.spyOn(fixture.files, 'filter');

    const months = createCalendarYearMonths(
      fixture.app as any,
      index,
      year,
    );

    expect(months).toHaveLength(12);
    expect(
      months.reduce(
        (total, month) => total + month.daysGrid.length * 7,
        0,
      ),
    ).toBe(441);
    expect(findSpy).not.toHaveBeenCalled();
    expect(filterSpy).not.toHaveBeenCalled();
    expect(fixture.getFileCache).toHaveBeenCalledTimes(
      metadataLookupsAfterIndex,
    );
  });

  test('records the full-year reference search volume dynamically', () => {
    const year = 2026;
    const totalGridCells = Array.from({ length: 12 }, (_, index) => index + 1)
      .map((month) => getGridMetrics(year, month).gridCells)
      .reduce((total, gridCells) => total + gridCells, 0);
    const repeatedFinds = totalGridCells * 2;
    const repeatedFilters = totalGridCells;

    expect(totalGridCells).toBe(441);
    expect(repeatedFinds).toBe(882);
    expect(repeatedFilters).toBe(441);
  });
});
