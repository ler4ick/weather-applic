import { HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather() {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=07e1bed3022f92880ee93942253f2fc5'
    );
  }
}
