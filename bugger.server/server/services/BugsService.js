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

  async delete(req) {
    const bug = await dbContext.Bugs.findOneAndDelete({ _id: req.params.id, creatorId: req.userInfo.id })
    if (!bug) {
      throw new BadRequest('You are not the owner, or this is not a valid bug')
    }
    return 'delorted'
  }
}
export const bugsService = new BugsService()
