import { AbstractControl } from '@angular/forms';

export class CnpjValidator {
    static validate(control: AbstractControl): { [key: string]: boolean } {
        if (this.cnpjValid(control.value)) {
            return null;
        }

        return { cnpj: true };
    }

    static cnpjValid(cnpj: any): boolean {
        cnpj = !cnpj || cnpj.replace(/\D/g, '');

        let cnpjsInvsRegex =
            /1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|0{14}/;

        if (!cnpj || cnpj.length !== 14 || cnpjsInvsRegex.test(cnpj)) {
            return false;
        }

        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        let digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;

        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;

            if (pos < 2) {
                pos = 9;
            }
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== parseInt(digits.charAt(0), 10)) {
            return false;
        }

        size += 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;

        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;

            if (pos < 2) {
                pos = 9;
            }
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        return result === parseInt(digits.charAt(1), 10);
    }
}
