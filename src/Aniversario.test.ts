import { Aniversario } from './Aniversario';

describe('Aniversario', () => {
  let aniversario: Aniversario;
  let mockCreate: jest.Mock;
  let mockOpenLinkText: jest.Mock;

  beforeEach(() => {
    // Prepare test data
    mockCreate = jest.fn().mockResolvedValue({ path: '/mnt/c/Users/Jesús/Documents/vault/testFile.md' });
    mockOpenLinkText = jest.fn();

    const app = {
      vault: {
        create: mockCreate,
      },
      workspace: {
        openLinkText: mockOpenLinkText,
      },
      keymap: {}, // Add any missing properties from the 'App' type
      scope: {},
      metadataCache: {},
      fileManager: {},
      lastEvent: {},
    };

    aniversario = new Aniversario(app as any); // Use 'as any' to bypass type checking
  });

  test('should return "Hello, World!"', () => {
    const result = aniversario.getHelloWorld();
    expect(result).toBe('Hello, World!');
  });

  test('should create a new note for the current date', async () => {
    const expectedTitle = getCurrentDate();
    const expectedContent = 'Aniversario';

    // Call the method being tested
    await aniversario.createNote();

    // Verify the expected function calls
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.stringContaining(expectedTitle), expect.any(String));

    expect(mockOpenLinkText).toHaveBeenCalledTimes(1);
    expect(mockOpenLinkText).toHaveBeenCalledWith('/mnt/c/Users/Jesús/Documents/vault/testFile.md', '', false);
  });

  function getCurrentDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${month}${day}`;
  }
});
