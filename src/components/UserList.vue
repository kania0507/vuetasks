<template>
  <div>
    <h1>Lista użytkowników</h1>
    <input v-model="search" @input="onSearch" placeholder="Szukaj..." />
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <router-link :to="`/edit/${user.id}`">Edytuj</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const search = ref('');
const store = useStore();

onMounted(() => {
  store.dispatch('loadUsers');
});

const users = computed(() => store.getters.users);

function onSearch() {
  store.dispatch('searchUsers', search.value);
}
</script>