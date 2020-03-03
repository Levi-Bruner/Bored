import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { boardService } from '../services/BoardsService';
import { listService } from '../services/ListsService';
import { tasksService } from '../services/TasksService';
import { commentsService } from '../services/CommentsService'


//PUBLIC
export class BoardsController extends BaseController {

  constructor() {
    super("api/boards")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/lists', this.getListsByBoardId)
      .get('/:id/lists/:id/tasks', this.getTasksByListId)
      .get('/:id/lists/:id/tasks/:id/comments', this.getCommentsByTaskId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await boardService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await boardService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getListsByBoardId(req, res, next) {
    try {
      let data = await listService.getListsByBoardId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      let data = await tasksService.getTasksByListId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      let data = await commentsService.getCommentsByTaskId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await boardService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await boardService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await boardService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


