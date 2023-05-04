import { Notify } from 'notiflix/build/notiflix-notify-aio';

const START_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  return fetch(`${START_URL}/name/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}