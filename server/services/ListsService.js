import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ListsService {

  async getById(id, userEmail) {
    let data = await dbContext.Lists.findById(id)
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list")
    }
    return data
  }
  async getListsByBoardId(id) {
    let data = await dbContext.Lists.find({ boardId: id })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list")
    }
    return data;
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Lists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Lists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
  }

}


export const listService = new ListsService()