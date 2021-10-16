import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Serie } from '../../series/models';
import { SerieService } from '../../series/services';

@Component({
    selector: 'app-seasons',
    templateUrl: './seasons.component.html',
    styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent implements OnInit {
    serie: Serie;
    seasons: any[];

    constructor(private serieService: SerieService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.populateDataDrid();
    }

    populateDataDrid() {
        const serieId = this.route.snapshot.params['id'];

        this.serieService.showSerieExecute(serieId).subscribe(
            (data) => {
                this.serie = data;
                this.seasons = data.seasons;
            },
            (err) => {
                const msg: string = 'Erro ao listar temporadas.';
            }
        );
    }
}
