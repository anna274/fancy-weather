function setLocation(location) {
  document.querySelector('.today__location').innerText = location;
}

function setTodayWeather(weather) {
  document.querySelector('.today__weather .degree').innerText = weather.temp;
  document.querySelector('.today__weather .description__weather-img').src = `./assets/img/weather/${weather.icon}.svg`;
  document.querySelector('.today__weather #description').innerText = weather.description;
  document.querySelector('.today__weather #description').dataset.i18n = `weather.${weather.weatherCode}`;
  document.querySelector('.today__weather #feels-like').innerText = weather.feels_like;
  document.querySelector('.today__weather #wind').innerText = weather.wind;
  document.querySelector('.today__weather #humidity').innerText = weather.humidity;
}

function setForecast(forecast) {
  document.querySelectorAll('.other-day').forEach((otherDay, i) => {
    // eslint-disable-next-line no-param-reassign
    otherDay.querySelector('.other-day__date').innerText = forecast[i].weekday.name;
    // eslint-disable-next-line no-param-reassign
    otherDay.querySelector('.other-day__date').dataset.i18n = `weekday.${forecast[i].weekday.order}`;
    // eslint-disable-next-line no-param-reassign
    otherDay.querySelector('.other-day__degree').innerText = `${forecast[i].temp}`;
    // eslint-disable-next-line no-param-reassign
    otherDay.querySelector('.other-day__weather-img').src = `./assets/img/weather/${forecast[i].icon}.svg`;
  });
}

function setCoords(lat, long) {
  document.querySelector('.latitude .value').innerText = lat;
  document.querySelector('.longitude .value').innerText = long;
}

function setContent(location, todayWeather, forecast) {
  setLocation(location.place);
  setTodayWeather(todayWeather);
  setForecast(forecast);
  setCoords(location.formated.lat, location.formated.long);
}

function setError(message) {
  document.querySelector('#error-field').innerText = message;
}

export {
  setLocation, setForecast, setTodayWeather, setCoords, setContent, setError,
};
