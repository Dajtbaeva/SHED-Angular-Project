import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { TutorPageComponent } from './pages/tutor-page/tutor-page.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthInterceptor } from './AuthInterceptor';
import { AvailableRoomsComponent } from './pages/available-rooms/available-rooms.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    StudentPageComponent,
    TutorPageComponent,
    ScheduleComponent,
    NavigationComponent,
    AvailableRoomsComponent,
    SettingsComponent,
    NotFoundPageComponent,
    UserListComponent,
    UserItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
