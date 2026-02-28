import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Users } from './user-data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/users/all';

  getAllUsers() {
    return this.http.get<Users[]>(this.apiUrl);
  }
}
