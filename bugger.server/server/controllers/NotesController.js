import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService.js'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await notesService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.query.user = req.params.user

      const data = await notesService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.user = req.params.user
      const data = await notesService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await notesService.delete(req)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
