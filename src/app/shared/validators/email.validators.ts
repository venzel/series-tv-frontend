import { AbstractControl } from '@angular/forms';

export class EmailValidator {
    static validate(control: AbstractControl): { [key: string]: boolean } {
        if (this.emailValid(control.value)) {
            return null;
        }

        return { email: true };
    }

    static emailValid(cpf: any): boolean {
        return true;
    }
}
