import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared';
import { Season } from '../models';

@Injectable()
export class SeasonService {
    private readonly PATH_SHOW_SEASON = 'seasons/{seasonId}';
    private readonly PATH_CREATE_SEASON = 'season_wizard';
    private readonly PATH_UPDATE_SEASON = 'seasons/{seasonId}';
    private readonly PATH_DELETE_SEASON = 'seasons/{seasonId}';

    constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

    // OK
    createSeasonExecute(season: Season): Observable<any> {
        const url = env.baseApiUrl + this.PATH_CREATE_SEASON;

        return this.http.post(url, season, this.httpUtil.headers());
    }

    // OK
    updateSeasonExecute(season: Season): Observable<any> {
        const url =
            env.baseApiUrl + this.PATH_UPDATE_SEASON.replace('{seasonId}', season.id);

        return this.http.put(url, season, this.httpUtil.headers());
    }

    // Ok
    showSeasonExecute(seasonId: string): Observable<any> {
        const url =
            env.baseApiUrl + this.PATH_SHOW_SEASON.replace('{seasonId}', seasonId);

        return this.http.get(url, this.httpUtil.headers());
    }

    // Ok
    deleteSeasonExecute(seasonId: string): Observable<any> {
        const url =
            env.baseApiUrl + this.PATH_DELETE_SEASON.replace('{seasonId}', seasonId);

        return this.http.delete(url, this.httpUtil.headers());
    }
}
