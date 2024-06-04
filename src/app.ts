const base: number = 5;
const message: string = `
=======================
      Table of ${base}
=======================\n`;
let output: string = '';

const tableOfMultiplication = (number: number) => {
  for (let i = 1; i <= 10; i++) {
    output += `${number} x ${i} = ${number * i}\n`;
  }
};

tableOfMultiplication(base);

output = message + output;
console.log(output);

//* Write the output to a file
import fs from 'fs';

const path = 'outputs';

const createFile = (base: number, output: string) => {
  fs.mkdir(path, { recursive: true }, (err: any) => {
    if (err) throw new Error(err);
  });

  fs.writeFile(`${path}/table-${base}.txt`, output, (err: any) => {
    if (err) throw new Error(err);
    console.log(`table-${base}.txt created!`);
  });
};

createFile(base, output);
