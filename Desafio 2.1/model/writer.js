import fs from 'fs';

class Writer {

    /**
     * Escreve os dados passados como parâmetro em um arquivo cujo endereço está descrito no segundo parâmetro.
     * @param {*} data - dados a serem escritos
     * @param {String} filePath - endereço do arquivo a ser escrito
     */
    static write(data, filePath) {
        let output = JSON.stringify(data);
        fs.writeFile(filePath, output, error => {
            if (error) console.log("Error writing the file", error);
        });
    }
}

export { Writer }