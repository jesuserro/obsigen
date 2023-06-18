// import { App } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

describe('NoteGenerator', () => {
  let noteGenerator: NoteGenerator;

  beforeEach(() => {
    // Prepare test data
    noteGenerator = new NoteGenerator({});
  });

  test('should return "Hello, World!"', () => {
    noteGenerator.getHelloWorld();
    const result = noteGenerator.getHelloWorld();
    expect(result).toBe('Hello, World!');
  });

  test('should create a new note', async () => {
    const path = '/mnt/c/Users/Jesús/Documents/vault/testFile.md';
    // Mock the required dependencies and methods
    const mockCreate = jest.fn().mockResolvedValue({ path: path });
    const mockOpenLinkText = jest.fn();
    noteGenerator.app.vault = { create: mockCreate };
    noteGenerator.app.workspace = { openLinkText: mockOpenLinkText };

    const title = 'Patata';
    const content = 'Lorem Ipsum';
    // Call the method being tested
    await noteGenerator.createNote(title, content);

    // Verify the expected function calls
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.stringContaining(title), expect.any(String));

    expect(mockOpenLinkText).toHaveBeenCalledTimes(1);
    expect(mockOpenLinkText).toHaveBeenCalledWith(path, '', false);
  });
});


