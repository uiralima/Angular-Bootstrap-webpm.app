import { Routes } from '@angular/router';
import { IdentifyComponent } from './identify/identify.component';
import { LoginComponent } from './identify/login/login.component';
import { RegisterComponent } from './identify/register/register.component';
import { WorkerComponent } from './worker/worker.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ListActivityComponent } from './list-activity/list-activity.component';
import { ProjectComponent } from './worker/project/project.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToWork = () => redirectLoggedInTo(['work']);
export const ROUTES: Routes = [
    {
        path: '', component: IdentifyComponent, children: [
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ],
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToWork }
    },
    {
        path: 'login', component: IdentifyComponent, children: [
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ],
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToWork }
    },
    {
        path: 'work', component: WorkerComponent, children: [
            { path: '', component: ListActivityComponent },
            { path: 'project', component: ProjectComponent }
        ], canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
    }
]