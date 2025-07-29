<template>
  <div>
    <h2>Edytuj użytkownika</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Imię:</label>
        <input v-model="name" />
        <span v-if="v$.name.$error">Imię jest wymagane (min. 2 znaki)</span>
      </div>

      <div>
        <label>Email:</label>
        <input v-model="email" />
        <span v-if="v$.email.$error">Niepoprawny email</span>
      </div>

      <div>
        <label>Płeć:</label>
        <select v-model="gender">
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
      </div>

      <div>
        <label>Status:</label>
        <select v-model="status">
          <option value="active">Aktywny</option>
          <option value="inactive">Nieaktywny</option>
        </select>
      </div>

      <button type="submit">Zapisz</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import useVuelidate from '@vuelidate/core';
import { required, email as emailVal, minLength, helpers } from '@vuelidate/validators';

const route = useRoute();
const router = useRouter();
const store = useStore();

const userId = route.params.id;
const user = computed(() => store.getters.getUserById(userId));

const name = ref('');
const email = ref('');
const gender = ref('male');
const status = ref('active');




import { inject } from 'vue';
const showToast = inject('showToast');

onMounted(() => {
  if (user.value) {
    name.value = user.value.name;
    email.value = user.value.email;
    gender.value = user.value.gender;
    status.value = user.value.status;
  }
});

// Anty-XSS: Tylko bezpieczne znaki
const safeText = helpers.regex(/^[a-zA-Z0-9\s.@\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/);

const rules = {
  name: { required, minLength: minLength(2), safeText },
  email: { required, email: emailVal },
  gender: { required },
  status: { required }
};

const v$ = useVuelidate(rules, { name, email, gender, status });


function onSubmit() {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    store.commit('UPDATE_USER', {
      id: userId,
      name: name.value,
      email: email.value,
      gender: gender.value,
      status: status.value
    });

    showToast('Użytkownik został zaktualizowany!');
    router.push('/task3');
  }
}

</script>

<style scoped>
span {
  color: red;
  font-size: 0.9em;
}
</style>