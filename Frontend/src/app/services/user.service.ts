import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthToken } from 'src/app/models/token';
import { IUser } from '../models/user';
import { IGroup } from '../models/group';
import { IRoom } from '../models/room';
import { IEvent } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.URL}/login/`, {
      username,
      password,
    });
  }
  getCurrentUser(): Observable<IUser> {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return null;
    // }
    const id = localStorage.getItem('user_id');
    return this.http.get<IUser>(`${this.URL}/user/${id}`);
  }
  addNewUser(
    name: string,
    surname: string,
    email: string,
    role: number,
    organization: string,
    group: number | null
  ) {
    return this.http.post<IUser>(`${this.URL}/user/`, {
      name,
      surname,
      email,
      role,
      organization,
      group,
    });
  }

  addNewGroup(name: string, organization: string) {
    return this.http.post<IGroup>(`${this.URL}/group/`, {
      name,
      organization,
    });
  }

  addNewRoom(name: string, capacity: number, organization: string) {
    return this.http.post<IRoom>(`${this.URL}/room/`, {
      name,
      capacity,
      organization,
    });
  }

  addNewEvent(
    event_start_time: number,
    room: IRoom,
    discipline: string,
    day: number,
    tutor: IUser,
    group: IGroup
  ) {
    return this.http.post<IEvent>(`${this.URL}/event/`, {
      event_start_time,
      room,
      discipline,
      day,
      tutor,
      group,
    });
  }

  getTutors(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}/tutors/`);
  }

  getStudents(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}/students/`);
  }

  getUserById(id: number): Observable<IUser> {
    return from(
      fetch(`${this.URL}/user/${id}`).then((response) => response.json())
    );
  }

  getGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.URL}/group/`);
  }

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.URL}/room/`);
  }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.URL}/event/`);
  }

  getAvailableRooms(hour: number, day: number): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(
      `${this.URL}/available_rooms/?hour=${hour}&day=${day}`
    );
    // const params = new HttpParams()
    //   .set('hour', hour.toString())
    //   .set('day', day);
    // return this.http.get<IRoom[]>(`${this.URL}/available_rooms/`, { params });
  }

  getUserEvents(user_id: number): Observable<IEvent[]> {
    alert(`It is current user's id ${user_id}`);
    return this.http.get<IEvent[]>(`${this.URL}/get_user_events/${user_id}`);
    // return [
    // {
    //   id: 1,
    //   event_start_time: 8,
    //   room: {
    //     id: 1,
    //     name: '228',
    //     capacity: 34,
    //   },
    //   discipline: 'Math',
    //   day: 1,
    //   tutor: {
    //     id: 1,
    //     username: 'cfcf',
    //     password: '4e4e4',
    //     name: '3dede',
    //     surname: 'rrrrr',
    //     email: 'dedede',
    //     role: {
    //       id: 1,
    //       name: 'tutor',
    //     },
    //     organization: 'test',
    //     group: {
    //       id: 0,
    //       name: 'mat-fiz',
    //       organization: 'dostyk',
    //     },
    //     is_active: true,
    //     is_verified: true,
    //   },
    // },
    // {
    //   id: 3,
    //   event_start_time: 10,
    //   room: {
    //     id: 2,
    //     name: '78',
    //     capacity: 78,
    //   },
    //   discipline: 'Biology',
    //   day: 2,
    //   tutor: {
    //     id: 2,
    //     username: 'cfcf',
    //     password: '4e4e4',
    //     name: 'Tutor2',
    //     surname: 'R',
    //     email: 'dedede',
    //     role: {
    //       id: 1,
    //       name: 'tutor',
    //     },
    //     organization: 'test',
    //     group: {
    //       id: 0,
    //       name: 'mat-fiz-1',
    //       organization: 'dostyk',
    //     },
    //     is_active: true,
    //     is_verified: true,
    //   },
    // },
    // {
    //   id: 5,
    //   event_start_time: 10,
    //   room: {
    //     id: 2,
    //     name: '555',
    //     capacity: 78,
    //   },
    //   discipline: 'Physics',
    //   day: 4,
    //   tutor: {
    //     id: 3,
    //     username: 'cfcf',
    //     password: '4e4e4',
    //     name: 'Tutor3',
    //     surname: 'R',
    //     email: 'dedede',
    //     role: {
    //       id: 1,
    //       name: 'tutor',
    //     },
    //     organization: 'test',
    //     group: {
    //       id: 0,
    //       name: 'mat-fiz-1',
    //       organization: 'dostyk',
    //     },
    //     is_active: true,
    //     is_verified: true,
    //   },
    // },
    // {
    //   id: 4,
    //   event_start_time: 15,
    //   room: {
    //     id: 3,
    //     name: '23',
    //     capacity: 78,
    //   },
    //   discipline: 'Musics',
    //   day: 5,
    //   tutor: {
    //     id: 3,
    //     username: 'cfcf',
    //     password: '4e4e4',
    //     name: 'Tutor4',
    //     surname: 'R',
    //     email: 'dedede',
    //     role: {
    //       id: 1,
    //       name: 'tutor',
    //     },
    //     organization: 'test',
    //     group: {
    //       id: 0,
    //       name: 'mat-fiz-1',
    //       organization: 'dostyk',
    //     },
    //     is_active: true,
    //     is_verified: true,
    //   },
    // },
    // {
    //   id: 2,
    //   event_start_time: 17,
    //   room: {
    //     id: 3,
    //     name: '90',
    //     capacity: 78,
    //   },
    //   discipline: 'Physics II',
    //   day: 1,
    //   tutor: {
    //     id: 3,
    //     username: 'cfcf',
    //     password: '4e4e4',
    //     name: 'Tutor5',
    //     surname: 'R',
    //     email: 'dedede',
    //     role: {
    //       id: 1,
    //       name: 'tutor',
    //     },
    //     organization: 'test',
    //     group: {
    //       id: 0,
    //       name: 'mat-fiz-1',
    //       organization: 'dostyk',
    //     },
    //     is_active: true,
    //     is_verified: true,
    //   },
    // },
    // ];
  }

  updateUser(user: IUser): Observable<IUser> {
    console.log(user);
    return this.http.put<IUser>(`${this.URL}/user/${user.id}/`, user, {
      headers: this.getAuthHeaders(),
    });
  }
  updateUser2(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.URL}/${user.id}`, user);
  }
  updateUser3(user: IUser): Observable<IUser> {
    return from(
      fetch(`${this.URL}/user/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }

  deleteUser(id: number) {
    return fetch(`${this.URL}/user/${id}`, {
      method: 'DELETE',
    });
  }

  deleteGroup(id: number) {
    return fetch(`${this.URL}/group/${id}`, {
      method: 'DELETE',
    });
  }

  deleteRoom(id: number) {
    return fetch(`${this.URL}/room/${id}`, {
      method: 'DELETE',
    });
  }

  deleteEvent(id: number) {
    return fetch(`${this.URL}/event/${id}`, {
      method: 'DELETE',
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
