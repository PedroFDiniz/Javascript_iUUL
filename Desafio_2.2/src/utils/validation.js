"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
var Validate = /** @class */ (function () {
    function Validate() {
    }
    /**
     * Checks if the string is a valid country code.
     * @param parameter the string to be validated
     * @returns {boolean} whether the string is a valid country code
     */
    Validate.validateCoutryCode = function (parameter) {
        var regex = /^\w{3}$/gim;
        return regex.test(parameter);
    };
    /**
     * Checks if the string is a valid amount of wealth
     * @param value the value to be tested
     * @returns {boolean} whether the parameter is a valid amount of wealth
     */
    Validate.validateValue = function (value) {
        if (!(value > 0))
            return false;
        return true;
    };
    return Validate;
}());
export default Validate;
