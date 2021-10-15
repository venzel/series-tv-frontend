import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Serie } from './serie';

@Injectable()
export class SerieService {
    constructor(private http: HttpClient) {}

    async getSeries(): Promise<any> {
        return this.http
            .get<any>('http://localhost:8080/series')
            .toPromise()
            .then((result) => <Serie[]>result)
            .then((data) => data);
    }

    async deleteSerie(id: string): Promise<any> {
        return this.http
            .delete<any>(`http://localhost:8080/series/${id}`)
            .toPromise()
            .then(() => null);
    }

    async saveSerie(serie: any): Promise<any> {
        return this.http
            .post<any>('http://localhost:8080/series', serie)
            .toPromise()
            .then((response) => response.json());
    }
}
