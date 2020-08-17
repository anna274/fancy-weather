import { generateClock } from './js/helpers/date';
import { LangSwitcher } from './js/controllers/LangSwitcher';
import { UnitSwitcher } from './js/controllers/UnitSwitcher';
import { BGSwitcher } from './js/controllers/BGSwitcher';
import { VoiceSearcher } from './js/controllers/VoiceSearcher';

const defaultLang = localStorage.getItem('lang') || 'ru';
const defaultUnit = localStorage.getItem('unit') || 'M';

const langSwitcher = new LangSwitcher(document.getElementById('lang-switcher'), defaultLang);
const unitSwitcher = new UnitSwitcher(document.getElementById('unit-switcher'), defaultUnit);
const bgSwitcher = new BGSwitcher(document.getElementById('bg-switcher'), document.body);
const dateClock = generateClock(document.querySelector('.today__date'), langSwitcher.currentLang);
const voiceSearcher = new VoiceSearcher(document.getElementById('location-searcher'), document.getElementById('microphone'));

async function updatePage(...query) {
  const addInfo = await VoiceSearcher.search(
    langSwitcher.currentLang, unitSwitcher.currentUnit, query,
  );
  if (addInfo) {
    bgSwitcher.updateBG(addInfo.bgQuery);
    dateClock.timeZone = addInfo.timeZone;
  }
}

async function init(lat, long) {
  await updatePage(lat, long);
  dateClock.start();
  document.querySelector('.loader__layout').remove();
}

voiceSearcher.form.onsubmit = () => {
  const query = document.querySelector('.input').value;
  updatePage(query);
  return false;
};

langSwitcher.element.addEventListener('click', (event) => {
  langSwitcher.switchLang(event);
  dateClock.lang = langSwitcher.currentLang;
});

document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition((response) => {
    init(response.coords.latitude, response.coords.longitude);
  });
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', langSwitcher.currentLang);
  localStorage.setItem('unit', unitSwitcher.currentUnit);
});

export {
  langSwitcher, unitSwitcher, bgSwitcher, dateClock,
};
