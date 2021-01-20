import './styles.css';
import ApiService from './js/api-server';
import RenderGallery from './templates/gallery.hbs';
import LoadMoreBtn from './js/btn-load-styling';
import getRefs from './js/refs';
import notifications from './js/notification';

const newApiService = new ApiService();
const loadMore = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
let bodyheigth = 0;
const refs = getRefs();

refs.form.addEventListener('submit', onSearch);
loadMore.refs.button.addEventListener('click', onloadMore);

function onSearch(event) {
  event.preventDefault();

  newApiService.query = event.currentTarget.elements.query.value;
  if (newApiService.query.trim() === '') {
    notifications.onNull();
    return;
  }
  refs.gallery.innerHTML = '';
  newApiService.resetPage();
  loadMore.show();

  insertImage();
}

function onloadMore() {
  insertImage();
  setTimeout(() => {
    window.scrollTo({
      top: bodyheigth,
      behavior: 'smooth',
    });
  }, 300);
}

function insertImage() {
  loadMore.disable();

  newApiService.fetchImages().then(data => {
    if (data.length > 0) {
      bodyheigth = document.documentElement.offsetHeight;
      refs.gallery.insertAdjacentHTML('beforeend', RenderGallery(data));
      loadMore.enable();
    } else {
      notifications.onIncorrect();

      loadMore.hide();
    }
  });
}
