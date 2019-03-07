<template>
    <div class="username">
        {{ username }}


    </div>
</template>

<script>
export default {
    name: 'ComponentWithVuex',

    data() {
        return {
            username: this.$store.state.username
        }
    }
}
</script>
