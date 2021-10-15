import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonsComponent } from './seasons/seasons.component';

const routes: Routes = [{ path: '', component: SeasonsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SeasonsRoutingModule {}
