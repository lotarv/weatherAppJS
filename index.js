//Констатируем
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".weather__content");
const apiKey = "yourApiKey";
const form = document.querySelector(".weather__form")
//Назначаем действие на кнопку
form.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Пожалуйста, введите населенный пункт!");
    }
})

function displayWeatherInfo(weatherData){
    const cityName = weatherData.name;
    const temp = (weatherData.main.temp - 273.15).toFixed(1);
    const humidity = weatherData.main.humidity;
    const weatherId = weatherData.weather[0].id;
    const description = weatherData.weather[0].description;
    
    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = cityName;
    cityDisplay.classList.add("cityDisplay");

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${temp}°C`
    tempDisplay.classList.add("tempDisplay");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Влажность: ${humidity}%`
    humidityDisplay.classList.add("humidityDisplay");

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");

    const emojiDisplay = document.createElement("p");
    emojiDisplay.textContent = getEmoji(weatherId);
    emojiDisplay.classList.add("emojiDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);


}

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru`;

    const response = await fetch(apiUrl);
    if (!response.ok){
        throw new Error("Не получилось найти информацию по вашему запросу");
    }
    return response.json();
}

function getEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌧️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
   const errorDisplay = document.createElement("p");
   errorDisplay.textContent = message;
   errorDisplay.classList.add("errorDisplay");

   card.textContent = "";
   card.style.display = "flex";
   card.appendChild(errorDisplay);


}

