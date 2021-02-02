<template>
  <div class="ReportModal">
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade"
         id="reportModelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Report your bug
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
import { useRouter } from 'vue-router'

export default {
  name: 'ReportModal',
  setup() {
    const router = useRouter()

    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      newBug: {}
    })
    return {
      state,
      async create() {
        try {
          await bugsService.createNewBug(state.newBug, state.account.id)
          console.log(state.activeBug)
          await router.push({ path: 'ActiveBug', query: { id: state.activeBug.id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.note{
  min-height: 50px;
}
</style>
