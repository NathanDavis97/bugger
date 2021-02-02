<template>
  <div v-if="state.bug.creator" class="ActiveBugPage container-fluid">
    <div class="row my-5 justify-content-between ">
      <div class="col-4 offset-1 " @blur="editTitle" :contenteditable="state.editBug">
        <h2>{{ state.bug.title }}</h2>
        <div v-if="state.bug.closed == false">
          <i v-if="state.account.id == state.bug.creatorId" class="fa fa-pencil" aria-hidden="true" @click="state.editBug = !state.editBug"></i>
        </div>
        <h5>reported by {{ state.bug.creator.name }}</h5>
      </div>
      <div class="col-2 mt-5 ">
        <div> Status: {{ state.bug.closed ? "closed" : "Open" }}</div>
        <div v-if="state.bug.closed == false">
          <button
            v-if="state.account.id == state.bug.creator.id"
            @click="close"
            class="btn
        btn-danger"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1">
        <div class="card">
          <div class="card-body">
            <div class="card-title" @blur="editDesc" :contenteditable="state.editBug">
              {{ state.bug.description }}
            </div>
          </div>
          <div class="card-footer nomar row">
            <div class="col-12">
              <NotesComponent v-for="note in state.notes" :key="note.id" :note-prop="note" />
            </div>
            <div class="col-12">
              <form @submit.prevent="create">
                <div class="form-group">
                  <label for=""></label>
                  <input type="text"
                         class="form-control col"
                         name=""
                         id=""
                         aria-describedby="helpId"
                         placeholder=""
                         v-model="state.newNote.content"
                  >
                  <button type="submit" class="btn btn-primary col">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  name: 'ActiveBugPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      bug: computed(() => AppState.activeBug
      ),
      notes: computed(() => AppState.notes),
      newNote: {},
      editBug: false
    })
    onMounted(async() => {
      try {
        await bugsService.getOneBug(route.params.id)
      } catch (error) {
        logger.error(error)
      }
      try {
        await notesService.getAllNotes(state.bug.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async create() {
        try {
          logger.log('creating')
          await notesService.createNewNote(state.newNote, state.bug.id)
          state.newNote = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async close() {
        if (state.bug.closed === false && window.confirm('Are you sure you would like to close this reoirt?')) {
          try {
            state.bug.closed = true
            await bugsService.update(state.bug)
          } catch (error) {
            logger.error(error)
          }
        }
      },
      async editDesc(e) {
        try {
          console.log(e.target.innertext)
          await bugsService.editDesc(state.bug.id, e.target.innertext)
        } catch (error) {
          logger.error(error)
        }
      },
      async editTitle(e) {
        try {
          await bugsService.editTitle(state.bug.id, e.target.innertext)
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
.nomar{
  margin: 0;
}
</style>
