const displayCurrentLocationWeather = async position => {
	const coordinates = await position.coords;
	console.log(coordinates);
	const { latitude } = coordinates;
	const { longitude } = coordinates;
	const apiKey = '65dc2a1f074cfaa1facbb96a66e9e88b';

	// const coordsUrl = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
	// console.log(coordsUrl);
	// let weatherData;
	// try {
	// 	weatherData = await fetch(coordsUrl);
	// 	console.log(weatherData);
	// } catch (err) {
	// 	console.log(err);
	// }

	renderWeatherInfo(sample);
};

const renderWeatherInfo = (data) => {
	const location = document.getElementById('location');
	const tempValue = document.getElementById('temp-value');
	const skyMood = document.getElementById('sky-mood');

	location.innerHTML = `${data.name}, ${data.sys.country}`;
	tempValue.innerHTML = `${data.main.temp}&degK`;
	skyMood.innerHTML = `${data.weather[0].main}`;
}

const errorFunc = (error) => {
	console.log(error);
};

export const getCurrentLocationWeather = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayCurrentLocationWeather, errorFunc);
	}
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
										"temp": 297.15,
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
