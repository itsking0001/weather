const button = document.querySelector('.button');
const input = document.querySelector('.input-box');
const image = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function searchweather(city) {
    const apikey = "c8d221b55ae0a865a2478802cc07e914";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    let weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log('error');
        return;
    }
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = weather_data.weather[0].description;
    console.log(weather_data);
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windspeed.innerHTML = `${weather_data.wind.speed}Km/H`;
    
    switch (weather_data.weather[0].main) {
        case 'Clouds':
            image.src = "assest/cloud.png";
            break;
        case 'Clear':
            image.src = "assest/clear.png";
            break;
        case 'Mist':
            image.src = "assest/mist.png";
            break;
        case 'Rain':
            image.src = "assest/rain.png";
            break;
        case 'Snow':
            image.src = "assest/snow.png";
            break;
    }
}

button.addEventListener('click', () => {
    searchweather(input.value);
})