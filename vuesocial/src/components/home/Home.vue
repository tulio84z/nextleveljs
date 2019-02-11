<template>
  <div>
    <h1>This it the Social App</h1>
    <ol>
      <li v-for="todo in todos">
        {{todo}}
      </li>
    </ol>
  </div>

</template>

<script>
export default {
  data () {
    return {
      todos: [1,2,3]
    }
  },
  computed: {

  },
  methods: {
    
  },

}
</script>

<style lang="css" scoped>
</style>
