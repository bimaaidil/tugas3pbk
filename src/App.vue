<template>
  <div class="container">
    <div class="todo-app">
      <h1>Jadwal Kegiatan! <br> Pilih Kegiatan</h1>
      <div class="row">
        <input type="text" v-model="newTask" placeholder="Ketik kegiatan">
        <button @click="addTask">ADD</button>
      </div>
      <div class="filters">
        <button @click="hideCompleted = !hideCompleted" class="button-74">
          {{ hideCompleted ? 'Tampil' : 'Sembunyi' }}
        </button>
      </div>
      <div class="list">
      <ul class="task-list">
        <li v-for="(task,) in filteredTodos" :key="task.id" :class="{ checked: task.checked }" @click="toggleTask(task)">
          <span v-if="!task.editing">{{ task.text }}</span>
          <input v-else type="text" v-model="task.updatedText">
          <span @click.stop="editTask(task)" v-if="!task.editing">edit</span>
          <span @click.stop="updateTask(task)" v-else>Save</span>
          <span @click.stop="removeTask(task)">delete</span>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const newTask = ref('');
const tasks = ref([]);
const hideCompleted = ref(false);

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter(task => !task.checked)
    : tasks.value;
});

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
<style scoped>

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
  color: rgb(226, 206, 206);
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
}

.button-74 {
  background-color: #702e04;
  color: rgb(252, 250, 252);
  cursor: pointer;
  font-size: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
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