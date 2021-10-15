import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

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
        private serieService: SerieService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.readData();
    }

    async readData(): Promise<void> {
        await this.serieService.getSeries().then((data) => {
            this.series = data;
        });
    }

    openNew() {
        this.serie = {};
        this.submitted = false;
        this.createSerieDialog = true;
    }

    /*
    deleteSelectedSeries() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar as series?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.series = this.series.filter((e) => !this.selectedSeries.includes(e));
                this.selectedSeries = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Series deletedadas!',
                    life: 3000,
                });
            },
        });
    }
    */

    createSerie(serie: Serie) {
        this.serie = { ...serie };
        this.createSerieDialog = true;
    }

    updateSerie(serie: Serie) {
        this.serie = { ...serie };
        this.updateSerieDialog = true;
    }

    deleteSerie(serie: Serie): void {
        this.confirmationService.confirm({
            message: 'Deseja deletar a serie ' + serie.name + '?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.serieService.deleteSerie(serie.id);
                this.series = this.series.filter((val) => val.id !== serie.id);
                this.serie = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Serie deletada!',
                    life: 3000,
                });
            },
        });
    }

    /*
    deleteSerie(serie: Serie) {
        this.confirmationService.confirm({
            message: 'Deseja deletar a serie ' + serie.name + '?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.series = this.series.filter((val) => val.id !== serie.id);
                this.serie = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Serie deletada!',
                    life: 3000,
                });
            },
        });
    }
    */

    hideCreateSerieDialog() {
        this.createSerieDialog = false;
        this.submitted = false;
    }

    hideUpdateSerieDialog() {
        this.updateSerieDialog = false;
        this.submitted = false;
    }

    findIndexById(id: string): number {
        let index = -1;

        for (let i = 0; i < this.series.length; i++) {
            if (this.series[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    }

    createSerieExecute() {
        this.submitted = true;

        if (this.serie.name.trim()) {
            this.serieService.saveSerie(this.serie);

            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Serie criada!',
                life: 3000,
            });

            this.createSerieDialog = false;

            this.serie = {};
        }

        return null;
    }

    /*
    createSerieExecute() {
        this.submitted = true;

        if (this.serie.name.trim()) {
            if (this.serie.id) {
                this.series[this.findIndexById(this.serie.id)] = this.serie;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Serie atualizada!',
                    life: 3000,
                });
            } else {
                this.serie.id = this.createId();
                this.series.push(this.serie);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Serie criada!',
                    life: 3000,
                });
            }

            this.series = [...this.series];
            this.createSerieDialog = false;
            this.serie = {};
        }
    }
    */

    updateSerieExecute() {
        this.submitted = true;

        if (this.serie.name.trim()) {
            this.series[this.findIndexById(this.serie.id)] = this.serie;
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Serie atualizada!',
                life: 3000,
            });

            this.series = [...this.series];
            this.updateSerieDialog = false;
            this.serie = {};
        }
    }
}
