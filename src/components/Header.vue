<template>
    <div>
      <h1>Jadwal Kegiatan! <br> Pilih Kegiatan</h1>
      <div class="filters">
        <button @click="toggleView('todo')" class="button-74">To-Do list</button>
        <button @click="toggleView('post')" class="button-74">Tampilkan Postingan</button>
        <select v-model="localSelectedUser" @change="emitSelectUser" class="button-74">
          <option value="">Pilih Pengguna</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  
  // Menerima props dari komponen induk
  const props = defineProps({
    users: Array,
    selectedUser: String
  });
  
  const emit = defineEmits(['toggleView', 'selectUser']);
  const localSelectedUser = ref(props.selectedUser);
  
  function toggleView(selectedView) {
    emit('toggleView', selectedView);
  }
  
  function emitSelectUser() {
    emit('selectUser', localSelectedUser.value);
  }
  
  watchEffect(() => {
    localSelectedUser.value = props.selectedUser;
  });
  </script>
  
<style>
.header {
  text-align: center;
}

.user-select {
  font-size: 12px;
  text-align: center;
  margin: 10px auto;
  padding: 5px;
  display: block;
}


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

.post-list{
  color: #ffffff;
}
</style>
  