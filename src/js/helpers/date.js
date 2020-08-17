function getFormattedDate(lang, timezone, date = new Date()) {
  const mounths = {
    en: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December',
    ],
    ru: [
      'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
      'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',
    ],
    be: [
      'Студзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня',
      'Ліпеня', 'Аўгуста', 'Верасеня', 'Кастрычніка', 'Лістапада', 'Снежаня',
    ],
  };
  const weekdays = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Th', 'Fr', 'Sat'],
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    be: ['Нд', 'Пн', 'Аўт', 'Ср', 'Чт', 'Пт', 'Сб'],
  };
  const clockOptions = {
    hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: timezone,
  };
  const clock = date.toLocaleDateString(lang, clockOptions).split(', ')[1];
  return `${weekdays[lang][date.getDay()]}, ${date.getDate()} ${mounths[lang][date.getMonth()]}, ${clock}`;
}

/* n shows how many days'll go after today */
function getWeekdayOrder(date = new Date()) {
  return new Date(date).getDay();
}

function getSeason(date) {
  let month;
  if (!date) {
    month = new Date().getMonth();
  } else {
    month = new Date(date).getMonth();
  }

  if ((month >= 2) && (month <= 4)) {
    return 'spring';
  }

  if ((month >= 5) && (month <= 7)) {
    return 'summer';
  }

  if ((month >= 8) && (month <= 10)) {
    return 'autumn';
  }

  return 'winter';
}

function generateClock(container, lang = 'ru', timeZone = 'Europe/Minsk') {
  const clock = {
    container,
    lang,
    timeZone,
    start() {
      const date = getFormattedDate(this.lang, this.timeZone);
      this.container.innerText = date;
      setTimeout(() => this.start(), 500);
    },
  };
  return clock;
}


export {
  getWeekdayOrder, generateClock, getSeason, getFormattedDate,
};
