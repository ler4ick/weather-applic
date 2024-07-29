import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string, units: string) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=07e1bed3022f92880ee93942253f2fc5&units=' +
        units
    );
  }
}
