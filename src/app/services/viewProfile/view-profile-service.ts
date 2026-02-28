import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPathConfig } from '../core/api-path-config';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ViewProfileService {
  private http = inject(HttpClient);
  private apiUrl = inject(ApiPathConfig);

  getUserById(id: string) {
    return this.http.get<any>(`${this.apiUrl.url}/${id}`);
  }
}
