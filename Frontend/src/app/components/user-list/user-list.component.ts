import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  @Input()
  role!: string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.role === 'tutor')
      this.userService.getTutors().subscribe((data) => (this.users = data));
    else
      this.userService.getStudents().subscribe((data) => (this.users = data));
  }

  viewDetails(user: IUser) {
    this.router.navigate(['/admin', '/user', user.id]);
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user.id);
    this.users = this.users.filter((u) => u !== user);
  }
}
