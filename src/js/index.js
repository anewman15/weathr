import { getCurrentLocationAndWeather, searchedLocation } from './open_weather';

getCurrentLocationAndWeather();

const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', searchedLocation);
