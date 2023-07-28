import { Reader } from '../model/reader.js'
import { ClientList } from '../model/clientlist.js'

class SessionManager {
    #path = "";
    #reader;
    #clientlist;
    #errors;

    constructor() {
        this.#path = "";
        this.#reader = new Reader();
        this.#clientlist = new ClientList();
        this.#errors = [];
    }

    get path() {
        return this.#path;
    }

    setPath(newPath) {
        this.#path = newPath;
    }

    get reader() {
        return this.#reader;
    }

    get clients() {
        return this.#clientlist;
    }

    get errors() {
        return this.#errors;
    }
}

const session = new SessionManager();

export default session;