import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPhotos } from './js/apiPixabay';

const refs = {
  form: document.querySelector('.search-form'),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onBtnLoad);

let searchQuery = '';
let currentPage = 1;

//Форма пошуку
function onSearchForm(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value.trim();
  currentPage = 1;
  if (searchQuery === '') {
    refs.btnLoadMore.classList.add('is-hidden');
    Notify.failure('Enter something.');
  } else {
    fetchImage(url).then(cards => {
      if (cards.total === 0) {
        refs.btnLoadMore.classList.add('is-hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
  }
}

//"We're sorry, but you've reached the end of search results."

async function fetchImage(url) {
  try {
    const cards = response.data;
    refs.gallery.insertAdjacentHTML('beforeend');
    currentPage += 1;
    refs.btnLoadMore.classList.remove('is-hidden');
    lightbox.refresh();
    return cards;
  } catch {
    refs.btnLoadMore.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function onBtnLoad() {
  fetchImage(url);
}
/*галерея і картка зображень*/

function renderGallery(cards) {
  const markup = cards
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
        return;
        `<div class="photo-card">
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
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}