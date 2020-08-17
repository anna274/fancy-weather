import { getData } from '../helpers/getData';

const API_KEY = 'trnsl.1.1.20200504T071608Z.39d69b4ca5a654f2.3b2b271ff02a76d634bf1c759a10219388ac869b';

async function getTranslate(text, from, to) {
  const response = await getData(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${text}&lang=${from}-${to}`);
  return response.text[0];
}

export { getTranslate };
