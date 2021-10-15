import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent, RegistrationComponent } from './components';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        children: [
            {
                path: '',
                component: RegistrationComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterRoutingModule {}
