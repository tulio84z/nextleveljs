<template>
  <div>
    <b-button variant="info" @click="showModal">{{getOpenModalButtonLabel}}</b-button>
    <b-modal ref="myModalRef" hide-footer :title=getTitle>
      <div class="d-block text-center">
        <h3>Are you sure you wish to join this group?</h3>
      </div>

      <b-button class="mt-3" variant="outline-danger" block @click="getMethod">{{getButtonLabel}}</b-button>
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
      getTitle(){
        if(this.notJoined){
          return 'Joining Group'
        }
        return 'Leaving Group'
      },
      notJoined () {
        return !this.$store.getters.joinedGroups.includes(this.group.id)
      },
      getOpenModalButtonLabel(){
        if(this.notJoined){
          return 'Join Group'
        }
        return 'Leave Group'
      },
      getButtonLabel(){
        if(this.notJoined){
          return 'Join'
        }
        return 'Leave'
      },
      getMethod(){
        if(this.notJoined){
          return this.joinGroup
        }
        return this.leaveGroup
      }
    }
  }
</script>
