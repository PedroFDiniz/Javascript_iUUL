import { readFileSync } from 'node:fs'

class Reader {
    #path;
    #content;

    constructor(path = "") {
        this.#path = path;
    }

    get path() {
        return this.#path;
    }

    setPath(newPath) {
        this.#path = newPath;
    }

    setContent(data) {
        this.#content = data;
    }

    /**
     * Lê um arquivo .json cujo endereço está descrito na variável 'path' do objeto.
     */
    readJSON() {
        let dataBuffer = readFileSync(this.path)
        this.setContent(JSON.parse(dataBuffer));
    }

    /**
     * Iterador que retorna um dos objetos lidos anteriormente.
     */
    *iterator() {
        for (let item of this.#content) yield item;
    }
}

export { Reader }