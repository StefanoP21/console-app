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
  .parseSync();