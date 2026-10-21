
async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("result");

    if (!city) {
        result.textContent = "Please enter a city.";
        return;
    }

    const apiKey = "40d1e08023dee4b3a31a2e8430838a01";
    const url =
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

    result.textContent = "Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error?.info || "Unable to fetch weather.");
        }

        result.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <h3>${data.current.temperature} °C</h3>
            <p>${data.current.weather_descriptions[0]}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_speed} km/h</p>
            <p>Feels Like: ${data.current.feelslike} °C</p>
        `;
    } catch (error) {
        result.textContent = "Error: " + error.message;
    }
}

getWeather();
