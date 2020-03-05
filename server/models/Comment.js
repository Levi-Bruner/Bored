import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  creatorEmail: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  content: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Comment;