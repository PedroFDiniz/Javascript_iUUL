import PromptSync from 'prompt-sync'


export class Vertice {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    distancia(vertice) {
        return Math.sqrt(Math.pow(vertice.x - this.x,2) + Math.pow(vertice.y - this.y,2));
    }

    move(x,y) {
        this.x = x;
        this.y = y;
    }

    equals(vertice) {
        return (this.x == vertice.x && this.y == vertice.y);
    }

    toString() {
        let resultado = "Coordenadas: (" + this.x + ", " + this.y + ")";
        return resultado;
    }
}

export default class {Vertice};