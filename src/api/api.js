import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getAlbums() {
    return apiClient.get('albums');
  },
  getPhotos(albumId) {
    return apiClient.get(`photos?albumId=${albumId}`);
  }
};