import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class ServerApp {
  static run({ base, limit, showTable }: RunOptions) {
    console.log('Server running...');

    const table = new CreateTable().execute({ base, limit });
    const isSaved = new SaveFile().execute({
      fileContent: table,
      fileName: `table-${base}`,
    });

    if (showTable) console.table(table);

    isSaved
      ? console.log(`table-${base}.txt created!`)
      : console.error('Error creating file');
  }
}
