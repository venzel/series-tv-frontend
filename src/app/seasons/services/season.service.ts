import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { HttpUtilService } from '../../shared';

@Injectable()
export class SeasonService {
    private readonly PATH_SHOW_SEASON = 'seasons/{seasonId}';

    constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

    // Ok
    showSeasonExecute(seasonId: string): Observable<any> {
        const url =
            env.baseApiUrl + this.PATH_SHOW_SEASON.replace('{seasonId}', seasonId);

        return this.http.get(url, this.httpUtil.headers());
    }
}
