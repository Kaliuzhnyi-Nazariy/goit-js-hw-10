import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import './styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  contentAria: document.querySelector('.cat-info'),
  load: document.querySelector('.loader'),
  errorE: document.querySelector('.error'),
};
const { selector, contentAria, load, errorE } = ref;

load.classList.add('is-hidden');
errorE.classList.add('is-hidden');
contentAria.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
  })
  .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  load.classList.remove('is-hidden');
  selector.classList.add('is-hidden');
  contentAria.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      load.classList.add('is-hidden');
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      contentAria.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      contentAria.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  selector.classList.add('is-hidden');
  load.classList.add('is-hidden');
  errorE.classList.remove('is-hidden');
  console.log(error)
}
