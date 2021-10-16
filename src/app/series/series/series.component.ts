import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { Serie } from '../models';

import { HttpUtilService } from '../../shared';

import { SerieService } from '../services';

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
    createSerieDialog: boolean;
    updateSerieDialog: boolean;
    series: Serie[];
    serie: Serie;
    selectedSeries: Serie[];
    submitted: boolean;

    constructor(
        private router: Router,
        private httpUtil: HttpUtilService,
        private serieService: SerieService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    async ngOnInit() {
        this.populateDataDrid();
    }

    populateDataDrid() {
        this.serieService.listSeriesExecute().subscribe(
            (data) => {
                this.series = data;
            },
            (err) => {
                const msg: string = 'Erro ao listar series.';
            }
        );
    }

    openNew() {
        this.serie = {};
        this.submitted = false;
        this.createSerieDialog = true;
    }

    createSerie(serie: Serie) {
        this.serie = { ...serie };
        this.createSerieDialog = true;
    }

    updateSerie(serie: Serie) {
        this.serie = { ...serie };
        this.updateSerieDialog = true;
    }

    handleHideCreateSerieDialog() {
        this.createSerieDialog = false;
        this.submitted = false;
    }

    hadleHideUpdateSerieDialog() {
        this.updateSerieDialog = false;
        this.submitted = false;
    }

    handleCreateSerie() {
        this.submitted = true;

        if (this.serie.name.trim()) {
            this.serieService.createSerieExecute(this.serie).subscribe(
                (data) => {
                    this.populateDataDrid();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso!',
                        detail: `Serie ${this.serie.name} criada!`,
                        life: 3000,
                    });

                    this.createSerieDialog = false;
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

    handleUpdateSerie() {
        if (this.serie.name.trim()) {
            this.serieService.updateSerieExecute(this.serie).subscribe(
                (data) => {
                    this.populateDataDrid();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso!',
                        detail: `Serie ${this.serie.name} atualizada!`,
                        life: 3000,
                    });

                    this.updateSerieDialog = false;
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

    handleDeleteSerie(serie: Serie) {
        this.confirmationService.confirm({
            message: `Deseja deletar a serie ${serie.name}?`,
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.serieService.deleteSerieExecute(serie.id).subscribe(
                    (data) => {
                        this.populateDataDrid();

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso!',
                            detail: `Serie ${serie.name} deletada!`,
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
