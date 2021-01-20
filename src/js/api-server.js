import notifications from './notification';

const KEY = '19956193-a9b59d6ae3d28c260e9a62791';
const BASE = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQ = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE}/?image_type=photo&orientation=horizontal&q=${this.searchQ}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(responce => responce.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }
  get query() {
    return this.searchQ;
  }
  set query(newQuery) {
    this.searchQ = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
