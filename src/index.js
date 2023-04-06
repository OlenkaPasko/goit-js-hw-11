import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPhotos } from './js/apiPixabay';


const refs = {
  form: document.querySelector('.search-form'),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click',onBtnLoad);

let searchQuerry = '';
//let currentPage = 1;

//Форма пошуку
function onSearchForm(event) {
  event.preventDefault();
  searchQuerry = event.target.value.trim().toLowerCase();
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

function onBtnLoad() {
    fetchImage(url);
}
