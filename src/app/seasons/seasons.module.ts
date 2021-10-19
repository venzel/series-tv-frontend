import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsComponent } from './seasons/seasons.component';
import { SeasonsRoutingModule } from './seasons-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { SerieService } from '../series/services';
import { HttpUtilService } from '../shared/services';

import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SeasonService } from './services/season.service';

@NgModule({
    declarations: [SeasonsComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        SeasonsRoutingModule,
        SeasonsRoutingModule,
        TableModule,
        ToastModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        ToolbarModule,
        InputNumberModule,
        FormsModule,
        ConfirmDialogModule,
        BreadcrumbModule,
    ],
    providers: [
        HttpUtilService,
        SeasonService,
        SerieService,
        MessageService,
        ConfirmationService,
    ],
})
export class SeasonsModule {}
