import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    description: 'Base of the multiplication table',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    description: 'Limit of the multiplication table',
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    description: 'Show the multiplication table',
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    description: 'Name of the file to save the multiplication table',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    description: 'Destination folder to save the file',
  })
  .check((argv, options) => {
    if (argv.b < 1) throw 'Error: the base must be greater than 0';

    return true;
  })
  .parseSync();
