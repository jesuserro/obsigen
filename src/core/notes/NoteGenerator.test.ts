import { TFile } from 'obsidian';
import { NoteGenerator } from './NoteGenerator';

describe('NoteGenerator', () => {
  let noteGenerator: NoteGenerator;
  let mockCreate: jest.Mock;
  let mockOpenLinkText: jest.Mock;

  beforeEach(() => {
    // Prepare test data
    const createdFile = Object.create(TFile.prototype) as TFile;
    Object.assign(createdFile, { path: '/mnt/c/Users/Jesús/Documents/vault/testFile.md' });
    mockCreate = jest.fn().mockResolvedValue(createdFile);
    mockOpenLinkText = jest.fn().mockResolvedValue(undefined);

    const app = {
      vault: {
        create: mockCreate,
        createFolder: jest.fn().mockResolvedValue(undefined),
        getAbstractFileByPath: jest.fn().mockReturnValue(null),
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
    expect(mockOpenLinkText).toHaveBeenCalledWith(
      '/mnt/c/Users/Jesús/Documents/vault/testFile.md',
      '',
      false,
      { active: true },
    );
  });
});
