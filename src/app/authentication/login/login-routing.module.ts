import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, LogonComponent } from './components';

const routes: Routes = [
    {
        path: 'login',
        component: LogonComponent,
        children: [{ path: '', component: LoginComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
