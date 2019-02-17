<template>
  <div>
    <b-button @click="showModal" v-if="notJoined">Join Group</b-button>
    <b-button @click="showModal" v-else>Leave Group</b-button>
    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Are you sure you wish to join this group?</h3>
      </div>

      <b-button class="mt-3" variant="outline-danger" block @click="joinGroup" v-if="notJoined">Join</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="leaveGroup" v-else>Leave</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="dismissModal">Cancel</b-button>
    </b-modal>
  </div>

</template>

<script>
  export default {
    props: ['group'],
    methods: {
      showModal() {
        this.$refs.myModalRef.show()
      },
      dismissModal() {
        this.$refs.myModalRef.hide()
      },
      joinGroup() {
        this.$store.dispatch('joinGroup', {groupId: this.group.id})
        this.$refs.myModalRef.hide()
      },
      leaveGroup() {
        this.$store.dispatch('leaveGroup', {groupId: this.group.id})
        this.$refs.myModalRef.hide()
      }
    },
    computed: {
      notJoined () {
        return !this.$store.getters.joinedGroups.includes(this.group.id)
      }
    }
  }
</script>
