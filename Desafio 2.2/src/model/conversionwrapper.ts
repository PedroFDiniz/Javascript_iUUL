class ConversionWrapper {
    #from: string;
    #to: string;
    #value: number;

    constructor(from:string, to:string, value:number) {
        this.#from = from;
        this.#to = to;
        this.#value = value;
    }

    get from() {
        return this.#from;
    }

    get to() {
        return this.#to;
    }

    get value() {
        return this.#value;
    }
}

export default ConversionWrapper;