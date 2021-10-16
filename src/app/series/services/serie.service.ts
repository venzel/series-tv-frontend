import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Serie } from '../models';
import { HttpUtilService } from '../../shared';

@Injectable()
export class SerieService {
    private readonly PATH: string = 'series';
    private readonly PATH_CREATE_SERIE = 'serie_wizard';
    private readonly PATH_SHOW_SERIE = 'series/{serieId}';
    private readonly PATH_UPDATE_SERIE = 'series/{serieId}';
    private readonly PATH_DELETE_SERIE = 'series/{serieId}';

    constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

    // OK
    createSerieExecute(serie: Serie): Observable<any> {
        const url = env.baseApiUrl + this.PATH_CREATE_SERIE;

        return this.http.post(url, serie, this.httpUtil.headers());
    }

    // OK
    updateSerieExecute(serie: Serie): Observable<any> {
        const url =
            env.baseApiUrl + this.PATH_UPDATE_SERIE.replace('{serieId}', serie.id);

        return this.http.put(url, serie, this.httpUtil.headers());
    }

    // OK
    listSeriesExecute(): Observable<any> {
        const url = env.baseApiUrl + this.PATH;

        return this.http.get(url, this.httpUtil.headers());
    }

    // Ok
    showSerieExecute(serieId: string): Observable<any> {
        const url = env.baseApiUrl + this.PATH_SHOW_SERIE.replace('{serieId}', serieId);

        return this.http.get(url, this.httpUtil.headers());
    }

    // Ok
    deleteSerieExecute(serieId: string): Observable<any> {
        const url = env.baseApiUrl + this.PATH_DELETE_SERIE.replace('{serieId}', serieId);

        return this.http.delete(url, this.httpUtil.headers());
    }
}
