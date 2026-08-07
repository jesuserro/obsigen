const CALENDAR_VIEW_TYPE = 'obsigen-calendar-view';

jest.mock('./CalendarView', () => ({
  CALENDAR_VIEW_TYPE,
}));

import { Calendar } from './Calendar';

function deferred<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;

  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

function createApp() {
  return {
    workspace: {
      detachLeavesOfType: jest.fn(),
      getRightLeaf: jest.fn(),
      revealLeaf: jest.fn().mockResolvedValue(undefined),
    },
  };
}

function invokeAddCalendarView(app: ReturnType<typeof createApp>) {
  const calendar = new Calendar(app as any);
  return calendar.addCalendarView();
}

describe('Calendar leaf lifecycle', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  test('detaches existing leaves and requests an active Calendar view', async () => {
    const app = createApp();
    const leaf = {
      setViewState: jest.fn().mockResolvedValue(undefined),
    };
    app.workspace.getRightLeaf.mockReturnValue(leaf);

    await invokeAddCalendarView(app);

    expect(app.workspace.detachLeavesOfType).toHaveBeenCalledWith(CALENDAR_VIEW_TYPE);
    expect(app.workspace.getRightLeaf).toHaveBeenCalledWith(false);
    expect(leaf.setViewState).toHaveBeenCalledWith({
      type: CALENDAR_VIEW_TYPE,
      active: true,
    });
    expect(app.workspace.revealLeaf).toHaveBeenCalledWith(leaf);
  });

  test('a null right leaf terminates safely', async () => {
    const app = createApp();
    app.workspace.getRightLeaf.mockReturnValue(null);

    await expect(invokeAddCalendarView(app)).resolves.toBeUndefined();

    expect(app.workspace.detachLeavesOfType).toHaveBeenCalledWith(CALENDAR_VIEW_TYPE);
    expect(app.workspace.getRightLeaf).toHaveBeenCalledWith(false);
    expect(app.workspace.revealLeaf).not.toHaveBeenCalled();
  });

  test('waits for setViewState before revealing the leaf', async () => {
    const app = createApp();
    const viewState = deferred();
    const leaf = {
      setViewState: jest.fn().mockReturnValue(viewState.promise),
    };
    app.workspace.getRightLeaf.mockReturnValue(leaf);

    const completion = invokeAddCalendarView(app);
    const revealCallsBeforeViewState = app.workspace.revealLeaf.mock.calls.length;
    viewState.resolve();
    await Promise.resolve(completion);

    expect(revealCallsBeforeViewState).toBe(0);
  });

  test('does not complete until revealLeaf completes', async () => {
    const app = createApp();
    const reveal = deferred();
    const leaf = {
      setViewState: jest.fn().mockResolvedValue(undefined),
    };
    app.workspace.getRightLeaf.mockReturnValue(leaf);
    app.workspace.revealLeaf.mockReturnValue(reveal.promise);

    const operation = invokeAddCalendarView(app);
    let completed = false;
    const observedCompletion = operation.then(() => {
      completed = true;
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(app.workspace.revealLeaf).toHaveBeenCalledWith(leaf);
    expect(completed).toBe(false);

    reveal.resolve();
    await observedCompletion;
    expect(completed).toBe(true);
  });
});
