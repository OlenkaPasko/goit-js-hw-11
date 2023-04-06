import axios from 'axios';

export const getPhotos = async (searchQuerry, currentPage) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '335113425-894140f70267936d7d418e310';
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  return await axios.get(`${BASE_URL}${url}`).then(response => response.data);
};
