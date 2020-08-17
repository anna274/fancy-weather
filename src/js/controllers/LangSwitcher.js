import { getTranslate } from '../api/translateAPI';
import { getData } from '../helpers/getData';

export class LangSwitcher {
  constructor(element, startLang) {
    this.element = element;
    this.currentLang = startLang;
    this.lastLang = '';
    this.turnSwitcher(startLang);
    this.translateLayout();
  }

  switchLang(event) {
    if (event.target.closest('.option') && event.target.dataset.lang !== this.currentLang) {
      this.turnSwitcher(event.target.dataset.lang);
      this.translatePage();
    }
    this.element.classList.toggle('open');
  }

  turnSwitcher(newLang) {
    this.element.querySelectorAll('.option').forEach((option) => {
      option.classList.remove('selected');
    });
    const newOption = this.element.querySelector(`[data-lang="${newLang}"]`);
    newOption.classList.add('selected');
    this.lastLang = this.currentLang;
    this.currentLang = newLang;
    this.element.querySelector('.trigger').innerText = newOption.innerText;
  }

  translatePage() {
    this.translateLayout();
    this.translateDinamicContent();
  }

  translateDinamicContent() {
    const dinamicElements = document.querySelectorAll('[data-i18n="-"]');
    const elemsContent = [];
    dinamicElements.forEach((element) => {
      elemsContent.push(element.innerText);
    });
    // eslint-disable-next-line max-len
    const requests = elemsContent.map((content) => getTranslate(content, this.lastLang, this.currentLang));
    Promise.all(requests)
      .then((translations) => translations.forEach((translation, i) => {
        dinamicElements[i].innerText = translation;
      }));
  }

  async translateLayout() {
    const layoutElements = document.querySelectorAll('[data-i18n]');
    const translations = await getData(`../translations/${this.currentLang}.json`);
    layoutElements.forEach((element) => {
      if (element.dataset.i18n !== '-') {
        const path = element.dataset.i18n.split('.');

        let translation = translations;
        path.forEach((piece) => {
          translation = translation[piece];
        });

        if (path[path.length - 1] === 'placeholder') {
          // eslint-disable-next-line no-param-reassign
          element.placeholder = translation;
        } else {
          // eslint-disable-next-line no-param-reassign
          element.innerText = translation;
        }
      }
    });
  }
}
