import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Episode } from '../models';
import { HttpUtilService } from '../../shared';

@Injectable()
export class EpisodeService {
    private readonly PATH: string = 'episodes';
    private readonly PATH_PUT_EPISODE =
        'episodes/mark?option={markOption}&ids={episodeId}';

    constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

    // Ok
    toggleWhatchedExecute(markOption: string, episodeId: string): Observable<any> {
        const url =
            env.baseApiUrl +
            this.PATH_PUT_EPISODE.replace('{markOption}', markOption).replace(
                '{episodeId}',
                episodeId
            );

        return this.http.get(url, this.httpUtil.headers());
    }
}
