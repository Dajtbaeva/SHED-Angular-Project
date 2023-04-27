import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { TutorPageComponent } from './pages/tutor-page/tutor-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AvailableRoomsComponent } from './pages/available-rooms/available-rooms.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent },
  { path: 'tutor', component: TutorPageComponent },
  { path: 'student', component: StudentPageComponent },
  { path: 'available_rooms', component: AvailableRoomsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule],
})
export class AppRoutingModule {}
