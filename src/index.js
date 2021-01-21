import './styles.css';
import ApiService from './js/api-server';
import RenderGallery from './templates/gallery.hbs';
import LoadMoreBtn from './js/btn-load-styling';
import getRefs from './js/refs';
import notifications from './js/notification';
import './scss/basicLightbox.min.css';
import './scss/main.scss';
import onOpenModal from './js/modal.js';

//********************************** */
const newApiService = new ApiService();
const loadMore = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

//************************************ */
const refs = getRefs();

refs.form.addEventListener('submit', onSearch);
loadMore.refs.button.addEventListener('click', insertImage);
refs.gallery.addEventListener('click', onOpenModal);
//******************************************** */
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

function insertImage() {
  loadMore.disable();

  newApiService.fetchImages().then(data => {
    if (data.length > 0) {
      const bodyheigth = document.documentElement.offsetHeight;

      refs.gallery.insertAdjacentHTML('beforeend', RenderGallery(data));
      if (data.length < 12) {
        notifications.onEndOfQuery();
        loadMore.hide();
      } else loadMore.enable();
      window.scrollTo({
        top: bodyheigth - 120,
        behavior: 'smooth',
      });
    } else {
      notifications.onIncorrect();

      loadMore.hide();
    }
  });
}
