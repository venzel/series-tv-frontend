import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { Register } from '..';

@Injectable()
export class RegisterService {
    private readonly PATH: string = 'users';

    constructor(private http: HttpClient) {}

    save(register: Register): Observable<any> {
        return this.http.post(env.baseUrl + this.PATH, register);
    }
}
