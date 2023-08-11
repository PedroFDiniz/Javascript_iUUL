"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Output {
    write(data) {
        process.stdout.write(data);
    }
    writeLine(data) {
        process.stdout.write(`${data}\n`);
    }
}
exports.default = Output;
