<template>
    <div>
        <h1>Posts by {{this.user.name}}</h1>
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
    data() {
        return {
            user: null
        }
    },
    mounted(){
        this.$store.dispatch('getUserById', this.id).then(data => {
            this.user= data
        })
    },
    computed: {
        posts(){
            return this.$store.getters.getPostsByUser(this.id)
        },
    },

}
</script>

