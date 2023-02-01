import express from "express"
import UsersModel from "./model.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await UsersModel.create(req.body)
    res.status(201).send({ id })
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } })
    res.send(users)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
