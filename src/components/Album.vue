<template>
    <div class="albums-page">
      <h1>Albums</h1>
      <div class="album-container">
        <div v-for="album in albums" :key="album.id" class="album">
          <router-link :to="'/albums/' + album.id">
            <p>{{ album.title }}</p>
            <img v-if="album.thumbnailUrl" :src="album.thumbnailUrl" :alt="album.title" />
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        albums: []
      };
    },
    mounted() {
      this.fetchAlbums();
    },
    methods: {
      async fetchAlbums() {
        try {
          const albumResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
          const albums = await albumResponse.json();
          
          const photoResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
          const photos = await photoResponse.json();
  
          
          const albumsWithThumbnails = albums.map(album => {
            const thumbnail = photos.find(photo => photo.albumId === album.id);
            return {
              ...album,
              thumbnailUrl: thumbnail ? thumbnail.thumbnailUrl : null
            };
          });
  
          this.albums = albumsWithThumbnails;
        } catch (error) {
          console.error('Error fetching albums or photos:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .albums-page {
    padding: 20px;
    text-align: center;
  }
  
  .album-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .album {
    margin: 10px;
    padding: 10px;
    background: #fff;
    border: 1px solid #ccc;
    text-align: center;
  }
  
  .album img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  .album a {
    text-decoration: none;
    color: inherit;
  }
  </style>