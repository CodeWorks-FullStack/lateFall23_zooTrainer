import { dbContext } from "../db/DbContext.js"



class ExhibitsService{
  async createExhibit(exhibitData) {
    const exhibit = await dbContext.Exhibits.create(exhibitData)
    return exhibit
  }
  async getExhibits() {
    const exhibits = await dbContext.Exhibits.find()
    return exhibits
  }

  async getExhibitById(exhibitId){
    const exhibit = await dbContext.Exhibits.findById(exhibitId)
    if(!exhibit){
      throw new Error(`No exhibit with id: ${exhibitId}`)
    }
    return exhibit
  }

}

export const exhibitsService = new ExhibitsService()
