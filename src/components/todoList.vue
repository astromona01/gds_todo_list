<template>
  <div class="container">
    <button
        :class="{visible: this.$store.getters.hasCompleted}"
        class="clear-button"
        @click="clearCompleted"
    >
      Clear completed
    </button>
    <Form />
    <header class="todos-header">What needs to be done</header>
    <div>{{this.$store.getters.todos.length}} todo</div>
    <Categories />
    <ul class="todo-list">
      <li
          v-for="(todo) in todos"
          :key="todo.id"
          class="todo-item"
          :class="{completed: !todo.active}"
          @click="completeTodo(todo.id)"
      >
        <span class="checkedIcon" ></span>
        <span>{{todo.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import '../styles/todoList.css'
import Form from './form'
import Categories from "./categories";
export default {
  name: 'todoList',
  data: () => ({
    todos: [],
  }),
  components: {
    Form,
    Categories
  },
  watch: {
    __filterOn(){
      this.todos = this.$store.getters.filtered;
    },
    __serverTodos() {
      this.todos = this.$store.getters.todos;
    }
  },
  mounted() {
    this.$store.commit('getTodoList')
  },
  methods: {
    completeTodo(id) {
      this.$store.commit('completeTodo', id)
    },
    clearCompleted() {
      this.$store.commit('clearCompleted')
    }
  },
  computed: {
    __filterOn() {
      return this.$store.getters.filtered
    },
    __serverTodos() {
      return this.$store.getters.todos
    }
  }
}
</script>
