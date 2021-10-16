/*
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Serie } from '../models';
import { HttpUtilService } from './http-util.service';

@Injectable()
export class SerieService {
    private readonly PATH: string = 'series';
    private readonly PATH_SHOW_SERIE = 'serie/{serieId}';

    constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

    listSeries(): Observable<any> {
        return this.http.get(env.baseApiUrl + this.PATH, this.httpUtil.headers());
    }

    showSerie(serieId: string): Observable<any> {
        return this.http.get(
            env.baseApiUrl + this.PATH_SHOW_SERIE.replace('{serieId}', serieId),
            this.httpUtil.headers()
        );
    }

    saveSerie(serie: Serie): Observable<any> {
        return this.http.post(env.baseApiUrl + this.PATH, serie, this.httpUtil.headers());
    }
}
*/
