import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { IGroup } from 'src/app/models/group';
import { IRoom } from 'src/app/models/room';
import { ITab } from 'src/app/models/tab';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  tabs: ITab[] = [
    { name: 'Tutors', num: 1 },
    { name: 'Add new tutor', num: 2 },
    { name: 'Students', num: 3 },
    { name: 'Add new student', num: 4 },
    { name: 'Groups', num: 5 },
    { name: 'Rooms', num: 6 },
    { name: 'Events', num: 7 },
    { name: 'Add new event', num: 8 },
  ];
  org_id = '';
  tutor = 'tutor';
  student = 'student';
  activeTab = 1;
  addName = '';
  addSurname = '';
  addEmail = '';
  addGroup: IGroup = {
    id: 33,
    name: '',
    organization: '',
  };
  addTutorGroup = null;
  role_id = 0;
  addTutor: IUser = {
    id: 0,
    username: '',
    password: '',
    name: '',
    surname: '',
    email: '',
    role: 3,
    organization: '1',
    group: null,
  };
  addTime = 0;
  addDay = '';
  groupName = '';
  disciplineName = '';
  addRoom: IRoom = {
    id: 0,
    name: '',
    capacity: 0,
    organization: '',
  };
  roomName = '';
  roomCap = 0;
  days = [
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
  ];
  tutors: IUser[] = [];
  groups: IGroup[] = [];
  rooms: IRoom[] = [];
  events: IEvent[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const org = localStorage.getItem('org_id');
    if (org) this.org_id = org;
    this.userService.getTutors().subscribe((data) => (this.tutors = data));
    this.userService.getGroups().subscribe((data) => (this.groups = data));
    this.userService.getRooms().subscribe((data) => (this.rooms = data));
    this.userService.getEvents().subscribe((data) => (this.events = data));
  }

  setTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  addNewUser(role: string) {
    this.role_id = role === 'student' ? 2 : 3;
    if (this.role_id === 3) {
      this.userService
        .addNewUser(
          this.addName,
          this.addSurname,
          this.addEmail,
          this.role_id,
          this.org_id,
          this.addTutorGroup
        )
        .subscribe(() => {
          this.addName = '';
          this.addSurname = '';
          this.addEmail = '';
        });
    } else {
      const group_id = this.addGroup.id;
      this.userService
        .addNewUser(
          this.addName,
          this.addSurname,
          this.addEmail,
          this.role_id,
          this.org_id,
          group_id
        )
        .subscribe(() => {
          this.addName = '';
          this.addSurname = '';
          this.addEmail = '';
          this.addGroup = {
            id: 0,
            name: '',
            organization: '',
          };
        });
    }
  }

  addNewGroup() {
    this.userService.addNewGroup(this.groupName, this.org_id).subscribe(() => {
      this.groupName = '';
      this.userService.getGroups().subscribe((data) => (this.groups = data));
    });
  }

  deleteGroup(group: IGroup) {
    this.userService.deleteGroup(group.id);
    this.groups = this.groups.filter((g) => g !== group);
  }

  addNewRoom() {
    this.userService
      .addNewRoom(this.roomName, this.roomCap, this.org_id)
      .subscribe(() => {
        this.roomName = '';
        this.roomCap = 0;
        this.userService.getRooms().subscribe((data) => (this.rooms = data));
      });
  }

  deleteRoom(room: IRoom) {
    this.userService.deleteRoom(room.id);
    this.rooms = this.rooms.filter((r) => r !== room);
  }

  addNewEvent() {
    const day =
      this.days.findIndex((day) => day.name === this.addDay.trim()) + 1;
    console.log(day);
    this.userService
      .addNewEvent(
        this.addTime,
        this.addRoom,
        this.disciplineName,
        day,
        this.addTutor,
        this.addGroup
      )
      .subscribe(() => {
        this.addTime = 0;
        this.addDay = '';
        this.addTutor = {
          id: 0,
          username: '',
          password: '',
          name: '',
          surname: '',
          email: '',
          role: 3,
          organization: '1',
          group: null,
        };
        this.disciplineName = '';
        this.addRoom = {
          id: 0,
          name: '',
          capacity: 0,
          organization: '',
        };
        this.addGroup = {
          id: 0,
          name: '',
          organization: '',
        };
      });
  }

  deleteEvent(event: IEvent) {
    this.userService.deleteEvent(event.id);
    this.events = this.events.filter((e) => e !== event);
  }
}
