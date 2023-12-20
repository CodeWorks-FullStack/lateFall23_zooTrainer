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
      const userInfo = request.userInfo // because this route is below the the .use in the router above, we will have access to userInfo on the request. this userInfo has things like {name, email, picture, id}
      const showData = request.body
      showData.accountId = userInfo.id // After pulling the data from both sources, force the logged in user to be the 'owner' of the show
      const show = await showsService.createShow(showData)
      response.send(show)
    } catch (error) {
      next(error)
    }
  }
}
