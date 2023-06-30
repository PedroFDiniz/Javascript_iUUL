import {Vertice} from './questao1.js';

class Poligono {
    constructor(...vertices) {
        if (arguments.length < 3) { throw new Error("Nao e possivel criar um poligono com menos que tres vertices!") }
        this.vertices = [];
        for (let i = 0; i < arguments.length; i++) {
            this.vertices.push(arguments[i]);
        }
    }

}

//let p = new Poligono(new Vertice(1,2), new Vertice(2,3));
let p2 = new Poligono(new Vertice(1,2), new Vertice(2,3), new Vertice(3,4));
