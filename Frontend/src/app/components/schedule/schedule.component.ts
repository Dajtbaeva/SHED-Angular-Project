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
  emptyEvent = {
    id: 0,
    event_start_time: 0,
    room: {
      id: 0,
      name: '',
      capacity: 0,
      organization: '',
    },
    discipline: '',
    day: 0,
    tutor: {
      id: 0,
      username: '',
      password: '',
      name: '',
      surname: '',
      email: '',
      role: 3,
      organization: '',
      group: null,
    },
    group: {
      id: 0,
      name: '',
      organization: '',
    },
    status: true,
  };

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    const id = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');
    if (role === 'student') {
      try {
        // еxecuting an HTTP request and waiting for a response using await
        const data = await this.userService
          .getStudentEvents(Number(id))
          .toPromise();
        if (data !== undefined) {
          this.events = data;
          // console.log(this.events);
        } else {
          console.error('Error: data is undefined');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const data = await this.userService
          .getTutorEvents(Number(id))
          .toPromise();
        if (data !== undefined) {
          this.events = data;
        } else {
          console.error('Error: data is undefined');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    this.buildSchedule();
  }

  buildSchedule() {
    let j = 0;
    for (let i = 8; i < 20; i++) {
      this.shed.push({ id: j, time: i, events: [] });
      j++;
    }
    this.shed.forEach((item) => {
      const timeEvents: IEvent[] = [];
      const currentEvents = this.events.filter((event) => {
        return item.time === event.event_start_time;
      });
      // console.log(item.time);
      // console.log(currentEvents);
      for (let i = 1; i < 7; i++) {
        const event = currentEvents.find((event) => event.day === i);
        timeEvents.push(event ? event : this.emptyEvent);
      }
      item.events = timeEvents;
    });
  }
}
