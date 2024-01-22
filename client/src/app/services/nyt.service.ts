import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, finalize } from 'rxjs';
import { TypeSection } from '../models/section.type';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class NytService {
  constructor(private http: HttpClient) {}

  getSections() {
    const url = `${BASE_URL}/sections`;
    return this.http.get(url).pipe(
      map((response: any) => {
        let data: TypeSection[] = [];
        if (response.results && Array.isArray(response.results)) {
          data = response.results as TypeSection[];
        }
        return data;
      }),
      catchError((error) => {
        throw error;
      }),
      finalize(() => {
        console.log(`get sections finalize`);
      })
    );
  }
}
