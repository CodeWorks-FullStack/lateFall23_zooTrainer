import { animalsService } from "../services/AnimalsService.js";
import BaseController from "../utils/BaseController.js";



export class AnimalsController extends BaseController{
  constructor(){
    super('api/animals')
    this.router
    .post('', this.createAnimal)
    .get('', this.getAnimals)
  }

  async createAnimal(request, response, next){
    try {
      const animalData = request.body
      const animal = await animalsService.createAnimal(animalData)
      response.send(animal)
    } catch (error) {
      next(error)
    }
  }

  async getAnimals(request, response, next){
    try {
      const animals = await animalsService.getAnimals()
      response.send(animals)
    } catch (error) {
      next(error)
    }
  }
}
