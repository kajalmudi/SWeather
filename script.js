let latitude;
let longitude;
let temp;
let city;
let feels_like;
let weatherCondition;
let windSpeed;
let icon;
let country;
const container = document.getElementById("container");
const textInput = document.getElementById("textInput");
const search = document.getElementById("search");
const success = (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
};
const error = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(success, error);
const getInfo = document.getElementById("getInfo");
getInfo.addEventListener("click", () => {
  let w = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=65c5ae04caa599caf1a03c461ce04555`
  );
  w.then((response) => {
    return response.json();
  }).then((response) => {
    temp = response.main.temp - 273.15;
    temp = temp.toPrecision(2);
    feels_like = response.main.feels_like - 273.15;
    feels_like = feels_like.toPrecision(2);
    city = response.name;
    weatherCondition = response.weather[0].main;
    icon = response.weather[0].icon;
    windSpeed = response.wind.speed;
    country = response.sys.country;
    console.log(country);
    container.innerHTML = `
    <div class="col-xs-12 col-lg-6 order-2 order-lg-1 p-5">
        <h1 class="mt-5">
          <span id="heading">SWeather</span> - Get the Most Accurate Weather
          <span id="heading">Now!</span>
        </h1>
        <button id="getInfo" class="btn btn-outline-danger mt-5">
          Get current weather
        </button>
        <div class="container text-muted my-5 pl-0">
          &#169 Developed by Sayandeep Adhikary
        </div>
      </div>
    <div class="col-xs-12 col-lg-6 order-1 d-flex" id="content">
        <div class="row">
          <div class="col-xs-12 col-lg-6 mt-auto mb-auto order-2">
            <div class="d-flex m-3" id="info">
              <div>
                <div class="display-4">${temp}&degC</div>
                <div class="lead">${city}, ${country}</div>
              </div>
              <div>
                <i class="fa-solid fa-cloud my-2"></i> ${weatherCondition} <br>
                <i class="fa-solid fa-temperature-low my-2"></i> Feels like : ${feels_like}&degC <br>
                <i class="fa-solid fa-wind my-2"></i> ${windSpeed} meters/second
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-6 mt-auto mb-auto order-1">
            <div class="d-flex align-items-center justify-content-center m-5">
              <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Image">
            </div>
          </div>
        </div>
      </div>`;
    // location.href = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=65c5ae04caa599caf1a03c461ce04555`;
  });
});
// https://openweathermap.org/img/wn/10d@4x.png

// https://api.openweathermap.org/geo/1.0/direct?q=kolkata&limit=5&appid=65c5ae04caa599caf1a03c461ce04555

search.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = textInput.value;
  console.log(val);
  let f = fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${val}&appid=65c5ae04caa599caf1a03c461ce04555`
  );
  f.then((response) => {
    return response.json();
  }).then((response) => {
    console.log(response);
    // for(keys in response) console.log(keys + " ==> " + response[keys]);
    latitude = response[0].lat;
    longitude = response[0].lon;
    // console.log(latitude + " " + longitude);
    let w = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=65c5ae04caa599caf1a03c461ce04555`
    );
    w.then((response) => {
      return response.json();
    }).then((response) => {
      temp = response.main.temp - 273.15;
      temp = temp.toPrecision(2);
      feels_like = response.main.feels_like - 273.15;
      feels_like = feels_like.toPrecision(2);
      city = response.name;
      weatherCondition = response.weather[0].main;
      icon = response.weather[0].icon;
      windSpeed = response.wind.speed;
      country = response.sys.country;
      console.log(country);
      container.innerHTML = `
      <div class="col-xs-12 col-lg-6 order-2 order-lg-1 p-5">
          <h1 class="mt-5">
            <span id="heading">SWeather</span> - Get the Most Accurate Weather
            <span id="heading">Now!</span>
          </h1>
          <button id="getInfo" class="btn btn-outline-danger mt-5">
            Get current weather
          </button>
          <div class="container text-muted my-5 pl-0">
            &#169 Developed by Sayandeep Adhikary
          </div>
        </div>
      <div class="col-xs-12 col-lg-6 order-1 d-flex" id="content">
          <div class="row">
            <div class="col-xs-12 col-lg-6 mt-auto mb-auto order-2">
              <div class="d-flex m-3" id="info">
                <div>
                  <div class="display-4">${temp}&degC</div>
                  <div class="lead">${city}, ${country}</div>
                </div>
                <div>
                  <i class="fa-solid fa-cloud my-2"></i> ${weatherCondition} <br>
                  <i class="fa-solid fa-temperature-low my-2"></i> Feels like : ${feels_like}&degC <br>
                  <i class="fa-solid fa-wind my-2"></i> ${windSpeed} meters/second
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-6 mt-auto mb-auto order-1">
              <div class="d-flex align-items-center justify-content-center m-5">
                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Image">
              </div>
            </div>
          </div>
        </div>`;
      // location.href = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=65c5ae04caa599caf1a03c461ce04555`;
    });
  });
});
