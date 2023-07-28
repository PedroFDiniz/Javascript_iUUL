import { DateTime } from 'luxon';
import { Error } from '../controller/error.js';
import { validateCPF } from '../Utils/data-validation.js';

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

    create(name, document_number, birthday, income_monthly, marital_status) {
        let errors = [];

        if (name.length < 5 || name.length > 60) errors.push(Error.INVALID_NAME);
        if (!validateCPF(document_number)) errors.push(Error.INVALID_DOCUMENT);
        if (DateTime.fromFormat(birthday,"ddmmyyyy") < DateTime.now().minus({ year: 18 })) errors.push(Error.INVALID_DATE);
        if (!validateIncome(income_monthly)) errors.push(Error.INVALID_INCOME);
        if (!validateMaritalStatus(marital_status)) errors.push(Error.INVALID_MARITAL_STATUS);

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