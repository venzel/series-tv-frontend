import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Episode } from './episode';

@Injectable({
    providedIn: 'root',
})
export class EpisodeService {
    constructor(private http: HttpClient) {}

    getEpisodes() {
        return this.http
            .get<any>('http://localhost:8080/seasons/1')
            .toPromise()
            .then((result) => <Episode[]>result.episodes)
            .then((data) => data);
    }
}
