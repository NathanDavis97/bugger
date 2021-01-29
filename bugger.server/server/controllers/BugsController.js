import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService.js'
import { notesService } from '../services/NotesService.js'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getAllNotes)
      .post('', this.create)
      .delete('/:id', this.delete)
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
      req.query.user = req.params.user
      const data = await notesService.find({ bugId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.user = req.params.user
      const data = await bugsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await bugsService.delete(req)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
