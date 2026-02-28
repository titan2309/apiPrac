import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPathConfig } from '../core/api-path-config';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  private http = inject(HttpClient);
  private apiUrl = inject(ApiPathConfig);

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl.url}/${id}`);
  }
}
