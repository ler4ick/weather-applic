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
  lat: number = 0;
  lon: number = 0;
  city: string = '';
  units: string = 'imperial';
  suggestions: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private autocompleteService: AutocompleteService
  ) {}

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

  onInputChange() {
    this.autocompleteService.getSuggestions(this.city).subscribe((response) => {
      this.suggestions = response.suggestions;
      this.toggleSuggestions(); //
    });
  }

  toggleSuggestions() {
    this.showSuggestions = !this.showSuggestions;
  }

  // selectSuggestion(suggestion: { value: string }, event: MouseEvent) {
  //   (event.target as HTMLInputElement).value = suggestion.value;
  //   suggestion.value = this.city;
  //   this.toggleSuggestions();
  // }
  selectSuggestion(suggestion: { value: string }) {
    this.city = suggestion.value;
    this.toggleSuggestions();
  }

  getSuggestions() {
    return this.suggestions;
  }
}
