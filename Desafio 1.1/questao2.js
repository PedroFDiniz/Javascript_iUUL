import {Vertice} from './questao1.js';
import PromptSync from 'prompt-sync'

class Triangulo {
    constructor(v1,v2,v3) {
        let slope1 = (v2.y - v1.y)/(v2.x - v1.x);
        let slope2 = (v3.y - v2.y)/(v3.x - v2.x);
        if (slope1 === slope2) {throw new Error("Os vertices nao formam um triangulo!")};
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    equals(triangulo) {
        return (this.v1.equals(triangulo.v1) &&
            this.v2.equals(triangulo.v2) &&
            this.v3.equals(triangulo.v3));
    }

    get perimetro() {
        let perimetro = 0;
        perimetro += this.v1.distancia(this.v2);
        perimetro += this.v2.distancia(this.v3);
        perimetro += this.v3.distancia(this.v1);
        return perimetro;
    }

    tipo() {
        let lado_a = this.v1.distancia(this.v2);
        let lado_b = this.v2.distancia(this.v3);
        let lado_c = this.v3.distancia(this.v1);
        if (lado_a === lado_b && lado_b === lado_c) {
            return "equilatero";
        } if (lado_a === lado_b || lado_b === lado_c || lado_a === lado_c) {
            return "isosceles";
        } else {
            return "escaleno";
        }
    }

    clone() {
        return new Triangulo(this.v1,this.v2,this.v3);
    }

    get area() {
        let lado_a = this.v1.distancia(this.v2);
        let lado_b = this.v2.distancia(this.v3);
        let lado_c = this.v3.distancia(this.v1);
        let s = (lado_a + lado_b + lado_c)/2;
        let resultado = Math.sqrt(s * (s - lado_a) * (s - lado_b)* (s - lado_c));
        return resultado;
    }
}

function criaTriangulo(nome) {
    console.log("\n === " + nome + " === ");
    let nome1 = prompt('X1 Y1: ');
    let xy1 = nome1.split(" ");
    console.log("");

    let nome2 = prompt('X2 Y2: ');
    let xy2 = nome2.split(" ");
    console.log("");

    let nome3 = prompt('X3 Y3: ');
    let xy3 = nome3.split(" ");
    console.log("");

    let t = new Triangulo(new Vertice(xy1[0],xy1[1]), new Vertice(xy2[0],xy2[1]), new Vertice(xy3[0],xy3[1]));
    return t;
}

const prompt = PromptSync({sigint:true});
let rodando = true;
let estadoAutomato = 0;
let t1,t2,t3;
while (rodando) {
    switch(estadoAutomato) {
        case 0:
            t1 = criaTriangulo("Triangulo 1")
            estadoAutomato++;
            break;
        case 1:
            t2 = criaTriangulo("Triangulo 2")
            estadoAutomato++;
            break;
        case 2:
            t3 = criaTriangulo("Triangulo 3")
            estadoAutomato++;
            break;
        default:
            rodando = false;
            break;
    }
} console.log("\nTriangulo 1 === Triangulo 2?");
console.log(t1.equals(t2));
console.log("Triangulo 1 === Triangulo 3?");
console.log(t1.equals(t3));
console.log("Triangulo 2 === Triangulo 3?");
console.log(t2.equals(t3));
console.log("Triangulo 1 perimetro: " + t1.perimetro);
console.log("Triangulo 2 perimetro: " + t2.perimetro);
console.log("Triangulo 3 perimetro: " + t3.perimetro);
console.log("Triangulo 1 area: " + t1.area);
console.log("Triangulo 2 area: " + t2.area);
console.log("Triangulo 3 area: " + t3.area);
console.log("Triangulo 1 tipo: " + t1.tipo());
console.log("Triangulo 2 tipo: " + t2.tipo());
console.log("Triangulo 3 tipo: " + t3.tipo());
console.log("Triangulo 4 clonado de Triangulo 1: ");
let t4 = t1.clone()
console.log(t4);