interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  //* Dependency injection
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions): string {
    let outputMessage = '';

    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i}`;

      if (i < limit) outputMessage += '\n';
    }

    return outputMessage;
  }
}
