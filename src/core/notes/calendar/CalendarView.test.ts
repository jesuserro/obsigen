const mockCreateRoot = jest.fn();

jest.mock('obsidian', () => ({
  ItemView: class {
    app: unknown;
    contentEl: unknown;

    constructor(leaf: { app: unknown; contentEl: unknown }) {
      this.app = leaf.app;
      this.contentEl = leaf.contentEl;
    }
  },
}));

jest.mock('react-dom/client', () => ({
  __esModule: true,
  default: {
    createRoot: mockCreateRoot,
  },
}));

jest.mock('../bible/BibleViewChaptersUI', () => () => null);
jest.mock('../timeline/TimelineUI', () => () => null);
jest.mock('./../ViewSwitcher', () => () => null);
jest.mock('./CalendarYear', () => () => null);

import { CalendarView } from './CalendarView';

interface FakeRoot {
  render: jest.Mock;
  unmount: jest.Mock;
}

function createFakeRoot(): FakeRoot {
  return {
    render: jest.fn(),
    unmount: jest.fn(),
  };
}

function createView(querySelector = jest.fn().mockReturnValue(null)) {
  const contentEl = { querySelector };
  const leaf = {
    app: {},
    contentEl,
  };

  return new CalendarView(leaf as any);
}

describe('CalendarView lifecycle', () => {
  beforeEach(() => {
    mockCreateRoot.mockReset();
  });

  test('onOpen renders the view through its React root', async () => {
    const root = createFakeRoot();
    mockCreateRoot.mockReturnValue(root);
    const view = createView();

    await view.onOpen();

    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(root.render).toHaveBeenCalledTimes(1);
  });

  test('onClose captures the current Bible scroll position', async () => {
    const root = createFakeRoot();
    const querySelector = jest.fn().mockReturnValue({ scrollTop: 123 });
    mockCreateRoot.mockReturnValue(root);
    const view = createView(querySelector);

    await view.onClose();

    expect(querySelector).toHaveBeenCalledWith('.bible-view-chapters');
    expect((view as any).scrollPosition).toBe(123);
  });

  test('onClose unmounts the React root', async () => {
    const root = createFakeRoot();
    mockCreateRoot.mockReturnValue(root);
    const view = createView();

    await view.onOpen();
    await view.onClose();

    expect(root.unmount).toHaveBeenCalledTimes(1);
  });

  test('open-close-open uses a fresh valid root without accumulating roots', async () => {
    const firstRoot = createFakeRoot();
    const reopenedRoot = createFakeRoot();
    mockCreateRoot
      .mockReturnValueOnce(firstRoot)
      .mockReturnValueOnce(reopenedRoot);
    const view = createView();

    await view.onOpen();
    await view.onClose();
    await view.onOpen();

    expect(firstRoot.unmount).toHaveBeenCalledTimes(1);
    expect(mockCreateRoot).toHaveBeenCalledTimes(2);
    expect(reopenedRoot.render).toHaveBeenCalledTimes(1);
  });

  test('onOpen twice without close keeps one active root', async () => {
    const root = createFakeRoot();
    mockCreateRoot.mockReturnValue(root);
    const view = createView();

    await view.onOpen();
    await view.onOpen();

    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(root.render).toHaveBeenCalledTimes(2);
  });
});
