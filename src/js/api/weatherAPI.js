import { getWeekdayOrder, getSeason } from '../helpers/date';
import { getData } from '../helpers/getData';

const API_KEY = 'b48fb3a6f00944ae92506effb99449a6';

/* lat -  latitude lng - longitude */
export async function getTodayWeather(lat, long, lang, unit) {
  const requestURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&lang=${lang}&units=${unit}&key=${API_KEY}`;
  let data = await getData(requestURL);
  data = data.data[0];
  const todayWeather = {
    temp: Math.floor(data.temp),
    feels_like: Math.floor(data.app_temp),
    wind: Math.floor(data.wind_spd),
    humidity: data.rh,
    description: data.weather.description,
    icon: data.weather.icon,
    weatherCode: data.weather.code,
    season: getSeason(),
  };
  todayWeather.dayTime = (todayWeather.icon.slice(-1) === 'd') ? 'day' : 'night';
  return todayWeather;
}

export async function getForecast(lat, long, lang, unit, daysNumber) {
  const requestURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&lang=${lang}&units=${unit}&days=${daysNumber + 1}&key=${API_KEY}`;
  let data = await getData(requestURL);
  data = data.data.slice(1);
  const translations = await getData(`../translations/${lang}.json`);
  const forecast = [];
  data.forEach((dayForecast) => {
    const dayForecastObj = {
      weekday: {
        name: translations.weekday[getWeekdayOrder(dayForecast.datetime)],
        order: getWeekdayOrder(dayForecast.datetime),
      },
      temp: Math.floor(dayForecast.temp),
      icon: dayForecast.weather.icon,
    };
    forecast.push(dayForecastObj);
  });
  return forecast;
}
