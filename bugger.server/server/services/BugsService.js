import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('invalid Id')
    }
    return bug
  }

  async create(data) {
    return await dbContext.Bugs.create(data)
  }

  async update(update, req) {
    return await dbContext.Bugs.findOneAndUpdate({ _id: update.id, creatorId: req.userInfo.id }, update, { new: true }).populate('creator')
  }
}
export const bugsService = new BugsService()
