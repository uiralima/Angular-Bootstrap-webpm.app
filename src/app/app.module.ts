import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';


import { AppComponent } from './app.component';
import { CurrentActivityComponent } from './current-activity/current-activity.component';
import { GlobalDataService } from './services/global-data.service';
import { AppContext, ContextFactoty } from './shared/context';
import { ListActivityComponent } from './list-activity/list-activity.component';
import { UtilsService } from './services/utils.service';
import { JsonServerActivityService } from './services/implementations/activity.json-server.service';
import { NavComponent } from './nav/nav.component';
import { WorkerComponent } from './worker/worker.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { IdentifyComponent } from './identify/identify.component';
import { LoginComponent } from './identify/login/login.component';
import { RegisterComponent } from './identify/register/register.component';
import { FirebaseIdentityService } from './services/implementations/idetity.firebase.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './services/notification.service';
import { ProjectComponent } from './worker/project/project.component';
import { FirebaseProjectService } from './services/implementations/project.firebase.service';
import { InviteComponent } from './worker/invite/invite.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { ProjectDetailComponent } from './worker/project-detail/project-detail.component';
import { ActivityComponent } from './worker/activity/activity.component';
import { ActivityDetailComponent } from './worker/activity-detail/activity-detail.component';
import { FirebaseActivityService } from './services/implementations/activity.firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentActivityComponent,
    ListActivityComponent,
    NavComponent,
    WorkerComponent,
    LoginComponent,
    IdentifyComponent,
    RegisterComponent,
    ProjectComponent,
    InviteComponent,
    MobileMenuComponent,
    ProjectDetailComponent,
    ActivityComponent,
    ActivityDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAAvFoh7c9jarFNac2E9PBrbaV1ezrcoOA",
      authDomain: "webpm-73a86.firebaseapp.com",
      databaseURL: "https://webpm-73a86.firebaseio.com",
      projectId: "webpm-73a86",
      storageBucket: "webpm-73a86.appspot.com",
      messagingSenderId: "1065143550265",
      appId: "1:1065143550265:web:8783f974e63d75023fe8e8"
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    GlobalDataService,
    { provide: 'ActivityService', useClass: FirebaseActivityService},
    { provide: 'IdentityService', useClass: FirebaseIdentityService},
    { provide: 'ProjectService', useClass: FirebaseProjectService},
    UtilsService,
    NotificationService,
    { provide: AppContext, useValue: ContextFactoty.CreateContext(isDevMode()) }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
