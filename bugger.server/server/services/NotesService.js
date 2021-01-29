import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notess = await dbContext.Notes.find(query).populate('creator')
    return notess
  }

  async findById(id) {
    const notes = await dbContext.Notes.findById(id).populate('creator')
    if (!notes) {
      throw new BadRequest('invalid Id')
    }
    return notes
  }

  async create(title) {
    return await dbContext.Notes.create(title)
  }

  async delete(req) {
    const notes = await dbContext.Notes.findOneAndDelete({ _id: req.params.id, creatorId: req.userInfo.id })
    if (!notes) {
      throw new BadRequest('You are not the owner, or this is not a valid notes')
    }
    return 'delorted'
  }
}
export const notesService = new NotesService()
