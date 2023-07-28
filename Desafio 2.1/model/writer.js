class Writer {
    static write(data, filePath) {
        let fs = require("fs");
        let output = JSON.stringify(data);
        fs.writeFile(filePath, output, error => {
            if (error) console.log("Error writing the file", error);
        });
    }
}

export { Writer }