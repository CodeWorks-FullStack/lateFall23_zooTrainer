import { dbContext } from "../db/DbContext.js"
import { exhibitsService } from "./ExhibitsService.js"



class AnimalsService{
  async createAnimal(animalData) {
    const animal = await dbContext.Animals.create(animalData)
    return animal
  }

  async getAnimals() {
    // NOTE populate tells mongoose, to retrieve the data for our virtual called "exhibit"
    const animals = await dbContext.Animals.find().populate('exhibit')
    return animals
  }

  async getAnimalsInExhibit(exhibitId) {
    await exhibitsService.getExhibitById(exhibitId) // if I just make this request, this verifies, that this exhibit exists before i try to get the animals. I don't need to save the return from it, cause im not currently using it for anything else

    // NOTE this would find all the animals in the 'Frozen' exhibit, cause this is the exhibits id
    // const animals = await dbContext.Animals.find({exhibitId: '658318663db0e2d3cd52fc8a'})
    const animals = await dbContext.Animals.find({exhibitId: exhibitId})
    // --------------------------------------------key     : variable used for value
    return animals
  }

}

export const animalsService = new AnimalsService()
