import { Routes } from '@angular/router';
import { IdentifyComponent } from './identify/identify.component';
import { LoginComponent } from './identify/login/login.component';
import { RegisterComponent } from './identify/register/register.component';
import { WorkerComponent } from './worker/worker.component';

export const ROUTES: Routes = [
    {
        path: '', component: IdentifyComponent, children: [
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    { path: 'work', component: WorkerComponent }
]