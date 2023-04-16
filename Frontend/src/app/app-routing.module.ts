import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { TutorPageComponent } from './pages/tutor-page/tutor-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserItemComponent } from './components/user-item/user-item.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent },
  { path: 'admin/user/:id', component: UserItemComponent },
  { path: 'tutor', component: TutorPageComponent },
  { path: 'student', component: StudentPageComponent },
  { path: 'available-rooms', component: StudentPageComponent },
  { path: 'settings', component: StudentPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
