import { getCurrentLocationAndWeather, searchedLocation, showChangedUnit } from './open_weather';

getCurrentLocationAndWeather();

const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', searchedLocation);

const btnChangeUnit = document.getElementById('btn-change-unit');
btnChangeUnit.addEventListener('click', showChangedUnit);