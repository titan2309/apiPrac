import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPathConfig } from '../core/api-path-config';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private http = inject(HttpClient);
  private apiUrl = inject(ApiPathConfig);
  // userUpdateData!

  getUserById(id: string | number) {
    return this.http.get<any>(`${this.apiUrl.url}/users/${id}`);
  }

  updateUser(id: string | number, userData: any) {
    return this.http.put<any>(`${this.apiUrl.url}/users/${id}`, userData);
  }
}
