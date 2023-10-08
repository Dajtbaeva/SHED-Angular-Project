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
    { name: 'Add new group', num: 6 },
    { name: 'Rooms', num: 7 },
    { name: 'Add new room', num: 8 },
    { name: 'Events', num: 9 },
    { name: 'Add new event', num: 10 },
  ];
  is_loading = false;
  org_id = '';
  tutor = 'tutor';
  student = 'student';
  activeTab = 1;
  addName = '';
  addSurname = '';
  addEmail = '';
  addGroupId = '';
  addTutorId = '';
  addRoomId = '';
  addTutorGroup = null;
  role_id = 0;
  addTime = 0;
  addDay = '';
  groupName = '';
  disciplineName = '';
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
  students: IUser[] = [];
  groups: IGroup[] = [];
  rooms: IRoom[] = [];
  events: IEvent[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const org = localStorage.getItem('org_id');
    if (org) this.org_id = org;
    try {
      this.is_loading = true;
      this.userService.getTutors().subscribe((data) => (this.tutors = data));
      this.userService
        .getStudents()
        .subscribe((data) => (this.students = data));
      this.userService.getGroups().subscribe((data) => (this.groups = data));
      this.userService.getRooms().subscribe((data) => (this.rooms = data));
      this.userService.getEvents().subscribe((data) => (this.events = data));
      this.is_loading = false;
    } catch (err) {
      console.log(err);
    }
  }

  setTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  addNewUser(role: string) {
    this.role_id = role === 'student' ? 2 : 3;
    try {
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
            this.userService
              .getTutors()
              .subscribe((data) => (this.tutors = data));
          });
      } else {
        this.userService
          .addNewUser(
            this.addName,
            this.addSurname,
            this.addEmail,
            this.role_id,
            this.org_id,
            Number(this.addGroupId)
          )
          .subscribe(() => {
            this.addName = '';
            this.addSurname = '';
            this.addEmail = '';
            this.addGroupId = '';
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  addNewGroup() {
    try {
      this.userService
        .addNewGroup(this.groupName, this.org_id)
        .subscribe(() => {
          this.groupName = '';
          this.userService
            .getGroups()
            .subscribe((data) => (this.groups = data));
        });
    } catch (err) {
      console.log(err);
    }
  }

  getStudentsByGroupId(group: number) {
    return this.students.filter((s) => s.group === group);
  }

  deleteGroup(group: IGroup) {
    try {
      this.userService.deleteGroup(group.id);
      this.groups = this.groups.filter((g) => g !== group);
    } catch (err) {
      console.log(err);
    }
  }

  addNewRoom() {
    try {
      this.userService
        .addNewRoom(this.roomName, this.roomCap, this.org_id)
        .subscribe(() => {
          this.roomName = '';
          this.roomCap = 0;
          this.userService.getRooms().subscribe((data) => (this.rooms = data));
        });
    } catch (err) {
      console.log(err);
    }
  }

  deleteRoom(room: IRoom) {
    try {
      this.userService.deleteRoom(room.id);
      this.rooms = this.rooms.filter((r) => r !== room);
    } catch (err) {
      console.log(err);
    }
  }

  addNewEvent() {
    const day =
      this.days.findIndex((day) => day.name === this.addDay.trim()) + 1;
    // console.log(day);
    try {
      this.userService
        .addNewEvent(
          this.addTime,
          Number(this.addRoomId),
          this.disciplineName,
          day,
          Number(this.addTutorId),
          Number(this.addGroupId)
        )
        .subscribe(() => {
          this.addTime = 0;
          this.addDay = '';
          (this.addTutorId = ''), (this.disciplineName = '');
          this.addRoomId = '';
          this.addGroupId = '';
          this.userService
            .getEvents()
            .subscribe((data) => (this.events = data));
        });
    } catch (err) {
      console.log(err);
    }
  }

  deleteEvent(event: IEvent) {
    try {
      this.userService.deleteEvent(event.id);
      this.events = this.events.filter((e) => e !== event);
    } catch (err) {
      console.log(err);
    }
  }
}
