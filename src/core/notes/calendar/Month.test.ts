const mockEffects: Array<() => void | (() => void)> = [];
const mockUseEffect = jest.fn((effect: () => void | (() => void)) => {
  mockEffects.push(effect);
});
const mockUseRef = jest.fn(() => ({ current: null }));
const mockUseState = jest.fn((initialValue: unknown) => [initialValue, jest.fn()]);

jest.mock('react', () => ({
  useEffect: mockUseEffect,
  useRef: mockUseRef,
  useState: mockUseState,
}));

import { useMonthLogic } from './Month';

function createFakeApp() {
  const vaultOn = jest.fn();
  const vaultOff = jest.fn();
  const metadataOn = jest.fn();
  const metadataOff = jest.fn();

  return {
    app: {
      vault: {
        getMarkdownFiles: jest.fn().mockReturnValue([]),
        on: vaultOn,
        off: vaultOff,
      },
      metadataCache: {
        getFileCache: jest.fn(),
        on: metadataOn,
        off: metadataOff,
      },
    },
    vaultOn,
    vaultOff,
    metadataOn,
    metadataOff,
  };
}

describe('useMonthLogic listener lifecycle', () => {
  beforeEach(() => {
    mockEffects.length = 0;
    mockUseEffect.mockClear();
    mockUseRef.mockClear();
    mockUseState.mockClear();
  });

  test('registers create, delete and changed once with one update callback', () => {
    const { app, vaultOn, metadataOn } = createFakeApp();

    useMonthLogic(app as any, 2026, 8);
    mockEffects[0]();

    expect(vaultOn).toHaveBeenCalledTimes(2);
    expect(metadataOn).toHaveBeenCalledTimes(1);
    expect(vaultOn).toHaveBeenNthCalledWith(1, 'create', expect.any(Function));
    expect(vaultOn).toHaveBeenNthCalledWith(2, 'delete', expect.any(Function));
    expect(metadataOn).toHaveBeenCalledWith('changed', expect.any(Function));

    const createCallback = vaultOn.mock.calls[0][1];
    expect(vaultOn.mock.calls[1][1]).toBe(createCallback);
    expect(metadataOn.mock.calls[0][1]).toBe(createCallback);
  });

  test('returns cleanup that removes all listeners with their registered callback', () => {
    const { app, vaultOn, vaultOff, metadataOn, metadataOff } = createFakeApp();

    useMonthLogic(app as any, 2026, 8);
    const cleanup = mockEffects[0]();

    expect(cleanup).toEqual(expect.any(Function));
    cleanup!();

    expect(vaultOff).toHaveBeenCalledTimes(2);
    expect(metadataOff).toHaveBeenCalledTimes(1);
    expect(vaultOff).toHaveBeenNthCalledWith(1, 'create', vaultOn.mock.calls[0][1]);
    expect(vaultOff).toHaveBeenNthCalledWith(2, 'delete', vaultOn.mock.calls[1][1]);
    expect(metadataOff).toHaveBeenCalledWith('changed', metadataOn.mock.calls[0][1]);
  });
});
