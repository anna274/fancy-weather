import { convertCtoF, convertFtoC } from '../helpers/units';

export class UnitSwitcher {
  constructor(element, startUnit) {
    this.element = element;
    this.currentUnit = startUnit;
    this.switchUnit(startUnit);
    this.addEvents();
  }

  addEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('button') && !event.target.classList.contains('checked')) {
        this.switchUnit(event.target.dataset.unit);
        this.updateUnits();
      }
    });
  }

  switchUnit(newUnit) {
    this.element.querySelectorAll('.button').forEach((button) => {
      button.classList.remove('checked');
    });
    const newButton = this.element.querySelector(`[data-unit="${newUnit}"]`);
    newButton.classList.add('checked');
    this.currentUnit = newUnit;
  }

  updateUnits() {
    let values = [];
    const elements = document.querySelectorAll('[data-measure="temp"]');
    elements.forEach((element) => {
      values.push(Number(element.innerText));
    });
    if (this.currentUnit === 'I') {
      values = values.map((value) => Math.round(convertCtoF(value)));
    } else {
      values = values.map((value) => Math.round(convertFtoC(value)));
    }
    elements.forEach((element, i) => {
      // eslint-disable-next-line no-param-reassign
      element.innerText = values[i];
    });
  }
}
