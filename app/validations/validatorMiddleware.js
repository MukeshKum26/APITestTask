import { validationResult } from 'express-validator'

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const { param: field, msg: message } = errors.array()[0]
    return res.status(400).send({
      message: field + ' ' + message
    })
  }
  next()
}

export default validatorMiddleware
