import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from '../../models';
import { LoginService } from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.generateForm();
    }

    generateForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    logon() {
        if (this.form.invalid) {
            this.snackBar.open('dados invalidos', 'Error', { duration: 5000 });
            return;
        }

        const login: Login = this.form.value;

        this.loginService.logon(login).subscribe(
            (data) => {
                localStorage['token'] = data['data']['token'];

                const usuarioData = JSON.parse(atob(data['data']['token'].split('.')[1]));

                if (usuarioData['role'] == 'ROLE_ADMIN') {
                    alert('ATENCAO, USUARIO ADMIN!!!');
                } else {
                    this.router.navigate(['/series']);
                }
            },
            (err) => {
                let msg: string = 'Tente novamente em instantes.';

                if (err['status'] == 401) {
                    msg = 'Email/senha inválido(s).';
                }

                this.snackBar.open(msg, 'Erro', { duration: 5000 });
            }
        );
    }
}
