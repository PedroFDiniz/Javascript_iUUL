class Error {
    static get INVALID_NAME() {
        return "Nome inválido";
    }

    static get INVALID_DOCUMENT() {
        return "CPF inválido";
    }

    static get INVALID_DATE() {
        return "Data de nascimento inválida";
    }

    static get INVALID_INCOME() {
        return "Renda mensal inválida";
    }

    static get INVALID_MARITAL_STATUS() {
        return "Estado civil inválido";
    }
}

export { Error }