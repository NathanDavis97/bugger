import { logger } from '../utils/Logger'

const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class NotesService {
  async getAllNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    console.log(res.data)
    AppState.notes = res.data
  }

  async getOneNote(id) {
    const res = await api.get('api/notes/' + id)
    console.log(res, 'get one Note service')
    AppState.activeNote = res.data
  }

  async createNewNote(newNote, id) {
    console.log(newNote)
    newNote.bugId = id
    newNote.creatorId = AppState.account.id
    const res = await api.post('api/notes', newNote)
    // AppState.notes = [...AppState.notes, res.data]
    logger.log(res)
    this.getAllNotes(id)
  }

  async update(update) {
    const id = update._id
    const res = await api.put('api/notes/' + id, update)
    console.log(res.data)
    this.getOneNote(id)
  }

  async remove(id, bugId) {
    const res = await api.delete('api/notes/' + id)
    console.log(res, 'delorted')
    this.getAllNotes(bugId)
  }
}

export const notesService = new NotesService()
