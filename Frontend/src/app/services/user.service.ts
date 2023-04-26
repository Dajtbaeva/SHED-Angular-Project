import { HttpClient } from '@angular/common/http';
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
    room_id: number,
    discipline: string,
    day: number,
    tutor_id: number,
    group_id: number
  ) {
    return this.http.post<IEvent>(`${this.URL}/event/`, {
      event_start_time,
      room_id,
      discipline,
      day,
      tutor_id,
      group_id,
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

  getAvailableRooms(hour: number, day: string): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(
      `${this.URL}/available_rooms/?hour=${hour}&day=${day}`
    );
    // const params = new HttpParams()
    //   .set('hour', hour.toString())
    //   .set('day', day);
    // return this.http.get<IRoom[]>(`${this.URL}/available_rooms/`, { params });
  }

  getStudentEvents(user_id: number): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.URL}/student/${user_id}/events`);
  }

  getTutorEvents(user_id: number): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.URL}/tutor/${user_id}/events`);
  }

  updateEventStatus(event: IEvent) {
    const requestBody = {
      event: event.id,
    };
    return from(
      fetch(`${this.URL}/change_event_status/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }

  updateUser(user: IUser): Observable<IUser> {
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
}
