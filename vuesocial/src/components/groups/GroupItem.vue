<template>
  <b-card
    v-if="group !== null"
    :title=group.title
    img-top
  >
      <p>
        {{group.name}}
      </p>
      <p>
        {{group.description}}
      </p>

    <br>
    <b-button
      :to="'/group/id/' + group.id"
      variant="info"
      >
      Go to Group
    </b-button>

  </b-card>
</template>

<script>
export default {
  props:['group'],

}
</script>
