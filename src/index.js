import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPhotos } from './js/apiPixabay';

const refs = {
  form: document.querySelector('.search-form'),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onBtnLoad);

let searchQuerry = '';
let currentPage = 1;

//Форма пошуку
function onSearchForm(event) {
  event.preventDefault();
  searchQuerry = event.currentTarget.searchQuery.value.trim();
  if (searchQuerry === '') {
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

async function fetchImage(url) {
  //"We're sorry, but you've reached the end of search results."
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
/*галерея і картка зображень
 <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */
