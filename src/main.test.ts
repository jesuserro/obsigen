const CALENDAR_VIEW_TYPE = 'obsigen-calendar-view';

jest.mock('obsidian', () => ({
  MarkdownView: class {},
  Plugin: class {},
}));

jest.mock('src/adapters/Obsidian/MenuPrincipal', () => ({
  MenuPrincipal: jest.fn(),
}), { virtual: true });

jest.mock('src/adapters/Obsidian/SampleModal', () => ({
  SampleModal: jest.fn(),
}), { virtual: true });

jest.mock('src/adapters/Obsidian/SampleSettingTab', () => ({
  __esModule: true,
  default: jest.fn(),
}), { virtual: true });

jest.mock('src/core/notes/calendar/CalendarView', () => ({
  CALENDAR_VIEW_TYPE,
  CalendarView: class {},
}), { virtual: true });

import MyPlugin from './main';

function deferred<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;

  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

function createWorkspace() {
  return {
    detachLeavesOfType: jest.fn(),
    getLeavesOfType: jest.fn().mockReturnValue([]),
    getRightLeaf: jest.fn(),
    revealLeaf: jest.fn().mockResolvedValue(undefined),
  };
}

function createPlugin(workspace: ReturnType<typeof createWorkspace>): MyPlugin {
  const plugin = Object.create(MyPlugin.prototype) as MyPlugin;
  (plugin as any).app = { workspace };
  return plugin;
}

describe('MyPlugin leaf lifecycle', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  describe('onLayoutReady', () => {
    test('an existing Calendar leaf short-circuits startup opening', async () => {
      const workspace = createWorkspace();
      const existingLeaf = {
        setViewState: jest.fn(),
      };
      workspace.getLeavesOfType.mockReturnValue([existingLeaf]);
      const plugin = createPlugin(workspace);

      await plugin.onLayoutReady();

      expect(workspace.getLeavesOfType).toHaveBeenCalledWith(CALENDAR_VIEW_TYPE);
      expect(workspace.getRightLeaf).not.toHaveBeenCalled();
      expect(existingLeaf.setViewState).not.toHaveBeenCalled();
      expect(workspace.revealLeaf).not.toHaveBeenCalled();
    });

    test('a null right leaf terminates safely', async () => {
      const workspace = createWorkspace();
      workspace.getRightLeaf.mockReturnValue(null);
      const plugin = createPlugin(workspace);

      await expect(plugin.onLayoutReady()).resolves.toBeUndefined();

      expect(workspace.getRightLeaf).toHaveBeenCalledWith(false);
      expect(workspace.revealLeaf).not.toHaveBeenCalled();
    });

    test('requests the active Calendar view state', async () => {
      const workspace = createWorkspace();
      const leaf = {
        setViewState: jest.fn().mockResolvedValue(undefined),
        view: {},
      };
      workspace.getRightLeaf.mockReturnValue(leaf);
      const plugin = createPlugin(workspace);

      await plugin.onLayoutReady();

      expect(leaf.setViewState).toHaveBeenCalledWith({
        type: CALENDAR_VIEW_TYPE,
        active: true,
      });
      expect(workspace.revealLeaf).toHaveBeenCalledWith(leaf);
    });

    test('waits for setViewState before revealing the leaf', async () => {
      const workspace = createWorkspace();
      const viewState = deferred();
      const leaf = {
        setViewState: jest.fn().mockReturnValue(viewState.promise),
        view: {},
      };
      workspace.getRightLeaf.mockReturnValue(leaf);
      const plugin = createPlugin(workspace);

      const completion = plugin.onLayoutReady();
      const revealCallsBeforeViewState = workspace.revealLeaf.mock.calls.length;
      viewState.resolve();
      await Promise.resolve(completion);

      expect(revealCallsBeforeViewState).toBe(0);
    });

    test('does not complete until revealLeaf completes', async () => {
      const workspace = createWorkspace();
      const reveal = deferred();
      const leaf = {
        setViewState: jest.fn().mockResolvedValue(undefined),
        view: {},
      };
      workspace.getRightLeaf.mockReturnValue(leaf);
      workspace.revealLeaf.mockReturnValue(reveal.promise);
      const plugin = createPlugin(workspace);

      const completion = plugin.onLayoutReady();
      let completed = false;
      const observedCompletion = Promise.resolve(completion).then(() => {
        completed = true;
      });
      await Promise.resolve();

      expect(completed).toBe(false);

      reveal.resolve();
      await observedCompletion;
    });

    test('does not access leaf.view to configure and reveal Calendar', async () => {
      const workspace = createWorkspace();
      let viewAccesses = 0;
      const leaf = {
        setViewState: jest.fn().mockResolvedValue(undefined),
        get view() {
          viewAccesses += 1;
          return {};
        },
      };
      workspace.getRightLeaf.mockReturnValue(leaf);
      const plugin = createPlugin(workspace);

      await plugin.onLayoutReady();

      expect(viewAccesses).toBe(0);
    });
  });

  describe('activateView', () => {
    test('detaches existing leaves and terminates safely for a null right leaf', async () => {
      const workspace = createWorkspace();
      workspace.getRightLeaf.mockReturnValue(null);
      const plugin = createPlugin(workspace);

      await expect(plugin.activateView()).resolves.toBeUndefined();

      expect(workspace.detachLeavesOfType).toHaveBeenCalledWith(CALENDAR_VIEW_TYPE);
      expect(workspace.getRightLeaf).toHaveBeenCalledWith(false);
      expect(workspace.revealLeaf).not.toHaveBeenCalled();
    });

    test('waits for the requested view state before revealing the leaf', async () => {
      const workspace = createWorkspace();
      const viewState = deferred();
      const leaf = {
        setViewState: jest.fn().mockReturnValue(viewState.promise),
      };
      workspace.getRightLeaf.mockReturnValue(leaf);
      const plugin = createPlugin(workspace);

      const completion = plugin.activateView();

      expect(leaf.setViewState).toHaveBeenCalledWith({
        type: CALENDAR_VIEW_TYPE,
        active: true,
      });
      expect(workspace.revealLeaf).not.toHaveBeenCalled();

      viewState.resolve();
      await completion;

      expect(workspace.revealLeaf).toHaveBeenCalledWith(leaf);
    });

    test('does not complete until revealLeaf completes', async () => {
      const workspace = createWorkspace();
      const reveal = deferred();
      const leaf = {
        setViewState: jest.fn().mockResolvedValue(undefined),
      };
      workspace.getRightLeaf.mockReturnValue(leaf);
      workspace.revealLeaf.mockReturnValue(reveal.promise);
      const plugin = createPlugin(workspace);

      const completion = plugin.activateView();
      let completed = false;
      const observedCompletion = completion.then(() => {
        completed = true;
      });
      await Promise.resolve();
      await Promise.resolve();

      expect(workspace.revealLeaf).toHaveBeenCalledWith(leaf);
      expect(completed).toBe(false);

      reveal.resolve();
      await observedCompletion;
    });
  });
});
