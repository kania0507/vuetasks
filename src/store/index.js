// src/store/index.js
import { createStore } from 'vuex';
import { fetchUsers } from '../api/users';

export default createStore({
  state: {
    users: [],
    filteredUsers: []
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      state.filteredUsers = users;
    },
    FILTER_USERS(state, query) {
      const q = query.toLowerCase();
      state.filteredUsers = state.users.filter(user =>
        user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
      );
    },
    UPDATE_USER(state, updatedUser) {
  state.users = state.users.map(user =>
    user.id == updatedUser.id ? { ...user, ...updatedUser } : user
  );

  state.filteredUsers = state.filteredUsers.map(user =>
    user.id == updatedUser.id ? { ...user, ...updatedUser } : user
  );
}
  },
  actions: {
    async loadUsers({ state, commit }) {
      // Jeśli już mamy dane, nie pobieraj ponownie
      if (state.users.length > 0) return;

      try {
        const users = await fetchUsers();
        commit('SET_USERS', users);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    },
    searchUsers({ commit }, query) {
      commit('FILTER_USERS', query);
    }
  },
  getters: {
    users: state => state.filteredUsers,
    getUserById: (state) => (id) => state.users.find(u => u.id == id)
  }
});