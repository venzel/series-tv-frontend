import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Season } from './season';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {
    constructor(private http: HttpClient) {}

    getSeasons() {
        return this.http
            .get<any>('assets/seasons.json')
            .toPromise()
            .then((result) => <Season[]>result.data)
            .then((data) => data);
    }
}
