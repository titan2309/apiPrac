import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiPathConfig {
  private apiUrl = 'http://localhost:8080/api/users';

  readonly url = this.apiUrl;
}
