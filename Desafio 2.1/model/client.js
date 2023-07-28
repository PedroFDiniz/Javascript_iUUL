import * as dv from '../utils/data-validation.js';
import { Error } from '../controller/error.js';

class Client {
    #name;
    #document_number;
    #birthday;
    #income_monthly;
    #marital_status;

    constructor(name, document_number, birthday, income_monthly, marital_status) {
        this.#name = name;
        this.#document_number = document_number;
        this.#birthday = birthday;
        this.#income_monthly = income_monthly;
        this.#marital_status = marital_status;
    }

    /**
     * Tenta criar um objeto Client validando os parâmetros passados.
     * @param {String} name - um nome para o cliente
     * @param {String} document_number - o cpf do cliente
     * @param {String} birthday - data de nascimento do cliente
     * @param {String} income_monthly - renda mensal do cliente
     * @param {String} marital_status - estado civil do cliente
     * @returns um objeto contendo um campo 'success', caso não hajam problemas na criação, ou um campo 'failure', caso algum erro tenha acontecido
     */
    static create(name, document_number, birthday, income_monthly, marital_status) {
        let errors = [];

        if (name.length < 5 || name.length > 60) errors.push({
            "campo": "Nome",
            "erro": Error.INVALID_NAME
        });
        if (!dv.validateCPF(document_number)) errors.push({
            "campo": "CPF",
            "erro": Error.INVALID_DOCUMENT
        });
        if (!dv.validateBirthday(birthday)) errors.push({
            "campo": "Data de nascimento",
            "erro": Error.INVALID_DATE
        });
        if (!dv.validateIncome(income_monthly)) errors.push({
            "campo": "Renda mensal",
            "erro": Error.INVALID_INCOME
        });
        if (!dv.validateMaritalStatus(marital_status)) errors.push({
            "campo": "Estado civil",
            "erro": Error.INVALID_MARITAL_STATUS
        });

        return (errors.length === 0?
            { success: new Client(name, document_number, birthday, income_monthly, marital_status)} :
            { failure: errors});
    }

    get name() {
        return this.#name
    }

    get documentNumber() {
        return this.#document_number;
    }

    get birthday() {
        return this.#birthday;
    }

    get monthlyIncome() {
        return this.#income_monthly;
    }

    get maritalStatus() {
        return this.#marital_status;
    }

    equals = (obj) => obj.#document_number && obj.#document_number === this.#document_number;
}

export { Client }