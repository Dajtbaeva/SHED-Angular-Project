import { Component, OnInit } from '@angular/core';
import { IDiscipline } from 'src/app/models/discipline';
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
    { name: 'Disciplines', num: 6 },
    { name: 'Rooms', num: 7 },
    { name: 'Events', num: 8 },
    { name: 'Add new event', num: 9 },
  ];
  tutor = 'tutor';
  student = 'student';
  activeTab = 1;
  addName = '';
  addSurname = '';
  addEmail = '';
  addGroup = '';
  addTutor = '';
  addTime = 0;
  addDay = '';
  groupName = '';
  disciplineName = '';
  roomName = '';
  roomCap = '';
  tutors: IUser[] = [];
  groups: IGroup[] = [];
  disciplines: IDiscipline[] = [];
  // rooms: IRoom[] = [
  //   { id: 1, name: '123', capacity: '20' },
  //   { id: 2, name: '333', capacity: '30' },
  // ];
  rooms: IRoom[] = [];
  events: IEvent[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getGroups().subscribe((data) => (this.groups = data));
    this.userService
      .getDisciplines()
      .subscribe((data) => (this.disciplines = data));
    this.userService.getRooms().subscribe((data) => (this.rooms = data));
    this.userService.getEvents().subscribe((data) => (this.events = data));
  }

  setTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  addNewUser(role: string) {
    const org_id = localStorage.getItem('org_id');
    this.userService
      .addNewUser(
        this.addName,
        this.addSurname,
        this.addEmail,
        this.addGroup,
        role,
        org_id
      )
      .subscribe(() => {
        this.addName = '';
        this.addSurname = '';
        this.addEmail = '';
        this.addGroup = '';
      });
  }

  addNewGroup() {
    this.userService.addNewGroup(this.groupName).subscribe(() => {
      this.groupName = '';
    });
  }

  deleteGroup(group: IGroup) {
    this.userService.deleteGroup(group.id);
    this.groups = this.groups.filter((g) => g !== group);
  }

  addNewDiscipline() {
    this.userService
      .addNewDiscipline(this.disciplineName, this.addTutor)
      .subscribe(() => {
        this.disciplineName = '';
        this.addTutor = '';
      });
  }

  deleteDiscipline(discipline: IDiscipline) {
    this.userService.deleteDiscipline(discipline.id);
    this.disciplines = this.disciplines.filter((d) => d !== discipline);
  }

  addNewRoom() {
    this.userService.addNewRoom(this.roomName, this.roomCap).subscribe(() => {
      this.roomName = '';
      this.roomCap = '';
    });
  }

  deleteRoom(room: IRoom) {
    this.userService.deleteRoom(room.id);
    this.rooms = this.rooms.filter((r) => r !== room);
  }

  addNewEvent() {
    this.userService
      .addNewEvent(
        this.addTime,
        this.addDay,
        this.addTutor,
        this.disciplineName,
        this.roomName
      )
      .subscribe(() => {
        this.addTime = 0;
        this.addDay = '';
        this.addTutor = '';
        this.disciplineName = '';
        this.roomName = '';
      });
  }

  deleteEvent(event: IEvent) {
    this.userService.deleteEvent(event.id);
    this.events = this.events.filter((e) => e !== event);
  }
}
