class Output {
    write(data) {
        process.stdout.write(data);
    }

    writeLine(data) {
        process.stdout.write(`${data}\n`);
    }
}

export default Output