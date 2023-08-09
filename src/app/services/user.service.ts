import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = "http://localhost:8000/api/users"
  constructor(private http: HttpClient) {
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.userUrl, user);
  }
}
