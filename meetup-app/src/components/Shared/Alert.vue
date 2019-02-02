<template>
  <v-alert
      :value="true"
      type="success"
      dismissible
      @input="onClose"
    >
      {{text}}
    </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
