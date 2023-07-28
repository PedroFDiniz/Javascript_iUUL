import { DateTime } from 'luxon'
import { Client } from '../model/client.js';
import { Writer } from '../model/writer.js';
import session from '../session/session.js';

class MainController {
    /**
     * Extrai dados de um arquivo cujo caminho é passado como parâmetro.
     * @param {String} path - o caminho até o arquivo a ser lido
     */
    processFile() {
        session.reader.setPath(session.path);
        session.reader.readJSON();
        for (let item of session.reader.iterator()) {
            let object = Client.create(item.nome, item.cpf, item.dt_nascimento, item.renda_mensal, item.estado_civil);
            if (object.failure !== undefined) {
                this.addErrors(item, object.failure);
            } else {
                session.clients.add(object.success);
            }
        }
    }

    /**
     * adiciona um objeto contendo uma lista de erros e os dados relacionados ao erro.
     * @param {*} data - objeto relacionado com os erros
     * @param {*} errorList - lista de erros
     */
    addErrors(data, errorList) {
        session.errorList.push({
            "dados": data,
            "erros": errorList
        });
    }

    /**
     * Escreve os erros lidos na sessão em um arquivo.
     * O arquivo será escrito na mesma pasta e terá nome tal como descrito no documento do desafio.
     */
    outputErrors() {
        let time = DateTime.now();
        let path = "./erros-" + time.toFormat("ddLLyyyy-hhmmss") + ".json";
        Writer.write(session.errors, path);
    }
}

export { MainController }