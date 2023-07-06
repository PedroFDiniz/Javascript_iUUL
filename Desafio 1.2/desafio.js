class InvalidInputError extends Error {
    constructor(message) {
        super(message);
    }
}

/* Representa um CPF. A necessidade de uma classe própria para esse objeto se dá para facilitar o uso de funções como toString() e geraCPF(), bem como seu construtor.
 * Como não há necessidade da comparação dos números do CPF em si exceto na validação dos dois últimos dígitos, é mais conveniente manter o objeto representado como uma String.
 */
class CPF {
    #cpf;

    constructor(cpf) {
        if (cpf === undefined) {
            this.#cpf = CPF.geraCPF();
        } else {
            if (Validacao.cpf(cpf)) {
                this.#cpf = cpf;
            } else {
                throw new InvalidInputError("O CPF passado é inválido!")
            }
        }
    }

    get CPF() {
        return this.#cpf;
    }

    equals(outroCPF) {
        return (this.CPF !== outroCPF.CPF);
    }

    /* Retorna o número de CPF formatado como 'xxx.xxx.xxx-xx'.
     * return Uma string formatada representando o objeto.
     */
    toString() {
        let resultado = "";
        resultado += this.#cpf.substring(0,3) + ".";
        resultado += this.#cpf.substring(3,6) + ".";
        resultado += this.#cpf.substring(6,9) + "-";
        resultado += this.#cpf.substring(9,11);
        return resultado;
    }

    /* Um gerador aleatório de CPF. Cria um número de CPF aleatório que cumpra os requisitos do anexo A do desafio.
     * @return Uma String válida, com 11 dígitos, para a criação de um objeto CPF.
     */
    static geraCPF() {
        let cpf = "";
        // Gera 9 números aleatórios
        for (let i = 0; i < 9; i++) {
            cpf = cpf + Math.floor(Math.random() * 10);
        }

        let digitoJ = "";
        let digitoK = "";
        let somaJ = 0;
        let somaK = 0;
        // Regras de geração dos últimos 2 dígitos
        for (let i = 0; i < 9; i++) {
            somaJ += (10 - i) * Number(cpf[i]);
            somaK += (11 - i) * Number(cpf[i]);
        } 
        let restoJ = somaJ % 11;
        (restoJ < 2? digitoJ += 0 : digitoJ += 11 - restoJ);
        somaK += 2 * Number(digitoJ[0]);
        let restoK = somaK % 11;
        (restoK < 2? digitoK += 0 : digitoK += 11 - restoK);
        cpf += digitoJ;
        cpf += digitoK;
        return cpf;
    }
}

class Paciente {
    #cpf;
    #nome;
    #dataNascimento;
    static #IDADE_MIN = 13;

    constructor(cpf, nome = "generico", nascimento = "01/01/2000") {
        if (!Validacao.nome(nome)) {
            throw new InvalidInputError("Nome Invalido!");
        }
        if (!Validacao.dataDeNascimento(nascimento)) {
            throw new InvalidInputError("Data de nascimento invalida!");
        }
        (cpf === undefined? this.#cpf = new CPF() : this.#cpf = new CPF(cpf));
        this.#nome = nome;
        this.#dataNascimento = Validacao.criaData(nascimento);
    }

    get CPF() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get data_de_nascimento() {
        return this.#dataNascimento;
    }

    static get idade_minima() {
        return this.#IDADE_MIN;
    }

    equals(outroPaciente) {
        return this.CPF.equals(outroPaciente.CPF);
    }

    toString() {
        let resultado = "";
        resultado += "Nome: " + this.nome;
        resultado += "\nCPF: " + this.CPF.toString();
        resultado += "\nData de nascimento: "
            + String(this.data_de_nascimento.getDate()).padStart(2,"00")
            + "/" + String(this.data_de_nascimento.getMonth()+1).padStart(2,"00")
            + "/" + this.data_de_nascimento.getFullYear();
        return resultado;
    }
}

class Consulta {
    #cpf;
    #dataConsulta;
    #dataFim;

    constructor(cpf, dataDaConsulta, horaInicial, horaFinal) {
        if (!Validacao.cpf(cpf)) {
            throw new InvalidInputError("CPF invalido!");
        }
        if (!Validacao.dataDeConsulta(dataDaConsulta, horaInicial, horaFinal)) {
            throw new InvalidInputError("Data Invalida!");
        }

        this.#cpf = new CPF(cpf);
        this.#dataConsulta = criaHorario(dataDaConsulta, horaInicial);
        this.#dataFim = criaHorario(dataDaConsulta, horaFinal);
    }

    get CPF() {
        return this.#cpf;
    }

    get data_da_consulta() {
        return this.#dataConsulta;
    }

    get fim_da_consulta() {
        return this.#dataFim;
    }

    /* Esta função checa se a Consulta já aconteceu ou não.
     * @return um booleano.
     */
    isPendente() {
        let agora = new Date(Date.now());
        return (this.#dataConsulta > agora);
    }

    equals(outraConsulta) {
        if (!this.CPF.equals(outraConsulta.CPF)) {
            return false;
        }

        if (this.data_da_consulta !== outraConsulta.data_da_consulta) {
            return false;
        }

        if (this.fim_da_consulta !== outraConsulta.fim_da_consulta) {
            return false;
        }
        return true;
    }

}

class Consultorio {
    // #cadastros é um objeto do tipo Map<Paciente, Consulta[]>
    #cadastros;

    constructor(cadastros) {
        // Caso não seja passado nenhum parâmetro
        if (cadastros === undefined) {
            this.#cadastros = new Map();
        } else {
            this.#cadastros = cadastros;
        }
    }

    cadastrar(cpf, nome, dataNascimento) {
        let novoPaciente = new Paciente(cpf, nome, dataNascimento);
        for (let paciente of this.#cadastros.keys()) {
            if (paciente.equals(novoPaciente)) {
                return false;
            }
        }
        this.#cadastros.set(novoPaciente,[]);
        return true;
    }

    descadastrar(cpf) {
        // Cria um paciente generico só para facilitar a pesquisa
        let aRemover = new Paciente(cpf);

        for (let paciente of this.#cadastros.keys()) {
            if (paciente.equals(aRemover)) {
                // Se o paciente for encontrado, checar suas consultas
                for (let consulta of this.#cadastros.get(paciente)) {
                    if (consulta.isPendente()) return false;
                }

                // Se nenhuma das consultas estiver pendente, apagar a chave e valores do mapa de cadastros
                this.#cadastros.delete(paciente);
                return true;
            }
        } return false;
    }
}

/* Classe com métodos auxiliares para as validações relevantes para o desafio.
 */
class Validacao {

    /* Testa se o CPF passado cumpre todas as condições descritas no desafio para ser válido.
     * @param Uma string com o CPF a ser analisado.
     * @return Retorna um booleano.
     */
    static cpf(cpf) {
        // Checa se 'cpf' tem tamanho 11
        // A conversão para String é para o caso do objeto passado ser um numero
        if (String(cpf).length !== 11) {
            return false;
        }

        // Checa se são todos números
        let rule1 = /^\d{11}/g;
        if (!rule1.test(cpf)) {
            return false;
        }


        // Checa se todos os caracteres são iguais
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

        // Cria uma expressão regular para fazer o teste
        let regexString = "^[0-9]{9}";
        regexString += (restoJ < 2? "[0]{1}" : "[" + (11-restoJ) + "]{1}");
        regexString += (restoK < 2? "[0]{1}" : "[" + (11-restoK) + "]{1}");
        let regex = new RegExp(regexString);

        return regex.test(cpf);
    }

    /* Testa se o nome passado possui tamanho maior ou igual a 5.
     * @param Uma String a ser testada.
     * @return Retorna um booleano apontando se a condicao foi satisfeita.
     */
    static nome(nome) {
        return (nome.length >= 5);
    }

     /* Testa se uma data fornecida é válida, de acordo com os requisitos do desafio.
     * @param Um objeto Date.
     * @return Um booleano.
     */
     static dataDeNascimento(dataDeNascimento) {
        if (Validacao.data(dataDeNascimento)) {
            return Validacao.calculaIdade(dataDeNascimento) > Paciente.idade_minima;
        }
        return false;
    }

    /* Testa se a String passada é uma data válida no formato DD/MM/AAAA.
     * @param Uma String candidata a data válida.
     * @return Um booleano que confirma se a data é válida ou não.
     */
    static data(data) {
        // Cria expressao regular para o formato DD/MM/AAAA
        const regex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/g;
        return regex.test(data);
    }

    static hora(hora) {
        // Checa se a String está no formato HHmm e é múltipla de 15 minutos
        let regex = /^((([0-1]{1}[0-9]{1})|(2{1}[0-3]{1}))(00|15|30|45))|2400$/g;
        return regex.test(hora);
    }

    static dataDeConsulta(data, horaInicial, horaFinal) {
        let agora = new Date(Date.now());
        if (!Validacao.data(data)) {
            return false;
        }
        if (!Validacao.hora(horaInicial) || !Validacao.hora(horaFinal)) {
            return false;
        }
        if (!(Number(horaFinal) > Number(horaInicial))) {
            return false;
        }

        let dataConsulta = Validacao.criaHorario(data, horaInicial);
        return (agora < dataConsulta);
    }

    /* Função auxiliar para calcular a idade de um sujeito em anos a partir da data de nascimento passada como parâmetro.
     * @param Um objeto Date representando a data de nascimento do sujeito.
     * @return Um booleano.
     */
    static calculaIdade(dataNascimento) {
        let hoje = new Date();
        let nascimento = Validacao.criaData(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        let meses = hoje.getMonth() - nascimento.getMonth();
        if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        } return idade;
    }

    /* Função auxiliar para criação de um objeto Date a partir de uma String no formato DD/MM/AAAA.
     * Para essa função, assume-se que a String ja é uma data válida, então é recomendado o uso da função validaData(data) antes.
     * @param Uma String no formato DD/MM/AAAA
     * @return Um objeto Date
     */
    static criaData(string) {
        let componentes = string.split("/");
        let data = new Date(componentes[2],componentes[1]-1,componentes[0]);
        return data;
    }

    /* Cria um objeto Date a partir da data e da hora passadas como parâmetro no formato String.
     * @param Duas Strings, a primeira com a data no formato "DD/MM/AAAA", e a segunda no formato "HHmm".
     * @return Um objeto Date com as data e hora passadas.
     */
    static criaHorario(data, hora) {
        let resultado = Validacao.criaData(data);
        let horas = Number(hora.substring(0,2));
        let minutos = Number(hora.substring(2,4));
        resultado.setHours(horas, minutos);
        return resultado;
    }
}

let cpf1 = CPF.geraCPF();
let cpf2 = CPF.geraCPF();
let cpf3 = CPF.geraCPF();
let cpf4 = CPF.geraCPF();
let cpf5 = CPF.geraCPF();
//console.log(cpf1.toString() + " " + cpf2.toString() + " " + cpf3.toString() + " " + cpf4.toString() + " " + cpf5.toString() + "\n");
//let p1 = new Paciente(cpf1);
//let p2 = new Paciente(cpf2);
//let p3 = new Paciente(cpf3);
//let p4 = new Paciente(cpf4);
//let p5 = new Paciente(cpf5);
//console.log(p1.toString() + "\n");
//console.log(p2.toString() + "\n");
//console.log(p3.toString() + "\n");
//console.log(p4.toString() + "\n");
//console.log(p5.toString() + "\n");

let c1 = new Consultorio();
c1.cadastrar(cpf1,"Manuel")
c1.cadastrar(cpf2,"Manuela")
c1.cadastrar(cpf3,"Paulo")
c1.cadastrar(cpf4,"Maria")
c1.cadastrar(cpf5,"Miguel")
console.log(c1);