const apiKey = '65dc2a1f074cfaa1facbb96a66e9e88b';
const displayCurrentLocationWeather = async position => {
	const coordinates = await position.coords;
	console.log(coordinates);
	const { latitude } = coordinates;
	const { longitude } = coordinates;

	const coordsUrl = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
	console.log(coordsUrl);

	try {
		const response = await fetch(coordsUrl);
		console.log(response);
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}

	renderWeatherInfo(sample);
};

const createApiUrl = (searchedLocationArray, apiKey) => {
	const url = `api.openweathermap.org/data/2.5/weather?q=${searchedLocationArray[0]},${searchedLocationArray[1].toUpperCase()}&units=metric&appid=${apiKey}`;
	console.log(url);
	return url;
};

const fetchWeatherData = async url => {
	try {
		const response = await fetch(url);
		console.log(response);
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

const renderWeatherInfo = (data) => {
	const location = document.getElementById('location');
	const tempValue = document.getElementById('temp-value');
	const skyMood = document.getElementById('sky-mood');
	const skyIcon = document.getElementById('sky-icon');

	location.innerHTML = `${data.name}, ${data.sys.country}`;
	tempValue.innerHTML = `${Math.round(data.main.temp)}&degC`;
	skyMood.innerHTML = `${data.weather[0].main}`;
	skyIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
};

const errorFunc = (error) => {
	console.log(error);
};

export const getCurrentLocationAndWeather = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayCurrentLocationWeather, errorFunc);
	}
};

const locationArray = (locationString) => {
	if (locationString.includes(', ') && locationString.split(', ').length === 2) {
		const array = locationString.split(', ');
		return array;
	}
	throw new Error(`Invalid locattion. You searched for "${locationString}". Please refresh page, see the tips and enter a valid location`);
};

export const displaySearchedLocationWeather = async e => {
	e.preventDefault();
	const locationSearched = document.getElementById('locationSearched').value;
	const weatherForm = document.getElementById('weather-form');
	weatherForm.reset();

	try {
		const locationInfo = locationArray(locationSearched);
		const apiUrl = createApiUrl(locationInfo, apiKey);

		const response = await fetch(apiUrl);
		console.log(response);
		const data = await response.json();
		console.log(data);

		renderWeatherInfo(sample2);
		scroll(0, 0);
	} catch (e) {
		console.log(e);
	}
};

const changeUnit = () => {
	let newTempValue;
	const tempValue = document.getElementById('temp-value').innerText;
	if (tempValue.includes('C')) {
		const tempC = parseInt(tempValue, 10);
		const tempF = Math.round((tempC * 9) / 5 + 32);
		newTempValue = `${tempF}&degF`;
	}
	if (tempValue.includes('F')) {
		const tempF = parseInt(tempValue, 10);
		const tempC = Math.round((tempF - 32) * (5 / 9));
		newTempValue = `${tempC}&degC`;
	}
	return newTempValue;
};

export const showChangedUnit = () => {
	const tempValue = document.getElementById('temp-value');
	const changedTempValue = changeUnit();
	tempValue.innerHTML = `${changedTempValue}`;
};

const sample = {
									"coord": {
										"lon": 91.01,
										"lat": 23.48
									},
									"weather": [
										{
											"id": 721,
											"main": "Haze",
											"description": "haze",
											"icon": "50d"
										}
									],
									"base": "stations",
									"main": {
										"temp": 22,
										"feels_like": 298.73,
										"temp_min": 297.15,
										"temp_max": 297.15,
										"pressure": 1016,
										"humidity": 64
									},
									"visibility": 2200,
									"wind": {
										"speed": 1,
										"deg": 330
									},
									"clouds": {
										"all": 5
									},
									"dt": 1609741015,
									"sys": {
										"type": 1,
										"id": 9107,
										"country": "BD",
										"sunrise": 1609720716,
										"sunset": 1609759363
									},
									"timezone": 21600,
									"id": 1185755,
									"name": "Unāisār",
									"cod": 200
								}

const sample2 = {
									"coord": {
										"lon": 91.01,
										"lat": 23.48
									},
									"weather": [
										{
											"id": 721,
											"main": "Storm",
											"description": "haze",
											"icon": "50d"
										}
									],
									"base": "stations",
									"main": {
										"temp": 24,
										"feels_like": 298.73,
										"temp_min": 297.15,
										"temp_max": 297.15,
										"pressure": 1016,
										"humidity": 64
									},
									"visibility": 2200,
									"wind": {
										"speed": 1,
										"deg": 330
									},
									"clouds": {
										"all": 5
									},
									"dt": 1609741015,
									"sys": {
										"type": 1,
										"id": 9107,
										"country": "BD",
										"sunrise": 1609720716,
										"sunset": 1609759363
									},
									"timezone": 21600,
									"id": 1185755,
									"name": "Dhaka",
									"cod": 200
								}
