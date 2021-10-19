import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpUtilService {
    constructor(private router: Router) {}

    headers() {
        let httpHeaders: HttpHeaders = new HttpHeaders();

        if (localStorage['token']) {
            httpHeaders = httpHeaders.set(
                'Authorization',
                'Bearer ' + localStorage['token']
            );
        }

        return { headers: httpHeaders };
    }

    getUserId(): string {
        if (!localStorage['token']) {
            return '';
        }

        const dataUser = this.getDataUser();

        return dataUser ? dataUser.id : '';
    }

    getDataUser() {
        if (!localStorage['token']) {
            return '';
        }

        return JSON.parse(atob(localStorage['token'].split('.')[1]));
    }

    guard() {
        if (!this.getDataUser()) {
            this.router.navigate(['/login']);
        }
    }
}
