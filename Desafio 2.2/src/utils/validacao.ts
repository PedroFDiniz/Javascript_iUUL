class Validate {
    static validateCoutryCode(parameter:string): boolean {
        let regex:RegExp = /^\w{3}$/gim;
        return regex.test(parameter);
    }

    static validateValue(value:number): boolean {
        
        return false;
    }
}



export default Validate;