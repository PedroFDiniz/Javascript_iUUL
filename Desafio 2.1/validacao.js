import { argv } from 'node:process';
import { readFileSync } from 'node:fs';
import * as dv from './Utils/data-validation.js';


let object = readFileSync(argv[2]);
let dados = JSON.parse(object);
for (let item of dados) {
    console.log(item);
}
