const apiKey = "3b26a0d4eda0c3d380f98003f0035d2a";

function getweather() {
    // Get the city entered by the user
    const cityName = document.getElementById("city").value.trim();
    const errorMessage = document.getElementById("error");
    const weatherDetails = document.getElementById("result");

    // Error if City name is not entered
    if (cityName === "") {
        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = "block";
        weatherDetails.style.display = "none";
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(weatherData => {
            if (weatherData.cod === "404") {
                // If the city is not found
                errorMessage.textContent = "Invalid City Name";
                errorMessage.style.display = "block";
                weatherDetails.style.display = "none";
            } else {
                errorMessage.style.display = "none";
                weatherDetails.style.display = "block";

                //weather details 
                document.getElementById("cityname").textContent = weatherData.name;
                document.getElementById("citytemp").textContent = weatherData.main.temp + " °C";
                document.getElementById("cityweather").textContent = weatherData.weather[0].main;

                const weatherCondition = weatherData.weather[0].main.toLowerCase();
                const emojiMap = {
                    clear: "☀️",
                    clouds: "☁️",
                    rain: "🌧️",
                    drizzle: "🌦️",
                    thunderstorm: "⛈️",
                    snow: "❄️",
                    mist: "🌫️"
                };
                document.getElementById("weatherEmoji").textContent = emojiMap[weatherCondition] || "";

                // weather icon
                const iconCode = weatherData.weather[0].icon;
                document.getElementById("weathericon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                //weather information like wind speed, humidity, and cloud percentage
                document.getElementById("wind").textContent = weatherData.wind.speed + " m/s";
                document.getElementById("humidity").textContent = weatherData.main.humidity + " %";
                document.getElementById("cloud").textContent = weatherData.clouds.all + " %";
            }
        })
        .catch(error => { //network issues
            console.log(error);
            errorMessage.textContent = "Something went wrong! Check Your Internet Connection";
            errorMessage.style.display = "block";
            weatherDetails.style.display = "none";
        });
}
