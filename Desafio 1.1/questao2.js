import {Vertice} from './questao1.js';

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
    }

    tipo() {

    }

    clone() {
        return new Triangulo(this.v1,this.v2,this,v3);
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

let t = new Triangulo(new Vertice(1,2), new Vertice(4,3), new Vertice(3,4));
console.log(t.area);