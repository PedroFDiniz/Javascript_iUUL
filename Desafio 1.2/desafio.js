class Paciente {
    #cpf;
    #nome;
    #dataNascimento;
    static #IDADE_MIN = 13;

    get CPF() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get data_de_nascimento() {
        return this.#dataNascimento;
    }

    get idade_minima() {
        return this.#IDADE_MIN;
    }

    constructor(cpf, nome, nascimento) {
        if (!validaCPF(cpf)) {
            throw new InvalidInputException("CPF Invalido!");
        }
        if (!validaNome(nome)) {
            throw new InvalidInputException("Nome Invalido!");
        }
        if (!validaDataDeNascimento(nascimento)) {
            throw new InvalidInputException("Data de nascimento invalida!");
        }
        this.#cpf = Number(cpf);
        this.#nome = nome;
        this.#dataNascimento = this.criaData(nascimento);
    }

    static validaCPF(cpf) {
        // Checa se cpf tem tamanho 11
        if (cpf.length !== 11) {
            return false;
        }

        // Checa se todos os caracteres sao iguais
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[0] !== cpf[i]) {
                break;
            }
            if (i === cpf.length - 1) {
                return false;
            }
        }

        // Valida os caracteres finais do CPF
        let corpoCPF = cpf.substring(0,9);
        let validaCPF = cpf.substring(9,11);
        let somaJ = 0;
        let somaK = 0;
        for (let i = 0; i < corpoCPF.length; i++) {
            somaJ += (10 - i) * Number(corpoCPF[i]);
            somaK += (11 - i) * Number(corpoCPF[i]);
        } somaK += 2 * Number(validaCPF[0]);
        let restoJ = somaJ % 11;
        let restoK = somaK % 11;

        // Cria uma expressao regular para fazer o teste
        let regexString = "^[0-9]{9}";
        regexString += (restoJ < 2? "[0]{1}" : "[" + (11-restoJ) + "]{1}");
        regexString += (restoK < 2? "[0]{1}" : "[" + (11-restoK) + "]{1}");
        let regex = new RegExp(regexString);

        return regex.test(cpf);
    }

    static validaNome(nome) {
        return (nome.length >= 5);
    }

    static validaDataDeNascimento(dataDeNascimento) {
        // Cria expressao regular para o formato DD/MM/AAAA
        const regex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/g;
        if (!regex.test(dataDeNascimento)) {
            return false;
        }
        return this.calculaIdade(dataDeNascimento) >= this.#IDADE_MIN;
    }

    static calculaIdade(dataNascimento) {
        let hoje = new Date();
        let nascimento = this.criaData(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        let meses = hoje.getMonth() - nascimento.getMonth();
        if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    static criaData(string) {
        let componentes = string.split("/");
        let data = new Date(componentes[2],componentes[1],componentes[0]);
        return data;
    }
}

class Cadastro {
    #pacientes = [];

    constructor(pacientes) {
        this.#pacientes = pacientes;
    }

    cadastrar(cpf, nome, dataNascimento) {
        let novoPaciente = new Paciente(cpf, nome, dataNascimento);
        this.#pacientes.push(novoPaciente);
    }

    remover(cpf) {
        for (let paciente of this.#pacientes) {
            if (paciente.CPF === cpf) {
                this.#pacientes.splice(paciente);
                return true;
            }
        } return false;
    }
}