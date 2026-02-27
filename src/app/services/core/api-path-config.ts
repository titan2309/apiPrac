import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiPathConfig {
  private apiUrl = 'http://localhost:3000';

  readonly url = this.apiUrl;
}
