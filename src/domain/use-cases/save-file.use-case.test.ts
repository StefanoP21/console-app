import fs, { mkdirSync } from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  afterAll(() => {
    if (fs.existsSync('outputs')) {
      fs.rmSync('outputs', { recursive: true });
    }

    if (fs.existsSync('custom-outputs')) {
      fs.rmSync('custom-outputs', { recursive: true });
    }
  });

  const saveFile = new SaveFile();

  it('should save a file with default values', () => {
    const options = { fileContent: 'Test content' };
    const filePath = 'outputs/table.txt';

    const isSaved = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(saveFile).toBeInstanceOf(SaveFile);
    expect(isSaved).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it('should save a file with custom values', () => {
    const options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-description',
      fileName: 'custom-file-name',
    };
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    const isSaved = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(isSaved).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('should return false if directory could not be created', () => {
    const mkdriSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error creating directory');
    });

    const isSaved = saveFile.execute({ fileContent: 'Test content' });

    expect(isSaved).toBeFalsy();

    mkdriSyncSpy.mockRestore();
  });

  it('should return false if file could not be saved', () => {
    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('Error saving file');
      });

    const isSaved = saveFile.execute({ fileContent: 'Test content' });

    expect(isSaved).toBeFalsy();

    writeFileSyncSpy.mockRestore();
  });
});
