import { Reader } from '../model/reader.js'
import { ClientList } from '../model/clientlist.js'

class SessionManager {
    #reader;
    #clientlist;
    #errors;

    constructor() {
        this.#reader = new Reader();
        this.#clientlist = new ClientList();
        this.#errors = new Map();
    }

    get reader() {
        return this.#reader;
    }

    get client() {
        return this.#clientlist.iterator();
    }

    *error() {
        for (let item of this.#errors.keys()) {
            yield {
                "dados": item,
                "erros": this.#errors.get(item)
            }
        }
    }
}

const session = new SessionManager();

export default session;