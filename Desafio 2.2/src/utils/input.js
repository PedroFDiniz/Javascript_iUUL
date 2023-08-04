import Output from 'output.js';

class Input {
    #prompt;
    #output;

    constructor() {
        this.#prompt = PromptSync({ sigint: true });
        this.#output = new Output();
    }

    readString(label, errorMsg, options = {}) {
        const min = options.min || 0;
        const max = options.max || 10000;
        const capitalize = options.capitalize || false;
        const validChars = options.validChars || null;
        const regExp = options.regExp || null;
        const isValid = options.isValid || null;

        for (;;) {
            let data = this.#prompt(label);

            if (capitalize) data = data.toUpperCase();

            if (data.length < min || data.length > max) {
                this.#output.writeLine(errorMsg);
            } else if (
                validChars &&
                [...data].some((c) => !validChars.includes(c))
            ) {
                this.#output.writeLine(errorMsg);
            } else if (regExp && !data.match(regExp)) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(data)) {
                this.#output.writeLine(errorMsg);
            } else {
                return data;
            }
        }
    }

    readInteger(label, errorMsg, options = {}) {
        const min = options.min || Number.MIN_SAFE_INTEGER;
        const max = options.max || Number.MAX_SAFE_INTEGER;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);
            const m = data.match(/^([+-]{0,1})\d+$/);
            const num = Number.parseInt(data);

            if (!m || isNaN(num)) {
                this.#output.writeLine(errorMsg);
            } else if (num < min || num > max) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(num)) {
                this.#output.writeLine(errorMsg);
            } else {
                return num;
            }
        }
    }

    readFloat(label, errorMsg, options = {}) {
        const min = options.min || -Number.MIN_VALUE;
        const max = options.max || Number.MAX_VALUE;
        const minDecimals = options.minDecimals || 0;
        const maxDecimals = options.maxDecimals || 20;
        const isValid = options.isValid || null;

        for (;;) {
            let decimalPlaces = 0;

            const data = this.#prompt(label);

            const m = data.match(/^[+-]{0,1}\d+(?:\.(\d*)){0,1}$/);
            const num = Number.parseFloat(data);

            if (m && m[1]) {
                decimalPlaces = m[1].length;
            }

            if (!m || isNaN(num)) {
                this.#output.writeLine(errorMsg);
            } else if (
                num < min ||
                num > max ||
                decimalPlaces < minDecimals ||
                decimalPlaces > maxDecimals
            ) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(num)) {
                this.#output.writeLine(errorMsg);
            } else {
                return num;
            }
        }
    }
}

export default Input;