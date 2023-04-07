import axios from 'axios';

export const getPhotos = async (value, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '335113425-894140f70267936d7d418e310';
  const url = `?key=${API_KEY}&q=${value}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios.get(`${BASE_URL}${url}`).then(response => response.data);
}
