import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiPathConfig } from '../core/api-path-config';

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private apiUrl = inject(ApiPathConfig);

  user = signal<UserRegister | undefined>(undefined);

  register(userData: UserRegister) {
    return this.http.post<any>(`${this.apiUrl.url}/createUser`, userData);
  }
}
