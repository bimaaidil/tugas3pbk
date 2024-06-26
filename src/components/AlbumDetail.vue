<template>
    <div class="album-detail-page">
      <h1>Album {{ albumId }}</h1>
      <div class="photo-container">
        <div v-for="photo in photos" :key="photo.id" class="photo">
          <img :src="photo.thumbnailUrl" :alt="photo.title" @click="viewPhoto(photo.url)" />
          <p>{{ photo.title }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        albumId: null,
        photos: []
      };
    },
    created() {
      this.albumId = this.$route.params.id;
      this.fetchPhotos();
    },
    methods: {
      fetchPhotos() {
        fetch(`https://jsonplaceholder.typicode.com/albums/${this.albumId}/photos`)
          .then(response => response.json())
          .then(data => {
            this.photos = data;
          })
          .catch(error => console.error('Error fetching photos:', error));
      },
      viewPhoto(url) {
        window.open(url, '_blank');
      }
    }
  };
  </script>
  
  <style scoped>
  .album-detail-page {
    padding: 18px;
    text-align: center;
  }
  
  .photo-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .photo {
    margin: 10px;
    padding: 10px;
    background: #fff;
    border: 1px solid #ccc;
    text-align: center;
  }
  
  .photo img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    cursor: pointer;
  }
  </style>
  