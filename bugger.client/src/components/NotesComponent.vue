<template>
  <div class="NotesComponent row">
    {{ noteProp.creator.name }} says {{ noteProp.content }}
    <div v-if="state.bug.closed == false">
      <i v-if="state.account.id == noteProp.creator.id" @click="remove(noteProp.id)" class="fa fa-times-circle text-danger" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { reactive, computed } from 'vue'
import { notesService } from '../services/NotesService'
export default {
  name: 'NotesComponent',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      bug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async remove(id) {
        if (window.confirm('Are you sure you want to delete?')) {
          try {
            await notesService.remove(id, state.bug.id)
          } catch (error) {
            logger.error(error)
          }
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
