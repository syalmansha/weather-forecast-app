const input = document.querySelector(".search-input");

const button = document.querySelector(".search-btn");

const temp = document.querySelector(".temp");

const city = document.querySelector(".city");

const condition = document.querySelector(".condition");

const humidity = document.querySelector(".humid");

const windspeed = document.querySelector(".windspeed");

const apiKey =  "YOUR-API-KEY";

const icon = document.querySelector(".icon");

const locationBtn =
document.querySelector(".location-btn");

const body = document.body;

const forecastContainer =
document.querySelector(".days-forecast");



// ---------------- WEATHER FUNCTION ----------------

async function getWeather(cityName){

    try{

        temp.innerText = "Loading...";

        const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        console.log(data);

        // Handle API errors
        if(data.cod != 200){

            city.innerText = "Error";

            temp.innerText = "--";

            condition.innerText = data.message;

            humidity.innerText = "Humidity : --";

            windspeed.innerText = "Wind : --";

            return;
        }

        // Update UI
        city.innerText = data.name;

        temp.innerText =
        Math.floor(data.main.temp) + "°C";

        const weatherMain =
        data.weather[0].main;

        condition.innerText =
        weatherMain;

        // Dynamic icons + backgrounds

        if(weatherMain === "Clouds"){

            icon.innerText = "☁️";

            body.style.background =
            "#54717A";

        }

        else if(weatherMain === "Rain"){

            icon.innerText = "🌧️";

            body.style.background =
            "#57575D";

        }

        else if(weatherMain === "Clear"){

            icon.innerText = "☀️";

            body.style.background =
            "#47AB2F";

        }

        else if(weatherMain === "Snow"){

            icon.innerText = "❄️";

            body.style.background =
            "#AFCBFF";

        }

        else if(weatherMain === "Thunderstorm"){

            icon.innerText = "⛈️";

            body.style.background =
            "#3B3B52";

        }

        else if(weatherMain === "Drizzle"){

            icon.innerText = "🌦️";

            body.style.background =
            "#5D737E";

        }

        else if(weatherMain === "Mist"){

            icon.innerText = "🌫️";

            body.style.background =
            "#9EA7AA";

        }

        else{

            icon.innerText = "🌤️";

            body.style.background =
            "#3f3f3f";

        }

        humidity.innerText =
        "Humidity : " +
        data.main.humidity + "%";

        windspeed.innerText =
        "Wind : " +
        data.wind.speed + " km/h";

    }

    catch(error){

        console.log(error);

        city.innerText = "Error";

        temp.innerText = "--";

        condition.innerText =
        "Something went wrong";

        humidity.innerText =
        "Humidity : --";

        windspeed.innerText =
        "Wind : --";

    }

}



// ---------------- FORECAST FUNCTION ----------------

async function getForecast(cityName){

    try{

        const response = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        console.log(data);

        // Handle API errors
        if(data.cod != "200"){

            forecastContainer.innerHTML =
            "<p>Forecast not available</p>";

            return;
        }

        forecastContainer.innerHTML = "";

        for(let i = 0; i < data.list.length; i += 8){

            const forecast = data.list[i];

            const date =
            new Date(forecast.dt_txt);

            const day =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday:"long"
                }
            );

            const temperature =
            Math.floor(forecast.main.temp);

            const weather =
            forecast.weather[0].main;

            forecastContainer.innerHTML += `

            <div class="forecast-card">

                <p>${day}</p>

                <p>${temperature}°C</p>

                <p>${weather}</p>

            </div>

            `;

        }

    }

    catch(error){

        console.log(error);

        forecastContainer.innerHTML =
        "<p>Something went wrong</p>";

    }

}



// ---------------- BUTTON SEARCH ----------------

button.addEventListener("click", ()=>{

    if(input.value === ""){

        alert("Please enter city name");

        return;
    }

    getWeather(input.value);

    getForecast(input.value);

    input.value = "";

});



// ---------------- ENTER KEY SEARCH ----------------

input.addEventListener("keydown", (event)=>{

    if(event.key === "Enter"){

        getWeather(input.value);

        getForecast(input.value);

        input.value = "";

    }

});



// ---------------- CURRENT LOCATION ----------------

locationBtn.addEventListener("click", ()=>{

    navigator.geolocation
    .getCurrentPosition(success);

});



async function success(position){

    const latitude =
    position.coords.latitude;

    const longitude =
    position.coords.longitude;

    const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    city.innerText = data.name;

    temp.innerText =
    Math.floor(data.main.temp) + "°C";

    const weatherMain =
    data.weather[0].main;

    condition.innerText =
    weatherMain;

    if(weatherMain === "Clouds"){

        icon.innerText = "☁️";

        body.style.background =
        "#54717A";

    }

    else if(weatherMain === "Rain"){

        icon.innerText = "🌧️";

        body.style.background =
        "#57575D";

    }

    else if(weatherMain === "Clear"){

        icon.innerText = "☀️";

        body.style.background =
        "#47AB2F";

    }

    else if(weatherMain === "Snow"){

        icon.innerText = "❄️";

        body.style.background =
        "#AFCBFF";

    }

    else if(weatherMain === "Thunderstorm"){

        icon.innerText = "⛈️";

        body.style.background =
        "#3B3B52";

    }

    else{

        icon.innerText = "🌤️";

        body.style.background =
        "#3f3f3f";

    }

    humidity.innerText =
    "Humidity : " +
    data.main.humidity + "%";

    windspeed.innerText =
    "Wind : " +
    data.wind.speed + " km/h";

}



// ---------------- DEFAULT WEATHER ----------------

getWeather("Delhi");

getForecast("Delhi");