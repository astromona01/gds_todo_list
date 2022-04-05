import { createRouter, createWebHashHistory } from "vue-router";
import todoList from '../components/todoList'

const router = createRouter({
		history: createWebHashHistory(),
		routes: [
				{
						path: '/',
						name: 'App',
						component: todoList
				}
		]
})
export default router;