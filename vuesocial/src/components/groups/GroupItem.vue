<template>
  <b-card
    v-if="group !== null"
    :title=group.title
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2">
      <p>
        {{group.name}}
      </p>
      <p>
        {{group.description}}
      </p>

    <br>
    <br>

  </b-card>
</template>

<script>
export default {
  props:['group'],

}
</script>
