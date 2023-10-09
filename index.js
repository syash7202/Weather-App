const apiKey = "60b6c587d768c024d32223c083bbef38";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
let background = document.querySelector(".body");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404 || response.status == 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    console.log(data);

    function weatherDetails() {
      document.querySelector(".city").innerHTML = data.name;
      const temprature = Math.round(data.main.temp);
      document.querySelector(
        ".temp"
      ).innerHTML = ` ${temprature}°c <span style="font-size: 40px">&</span> ${data.weather[0].main}`;
      document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
      document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    }

    function imgUpdate() {
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
        background.style.background = "url(images/clouds-bg.jpg)";
        background.style.backgroundSize = "100vw 100vh";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
        background.style.background = "url(images/clear-bg.jpg)";
        background.style.backgroundSize = "100vw 100vh";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
        background.style.background = "url(images/rain-bg.jpg)";
        background.style.backgroundSize = "100vw 100vh";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        background.style.background = "url(images/drizzle-bg.jpg)";
        background.style.backgroundSize = "100vw 100vh";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
        background.style.background = "url(images/mist-bg.jpg)";
        background.style.backgroundSize = "100vw 100vh";
      } else if (data.weather[0].main == "Haze") {
        weatherIcon.src = "images/mist.png";
        background.style.background = "url(images/mist-bg.jpg)";
        background.style.backgroundSize = "100vw 100vh";
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

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    checkWeather(searchBox.value);
  }
});
