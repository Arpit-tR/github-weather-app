const API_KEY = `89c09b17d75d3d55537b539ed16e556c`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const title = document.querySelector(".For");
const wf = document.querySelector(".wf");

const defaultBackgroundImageUrl = "/Weather/back.jpg";

const getWeather = async (city) => {
  if (!city) {
    weather.innerHTML = `<h2>Enter City</h2>`;
    wf.style.backgroundImage = `url(${defaultBackgroundImageUrl})`;
    wf.style.backgroundSize = "cover";
    wf.style.backgroundPosition = "center";
    return;
  }

  weather.innerHTML = `<h2>Loading...</h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  title.classList.add("moved-up");
  showWeather(data);
};

const showWeather = (data) => {
  if (data.cod === "404") {
    weather.innerHTML = `<h2>City Not Found</h2>`;
    wf.style.backgroundImage = `url(${defaultBackgroundImageUrl})`;
    wf.style.backgroundSize = "cover";
    wf.style.backgroundPosition = "center";
    return;
  }

  console.log(data);
  weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>            
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
