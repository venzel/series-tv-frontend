import { AbstractControl } from '@angular/forms';

export class CpfValidator {
    static validate(control: AbstractControl): { [key: string]: boolean } {
        if (this.cpfValid(control.value)) {
            return null;
        }
        return { cpf: true };
    }

    static cpfValid(cpf: any): boolean {
        cpf = !cpf || cpf.replace(/\D/g, '');
        let cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;

        if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
            return false;
        }

        let x = cpf.length - 1;
        let digitsTemp = 0;
        let e = 0;
        let h = '';

        for (let i = 0; i <= cpf.length - 3; i++) {
            digitsTemp = cpf.substring(i, i + 1);
            e = e + digitsTemp * x;
            x -= 1;
            h = h + digitsTemp;
        }

        let digits = 11 - (e % 11);
        if (digits === 10 || digits === 11) {
            digits = 0;
        }

        let cpfWitoutDigitVerif = cpf.substring(0, cpf.length - 2) + digits;
        x = 11;
        e = 0;
        for (let j = 0; j <= cpf.length - 2; j++) {
            e += cpfWitoutDigitVerif.substring(j, j + 1) * x;
            x -= 1;
        }

        let digitVerificator = 11 - (e % 11);
        if (digitVerificator === 10 || digitVerificator === 11) {
            digitVerificator = 0;
        }

        return (
            digits + '' + digitVerificator === cpf.substring(cpf.length, cpf.length - 2)
        );
    }
}
