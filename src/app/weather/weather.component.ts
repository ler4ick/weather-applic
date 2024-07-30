import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { AutocompleteService } from '../autocomplete.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  showSuggestions = false;
  myWeather: any;
  temperature: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  feelsLikeTemp: number = 0;
  summary: string = '';
  lat: string = '0';
  lon: string = '0';
  city: string = '';
  selectedCity: string = '';
  units: string = 'metric';
  suggestions: any[] = [];
  timezone: number = 0;
  time: string = '';
  temp_min: number = 0;
  temp_max: number = 0;
  sea_level: number = 0;
  wind_speed: number = 0;
  sunrise: number = 0;
  sunset: number = 0;
  iconURL: string = '';

  constructor(
    private weatherService: WeatherService,
    private autocompleteService: AutocompleteService
  ) {
    this.getTimeFromTimezone(this.timezone);
  }

  ngOnInit(): void {}

  onInputChange() {
    this.autocompleteService.getSuggestions(this.city).subscribe((response) => {
      console.log(response.suggestions);
      this.suggestions = response.suggestions;
      //this.toggleSuggestions(); //
    });
  }

  toggleSuggestions() {
    this.showSuggestions = !this.showSuggestions;
  }

  selectSuggestion(suggestion: {
    value: string;
    data: {
      geo_lat: string;
      geo_lon: string;
      city: string;
    };
  }) {
    this.city = suggestion.value;
    this.toggleSuggestions();
    this.selectedCity = suggestion.data.city;

    this.lat = suggestion.data.geo_lat;
    this.lon = suggestion.data.geo_lon;

    this.weatherService
      .getWeather(
        suggestion.data.city,
        this.units,
        suggestion.data.geo_lat,
        suggestion.data.geo_lon
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.myWeather = res;
          console.log(this.myWeather);
          this.temperature = this.myWeather.main.temp;
          this.pressure = this.myWeather.main.pressure;
          this.feelsLikeTemp = this.myWeather.main.feels_like;
          this.humidity = this.myWeather.main.humidity;
          this.summary = this.myWeather.weather[0].main;
          this.timezone = this.myWeather.timezone;
          this.temp_max = this.myWeather.main.temp_max;
          this.temp_min = this.myWeather.main.temp_min;
          this.sea_level = this.myWeather.main.sea_level;
          this.wind_speed = this.myWeather.wind.speed;
          this.sunrise = this.myWeather.sys.sunrise;
          this.sunset = this.myWeather.sys.sunset;
          this.iconURL =
            'http://openweathermap.org/img/wn/' +
            this.myWeather.weather[0].icon +
            '@2x.png';
        },

        error: (error) => console.log(error.message),

        complete: () => console.info('API call completed'),
      });
  }

  getSuggestions() {
    return this.suggestions;
  }

  getTimeFromTimezone(timezone: number): string {
    const hours = Math.floor(timezone / 3600);
    const minutes = Math.floor((timezone % 3600) / 60);
    console.log(hours);

    this.time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}`;
    return this.time;
  }
}
