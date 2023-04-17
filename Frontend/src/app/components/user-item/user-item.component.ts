import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  userId!: number;
  user!: IUser;
  newName = '';
  newSurname = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      // this.newName = this.user.name;
    });
  }

  // update() {
  //   if (this.user) {
  //     this.user.name = this.newName;
  //     this.user.surname = this.newSurname;
  //     this.userService.updateUser(this.user);
  //   }
  // }
}
