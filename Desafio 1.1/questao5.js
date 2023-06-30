import PromptSync from 'prompt-sync'

class Cliente {
    setNome(nome) {
        if (nome.length >= 5) {
            this.nome = String(nome);
            return true;
        } return false;
    }

    setCPF(cpf) {
        let numCPF = Number(cpf);
        if (numCPF !== NaN && cpf.length === 11) {
            this.cpf = numCPF;
            return true;
        } return false;
    }

    setDataDeNascimento(dataDeNascimento) {
        if (!dataDeNascimento.match("^[0-9]{2}[/][0-9]{2}[/][0-9]{4}") || dataDeNascimento.length !== 10) {
            return false;
        } else {
            let data = dataDeNascimento.split("/");
            let dataFormatada = new Date(data[2],data[1],data[0]);
            if (dataFormatada !== NaN) {
                let agora = new Date(Date.now());
                if ((agora.getFullYear() - dataFormatada.getFullYear()) > 18 || ((agora.getYear() - dataFormatada.getYear()) === 18 && agora.getMonth() >= dataFormatada.getMonth())) {
                    this.dataDeNascimento = dataFormatada;
                    return true;
                }
            } return false;
        }
    }

    setRendaMensal(rendaMensal) {
        let numRenda = Number(rendaMensal);
        if (numRenda !== NaN && rendaMensal >= 0) {
            this.rendaMensal = numRenda;
            return true;
        } return false;
    }

    setEstadoCivil(estadoCivil) {
        if (estadoCivil.length === 1 && estadoCivil.match("[cdsvCDSV]") !== null) {
            this.estadoCivil = String(estadoCivil).toUpperCase();
            return true;
        } return false;
    }

    setDependentes(dependentes) {
        let numDependentes = Number(dependentes)
        if (numDependentes !== NaN && dependentes >= 0 && dependentes <= 10) {
            this.dependentes = numDependentes;
            return true;
        } return false;
    }

    toString() {
        let resultado = "\n";
        resultado += "Nome: " + this.nome;
        let cpf = String(this.cpf);
        resultado += "\nCPF: " + cpf.substring(0,3) + "." + cpf.substring(3,6) + "." + cpf.substring(6,9) + "-" + cpf.substring(9,11);
        let nascDia = String(this.dataDeNascimento.getDate()).padStart(2,"00");
        let nascMes = String(this.dataDeNascimento.getMonth()).padStart(2,"00");
        let nascAno = String(this.dataDeNascimento.getFullYear()).padStart(4);
        resultado += "\nData de Nascimento: " + nascDia + "/" + nascMes + "/" + nascAno;
        resultado += "\nRenda Mensal: " + this.rendaMensal.toFixed(2).replace('.',',');
        resultado += "\nEstado Civil: " + this.estadoCivil;
        resultado += "\nDependentes: " + this.dependentes;
        return resultado;
    }
}

let rodando = true;
const prompt = PromptSync({sigint:true});
let estadoAutomato = 0;
let cliente = new Cliente();
while (rodando) {
    switch(estadoAutomato) {
        case 0:
            let nome = prompt('Nome? ');
            if (cliente.setNome(nome)) {
                estadoAutomato++;
            } else {
                console.log("Nome invalido!");
            }
            break;
        case 1:
            let cpf = prompt('CPF? ');
            if (cliente.setCPF(cpf)) {
                estadoAutomato++;
            } else {
                console.log("CPF invalido!");
            }
            break;
        case 2:
            let data = prompt('Data de Nascimento? ');
            if (cliente.setDataDeNascimento(data)) {
                estadoAutomato++;
            } else {
                console.log("Data invalida!");
            }
            break;
        case 3:
            let renda = prompt('Renda Mensal? ');
            if (cliente.setRendaMensal(renda)) {
                estadoAutomato++;
            } else {
                console.log("Renda invalida!");
            }
            break;
        case 4:
            let estado = prompt('Estado Civil? ');
            if (cliente.setEstadoCivil(estado)) {
                estadoAutomato++;
            } else {
                console.log("Estado invalido!");
            }
            break;
        case 5:
            let dependentes = prompt('Dependentes? ');
            if (cliente.setDependentes(dependentes)) {
                estadoAutomato++;
            } else {
                console.log("Numero invalido!");
            }
            break;
        default:
            rodando = false;
    }
} console.log(cliente.toString());