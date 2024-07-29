import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  myWeather: any;
  temperature: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  feelsLikeTemp: number = 0;
  summary: string = '';
  lat: number = 0;
  lon: number = 0;
  city: string = 'Minneapolis';
  units: string = 'imperial';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.pressure = this.myWeather.main.pressure;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.summary = this.myWeather.weather[0].main;
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed'),
    });
  }
}
