import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const blockEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputWrite, DEBOUNCE_DELAY));

function onInputWrite(e) {
  let nameOfCountry = e.target.value.trim();
  if (!nameOfCountry) {
    listEl.innerHTML = '';
    blockEl.innerHTML = '';
    return;
  }

  fetchCountries(nameOfCountry)
    .then(r => {
      if (r.length > 10) {
        blockEl.innerHTML = '';
        listEl.innerHTML = '';
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (r.length === 1) {
        listEl.innerHTML = '';
        return (blockEl.innerHTML = onRenderCountryCard(r));
      }
      blockEl.innerHTML = '';
      listEl.insertAdjacentHTML('beforeend', onRenderList(r));
    })
    .catch(error => {
      blockEl.innerHTML = '';
      listEl.innerHTML = '';
    });
}

function onRenderList(array) {
  return array
    .map(
      ({ name, flags }) =>
        `<li class="country-item"><img src="${flags.png}" alt="${name.official}" width='32' height = '20'>
        <p class="country-text">${name.official}</p></li>`
    )
    .join('');
}

function onRenderCountryCard(array) {
  return array
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class = "country-item"><img src="${flags.png}" alt="${
          name.official
        }" width='64' height = '40'>
        <h1 class="country-text">${name.official}</h1></div>
        <p class="country-text-info"><span class="country-pre-text">Capital:</span> ${capital}</p>
        <p class="country-text-info"><span class="country-pre-text">Population:</span> ${population}</p>
        <p class="country-text-info"><span class="country-pre-text">Languages:</span> ${Object.values(languages)} </p>
        `
    )
    .join('');
}