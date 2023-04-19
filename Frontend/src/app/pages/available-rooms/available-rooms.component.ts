import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/models/room';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css'],
})
export class AvailableRoomsComponent implements OnInit {
  hour = 0;
  day = 0;
  rooms: IRoom[] = [];
  invalid = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.hour = currentDate.getHours();
    this.day = currentDate.getDay(); // return number
    this.userService
      .getAvailableRooms(this.hour, this.day)
      .subscribe((data) => (this.rooms = data));
    // 0 -> Sun, 1 -> Mon, 2 -> Tue, 3 -> Wed, 4 -> Thu, 5 -> Fri, 6 -> Sat
    // console.log(currentDate.getHours().toLocaleString());
  }
}
