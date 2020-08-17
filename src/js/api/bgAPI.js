import { getData } from '../helpers/getData';

const API_KEY = 'RVkDetxC1PweYWGj8QSc1nM8s7-000uJ8wkK8akJvAE';


async function getImgUrl(query) {
  const queryFormated = query.join(' ');
  const response = await getData(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${queryFormated}&client_id=${API_KEY}`);
  return response.urls.full;
}

export { getImgUrl };
