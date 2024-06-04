import { argv } from './config/plugins/yargs.plugin';

// console.log(argv.b);

(async () => {
  await main();
})();

async function main() {
  console.log(argv);
}
