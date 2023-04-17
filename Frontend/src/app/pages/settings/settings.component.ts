import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  username = '';
  password = '';

  constructor(private userService: UserService) {}

  changeUsername() {
    const id = localStorage.getItem('user_id');
    if (id) {
      this.userService.getUserById(+id).subscribe((currentUser) => {
        currentUser.username = this.username;
        this.username = '';
        this.userService.updateUser3(currentUser);
        console.log(currentUser);
      });
      alert('Username is successfully changed!');
    }
  }

  changePassword() {
    const id = localStorage.getItem('user_id');
    if (id) {
      this.userService.getUserById(+id).subscribe((currentUser) => {
        currentUser.password = this.password;
        this.password = '';
        this.userService.updateUser(currentUser);
      });
      alert('Password is successfully changed!');
    }
  }
}
