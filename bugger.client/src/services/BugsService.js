import { logger } from '../utils/Logger'

const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    console.log(res.data)
    AppState.bugs = res.data
  }

  async getOneBug(id) {
    const res = await api.get('api/bugs/' + id)
    console.log(res, 'get one bug service')
    AppState.activeBug = res.data
  }

  async createNewBug(newBug) {
    console.log(newBug)
    newBug.creatorId = AppState.account.id
    const res = await api.post('api/bugs', newBug)
    // AppState.bugs = [...AppState.bugs, res.data]
    logger.log(res)
    this.getOneBug(res.data.id)
  }

  async editDesc(id, update) {
    const bugData = { desc: update }
    const res = await api.put('api/bugs/' + id, bugData)
    console.log(res.data, update)
  }

  async editTitle(id, update) {
    const bugData = { desc: update }
    const res = await api.put('api/bugs/' + id, bugData)
    console.log(res.data, update)
  }

  async update(update) {
    const id = update._id
    update.creatorId = AppState.account.id

    const res = await api.put('api/bugs/' + id, update)
    console.log(res.data)
    this.getOneBug(id)
  }

  async filter(condition) {
    await this.getAllBugs()
    const bugs = AppState.bugs
    AppState.bugs = bugs.filter(bug => bug.closed === condition)
  }
}
export const bugsService = new BugsService()
