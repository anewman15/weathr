const apiKey = '65dc2a1f074cfaa1facbb96a66e9e88b';

const createApiUrl = (searchedLocationArray, apiKey) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocationArray[0]},${searchedLocationArray[1].toUpperCase()}&units=metric&appid=${apiKey}`;
	return url;
};

const renderWeatherInfo = (data) => {
	const location = document.getElementById('location');
	const tempValue = document.getElementById('temp-value');
	const skyMood = document.getElementById('sky-mood');
	const skyIcon = document.getElementById('sky-icon');

	location.innerHTML = `${data.name}, ${data.sys.country}`;
	tempValue.innerHTML = `${Math.round(data.main.temp)}&degC`;
	skyMood.innerHTML = `${data.weather[0].main}`;
	skyIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
};

const renderNotFoundError = () => {
	const errorSection = document.getElementById('error-section');
	errorSection.innerHTML = `
		<div class="alert alert-danger" role="alert">
			City not found. Please see Tips below.
		</div>`;
	setTimeout(() => {
		errorSection.innerHTML = '';
	}, 10000);
};

const displayError = (err) => {
	const errorSection = document.getElementById('error-section');
	errorSection.innerHTML = `
		<div class="alert alert-danger" role="alert">
			${err}
		</div>`;
	setTimeout(() => {
		errorSection.innerHTML = '';
	}, 10000);
};

const renderData = (data) => {
	if (data.weather) {
		renderWeatherInfo(data);
	} else if (data.cod === '404') {
		renderNotFoundError();
	}
};

const displayCurrentLocationWeather = async position => {
	const coordinates = await position.coords;
	const { latitude } = coordinates;
	const { longitude } = coordinates;

	const coordsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

	try {
		const response = await fetch(coordsUrl);
		const data = await response.json();
		renderData(data);
	} catch (error) {
		displayError(error);
	}
};

const errorFunc = (error) => {
	console.log(error);
	displayError(error);
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
		const data = await response.json();
		renderData(data);
		scroll(0, 0);
	} catch (error) {
		displayError(error);
	}
};

const changeUnit = () => {
	let newTempValue;
	const tempValue = document.getElementById('temp-value').innerText;
	if (tempValue.includes('C')) {
		const tempC = parseInt(tempValue, 10);
		const tempF = Math.round((tempC * 9) / 5 + 32);
		newTempValue = `${tempF}&degF`;
	} else if (tempValue.includes('F')) {
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
