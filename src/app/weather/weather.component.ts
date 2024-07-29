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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed'),
    });
  }
}
