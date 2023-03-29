import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { TutorPageComponent } from './pages/tutor-page/tutor-page.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    StudentPageComponent,
    TutorPageComponent,
    ScheduleComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
