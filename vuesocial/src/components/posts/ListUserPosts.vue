<template>
    <div>
        <h1>Posts by {{this.id}}</h1>
        <hr>
            <div v-if="posts">
                <post-item
                    v-for="post in posts"
                    v-bind:post="post"
                    :key="post.id"
                >
            </post-item>
            </div>
            
    </div>
    
</template>
<script>
export default {
    props: ['id'],
    computed: {
        posts(){
            return this.$store.getters.getPostsByUser(this.id)
        },
        user(){

        }
    },

}
</script>

