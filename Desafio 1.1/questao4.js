import PromptSync from 'prompt-sync'
class Aluno {
    constructor(matricula, nome) {
        this.matricula = Number(matricula)
        this.nome = nome
    }

    compareTo(aluno) {
        if (this.nome < aluno.nome) {
            return -1;
        } if (this.nome > aluno.nome) {
            return 1;
        } return 0;
    }

    addNotaP1(nota) {
        this.P1 = nota;
    }

    addNotaP2(nota) {
        this.P2 = nota;
    }

    get NF() {
        let nf = 0;
        if (this.P1 !== undefined) {
            nf += this.P1;
        } if (this.P2 !== undefined) {
            nf += this.P2;
        } return nf/2;
    }

    equals(outroAluno) {
        return (this.matricula === outroAluno.matricula);
    }
}
class Turma {
    constructor(alunos) {
        this.alunos = alunos;
    }

    addAluno(a) {
        for (let i = 0; i < this.alunos.length; i++) {
            if (a.equals(this.alunos[i])) {
                return false;
            }
        } this.alunos.push(a);
        return true;
    }

    removerAluno(matricula) {
        for (let i = 0; i < this.alunos.length; i++) {
            if (this.alunos[i].matricula === matricula) {
                this.alunos.splice(i,i);
                return true;
            }
        } return false;
    }

    listaDeAlunos() {
        this.alunos.sort( (a,b)=>(a.nome > b.nome ? 1 : ((b.nome > a.nome) ? -1 : 0)) );
        console.log("—----------------------------------------------")
        console.log("Matricula".padEnd(11) + "Nome".padEnd(19) + "P1".padEnd(6) + "P2".padEnd(6) + "NF")
        console.log("—----------------------------------------------")
        for (let i = 0; i < this.alunos.length; i++) {
            let matricula = "  " + String(this.alunos[i].matricula).padEnd(7) + "  ";
            let nome = this.alunos[i].nome.padEnd(16);
            let p1 = (this.alunos[i].P1 !== undefined? Number(this.alunos[i].P1).toFixed(1).padStart(6) : "-".padStart(4));
            let p2 = (this.alunos[i].P2 !== undefined? Number(this.alunos[i].P2).toFixed(1).padStart(6) : "-".padStart(4));
            let nf = Number(this.alunos[i].NF).toFixed(1).padStart(6);
            console.log(matricula + nome + p1 + p2 + nf);
        }
        console.log("—----------------------------------------------")
    }
}

let rodando = true;
let ana = new Aluno(12345,"Ana de Almeida");
ana.addNotaP2(8);
ana.addNotaP1(9.5);
let turma1 = new Turma([ana]);
const prompt = PromptSync({sigint:true});
while (rodando) {
    let mat = prompt('Matricula: ');
    let nome = prompt('Nome: ');
    let a = new Aluno(mat,nome);
    let nota1 = prompt('Nota P1: ');
    if (nota1 !== undefined) {
        a.P1 = nota1;
    }
    let nota2 = prompt('Nota P2: ');
    if (nota2 !== undefined) {
        a.P2 = nota2;
    }
    if (!turma1.addAluno(a)) {
        console.log("O Aluno ja esta na turma!");
    } else {
        console.log("Aluno adicionado com sucesso!");
    } console.log("");

    let resposta = prompt('Adicionar outro? (Y/N) ');
    if (resposta.toUpperCase() !== "Y") {
        rodando = false;
    }
} turma1.listaDeAlunos();