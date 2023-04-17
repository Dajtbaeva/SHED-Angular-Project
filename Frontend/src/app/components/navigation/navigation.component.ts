import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @Output() exit = new EventEmitter();
  role = localStorage.getItem('role');
  logout() {
    this.exit.emit();
  }
}
