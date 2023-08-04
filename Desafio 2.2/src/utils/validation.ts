class Validate {
    /**
     * Checks if the string is a valid country code.
     * @param parameter the string to be validated
     * @returns {boolean} whether the string is a valid country code
     */
    static validateCoutryCode(parameter:string): boolean {
        let regex:RegExp = /^\w{3}$/gim;
        return regex.test(parameter);
    }

    /**
     * Checks if the string is a valid amount of wealth
     * @param value the value to be tested
     * @returns {boolean} whether the parameter is a valid amount of wealth
     */
    static validateValue(value:number): boolean {
        if (!(value > 0)) return false;
        return true;
    }
}



export default Validate;