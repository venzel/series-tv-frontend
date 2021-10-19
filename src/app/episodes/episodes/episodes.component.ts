import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { SeasonService } from '../../seasons/services/season.service';

import { ActivatedRoute } from '@angular/router';

import { Season } from '../../seasons/models';

import { HttpUtilService } from '../../shared';

import { MenuItem } from 'primeng/api';
import { Episode } from '../models';
import { EpisodeService } from '../services/episode.service';

@Component({
    selector: 'app-episodes',
    templateUrl: './episodes.component.html',
    styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
    season: Season = {};
    episodes: Episode[];
    selectedEpisodes: Episode[];
    items: MenuItem[];
    home: MenuItem;

    constructor(
        private httpUtil: HttpUtilService,
        private seasonService: SeasonService,
        private episodeService: EpisodeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.httpUtil.guard();
        this.populateDataDrid();
    }

    loadBreadcrumb() {
        this.items = [
            {
                label: this.season.serie.name,
                routerLink: `/series/${this.season.serie.id}`,
            },
            {
                label: this.season.name,
            },
        ];

        this.home = { icon: 'pi pi-video', routerLink: '/series' };
    }

    populateDataDrid() {
        const seasonId = this.route.snapshot.params['id'];

        this.seasonService.showSeasonExecute(seasonId).subscribe(
            (data) => {
                this.season = data;
                this.episodes = data.episodes;
                this.loadBreadcrumb();
            },
            (err) => {
                const msg: string = 'Erro ao listar episodios.';
            }
        );
    }

    handleChange(e: any, episodeId: any) {
        let option = e.checked ? '1' : '0';

        this.episodeService.toggleWhatchedExecute(option, episodeId).subscribe(
            (data) => {
                this.populateDataDrid();

                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: `Episodio marcado com lido!`,
                    life: 3000,
                });
            },
            (err) => {
                let msg: string = 'Tente novamente em instantes.';

                if (err.status == 400) {
                    msg = err.error.errors.join(' ');
                }
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
