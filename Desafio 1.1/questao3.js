import {Vertice} from './questao1.js';
import PromptSync from 'prompt-sync'

class Poligono {
    constructor(vertices) {
        if (vertices.length < 3) { throw new Error("Nao e possivel criar um poligono com menos que tres vertices!") }
        this.vertices = vertices;
    }

    addVertice(v) {
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].equals(v)) {
                return false;
            }
        }
        this.vertices.push(v);
        return true;
    }

    get perimetro() {
        var resultado = 0;
        for (let i = 1; i < this.vertices.length; i++) {
            resultado += this.vertices[i].distancia(this.vertices[i-1]);
        } resultado += this.vertices[this.vertices.length - 1].distancia(this.vertices[0]);
        return resultado;
    }

    get qtdVertices() {
        return this.vertices.length;
    }

}

//let p = new Poligono(new Vertice(1,2), new Vertice(2,3));
let rodando = true;
let indice = 1;
let argumentos = []
while (rodando) {
    const prompt = PromptSync({sigint:true});
    console.log("Vertice "+indice);
    let nome = prompt('X Y: ');
    console.log("");
    if (nome == "" || nome == null) {
        rodando = false;
        break;
    }
    let xy = nome.split(" ");
    argumentos.push(new Vertice(parseInt(xy[0]),parseInt(xy[1])));
} let p = new Poligono(argumentos);
console.log(p);
console.log("Perimetro: "+p.perimetro);
console.log("Qtd Vertices: "+p.qtdVertices);
console.log("Adiciona Vertice (9,9): "+p.addVertice(new Vertice(9,9)));
console.log(p);