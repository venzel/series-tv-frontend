import { Component, OnInit } from '@angular/core';
import { Episode } from '../episode';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EpisodeService } from '../episode.service';

@Component({
    selector: 'app-episodes',
    templateUrl: './episodes.component.html',
    styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
    episodes: Episode[];
    selectedEpisodes: Episode[];

    constructor(
        private episodeService: EpisodeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.episodeService.getEpisodes().then((data) => (this.episodes = data));
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
