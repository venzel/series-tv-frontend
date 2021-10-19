import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { Serie } from '../../series/models';
import { SerieService } from '../../series/services';

import { HttpUtilService } from '../../shared';

import { MenuItem } from 'primeng/api';

import { Season } from '../models/';
import { SeasonService } from '../services/season.service';

@Component({
    selector: 'app-seasons',
    templateUrl: './seasons.component.html',
    styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent implements OnInit {
    serie: Serie = {};
    seasons: any[];
    season: Season;
    items: MenuItem[];
    home: MenuItem;
    createSeasonDialog: boolean;
    updateSeasonDialog: boolean;
    submitted: boolean;

    constructor(
        private httpUtil: HttpUtilService,
        private serieService: SerieService,
        private seasonService: SeasonService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.httpUtil.guard();
        this.loadBreadcrumb();
        this.populateDataDrid();
    }

    loadBreadcrumb() {
        this.items = [
            {
                label: 'Voltar para series',
                routerLink: '/series',
            },
        ];

        this.home = { icon: 'pi pi-video', routerLink: '/series' };
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

    openNew() {
        this.season = {};
        this.submitted = false;
        this.createSeasonDialog = true;
    }

    updateSeason(season: Season) {
        this.season = { ...season };
        this.updateSeasonDialog = true;
    }

    handleHideCreateSeasonDialog() {
        this.createSeasonDialog = false;
        this.submitted = false;
    }

    hadleHideUpdateSeasonDialog() {
        this.updateSeasonDialog = false;
        this.submitted = false;
    }

    handleCreateSeason() {
        this.submitted = true;

        if (this.season.name.trim()) {
            this.season.serie_id = this.serie.id;

            this.seasonService.createSeasonExecute(this.season).subscribe(
                (data) => {
                    this.populateDataDrid();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso!',
                        detail: `Temporada ${this.season.name} criada!`,
                        life: 3000,
                    });

                    this.createSeasonDialog = false;
                },
                (err) => {
                    let msg: string = 'Tente novamente em instantes.';

                    if (err.status == 400) {
                        msg = err.error.errors.join(' ');
                    }
                }
            );
        }
    }

    handleUpdateSeason() {
        if (this.season.name.trim()) {
            this.season.serie_id = this.serie.id;

            this.seasonService.updateSeasonExecute(this.season).subscribe(
                (data) => {
                    this.populateDataDrid();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso!',
                        detail: `Temporada ${this.season.name} atualizada!`,
                        life: 3000,
                    });

                    this.updateSeasonDialog = false;
                },
                (err) => {
                    let msg: string = 'Tente novamente em instantes.';

                    if (err.status == 400) {
                        msg = err.error.errors.join(' ');
                    }
                }
            );
        }
    }

    handleDeleteSeason(season: Season) {
        this.confirmationService.confirm({
            message: `Deseja deletar a temporada ${season.name}?`,
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.seasonService.deleteSeasonExecute(season.id).subscribe(
                    (data) => {
                        this.populateDataDrid();

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso!',
                            detail: `Temporada ${season.name} deletada!`,
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
            },
        });
    }
}
