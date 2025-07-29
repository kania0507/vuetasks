<template>
  <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/task1">Task1</router-link></li>
        <li><router-link to="/task2">Task2</router-link></li>
        <li><router-link to="/task3">Task3</router-link></li>
      </ul>
    </nav>
    <router-view />
    <Toast v-if="toastMessage" :message="toastMessage" />
</template>

<script setup>
import { ref, provide } from 'vue';
import Toast from './components/Toast.vue';

const toastMessage = ref('');
provide('showToast', (msg) => {
  toastMessage.value = msg;
  setTimeout(() => (toastMessage.value = ''), 3000);
});
</script>
<style>
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

nav ul li {
  /* możesz dodać styl */
}

router-link {
  text-decoration: none;
  color: blue;
}

router-link-active {
  font-weight: bold;
  color: darkblue;
}
</style>