import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../models';

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

  // getCompanies(): Observable<ICompany[]> {
  //   return this.http.get<ICompany[]>(`${this.URL}/companies/`);
  // }
  
}
