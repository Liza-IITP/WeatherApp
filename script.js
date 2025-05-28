console.log("Weather App Loaded");
const apiKey = "09a570386b1f69b0fbca3d7ce4f60fb4";

document.addEventListener("DOMContentLoaded", function () {
    let searchbtn = document.getElementById("search");
    let cityInput = document.getElementById("city");
    let errorDiv = document.getElementById("error-message");

    if (!searchbtn || !cityInput) {
        console.error("Search button or city input not found in DOM.");
        return;
    }

    searchbtn.addEventListener("click", checkWeather);
    cityInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") checkWeather();
    });

    async function checkWeather() {
        let weatherIcon = document.querySelector(".weather-icon");
        let city = cityInput.value.trim();

        if (!city) {
            errorDiv.textContent = "Please enter a city name.";
            return;
        }
        errorDiv.textContent = "";
        searchbtn.disabled = true;

        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                errorDiv.textContent = "Invalid city name. Please try again.";
                clearWeather();
                searchbtn.disabled = false;
                return;
            }
            var data = await response.json();
            errorDiv.textContent = ""; // Clear error on success
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";
            if (weatherIcon) {
                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "weather-app-img/images/clouds.png";
                }
                else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "weather-app-img/images/clear.png";
                }
                else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "weather-app-img/images/rain.png";
                }
                else if (data.weather[0].main == "Snow") {
                    weatherIcon.src = "weather-app-img/images/snow.png";
                }
                else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "weather-app-img/images/drizzle.png";
                }
                else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "weather-app-img/images/mist.png";
                }
            }
        } catch (error) {
            errorDiv.textContent = "Network error. Please try again.";
            clearWeather();
            console.error(error);
        } finally {
            searchbtn.disabled = false;
        }
    }

    function clearWeather() {
        document.querySelector(".city").innerHTML = "--";
        document.querySelector(".temp").innerHTML = "--";
        document.querySelector(".humidity").innerHTML = "--";
        document.querySelector(".wind").innerHTML = "--";
        let weatherIcon = document.querySelector(".weather-icon");
        if (weatherIcon) weatherIcon.src = "weather-app-img/images/weather.png";
    }
})