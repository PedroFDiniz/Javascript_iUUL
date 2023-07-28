import { DateTime } from 'luxon';

function validateCPF(cpf) {
    let rule = /^\d{11}/g;
    if (!rule.test(cpf) || cpf.length !== 11) return false;
    else {
        // Make sure characters aren't all equal
        for (let i = 1; i < cpf.length; i++) {
            // If at least one character is different, break loop
            if (cpf[0] !== cpf[i]) {
                break;
            }
            // Otherwise return false
            if (i === cpf.length - 1) {
                return false;
            }
        }

        // specific validation for brazilian CPF number
        const corpoCPF = cpf.substring(0,9);
        const caudaCPF = cpf.substring(9,11);
        let somaJ = 0;
        let somaK = 0;
        for (let i = 0; i < corpoCPF.length; i++) {
            somaJ += (10 - i) * Number(corpoCPF[i]);
            somaK += (11 - i) * Number(corpoCPF[i]);
        } somaK += 2 * Number(caudaCPF[0]);
        const restoJ = somaJ % 11;
        const restoK = somaK % 11;

        // Regular expression for the final check
        let regexString = "^[0-9]{9}";
        regexString += (restoJ < 2? "[0]{1}" : "[" + (11-restoJ) + "]{1}");
        regexString += (restoK < 2? "[0]{1}" : "[" + (11-restoK) + "]{1}");
        let regex = new RegExp(regexString);

        return regex.test(cpf);
    }
}

function validateBirthday(date) {
    if (date.length !== 8) return false;
    let newDate = DateTime.fromFormat(date,"ddLLyyyy");
    return newDate < DateTime.now().minus({ year: 18 });
}

function validateIncome(income) {
    let value = income.split(",");
    if (value.length > 2) return false;
    if (value[1].length > 2) return false;
    let actualValue = (value.length === 2? value.join(".") : value);
    return !isNaN(parseFloat(actualValue));
}

function validateMaritalStatus(status) {
    if (status.length > 1) return false;
    let regex = /^[CSVDcsvd]/g;
    return regex.test(status);
}

export { validateCPF, validateBirthday, validateIncome, validateMaritalStatus }