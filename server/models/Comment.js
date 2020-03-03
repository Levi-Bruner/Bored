import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Board', required: true },
  content: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Comment;