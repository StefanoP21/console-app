import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
  const createTable = new CreateTable();

  it('should create table with default values', () => {
    const table = createTable.execute({ base: 2 });
    const rowsNumber = table.split('\n').length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 10 = 20');
    expect(rowsNumber).toBe(10);
  });

  it('should create table with custom values', () => {
    const options = {
      base: 3,
      limit: 5,
    };

    const table = createTable.execute(options);
    const rowsNumber = table.split('\n').length;

    expect(table).toContain(`${options.base} x 1 = ${options.base * 1}`);
    expect(table).toContain(
      `${options.base} x ${options.limit} = ${options.base * options.limit}`
    );
    expect(rowsNumber).toBe(options.limit);
  });
});
