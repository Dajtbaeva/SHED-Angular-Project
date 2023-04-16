import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthToken } from 'src/app/models/token';
import { IUser } from 'src/app/models/user';
import { IGroup } from '../models/group';
import { IDiscipline } from '../models/discipline';
import { IRoom } from '../models/room';

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

  addNewUser(
    name: string,
    surname: string,
    email: string,
    role: string,
    org_id: string,
    group: string | null
  ) {
    return this.http.post<IUser>(`${this.URL}/user/`, {
      name,
      surname,
      email,
      role,
      organization: org_id,
      group,
    });
  }

  addNewGroup(name: string) {
    return this.http.post<IGroup>(`${this.URL}/group/`, {
      name,
    });
  }

  addNewDiscipline(name: string, tutor: string) {
    return this.http.post<IDiscipline>(`${this.URL}/discipline/`, {
      name,
      tutor,
    });
  }

  addNewRoom(name: string, capacity: string) {
    return this.http.post<IRoom>(`${this.URL}/room/`, {
      name,
      capacity,
    });
  }

  getTutors(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}/tutors/`);
  }

  getStudents(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}/students/`);
  }

  getGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.URL}/group/`);
  }

  getDisciplines(): Observable<IDiscipline[]> {
    return this.http.get<IDiscipline[]>(`${this.URL}/discipline/`);
  }

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.URL}/room/`);
  }

  getUserById(id: number): Observable<IUser> {
    return from(
      fetch(`${this.URL}/user/${id}`).then((response) => response.json())
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

  deleteDiscipline(id: number) {
    return fetch(`${this.URL}/discipline/${id}`, {
      method: 'DELETE',
    });
  }

  deleteRoom(id: number) {
    return fetch(`${this.URL}/room/${id}`, {
      method: 'DELETE',
    });
  }
}
