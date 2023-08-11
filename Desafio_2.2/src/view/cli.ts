import Input from '../utils/input.js';
import Output from '../utils/output.js';
import Validate from '../utils/validation.js';
import ConversionWrapper from '../model/conversionwrapper.js';
import { formatValue, formatConversionRate } from '../utils/formatting.js';

class CLI {
    #input:Input;
    #output:Output;
    #quit:boolean;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
        this.#quit = false;
    }

    readConversionPrompts = () => {
        const originCountry:string = this.#input.readString(`Moeda de origem: `, `Código de país inválido`, {
            capitalize: true,
            regExp: /^\w{3}$|^$/gim,
        });

        if (originCountry === "") {
            this.#quit = true;
            return
        }

        const targetCountry:string = this.#input.readString(`Moeda de destino: `, `Código de país inválido`, {
            capitalize: true,
            regExp: "/^(?!" + originCountry + ").{3}$/gim",
            isValid: Validate.validateCoutryCode,
        });

        const value:number = this.#input.readFloat(`Valor: `, `Valor inválido`, {
            isValid: Validate.validateValue,
        })

        return new ConversionWrapper(originCountry,targetCountry,value);
    }

    printResults = (promise:Promise<any>) => {
        promise.then( (result) => {
            this.#output.writeLine(
                result.query.from + " " +
                formatValue(result.query.amount) +
                " => " + result.query.to + " " +
                formatValue(result.result));
            this.#output.writeLine("Taxa: " + formatConversionRate(result.info.rate));
         } );
    }

    hasQuit() {
        return this.#quit;
    }

}

export default CLI;