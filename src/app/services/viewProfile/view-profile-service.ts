import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPathConfig } from '../core/api-path-config';

@Injectable({
  providedIn: 'root',
})
export class ViewProfileService {
  private http = inject(HttpClient);
  private apiUrl = inject(ApiPathConfig);

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl.url}/users/${id}`);
  }
}
