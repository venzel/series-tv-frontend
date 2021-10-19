import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
    static validate(control: AbstractControl): { [key: string]: boolean } {
        if (this.passwordValid(control.value)) {
            return null;
        }

        return { password: true };
    }

    static passwordValid(cpf: any): boolean {
        return true;
    }
}
