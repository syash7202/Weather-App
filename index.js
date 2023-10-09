/*  60b6c587d768c024d32223c083bbef38 */

const apiKey = "60b6c587d768c024d32223c083bbef38";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404 || response.status == 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    function weatherDetails() {
      document.querySelector(".city").innerHTML = data.name;
      const temprature = Math.round(data.main.temp);
      document.querySelector(".temp").innerHTML = ` ${temprature}°c`;
      document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
      document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    }

    function imgUpdate() {
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    weatherDetails();
    imgUpdate();
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
