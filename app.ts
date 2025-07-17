const apiKey = "21e787f2b678a61185dc50b205222ff1";

const getWeatherBtn = document.getElementById(
  "getWeatherBtn"
) as HTMLButtonElement;
const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const weatherResult = document.getElementById(
  "weatherResult"
) as HTMLDivElement;

getWeatherBtn.addEventListener("click", () => {
  const cityName = cityInput.value;
  const cityRegex = /^[a-zA-Z\s]+$/;
  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  } else if (!cityRegex.test(cityName)) {
    alert("City name should contain only letters and spaces.");
    return;
  }
  fetchWeather(cityName);
});

const fetchWeather = async (city: string): Promise<void> => {
  weatherResult.innerHTML = `<p>Loading...</p>`;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found!");
    }
    const data = await response.json();
    displayWeather(data);
    cityInput.value = "";
  } catch (error) {
    weatherResult.innerHTML = `<p style="color: red;">${
      (error as Error).message
    }</p>`;
  }
};

function displayWeather(data: any): void {
  const { name, main, weather } = data;
  const temp = main.temp;
  const humidity = main.humidity;
  const description = weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>${temp}°C - ${description}</p>
    <p>Humidity - ${humidity}%</p>
    <img src="${icon}" alt="Weather icon" />
  `;
}
