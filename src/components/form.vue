<template>
  <div class="form">
    <div :class="{invalid}" class="input-wrapper">
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
    text: '',
    invalid: false,
  }),
  methods: {
    addTodo() {
      if (this.text.length) {
        this.$store.commit('addTodo', this.text)
        this.text = '';
        this.invalid = false
      } else {
        this.invalid = true
      }
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