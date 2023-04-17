import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SHED';
  is_logged = false;
  username = '';
  pswd = '';
  user_role = '';
  user_id = '';
  org_id = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.is_logged = true;
    }
  }
  login() {
    this.userService.login(this.username, this.pswd).subscribe((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('org_id', data.org_id);
      this.router.navigate([`/${data.role}`]);
      this.is_logged = true;
      this.username = '';
      this.pswd = '';
    });
  }
  logout() {
    this.is_logged = false;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('org_id');
  }
}
