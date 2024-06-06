import { ServerApp } from './presentation/server-app';

describe('mainApp', () => {
  test('should call Server.run with argv values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = [
      'node',
      'app.ts',
      '-b',
      '5',
      '-l',
      '10',
      '-s',
      '-n',
      'test-file',
      '-d',
      'test-destination',
    ];

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-destination',
    });
  });
});
