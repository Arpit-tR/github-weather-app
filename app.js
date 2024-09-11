const API_KEY = `89c09b17d75d3d55537b539ed16e556c`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const title = document.querySelector(".For");
const wf = document.querySelector(".wf");
const timeElement = document.querySelector("#time");

const defaultBackgroundImageUrl = "/Weather/back.jpg";

const updatePosition = () => {
  const forElement = document.querySelector(".For");

  if (window.innerHeight < 600) {
    forElement.style.top = "25%";
    forElement.style.font = "20px";
  } else {
    forElement.style.top = "39%";
    forElement.style.font = "33px";
  }
};
window.addEventListener("resize", updatePosition);
updatePosition();

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

const getWeather = async (city) => {
  if (!city) {
    weather.innerHTML = `<h2>Enter city</h2>`;
    wf.style.backgroundImage = `url(${defaultBackgroundImageUrl})`;
    wf.style.backgroundSize = "cover";
    wf.style.backgroundPosition = "center";
    timeElement.style.display = "none";
    title.classList.remove("moved-up");

    return;
  }

  weather.innerHTML = `<h2>Loading...</h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  title.classList.add("moved-up");
  const data = await response.json();
  showWeather(data);
  showTime(data);
};

const showWeather = (data) => {
  if (data.cod === "404") {
    weather.innerHTML = `<h2>City not found</h2>`;
    wf.style.backgroundImage = `url(${defaultBackgroundImageUrl})`;
    wf.style.backgroundSize = "cover";
    wf.style.backgroundPosition = "center";
    timeElement.style.display = "none";
    title.classList.remove("moved-up");

    return;
  }

  weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp}&deg;C</h2>            
            <h4>${data.weather[0].main}</h4>
       </div>
    `;

  const iconCode = data.weather[0].icon;

  const backgroundImageUrl = `Weather/${iconCode}.jpg`;

  wf.style.backgroundImage = `url(${backgroundImageUrl})`;
  wf.style.backgroundSize = "cover";
  wf.style.backgroundPosition = "center";
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  getWeather(search.value);
});

const showTime = (data) => {
  const timezoneOffset = data.timezone;
  const localDate = new Date(new Date().getTime() + timezoneOffset * 1000);

  const hours = localDate.getUTCHours().toString().padStart(2, "0");
  const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

  timeElement.innerHTML = `<h3>Current Time: ${hours}:${minutes}:${seconds}</h3>`;
};
