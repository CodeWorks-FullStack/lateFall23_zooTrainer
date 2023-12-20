import { Auth0Provider } from "@bcwdev/auth0provider";
import { animalsService } from "../services/AnimalsService.js";
import { exhibitsService } from "../services/ExhibitsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

function _middleWareExample(request, response, next){
  logger.log('Im using middleware baby!')
  next()
}

export class ExhibitsController extends BaseController{
  constructor(){
    super('api/exhibits')
    this.router
    .post('', this.createExhibit)
    .get('', this.getExhibits)
    .use(_middleWareExample)
    .get('/:exhibitId/animals', this.getAnimalsInExhibit)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('/demo/whodis', this.demoWhoDis)
  }

  async createExhibit(request, response, next){
    try {
      const exhibitData = request.body
      const exhibit = await exhibitsService.createExhibit(exhibitData)
      response.send(exhibit)
    } catch (error) {
      next(error)
    }
  }

  async getExhibits(request, response, next){
    try {
      const exhibits = await exhibitsService.getExhibits()
      response.send(exhibits)
    } catch (error) {
      next(error)
    }
  }

  async getAnimalsInExhibit(request, response, next){
    try {
      const exhibitId = request.params.exhibitId
      const animals = await animalsService.getAnimalsInExhibit(exhibitId)
      response.send(animals)
    } catch (error) {
      next(error)
    }
  }

  demoWhoDis(request, response, next){
    try {
      const userInfo = request.userInfo
      logger.log('👤',userInfo)
      response.send(`Howdy, i see you're logged in ${userInfo.name}`)
    } catch (error) {
      next(error)
    }
  }
}
