import express from "express"
import createHttpError from "http-errors"
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
    const users = await UsersModel.findAll({ attributes: ["firstName", "lastName"] }) // (SELECT) pass an array for the include list
    res.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId, {
      attributes: { exclude: ["createdAt", "updatedAt"] }, // (SELECT) pass an object with exclude property for the omit list
    })
    if (user) {
      res.send(user)
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default usersRouter
