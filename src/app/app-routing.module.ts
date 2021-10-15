import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    // {
    //     path: 'login',
    //     loadChildren: () => import('./security/security.module').then((m) => m.SecurityModule),
    // },
    // {
    //     path: 'register',
    //     loadChildren: () =>
    //         import('./register/register.module').then((m) => m.RegisterModule),
    // },
    {
        path: 'series',
        loadChildren: () => import('./series/series.module').then((m) => m.SeriesModule),
    },
    {
        path: 'seasons',
        loadChildren: () =>
            import('./seasons/seasons.module').then((m) => m.SeasonsModule),
    },
    {
        path: 'episodes',
        loadChildren: () =>
            import('./episodes/episodes.module').then((m) => m.EpisodesModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
