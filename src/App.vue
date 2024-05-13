<template>
  <div class="container">
    <div class="todo-app">
      <h1>Jadwal Kegiatan! <br> Pilih Kegiatan</h1>
      <div class="filters">
        <button @click="toggleView('todo')" class="button-74">
          To-Do list
        </button>
         <button @click="toggleView('post')" class="button-74">
          tampilkan postingan
        </button>
        <select v-model="selectedUser" class="button-74">
          <option value="">Select User</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div v-if="view === 'todo'" class="row">
        <input type="text" v-model="newTask" placeholder="Ketik kegiatan">
        <button @click="addTask">ADD</button>
      </div>
      <div v-if="view === 'todo'" class="filters">
        <button @click="hideCompleted = !hideCompleted" class="button-74">
          {{ hideCompleted ? 'Tampil' : 'Sembunyi' }}
        </button>
      </div>
      <div class="list">
        <ul v-if="view === 'todo'" class="task-list">
          <li v-for="(task,) in filteredTodos" :key="task.id" :class="{ checked: task.checked }" @click="toggleTask(task)">
            <span v-if="!task.editing">{{ task.text }}</span>
            <input v-else type="text" v-model="task.updatedText">
            <span @click.stop="editTask(task)" v-if="!task.editing">edit</span>
            <span @click.stop="updateTask(task)" v-else>Save</span>
            <span @click.stop="removeTask(task)">delete</span>
          </li>
        </ul>
        <div v-else-if="view === 'post'" class="post-list">
          <div v-for="post in filteredPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const view = ref('todo');
const selectedUser = ref('');
const users = ref([]);
const newTask = ref('');
const tasks = ref([]);
const hideCompleted = ref(false);

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  users.value = data;
});

const posts = ref([]);
onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  posts.value = data;
});

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter(task => !task.checked)
    : tasks.value;
});

const filteredPosts = computed(() => {
  if (!selectedUser.value) return [];
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value));
});

function toggleView(selectedView) {
  view.value = selectedView;
}

function addTask() {
  if (newTask.value.trim() === '') {
    alert("Isi terlebih dahulu!");
  } else {
    tasks.value.unshift({ id: Date.now(), text: newTask.value, checked: false, editing: false, updatedText: '' });
    newTask.value = '';
    saveData();
  }
}

function toggleTask(task) {
  task.checked = !task.checked;
  saveData();
}

function removeTask(task) {
  const index = tasks.value.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
    saveData();
  }
}

function editTask(task) {
  task.editing = true;
  task.updatedText = task.text;
}

function updateTask(task) {
  task.text = task.updatedText;
  task.editing = false;
  saveData();
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function loadData() {
  const savedTasks = localStorage.getItem("tasks");
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
}

loadData();
</script>
<style>


.todo-app {
  width: 100%;
  max-width: 600px;
  background: rgb(2, 4, 113);
  margin: 0 auto 40px;
  padding: 10px 40px 70px;
  border-radius: 50px;
}

.todo-app h1 {
  text-align: center;
  color: rgb(103, 11, 11);
  margin-bottom: 30px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(108, 43, 3);
  padding: 10px;
  border-radius: 15px;
}

input {
  flex: 1; 
  border: none;
  outline: none;
  background: #03046d;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: #ede7e7;
}

.row button {
  padding: 10px 20px;
  background: rgb(108, 43, 3);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  border: none; 
  border-radius: 10px; 
}

.row button:hover {
  background: rgba(108, 43, 3, 0.8); 
}

ul {
  padding: 15px;
}

ul li {
  list-style: none;
  font-size: 20px;
  padding: 10px;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content:  space-between;
  align-items: normal;
  color: rgb(231, 236, 233);
}

ul li.checked::before {
  background-image: url(./assets/checked.png);
}

ul li span {
  border-radius: 5px;
  font-size: 14px;
  color: #f9f7f7;
  padding: 10px;
  width: 30px; 
  height: 30px; 
  cursor: pointer;
}

ul li span:hover {
  background: rgba(210, 210, 218, 0.8);
}

.filters {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.filters button {
  padding: 10px 20px; 
  margin:10px 10px;
}

.button-74 {
  background-color: #702e04;
  color: rgb(252, 250, 252);
  cursor: pointer;
  font-size: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  margin:10px 10px;
}

.button-74:hover {
  background-color: #780000;
}


.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.task-item span {
  margin-right: px;
  cursor: pointer;
}
.task-item input[type="text"] {
  flex: 1;
}

.checked {
  text-decoration: line-through;
}
</style>