import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: 'series',
        loadChildren: () => import('./series/series.module').then((m) => m.SeriesModule),
    },
    {
        path: 'series/:id',
        loadChildren: () =>
            import('./seasons/seasons.module').then((m) => m.SeasonsModule),
    },
    {
        path: 'season/:id',
        loadChildren: () =>
            import('./episodes/episodes.module').then((m) => m.EpisodesModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
