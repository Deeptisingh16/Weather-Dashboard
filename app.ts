const apiKey = "21e787f2b678a61185dc50b205222ff1";

const getWeatherBtn = document.getElementById(
  "getWeatherBtn"
) as HTMLButtonElement | null;
const cityInput = document.getElementById(
  "cityInput"
) as HTMLInputElement | null;
const weatherResult = document.getElementById(
  "weatherResult"
) as HTMLDivElement | null;

interface WeatherData {
  name: string;
  main: Main;
  weather: Weather[];
}
interface Main {
  temp: number;
  humidity: number;
}
interface Weather {
  description: string;
  icon: string;
}
getWeatherBtn?.addEventListener("click", () => {
  const cityName = cityInput?.value.trim();
  const cityRegex = /^[a-zA-Z\s]+$/;
  console.log("Get Weather button Clicked");
  if (!cityName) {
    alert("Please enter a city name.");
    console.log("Wrong city name");
    return;
  }
  if (!cityRegex.test(cityName)) {
    alert("City name should contain only letters and spaces.");
    console.log("Wrong pattern");
    return;
  }
  fetchWeather(cityName);
});

const fetchWeather = async (city: string): Promise<void> => {
  if (!weatherResult) return;
  weatherResult.innerHTML = `<p>Loading...</p>`;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      console.log("City not found");
      throw new Error("City not found!");
    }
    const data: WeatherData = await response.json();
    displayWeather(data);
    if (cityInput) cityInput.value = "";
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
  }
};

function displayWeather(data: WeatherData): void {
  if (!weatherResult) return;
  const { name, main, weather } = data;
  const temp = main.temp;
  const humidity = main.humidity;
  const description = weather[0]?.description ?? "No description";
  const icon = `https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`;
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>${temp}°C - ${description}</p>
    <p>Humidity - ${humidity}%</p>
    <img src="${icon}" alt="Weather icon" />
  `;
}
