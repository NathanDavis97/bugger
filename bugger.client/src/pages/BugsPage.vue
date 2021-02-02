<template>
  <div class="Bugs container-fluid">
    <h2>Current Bugs</h2>
    <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#reportModelId">
      Report
    </button> -->
    <form @submit.prevent="create">
      <div class="form-group">
        <label for="bugTitle">Bug Title</label>
        <input type="text" class="form-control" id="bugTitle" placeholder="" v-model="state.newBug.title">
      </div>
      <div class="form-group">
        <label for="bugDescription">Description</label>
        <input type="text"
               class="form-control note"
               id="bugDescription"
               placeholder="Describe your bug"
               v-model="state.newBug.description"
        >
      </div>
      <button type="submit" class="btn btn-primary">
        Submit bug report
      </button>
    </form>
    <button @click="filter" class="btn btn-primary">
      Sort by Status
    </button>

    <div class="card bg-warning">
      <div class="card-body bg-warning rounded text-center">
        <div class="row border redbr  border-dark rounded">
          <div class="col-3">
            Title
          </div>
          <div class="col-3">
            Reported by
          </div>
          <div class="col-3">
            Status
          </div>
          <div class="col-3">
            Last Modified
          </div>
        </div>
        <div class="row border-dark border rounded">
          <div class="col">
            <BugsComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
          </div>
        </div>
      </div>
    </div>
    <ReportModal />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { useRouter } from 'vue-router'

export default {
  name: 'Bugs',
  setup() {
    const router = useRouter()

    const state = reactive({
      bugs: computed(() => AppState.bugs
      ),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      newBug: {},
      filter: true

    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        logger.error(error)
      }
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
      },
      async filter() {
        try {
          await bugsService.filter(state.filter)
          state.filter = !state.filter
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
 .redbr{
   border-bottom-width: 5px;
  border-bottom-color: red !important;
}

</style>
