import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPathConfig } from '../core/api-path-config';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private http = inject(HttpClient);
  private apiUrl = inject(ApiPathConfig);

  getUserById(id: string | number) {
    return this.http.get<any>(`${this.apiUrl.url}/${id}`);
  }

  updateUser(id: string | number, userData: any) {
    return this.http.put<any>(`${this.apiUrl.url}/${id}`, userData);
  }
}
