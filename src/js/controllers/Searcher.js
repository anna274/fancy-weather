import { decode } from '../api/geoDecoder';
import { getTodayWeather, getForecast } from '../api/weatherAPI';
import { setContent, setError } from '../helpers/setters';
import { updateMapArea } from '../api/mapAPI';

export class Searcher {
  constructor(form) {
    this.form = form;
  }

  static async search(lang, unit, ...query) {
    let addInfo = {};
    try {
      const location = await decode(query, lang);
      const todayWeather = await getTodayWeather(
        location.coords.lat, location.coords.long, lang, unit,
      );
      const forecast = await getForecast(location.coords.lat, location.coords.long, lang, unit, 3);
      setContent(location, todayWeather, forecast);
      updateMapArea(location.coords.lat, location.coords.long);
      addInfo.bgQuery = [todayWeather.season, todayWeather.dayTime];
      addInfo.timeZone = location.timeZone;
      setError('');
    } catch (error) {
      setError(error.message);
      addInfo = null;
    }
    return addInfo;
  }
}
