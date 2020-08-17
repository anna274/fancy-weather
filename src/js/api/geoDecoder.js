import { getData } from '../helpers/getData';
import { formatCoords } from '../helpers/units';

const API_KEY = '5252bec4efe0437190705dc3e994e941';

export async function decode(query, lang) {
  const formatedQuery = query.join('%2C%20');
  const requestURL = `https://api.opencagedata.com/geocode/v1/json?q=${formatedQuery}&key=${API_KEY}&language=${lang}&pretty=1`;
  let data = await getData(requestURL);
  if (data.total_results === 0) {
    const translations = await getData(`../translations/${lang}.json`);
    throw new Error(translations.error);
  }
  data = data.results[0];
  const location = {
    place: `${data.components.country}, ${data.components.city || data.components.town || data.components.village || data.components.state || data.formatted}`,
    coords: {
      lat: data.geometry.lat,
      long: data.geometry.lng,
    },
    formated: {
      lat: formatCoords(data.geometry.lat),
      long: formatCoords(data.geometry.lng),
    },
    timeZone: data.annotations.timezone.name,
  };
  return location;
}
