import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class CommentsService {
  async getAll(userEmail) {
    return await dbContext.Comments.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Comments.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment")
    }
    return data
  }

  async getCommentsByTaskId(id) {
    let data = await dbContext.Comments.find({ taskId: id })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task")
    }
    return data;
  }

  async create(body) {
    let data = await dbContext.Comments.create(body)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Comments.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Comments.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
  }

}


export const commentsService = new CommentsService()