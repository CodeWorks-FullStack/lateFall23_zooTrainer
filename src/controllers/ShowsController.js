import { Auth0Provider } from "@bcwdev/auth0provider";
import { showsService } from "../services/ShowsService.js";
import BaseController from "../utils/BaseController.js";



export class ShowsController extends BaseController{
  constructor(){
    super('api/shows')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createShow)

  }

  async createShow(request, response, next){
    try {
      const userInfo = request.userInfo
      const showData = request.body
      showData.accountId = userInfo.id // After pulling the data from both sources, force the logged in user to be the 'owner'
      const show = await showsService.createShow(showData)
      response.send(show)
    } catch (error) {
      next(error)
    }
  }
}
