import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService.js'
import { notesService } from '../services/NotesService.js'
import { logger } from '../utils/Logger'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getAllNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id', this.update)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await bugsService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.query.user = req.params.user

      const data = await bugsService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotes(req, res, next) {
    try {
      logger.log(req)
      req.query.user = req.params.user
      const data = await notesService.find({ bugId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // req.body.user = req.userInfo
      const data = await bugsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.update(req.body, req)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
