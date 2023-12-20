import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { showsService } from '../services/ShowsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/myShows', this.getMyShows) // we don't need any route params here, because we are going to use the userinfo on the request to get the accounts id instead.
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyShows(request, response, next){
    try {
      const userId = request.userInfo.id // NOTE we don't use params this time, because the userinfo is attached to the request, from our Auth0provider, middleware (given they are logged in)
      const shows = await showsService.getMyShows(userId)
      response.send(shows)
    } catch (error) {
      next(error)
    }
  }
}
