import { NoteGenerator } from './NoteGenerator';

describe('NoteGenerator', () => {
  let noteGenerator: NoteGenerator;

  beforeEach(() => {
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

    // Prepare test data
    const data = {
      aliases: ['alias1', 'alias2'],
      title: 'Note Title',
      date: new Date(),
      creation: new Date(),
      updated: new Date(),
      url: 'https://example.com/note',
      author: 'John Doe',
      people: 'Jane Smith',
      parent: ['parent1', 'parent2'],
      tags: ['tag1', 'tag2'],
      locations: ['location1', 'location2'],
      rating: 7,
      emotion: 8,
    };

    // Call the method being tested
    await noteGenerator.createNote(data);

    // Verify the expected function calls
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.stringContaining('Note_'), expect.any(String));

    expect(mockOpenLinkText).toHaveBeenCalledTimes(1);
    expect(mockOpenLinkText).toHaveBeenCalledWith(path, '', false);
  });
});


