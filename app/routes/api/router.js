import express from 'express'

const studentRouter = express.Router()
const projectsRouter = express.Router()
const userRouter = express.Router()
const router = express.Router()

export {
  studentRouter,
  projectsRouter,
  userRouter,
  router
}