import fs from 'fs';

import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('ServerApp', () => {
  afterEach(() => {
    jest.restoreAllMocks();

    if (fs.existsSync('test-destination')) {
      fs.rmSync('test-destination', { recursive: true });
    }
  });

  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: 'test-name',
    fileDestination: 'test-destination',
  };

  it('should create ServerApp instance', () => {
    const server = new ServerApp();

    expect(server).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  /* it('should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenLastCalledWith(`${options.fileName}.txt created!`);

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: createTableSpy.mock.results[0].value,
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  }); */

  it('should run ServerApp with options and show table', () => {
    const options = {
      base: 2,
      limit: 10,
      showTable: true,
      fileName: 'test-name',
      fileDestination: 'test-destination',
    };

    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith(
      `${createTableSpy.mock.results[0].value}`
    );
  });

  /* it('should run ServerApp with options and show error', () => {
    const logSpy = jest.spyOn(console, 'error');
    const saveFileSpy = jest
      .spyOn(SaveFile.prototype, 'execute')
      .mockReturnValue(false);

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenLastCalledWith('Error creating file');
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  }); */

  it('should run ServerApp with mock options', () => {
    const logMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue('table');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledTimes(2);
    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(logMock).toHaveBeenLastCalledWith(
      `${options.fileName}.txt created!`
    );

    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: 'table',
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  it('should run ServerApp with mock options and error', () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const saveFileMock = jest.fn().mockReturnValue(false);

    console.log = logMock;
    console.error = logErrorMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledTimes(1);
    expect(logMock).toHaveBeenCalledWith('Server running...');

    expect(logErrorMock).toHaveBeenCalledTimes(1);
    expect(logErrorMock).toHaveBeenCalledWith('Error creating file');
  });
});
