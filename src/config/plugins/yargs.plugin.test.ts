const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { argv } = await import('./yargs.plugin');

  return argv;
};

describe('YargsPlugin', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      })
    );
  });

  it('should return configuration with custom value', async () => {
    const args = [
      '-b',
      '7',
      '-l',
      '20',
      '-s',
      '-n',
      'custom-name',
      '-d',
      'custom-folder',
    ];
    const argv = await runCommand(args);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 7,
        l: 20,
        s: true,
        n: 'custom-name',
        d: 'custom-folder',
      })
    );
  });
});
