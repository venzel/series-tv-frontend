import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsComponent } from './seasons/seasons.component';
import { SeasonsRoutingModule } from './seasons-routing.module';

import { SeasonService } from './season.service';

import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [SeasonsComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        SeasonsRoutingModule,
        SeasonsRoutingModule,
        TableModule,
        ToastModule,
    ],
    providers: [SeasonService, MessageService],
})
export class SeasonsModule {}
