import { NoteGenerator } from './NoteGenerator';

describe('NoteGenerator', () => {
  let noteGenerator: NoteGenerator;
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

    noteGenerator = new NoteGenerator(app as any); // Use 'as any' to bypass type checking
  });

  test('should return "Hello, World!"', () => {
    const result = noteGenerator.getHelloWorld();
    expect(result).toBe('Hello, World!');
  });

  test('should create a new note', async () => {
    const title = 'Patata';
    const content = 'Lorem Ipsum';
    const path = '/mnt/c/Users/Jesús/Documents/vault';

    // Call the method being tested
    await noteGenerator.createNote(title, content, path);

    // Verify the expected function calls
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.stringContaining(title), expect.any(String));

    expect(mockOpenLinkText).toHaveBeenCalledTimes(1);
    expect(mockOpenLinkText).toHaveBeenCalledWith('/mnt/c/Users/Jesús/Documents/vault/testFile.md', '', false);
  });
});
