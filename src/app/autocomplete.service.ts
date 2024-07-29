import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  private apiUrl =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private token = '4b9ca2f9af785fd788f8689dc076668e9fb89eb8';

  constructor(private http: HttpClient) {}

  getSuggestions(query: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`,
    });

    const body = {
      type: 'ADDRESS',
      hint: false,
      bounds: 'city',
      constraints: {
        label: '',
        locations: { city_type_full: 'город' },
      },
      query,
    };
    console.log('Bibs' + this.http.post<any>(this.apiUrl, body, { headers }));
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
