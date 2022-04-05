<template>
  <table>
    <td :class="{'sort-type': sortType==='all'}" @click="sortTodos('all')">All</td>
    <td :class="{'sort-type': sortType==='completed'}" @click="sortTodos('completed')">Completed</td>
    <td :class="{'sort-type': sortType==='active'}" @click="sortTodos('active')">Active</td>
  </table>
</template>

<script>
export default {
  name: `Categories`,
  data: () => ({
    sortType: 'all',
  }),
  methods: {
    sortTodos(sortType) {
      this.sortType = sortType;
      this.$store.commit('sortTodos', sortType)
    }
  }
}
</script>

<style scoped>

</style>