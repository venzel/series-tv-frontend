import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Register } from '../../models';

import { RegisterService } from '../../services';

@Component({
    selector: 'app-register',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router,
        private registerService: RegisterService
    ) {}

    ngOnInit(): void {
        this.generateForm();
    }

    generateForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    registerUser() {
        if (this.form.invalid) {
            return false;
        }

        const register: Register = this.form.value;

        this.registerService.save(register).subscribe(
            (data) => {
                console.log(JSON.stringify(data));

                const msg: string = 'Realize o login para acessar o sistema.';

                this.snackBar.open(msg, 'Sucesso', { duration: 5000 });

                this.router.navigate(['/login']);
            },
            (err) => {
                console.log(JSON.stringify(err));

                let msg: string = 'Tente novamente em instantes.';

                if (err.status == 400) {
                    msg = err.error.errors.join(' ');
                }

                this.snackBar.open(msg, 'Erro', { duration: 5000 });
            }
        );

        return false;
    }
}
