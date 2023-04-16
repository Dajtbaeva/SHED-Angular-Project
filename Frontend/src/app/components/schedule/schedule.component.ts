import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { IShed } from 'src/app/models/shed';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  shed: IShed[] = [];
  events: IEvent[] = [];
  weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  emptyEvent = {
    id: 0,
    event_start_time: 0,
    room: '',
    discipline: '',
    day: '',
    tutor: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    this.events = this.userService.getUserEvents(Number(id));
    // this.userService
    //   .getUserEvents(Number(id))
    //   .subscribe((data) => (this.events = data));
    let j = 0;
    for (let i = 8; i < 21; i++) {
      this.shed.push({ id: j, time: i, events: [] });
      j++;
    }
    this.shed.forEach((item) => {
      const timeEvents: IEvent[] = [];
      const currentEvents = this.events.filter((event) => {
        return event.event_start_time === item.time;
      });
      this.weekdays.forEach((weekday) => {
        const event = currentEvents.find((event) => event.day === weekday);
        if (event) {
          timeEvents.push(event);
        } else {
          timeEvents.push(this.emptyEvent);
        }
      });
      item.events = timeEvents;
    });
    this.shed.forEach((item) =>
      console.log(item.id + ', ' + item.time + ', ' + item.events)
    );
  }
}
