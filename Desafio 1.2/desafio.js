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

    constructor(cpf, nome = "generico", nascimento = "01/01/2000") {
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

    equals(outroPaciente) {
        return this.CPF === outroPaciente.CPF;
    }

    /* Testa se o CPF passado cumpre todas as condições descritas no desafio para ser válido.
     * @param Uma string com o CPF a ser analisado.
     * @return Retorna um booleano.
     */
    static validaCPF(cpf) {
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
    static validaNome(nome) {
        return (nome.length >= 5);
    }

    /* Testa se uma data fornecida é válida, de acordo com os requisitos do desafio.
     * @param Um objeto Date.
     * @return Um booleano.
     */
    static validaDataDeNascimento(dataDeNascimento) {
        if (this.validaData(dataDeNascimento)) {
            return this.calculaIdade(dataDeNascimento) > this.#IDADE_MIN;
        }
        return false;
    }

    /* Testa se a String passada é uma data válida no formato DD/MM/AAAA.
     * @param Uma String candidata a data válida.
     * @return Um booleano que confirma se a data é válida ou não.
     */
    static validaData(data) {
        // Cria expressao regular para o formato DD/MM/AAAA
        const regex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/g;
        if (!regex.test(dataDeNascimento)) {
            return false;
        } return true;
    }

    /* Função auxiliar para calcular a idade de um sujeito em anos a partir da data de nascimento passada como parâmetro.
     * @param Um objeto Date representando a data de nascimento do sujeito.
     * @return Um booleano.
     */
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

    /* Função auxiliar para criação de um objeto Date a partir de uma String no formato DD/MM/AAAA.
     * Para essa função, assume-se que a String ja é uma data válida, então é recomendado o uso da função validaData(data) antes.
     * @param Uma String no formato DD/MM/AAAA
     * @return Um objeto Date
     */
    static criaData(string) {
        let componentes = string.split("/");
        let data = new Date(componentes[2],componentes[1],componentes[0]);
        return data;
    }
}

class Consulta {
    #cpf;
    #dataConsulta;
    #dataFim;

    constructor(cpf, dataDaConsulta, horaInicial, horaFinal) {
        if (!Paciente.validaCPF(cpf)) {
            throw new InvalidInputException("CPF invalido!");
        }
        if (!this.validaDataDeConsulta(dataDaConsulta, horaInicial, horaFinal)) {
            throw new InvalidInputException("Data Invalida!");
        }

        this.#cpf = cpf;
        this.#dataConsulta = criaHorario(dataDaConsulta, horaInicial);
        this.#dataFim = criaHorario(dataDaConsulta, horaFinal);
    }

    /* Esta função checa se a Consulta já aconteceu ou não.
     * @return um booleano.
     */
    isPendente() {
        let agora = new Date(Date.now());
        return (this.#dataConsulta > agora);
    }

    /* Cria um objeto Date a partir da data e da hora passadas como parâmetro no formato String.
     * @param Duas Strings, a primeira com a data no formato "DD/MM/AAAA", e a segunda no formato "HHmm".
     * @return Um objeto Date com as data e hora passadas.
     */
    static criaHorario(data, hora) {
        let resultado = Paciente.criaData(data);
        let horas = Number(hora.substring(0,2));
        let minutos = Number(hora.substring(2,4));
        resultado.setHours(horas, minutos);
        return resultado;
    }

    static validaHora(hora) {
        // Checa se a String está no formato HHmm e é múltipla de 15 minutos
        let regex = /^((([0-1]{1}[0-9]{1})|(2{1}[0-3]{1}))(00|15|30|45))|2400$/g;
        if (!regex.test(hora)) {
            return false;
        } return true;
    }

    static validaDataConsulta(data, horaInicial, horaFinal) {
        let agora = new Date(Date.now());
        if (!Paciente.validaData(data)) {
            return false;
        }
        if (!this.validaHora(horaInicial) || !this.validaHora(horaFinal)) {
            return false;
        }
        if (!(Number(horaFinal) > Number(horaInicial))) {
            return false;
        }

        let dataConsulta = this.criaHorario(data, horaInicial);
        return (agora < dataConsulta);
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