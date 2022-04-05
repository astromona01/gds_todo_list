<template>
  <div class="form">
    <div class="input-wrapper">
      <input @keydown="keyDown" v-model="text" type="text" placeholder="type todo">
    </div>
    <button @click="addTodo">Add Todo</button>
  </div>
</template>

<script>
import '../styles/form.css'
export default {
  name: `Form`,
  data: () => ({
    text: ''
  }),
  methods: {
    addTodo() {
      this.$store.commit('addTodo', this.text)
      this.text = '';
    },
    keyDown(e) {
      if (e.keyCode === 13) {
        this.addTodo()
      }
    }
  }
}
</script>

<style scoped>

</style>