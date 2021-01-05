import { getCurrentLocationAndWeather, displaySearchedLocationWeather, showChangedUnit } from './open_weather';

window.addEventListener('load', getCurrentLocationAndWeather);

const weatherForm = document.getElementById('weather-form');
weatherForm.addEventListener('submit', displaySearchedLocationWeather);

const btnChangeUnit = document.getElementById('btn-change-unit');
btnChangeUnit.addEventListener('click', showChangedUnit);