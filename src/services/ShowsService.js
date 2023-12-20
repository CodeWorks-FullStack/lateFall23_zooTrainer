import { dbContext } from "../db/DbContext.js"



class ShowsService{
  async createShow(showData) {
    const show = await dbContext.Shows.create(showData)
    await show.populate('animal trainer')
    return show
  }

  async getMyShows(userId) {
    const shows = await dbContext.Shows.find({accountId: userId}).populate('animal')
    return shows
  }
}

export const showsService = new ShowsService()
