import { readFileSync } from 'node:fs'

class Reader {
    #caminho;
    #conteudo;

    constructor(caminho) {
        this.#caminho = caminho;
    }

    get caminho() {
        return this.#caminho;
    }

    set caminho(novoCaminho) {
        this.#caminho = novoCaminho;
    }

    set conteudo(dados) {
        this.#conteudo = dados;
    }

    read() {
        let dataBuffer = readFileSync(this.caminho)
        this.conteudo(JSON.parse(dataBuffer));
    }

    *iterator() {
        for (let item of this.#conteudo) yield item;
    }
}

export { Reader }