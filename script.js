const apiKey = "b9c87d37444b7d71e6a86a75db552ec1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const error = document.querySelector('.error');
const paragraphError = document.querySelector('.error p');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
        error.style.display = 'block';
        paragraphError.textContent = `Invalid city name "${searchBox.value.trim()}"`;
        weather.style.display = 'none';

    }
    else {
        var data = await response.json();

        const cityName = document.querySelector('.city');
        cityName.innerHTML = data.name;

        const temp = document.querySelector('.temp');
        temp.innerHTML = Math.round(data.main.temp) + 'ºC';

        const humidity = document.querySelector('.humidity');
        humidity.innerHTML = data.main.humidity + '%';

        const wind = document.querySelector('.wind');
        wind.innerHTML = Math.round(data.wind.speed) + ' km/h';

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloud.png";
        }
        else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.webp";
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        searchBox.value = "";
        weather.style.display = 'block';
        error.style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
})