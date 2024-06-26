import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Album from '../components/Album.vue';
import AlbumDetail from '../components/AlbumDetail.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Album },
  { path: '/albums/:id', component: AlbumDetail }
];

const router = createRouter({
  history: createWebHistory(),  
  routes 
});

export default router;