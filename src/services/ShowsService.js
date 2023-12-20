import { dbContext } from "../db/DbContext.js"



class ShowsService{
  async createShow(showData) {
    const show = await dbContext.Shows.create(showData)
    // NOTE populating virtual data after a create must be done on a separate line
    await show.populate('animal trainer')
    return show
  }

  async getMyShows(userId) {
    // NOTE this request will find all the 'shows' (the many to many) where the accountId is my id.
    // We then populate the animal onto that show, to see what the show will consist of.
    const shows = await dbContext.Shows.find({accountId: userId}).populate('animal') // we only populate the animal on this one as a choice. we could populate both but, because we are making this request assuming I am looking for MY shows, I don't need to see myself
    return shows
  }
}

export const showsService = new ShowsService()
