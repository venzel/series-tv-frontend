import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { SeasonService } from '../../seasons/services/season.service';

import { ActivatedRoute } from '@angular/router';
import { Season } from '../../seasons/models/season.model';

@Component({
    selector: 'app-episodes',
    templateUrl: './episodes.component.html',
    styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
    season: Season;
    episodes: any[];
    selectedEpisodes: any[];

    constructor(
        private seasonService: SeasonService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.populateDataDrid();
    }

    populateDataDrid() {
        const seasonId = this.route.snapshot.params['id'];

        this.seasonService.showSeasonExecute(seasonId).subscribe(
            (data) => {
                this.season = data;
                this.episodes = data.episodes;
            },
            (err) => {
                const msg: string = 'Erro ao listar episodios.';
            }
        );
    }

    markWatched() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja marcar como lida?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.episodes.map((e) => {
                    if (this.selectedEpisodes.includes(e)) {
                        e.watched = true;
                    }
                });
                this.selectedEpisodes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Episodios marcados como lidos!',
                    life: 3000,
                });
            },
        });
    }
}
