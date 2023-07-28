import { Client } from './client.js';

class ClientList {
    #clients;

    constructor() {
        this.#clients = [];
    }

    add = (client) => this.#clients.push(client);

    remove = (client) => this.#removeClientWhere((c) => c.equals(client));

    #removeClientWhere(predicate) {
        const index = this.#clients.findIndex(predicate);

        if (index != -1) {
            this.#clients.splice(index, 1);
            return true;
        }

        return false;
    }

    *iterator() {
        for (let client of this.#clients) yield client;
    }
}