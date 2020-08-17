import { getSeason, getWeekdayOrder } from '../src/js/helpers/date';
import { convertCtoF, convertFtoC, formatCoords } from '../src/js/helpers/units';
import { decode } from '../src/js/api/geoDecoder';

describe('Testing getSeason function', () => {
  it('Check without passing date. Should return current season.', () => {
    const result = getSeason();
    expect(result).toBe('spring');
  });
  it('Check with passing date. Should return "winter".', () => {
    const result = getSeason('2020-02-17');
    expect(result).toBe('winter');
  });
});

describe('Testing getWeekOrder function', () => {
  it('Check without passing date. Should return current weekday order.', () => {
    const result = getWeekdayOrder();
    expect(result).toBe(new Date().getDay());
  });
  it('Check with passing date. Should return 1.', () => {
    const result = getWeekdayOrder('2020-06-01');
    expect(result).toBe(1);
  });
});

describe('Testing convertCtoF function', () => {
  it('Should return 32', () => {
    const result = convertCtoF(0);
    expect(result).toBe(32);
  });
});

describe('Testing convertCtoF function', () => {
  it('Should return 0', () => {
    const result = convertFtoC(32);
    expect(result).toBe(0);
  });
});

describe('Testing unit converting.', () => {
  it('Check C -> F -> C', () => {
    const C = 0;
    expect(C).toBe(convertFtoC(convertCtoF(C)));
  });
  it('Check F -> C -> F', () => {
    const F = 32;
    expect(F).toBe(convertCtoF(convertFtoC(F)));
  });
});

describe('Testing formatCoords function.', () => {
  it('Check formatting pozitive value.', () => {
    expect(formatCoords(32.887837587)).toBe('32˚89\'');
  });
  it('Check formatting negative value.', () => {
    expect(formatCoords(-32.887837587)).toBe('-32˚89\'');
  });
});

const fetchMock = require('fetch-mock');

describe('Testing geo decoder API', () => {
  it('Check valid search. Should returns object.', async () => {
    const responseObject = {
      total_results: 1,
      results: [
        {
          components: {
            country: 'Belarus',
            city: 'Minsk',
          },
          geometry: {
            lat: 57,
            lng: 27,
          },
          annotations: {
            timezone: {
              name: 'Europe/Minsk',
            },
          },
        },
      ],
    };
    fetchMock.get('https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=5252bec4efe0437190705dc3e994e941&language=ru&pretty=1', responseObject);
    const result = await decode(['Minsk'], 'ru');
    expect(result).toBeInstanceOf(Object);
  });
  it('Check invalid search. Should throws Error.', async () => {
    const responseObject = {
      total_results: 0,
      results: [
      ],
    };
    fetchMock.get('https://api.opencagedata.com/geocode/v1/json?q=fff&key=5252bec4efe0437190705dc3e994e941&language=en&pretty=1', responseObject);
    fetchMock.get('../translations/en.json', { error: 'There is no such place' });
    try {
      await decode(['fff'], 'en');
    } catch (error) {
      expect(error.message).toEqual('There is no such place');
    }
  });
  it('Check language of error. Should throws an russian error.', async () => {
    const responseObject = {
      total_results: 0,
      results: [
      ],
    };
    fetchMock.get('https://api.opencagedata.com/geocode/v1/json?q=fff&key=5252bec4efe0437190705dc3e994e941&language=ru&pretty=1', responseObject);
    fetchMock.get('../translations/ru.json', { error: 'Нет такого места' });
    try {
      await decode(['fff'], 'ru');
    } catch (error) {
      expect(error.message).toEqual('Нет такого места');
    }
  });
});
