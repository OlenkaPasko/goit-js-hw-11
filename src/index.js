import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '35113425-894140f70267936d7d418e310';
const BASE_URL = 'https://pixabay.com/api/';
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMor: document.querySelector('.load-more'),
};

let searchQuery = '';
let currentPage = 1;

refs.form.addEventListener('submit', onSearchForm);
refs.btnLoadMor.addEventListener('click', onBtnLoad);

function onSearchForm(event) {
  currentPage = 1;
  event.preventDefault();
  refs.gallery.innerHTML = '';
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  if (searchQuery === '') {
    refs.btnLoadMor.classList.add('is-hidden');
    Notiflix.Notify.failure('Please, fill the main field');
  } else {
    fetchImage(url).then(cards => {
      if (cards === 0) {
        refs.btnLoadMor.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        //if (response.data.totalHits <= page * 40)
      } else {
        Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
      }
    });
  }
}
async function fetchImage(url) {
  try {
    const response = await axios(url);
    const cards = response.data;
    refs.gallery.insertAdjacentHTML('beforeend', renderCards(cards));
    currentPage += 1;
    refs.btnLoadMor.classList.remove('is-hidden');
    lightbox.refresh();
    return cards;
  } catch {
    refs.btnLoadMor.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
function onBtnLoad() {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  fetchImage(url);
}

function renderCards(cards) {
  return cards.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
<a class='gallery__link' href='${largeImageURL}'><img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" width='360' height='260'/></a>
<div class="info">
  <p class="info-item">
    <b>Likes:${likes}</b>
  </p>
  <p class="info-item">
    <b>Views:${views}</b>
  </p>
  <p class="info-item">
    <b>Comments:${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads:${downloads}</b>
  </p>
</div>
</div>`;
      }
    )
    .join('');
}
