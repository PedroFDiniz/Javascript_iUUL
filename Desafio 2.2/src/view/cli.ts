import Input from '../utils/input.js';
import Output from '../utils/output.js';
import Validate from '../utils/validacao.js';

class CLI {
    #menuId;
    #output;
    #input;

    constructor() {
        this.#menuId = 0;
        this.#input = new Input();
        this.#output = new Output();
    }

    readCountryCodes = () => {
        const originCountry: string = this.#input.readString(`Moeda de origem: `, `Código de país inválido`, {
            capitalize: true,
            isValid: Validate.validateCoutryCode,
        });

        const targetCountry: string = this.#input.readString(`Moeda de destino: `, `Código de país inválido`, {
            capitalize: true,
            regExp: "/^(?!" + originCountry + ").{3}$/gim",
            isValid: Validate.validateCoutryCode,
        });

        const value: number = this.#input.readFloat(`Valor: `, `Valor inválido`, {
            isValid: Validate.validateValue,
        })
    }

}