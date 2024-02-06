import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: string = 'http://localhost:8080/ms/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  createUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.api, user, { observe: 'response' });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.api, user);
  }

  deleteUser(user: User): Observable<{}> {
    const url = `${this.api}/${user.id}`;
    return this.http.delete(url);
  }
}
