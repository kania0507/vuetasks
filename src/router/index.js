import { createRouter, createWebHistory } from 'vue-router'
import Task1 from '../components/Task1.vue'
import Task2 from '../components/Task2.vue'
import Task3 from '../components/Task3.vue'
import UserEdit from '../components/UserEdit.vue';


const routes = [
  { path: '/task1', name: 'Task1', component: Task1 },
  { path: '/task2', name: 'Task2', component: Task2 },
  { path: '/task3', name: 'Task3', component: Task3 },
  { path: '/edit/:id', component: UserEdit }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

  