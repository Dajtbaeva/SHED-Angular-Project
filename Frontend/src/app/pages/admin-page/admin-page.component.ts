import { Component } from '@angular/core';
import { ITab } from 'src/app/models/tab';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  tabs: ITab[] = [
    { name: 'Add new tutor', num: 1 },
    { name: 'Add new student', num: 2 },
    { name: 'Add new group', num: 3 },
    { name: 'Add new discipline', num: 4 },
    { name: 'Add new event', num: 5 },
  ];
  activeTab = 1;

  setTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
  
}
