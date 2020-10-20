import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentActivityComponent } from './current-activity/current-activity.component';
import { GlobalDataService } from './services/global-data.service';
import { ActivityService } from './services/activity.service';
import { AppContext, ContextFactoty } from './shared/context';
import { ListActivityComponent } from './list-activity/list-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentActivityComponent,
    ListActivityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GlobalDataService,
    ActivityService,
    { provide: AppContext, useValue: ContextFactoty.CreateContext(isDevMode()) }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
